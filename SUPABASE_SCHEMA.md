# Supabase Database Schema for Trustopay

## Overview
This document outlines the complete database schema for the Trustopay invoice management and payment platform.

---

## 1. **auth.users** + **profiles** (Authentication & User Profiles)
Supabase uses `auth.users` for authentication. Store app-specific fields in `public.profiles` linked 1:1 to `auth.users` (`profiles.id = auth.users.id`).

### 1A. **auth.users** (managed by Supabase)
Key columns you’ll commonly use:

| Field | Type | Attributes | Description |
|-------|------|------------|-------------|
| id | uuid | PRIMARY KEY | Auth user id (`auth.uid()`) |
| email | text | UNIQUE | Email (if email auth enabled) |
| phone | text | UNIQUE | Phone (if phone auth enabled) |
| raw_user_meta_data | jsonb | - | User metadata (we can store `name` etc.) |

### 1B. **profiles** (app table)
Primary user profile table for both sellers and buyers.

| Field | Type | Attributes | Description |
|-------|------|------------|-------------|
| id | uuid | PRIMARY KEY, FK → auth.users(id) | Same as auth user id |
| phone | varchar(15) | UNIQUE, NULL | Phone number |
| name | varchar(255) | NULL | User's full name |
| email | varchar(255) | UNIQUE, NULL | Email address |
| account_type | varchar(20) | NOT NULL, DEFAULT 'individual', CHECK ('individual', 'business') | Account type |
| pan | varchar(10) | NULL | PAN number (for individuals) |
| business_name | varchar(255) | NULL | Business name (for business accounts) |
| business_logo | text | NULL | URL to business logo |
| gst | varchar(15) | NULL | GST number (for business) |
| business_address | text | NULL | Business address |
| company_docs | text[] | NULL | Array of document URLs |
| is_verified | boolean | DEFAULT false | KYC verification status |
| is_active | boolean | DEFAULT true | Account active status |
| created_at | timestamptz | DEFAULT now() | Account creation date |
| updated_at | timestamptz | DEFAULT now() | Last update timestamp |
| last_login | timestamptz | NULL | Last login timestamp |

**Indexes:**
- `idx_profiles_phone` on `phone`
- `idx_profiles_email` on `email`
- `idx_profiles_account_type` on `account_type`

---

## 2. **clients** (Client/Customer Management)
Clients managed by sellers.

| Field | Type | Attributes | Description |
|-------|------|------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique client ID |
| seller_id | uuid | FOREIGN KEY → auth.users(id), NOT NULL | Owner (seller) |
| company_name | varchar(255) | NOT NULL | Client company name |
| email | varchar(255) | NOT NULL | Client email |
| phone | varchar(15) | NOT NULL | Client phone number |
| address | text | NULL | Client address |
| gstin | varchar(15) | NULL | GSTIN number |
| notes | text | NULL | Additional notes |
| created_at | timestamp | DEFAULT now() | Creation date |
| updated_at | timestamp | DEFAULT now() | Last update timestamp |

**Indexes:**
- `idx_clients_seller_id` on `seller_id`
- `idx_clients_email` on `email`
- `idx_clients_phone` on `phone`

---

## 3. **invoices** (Invoice Management)
Main invoice table.

| Field | Type | Attributes | Description |
|-------|------|------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique invoice ID |
| invoice_number | varchar(50) | UNIQUE, NOT NULL | Human-readable invoice number (INV-001) |
| seller_id | uuid | FOREIGN KEY → auth.users(id), NOT NULL | Invoice creator (seller) |
| buyer_id | uuid | FOREIGN KEY → auth.users(id), NULL | Buyer user ID (if registered) |
| client_id | uuid | FOREIGN KEY → clients(id), NULL | Client ID (if from clients table) |
| client_name | varchar(255) | NOT NULL | Client/buyer name |
| client_email | varchar(255) | NOT NULL | Client email |
| client_address | text | NULL | Client address |
| client_gstin | varchar(15) | NULL | Client GSTIN |
| invoice_date | date | NOT NULL | Invoice issue date |
| due_date | date | NULL | Due date (for full payment) |
| payment_type | varchar(20) | NOT NULL, CHECK ('full', 'milestone', 'split') | Payment type |
| subtotal | decimal(12,2) | NOT NULL, DEFAULT 0 | Subtotal amount |
| tax_rate | decimal(5,2) | DEFAULT 0 | Tax rate percentage |
| tax_amount | decimal(12,2) | DEFAULT 0 | Tax amount |
| total_amount | decimal(12,2) | NOT NULL | Total invoice amount |
| paid_amount | decimal(12,2) | DEFAULT 0 | Amount paid so far |
| status | varchar(20) | NOT NULL, DEFAULT 'draft', CHECK ('draft', 'sent', 'viewed', 'pending', 'paid', 'overdue', 'cancelled') | Invoice status |
| notes | text | NULL | Terms and notes |
| public_token | varchar(100) | UNIQUE, NULL | Public token for invoice link |
| is_draft | boolean | DEFAULT false | Draft status |
| created_at | timestamp | DEFAULT now() | Creation timestamp |
| updated_at | timestamp | DEFAULT now() | Last update timestamp |
| sent_at | timestamp | NULL | When invoice was sent |
| viewed_at | timestamp | NULL | When invoice was viewed |
| paid_at | timestamp | NULL | When invoice was fully paid |

**Indexes:**
- `idx_invoices_seller_id` on `seller_id`
- `idx_invoices_buyer_id` on `buyer_id`
- `idx_invoices_client_id` on `client_id`
- `idx_invoices_invoice_number` on `invoice_number`
- `idx_invoices_status` on `status`
- `idx_invoices_public_token` on `public_token`

---

## 4. **invoice_items** (Invoice Line Items)
Items/services in each invoice.

| Field | Type | Attributes | Description |
|-------|------|------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique item ID |
| invoice_id | uuid | FOREIGN KEY → invoices(id) ON DELETE CASCADE, NOT NULL | Parent invoice |
| description | text | NOT NULL | Item description |
| quantity | decimal(10,2) | NOT NULL, DEFAULT 1 | Quantity |
| rate | decimal(12,2) | NOT NULL | Unit rate/price |
| amount | decimal(12,2) | NOT NULL | Line total (quantity × rate) |
| sort_order | integer | DEFAULT 0 | Display order |
| created_at | timestamp | DEFAULT now() | Creation timestamp |

**Indexes:**
- `idx_invoice_items_invoice_id` on `invoice_id`

---

## 5. **invoice_milestones** (Payment Milestones/Schedules)
Payment milestones for milestone and split payment types.

| Field | Type | Attributes | Description |
|-------|------|------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique milestone ID |
| invoice_id | uuid | FOREIGN KEY → invoices(id) ON DELETE CASCADE, NOT NULL | Parent invoice |
| description | varchar(255) | NOT NULL | Milestone description |
| percentage | decimal(5,2) | NOT NULL | Percentage of total (must sum to 100) |
| due_date | date | NOT NULL | Milestone due date |
| amount | decimal(12,2) | NOT NULL | Calculated amount |
| paid_amount | decimal(12,2) | DEFAULT 0 | Amount paid for this milestone |
| status | varchar(20) | DEFAULT 'pending', CHECK ('pending', 'paid', 'overdue') | Milestone status |
| sort_order | integer | DEFAULT 0 | Display order |
| created_at | timestamp | DEFAULT now() | Creation timestamp |
| updated_at | timestamp | DEFAULT now() | Last update timestamp |

**Indexes:**
- `idx_invoice_milestones_invoice_id` on `invoice_id`
- `idx_invoice_milestones_status` on `status`

---

## 6. **transactions** (Payment Transactions)
All payment transactions (payments, refunds, payouts).

| Field | Type | Attributes | Description |
|-------|------|------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique transaction ID |
| transaction_number | varchar(50) | UNIQUE, NOT NULL | Human-readable transaction ID (TXN-001) |
| invoice_id | uuid | FOREIGN KEY → invoices(id), NULL | Related invoice (if payment) |
| milestone_id | uuid | FOREIGN KEY → invoice_milestones(id), NULL | Related milestone (if milestone payment) |
| user_id | uuid | FOREIGN KEY → auth.users(id), NOT NULL | User involved (buyer or seller) |
| type | varchar(20) | NOT NULL, CHECK ('payment', 'refund', 'payout', 'chargeback') | Transaction type |
| direction | varchar(10) | NOT NULL, CHECK ('credit', 'debit') | Credit or debit |
| amount | decimal(12,2) | NOT NULL | Transaction amount |
| payment_method | varchar(50) | NULL | Payment method (UPI, Card, Net Banking, etc.) |
| payment_gateway | varchar(50) | NULL | Payment gateway used |
| gateway_transaction_id | varchar(255) | NULL | Gateway transaction ID |
| status | varchar(20) | NOT NULL, DEFAULT 'pending', CHECK ('pending', 'success', 'failed', 'cancelled', 'refunded') | Transaction status |
| failure_reason | text | NULL | Failure reason if failed |
| metadata | jsonb | NULL | Additional transaction data |
| created_at | timestamp | DEFAULT now() | Creation timestamp |
| updated_at | timestamp | DEFAULT now() | Last update timestamp |
| completed_at | timestamp | NULL | Completion timestamp |

**Indexes:**
- `idx_transactions_invoice_id` on `invoice_id`
- `idx_transactions_user_id` on `user_id`
- `idx_transactions_status` on `status`
- `idx_transactions_type` on `type`
- `idx_transactions_transaction_number` on `transaction_number`

---

## 7. **disputes** (Disputes & Support Tickets)
Disputes and support tickets.

| Field | Type | Attributes | Description |
|-------|------|------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique dispute ID |
| ticket_number | varchar(50) | UNIQUE, NOT NULL | Ticket number (TKT-2025-001) |
| user_id | uuid | FOREIGN KEY → auth.users(id), NOT NULL | User who raised the dispute |
| invoice_id | uuid | FOREIGN KEY → invoices(id), NULL | Related invoice |
| transaction_id | uuid | FOREIGN KEY → transactions(id), NULL | Related transaction |
| subject | varchar(255) | NOT NULL | Dispute subject |
| type | varchar(50) | NOT NULL | Dispute type (Payment Issue, Service Issue, etc.) |
| status | varchar(20) | NOT NULL, DEFAULT 'open', CHECK ('open', 'in_progress', 'resolved', 'closed') | Dispute status |
| priority | varchar(20) | DEFAULT 'medium', CHECK ('low', 'medium', 'high', 'urgent') | Priority level |
| description | text | NULL | Initial description |
| resolution | text | NULL | Resolution notes |
| resolved_by | uuid | FOREIGN KEY → auth.users(id), NULL | Admin who resolved |
| created_at | timestamp | DEFAULT now() | Creation timestamp |
| updated_at | timestamp | DEFAULT now() | Last update timestamp |
| resolved_at | timestamp | NULL | Resolution timestamp |

**Indexes:**
- `idx_disputes_user_id` on `user_id`
- `idx_disputes_invoice_id` on `invoice_id`
- `idx_disputes_status` on `status`
- `idx_disputes_ticket_number` on `ticket_number`

---

## 8. **dispute_messages** (Dispute Conversation)
Messages in dispute conversations.

| Field | Type | Attributes | Description |
|-------|------|------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique message ID |
| dispute_id | uuid | FOREIGN KEY → disputes(id) ON DELETE CASCADE, NOT NULL | Parent dispute |
| sender_id | uuid | FOREIGN KEY → auth.users(id), NOT NULL | Message sender |
| sender_type | varchar(20) | NOT NULL, CHECK ('user', 'support', 'admin') | Sender type |
| message | text | NOT NULL | Message content |
| attachments | text[] | NULL | Array of attachment URLs |
| is_internal | boolean | DEFAULT false | Internal note (not visible to user) |
| created_at | timestamp | DEFAULT now() | Message timestamp |

**Indexes:**
- `idx_dispute_messages_dispute_id` on `dispute_id`
- `idx_dispute_messages_sender_id` on `sender_id`

---

## 9. **subscriptions** (User Subscriptions)
User subscription plans.

| Field | Type | Attributes | Description |
|-------|------|------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique subscription ID |
| user_id | uuid | FOREIGN KEY → auth.users(id), NOT NULL | Subscribed user |
| plan_name | varchar(50) | NOT NULL | Plan name (e.g., 'pro', 'basic') |
| plan_type | varchar(20) | NOT NULL, CHECK ('monthly', 'yearly') | Billing cycle |
| amount | decimal(10,2) | NOT NULL | Subscription amount |
| status | varchar(20) | NOT NULL, DEFAULT 'active', CHECK ('active', 'cancelled', 'expired', 'trial') | Subscription status |
| start_date | date | NOT NULL | Subscription start date |
| end_date | date | NULL | Subscription end date |
| renewal_date | date | NULL | Next renewal date |
| auto_renew | boolean | DEFAULT true | Auto-renewal enabled |
| trial_end_date | date | NULL | Trial end date |
| cancelled_at | timestamp | NULL | Cancellation timestamp |
| created_at | timestamp | DEFAULT now() | Creation timestamp |
| updated_at | timestamp | DEFAULT now() | Last update timestamp |

**Indexes:**
- `idx_subscriptions_user_id` on `user_id`
- `idx_subscriptions_status` on `status`

---

## 10. **kyc_applications** (KYC Verification)
KYC verification applications.

| Field | Type | Attributes | Description |
|-------|------|------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique KYC application ID |
| application_number | varchar(50) | UNIQUE, NOT NULL | Application number (KYC-001) |
| user_id | uuid | FOREIGN KEY → auth.users(id), NOT NULL | Applicant |
| role | varchar(20) | NOT NULL, CHECK ('seller', 'buyer') | User role |
| business_name | varchar(255) | NULL | Business name |
| status | varchar(20) | NOT NULL, DEFAULT 'pending', CHECK ('pending', 'under_review', 'approved', 'rejected', 'info_requested') | Application status |
| documents | jsonb | NOT NULL | JSON object with document URLs and types |
| review_notes | text | NULL | Admin review notes |
| reviewed_by | uuid | FOREIGN KEY → auth.users(id), NULL | Admin reviewer |
| submitted_at | timestamp | DEFAULT now() | Submission timestamp |
| reviewed_at | timestamp | NULL | Review timestamp |
| updated_at | timestamp | DEFAULT now() | Last update timestamp |

**Indexes:**
- `idx_kyc_applications_user_id` on `user_id`
- `idx_kyc_applications_status` on `status`
- `idx_kyc_applications_application_number` on `application_number`

---

## 11. **financing_requests** (Invoice Financing)
Invoice financing requests.

| Field | Type | Attributes | Description |
|-------|------|------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique request ID |
| invoice_id | uuid | FOREIGN KEY → invoices(id), NOT NULL | Invoice to finance |
| seller_id | uuid | FOREIGN KEY → auth.users(id), NOT NULL | Requesting seller |
| advance_percentage | decimal(5,2) | NOT NULL | Advance percentage (80-90%) |
| advance_amount | decimal(12,2) | NOT NULL | Calculated advance amount |
| fee_percentage | decimal(5,2) | NOT NULL | Fee percentage |
| fee_amount | decimal(12,2) | NOT NULL | Calculated fee amount |
| net_amount | decimal(12,2) | NOT NULL | Net amount after fee |
| status | varchar(20) | NOT NULL, DEFAULT 'pending', CHECK ('pending', 'approved', 'rejected', 'disbursed', 'repaid', 'defaulted') | Request status |
| documents | jsonb | NULL | Supporting documents |
| review_notes | text | NULL | Review notes |
| reviewed_by | uuid | FOREIGN KEY → auth.users(id), NULL | Reviewer (NBFC admin) |
| disbursed_at | timestamp | NULL | Disbursement timestamp |
| repayment_date | date | NULL | Expected repayment date |
| created_at | timestamp | DEFAULT now() | Creation timestamp |
| updated_at | timestamp | DEFAULT now() | Last update timestamp |

**Indexes:**
- `idx_financing_requests_invoice_id` on `invoice_id`
- `idx_financing_requests_seller_id` on `seller_id`
- `idx_financing_requests_status` on `status`

---

## 12. **emi_plans** (EMI Plans)
EMI payment plans for buyers.

| Field | Type | Attributes | Description |
|-------|------|------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique EMI plan ID |
| invoice_id | uuid | FOREIGN KEY → invoices(id), NOT NULL | Related invoice |
| buyer_id | uuid | FOREIGN KEY → auth.users(id), NOT NULL | Buyer |
| total_amount | decimal(12,2) | NOT NULL | Total amount |
| number_of_installments | integer | NOT NULL | Number of installments |
| installment_amount | decimal(12,2) | NOT NULL | Amount per installment |
| status | varchar(20) | NOT NULL, DEFAULT 'active', CHECK ('active', 'completed', 'defaulted', 'cancelled') | Plan status |
| start_date | date | NOT NULL | Plan start date |
| next_due_date | date | NULL | Next installment due date |
| completed_at | timestamp | NULL | Completion timestamp |
| created_at | timestamp | DEFAULT now() | Creation timestamp |
| updated_at | timestamp | DEFAULT now() | Last update timestamp |

**Indexes:**
- `idx_emi_plans_invoice_id` on `invoice_id`
- `idx_emi_plans_buyer_id` on `buyer_id`
- `idx_emi_plans_status` on `status`

---

## 13. **emi_installments** (EMI Installments)
Individual EMI installments.

| Field | Type | Attributes | Description |
|-------|------|------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique installment ID |
| emi_plan_id | uuid | FOREIGN KEY → emi_plans(id) ON DELETE CASCADE, NOT NULL | Parent EMI plan |
| installment_number | integer | NOT NULL | Installment number (1, 2, 3...) |
| amount | decimal(12,2) | NOT NULL | Installment amount |
| due_date | date | NOT NULL | Due date |
| paid_amount | decimal(12,2) | DEFAULT 0 | Amount paid |
| status | varchar(20) | NOT NULL, DEFAULT 'pending', CHECK ('pending', 'paid', 'overdue', 'failed') | Installment status |
| transaction_id | uuid | FOREIGN KEY → transactions(id), NULL | Payment transaction |
| paid_at | timestamp | NULL | Payment timestamp |
| created_at | timestamp | DEFAULT now() | Creation timestamp |
| updated_at | timestamp | DEFAULT now() | Last update timestamp |

**Indexes:**
- `idx_emi_installments_emi_plan_id` on `emi_plan_id`
- `idx_emi_installments_status` on `status`
- `idx_emi_installments_due_date` on `due_date`

---

## 14. **payouts** (Seller Payouts)
Payouts to sellers.

| Field | Type | Attributes | Description |
|-------|------|------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique payout ID |
| seller_id | uuid | FOREIGN KEY → auth.users(id), NOT NULL | Seller receiving payout |
| amount | decimal(12,2) | NOT NULL | Payout amount |
| bank_account_number | varchar(50) | NULL | Bank account number |
| ifsc_code | varchar(11) | NULL | IFSC code |
| account_holder_name | varchar(255) | NULL | Account holder name |
| status | varchar(20) | NOT NULL, DEFAULT 'pending', CHECK ('pending', 'processing', 'completed', 'failed', 'cancelled') | Payout status |
| failure_reason | text | NULL | Failure reason |
| transaction_id | uuid | FOREIGN KEY → transactions(id), NULL | Related transaction |
| initiated_at | timestamp | DEFAULT now() | Initiation timestamp |
| completed_at | timestamp | NULL | Completion timestamp |
| created_at | timestamp | DEFAULT now() | Creation timestamp |
| updated_at | timestamp | DEFAULT now() | Last update timestamp |

**Indexes:**
- `idx_payouts_seller_id` on `seller_id`
- `idx_payouts_status` on `status`

---

## 15. **notifications** (User Notifications)
System notifications for users.

| Field | Type | Attributes | Description |
|-------|------|------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique notification ID |
| user_id | uuid | FOREIGN KEY → auth.users(id), NOT NULL | Recipient user |
| type | varchar(50) | NOT NULL | Notification type (invoice_sent, payment_received, etc.) |
| title | varchar(255) | NOT NULL | Notification title |
| message | text | NOT NULL | Notification message |
| related_invoice_id | uuid | FOREIGN KEY → invoices(id), NULL | Related invoice |
| related_transaction_id | uuid | FOREIGN KEY → transactions(id), NULL | Related transaction |
| is_read | boolean | DEFAULT false | Read status |
| read_at | timestamp | NULL | Read timestamp |
| created_at | timestamp | DEFAULT now() | Creation timestamp |

**Indexes:**
- `idx_notifications_user_id` on `user_id`
- `idx_notifications_is_read` on `is_read`
- `idx_notifications_created_at` on `created_at`

---

## 16. **audit_logs** (System Audit Logs)
System audit trail for admin.

| Field | Type | Attributes | Description |
|-------|------|------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique log ID |
| user_id | uuid | FOREIGN KEY → auth.users(id), NULL | User who performed action |
| action | varchar(100) | NOT NULL | Action performed |
| entity_type | varchar(50) | NULL | Entity type (invoice, transaction, etc.) |
| entity_id | uuid | NULL | Entity ID |
| details | jsonb | NULL | Action details |
| ip_address | varchar(45) | NULL | IP address |
| user_agent | text | NULL | User agent |
| created_at | timestamp | DEFAULT now() | Log timestamp |

**Indexes:**
- `idx_audit_logs_user_id` on `user_id`
- `idx_audit_logs_entity_type` on `entity_type`
- `idx_audit_logs_created_at` on `created_at`

---

## 17. **partners** (NBFC/Partner Management)
NBFC partners for financing (admin managed).

| Field | Type | Attributes | Description |
|-------|------|------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique partner ID |
| name | varchar(255) | NOT NULL | Partner name |
| type | varchar(50) | NOT NULL | Partner type (NBFC, Bank, etc.) |
| contact_email | varchar(255) | NULL | Contact email |
| contact_phone | varchar(15) | NULL | Contact phone |
| is_active | boolean | DEFAULT true | Active status |
| metadata | jsonb | NULL | Additional partner data |
| created_at | timestamp | DEFAULT now() | Creation timestamp |
| updated_at | timestamp | DEFAULT now() | Last update timestamp |

**Indexes:**
- `idx_partners_type` on `type`
- `idx_partners_is_active` on `is_active`

---

## 18. **invoice_timeline** (Invoice Activity Timeline)
Activity timeline for invoices.

| Field | Type | Attributes | Description |
|-------|------|------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique timeline entry ID |
| invoice_id | uuid | FOREIGN KEY → invoices(id) ON DELETE CASCADE, NOT NULL | Related invoice |
| event_type | varchar(50) | NOT NULL | Event type (created, sent, viewed, paid, etc.) |
| description | text | NULL | Event description |
| metadata | jsonb | NULL | Additional event data |
| created_at | timestamp | DEFAULT now() | Event timestamp |

**Indexes:**
- `idx_invoice_timeline_invoice_id` on `invoice_id`
- `idx_invoice_timeline_created_at` on `created_at`

---

## 19. **user_settings** (User Preferences)
User settings and preferences.

| Field | Type | Attributes | Description |
|-------|------|------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique setting ID |
| user_id | uuid | FOREIGN KEY → auth.users(id) ON DELETE CASCADE, NOT NULL, UNIQUE | User ID |
| email_notifications | boolean | DEFAULT true | Email notifications enabled |
| whatsapp_notifications | boolean | DEFAULT false | WhatsApp notifications enabled |
| invoice_template | jsonb | NULL | Invoice template settings |
| payment_reminder_settings | jsonb | NULL | Payment reminder settings |
| created_at | timestamp | DEFAULT now() | Creation timestamp |
| updated_at | timestamp | DEFAULT now() | Last update timestamp |

**Indexes:**
- `idx_user_settings_user_id` on `user_id`

---

## 20. **autopay_setups** (Buyer Autopay)
Autopay configurations for buyers.

| Field | Type | Attributes | Description |
|-------|------|------------|-------------|
| id | uuid | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique autopay ID |
| buyer_id | uuid | FOREIGN KEY → auth.users(id), NOT NULL | Buyer |
| method | varchar(20) | NOT NULL, CHECK ('upi', 'enach') | Autopay method |
| upi_id | varchar(255) | NULL | UPI ID (if UPI method) |
| account_number | varchar(50) | NULL | Bank account (if eNACH) |
| ifsc_code | varchar(11) | NULL | IFSC code (if eNACH) |
| account_holder_name | varchar(255) | NULL | Account holder name |
| max_amount | decimal(12,2) | NOT NULL | Maximum amount per transaction |
| frequency | varchar(20) | NOT NULL | Frequency (monthly, weekly, as_presented) |
| start_date | date | NOT NULL | Start date |
| status | varchar(20) | NOT NULL, DEFAULT 'active', CHECK ('active', 'inactive', 'cancelled') | Status |
| mandate_id | varchar(255) | NULL | Payment mandate ID |
| created_at | timestamp | DEFAULT now() | Creation timestamp |
| updated_at | timestamp | DEFAULT now() | Last update timestamp |

**Indexes:**
- `idx_autopay_setups_buyer_id` on `buyer_id`
- `idx_autopay_setups_status` on `status`

---

## Row Level Security (RLS) Policies

### Auth + Profiles
- Auth uses `auth.users`; app profile data lives in `profiles`
- Users can only read/update their own `profiles` row
- Admin access should be implemented via custom claims + extra RLS policies

### Clients
- Sellers can only access their own clients
- Clients cannot access this table directly

### Invoices
- Sellers can CRUD their own invoices
- Buyers can read invoices where they are the buyer
- Public invoices (via token) can be read by anyone with token

### Transactions
- Users can read their own transactions
- Sellers can see transactions for their invoices

### Disputes
- Users can CRUD their own disputes
- Admins can read all disputes

### Subscriptions
- Users can only access their own subscriptions

---

## Functions & Triggers

### 1. **update_updated_at()**
Automatically update `updated_at` timestamp on row updates.

### 2. **generate_invoice_number()**
Generate unique invoice numbers (INV-001, INV-002, etc.).

### 3. **generate_transaction_number()**
Generate unique transaction numbers (TXN-001, etc.).

### 4. **calculate_invoice_totals()**
Recalculate invoice totals when items change.

### 5. **update_invoice_status()**
Automatically update invoice status based on payments.

### 6. **check_milestone_percentage()**
Validate that milestone percentages sum to 100.

### 7. **send_notification()**
Trigger notifications on invoice events.

---

## Recommended Extensions

```sql
-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable JSONB operations
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For text search

-- Enable full-text search (optional)
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
```

---

## Migration Order

1. Create extensions
2. Create `users` table
3. Create `clients` table
4. Create `invoices` table
5. Create `invoice_items` table
6. Create `invoice_milestones` table
7. Create `transactions` table
8. Create `disputes` and `dispute_messages` tables
9. Create `subscriptions` table
10. Create `kyc_applications` table
11. Create `financing_requests` table
12. Create `emi_plans` and `emi_installments` tables
13. Create `payouts` table
14. Create `notifications` table
15. Create `audit_logs` table
16. Create `partners` table
17. Create `invoice_timeline` table
18. Create `user_settings` table
19. Create `autopay_setups` table
20. Create indexes
21. Create functions and triggers
22. Set up RLS policies

---

## Notes

- All monetary amounts use `decimal(12,2)` for precision
- All timestamps use `timestamp` (with timezone in Supabase)
- Use `uuid` for all primary keys for better security and scalability
- Foreign keys use `ON DELETE CASCADE` where appropriate
- Consider adding soft deletes with `deleted_at` timestamp if needed
- Add indexes on frequently queried columns
- Use `jsonb` for flexible metadata storage
- Implement proper backup and archiving strategy
