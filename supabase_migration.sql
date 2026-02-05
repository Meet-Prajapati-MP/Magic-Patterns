-- Trustopay Database Schema Migration
-- Run this in Supabase SQL Editor

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto"; -- for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pg_trgm";  -- optional: fast search

-- ============================================
-- 1. PROFILES TABLE (App user profile linked to Supabase Auth)
-- ============================================
-- Supabase already provides auth.users. Store app-specific fields in public.profiles.
CREATE TABLE IF NOT EXISTS profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    phone varchar(15) UNIQUE,
    name varchar(255),
    email varchar(255) UNIQUE,
    account_type varchar(20) NOT NULL DEFAULT 'individual' CHECK (account_type IN ('individual', 'business')),
    pan varchar(10),
    business_name varchar(255),
    business_logo text,
    gst varchar(15),
    business_address text,
    company_docs text[],
    is_verified boolean DEFAULT false,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    last_login timestamptz
);

CREATE INDEX IF NOT EXISTS idx_profiles_phone ON profiles(phone);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_account_type ON profiles(account_type);

-- Auto-create a profile row when a new auth user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, phone, name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.phone,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name', '')
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 2. CLIENTS TABLE
-- ============================================
CREATE TABLE clients (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    company_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    phone varchar(15) NOT NULL,
    address text,
    gstin varchar(15),
    notes text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_clients_seller_id ON clients(seller_id);
CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_clients_phone ON clients(phone);

-- ============================================
-- 3. INVOICES TABLE
-- ============================================
CREATE TABLE invoices (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_number varchar(50) UNIQUE NOT NULL,
    seller_id uuid NOT NULL REFERENCES auth.users(id),
    buyer_id uuid REFERENCES auth.users(id),
    client_id uuid REFERENCES clients(id),
    client_name varchar(255) NOT NULL,
    client_email varchar(255) NOT NULL,
    client_address text,
    client_gstin varchar(15),
    invoice_date date NOT NULL,
    due_date date,
    payment_type varchar(20) NOT NULL CHECK (payment_type IN ('full', 'milestone', 'split')),
    subtotal decimal(12,2) NOT NULL DEFAULT 0,
    tax_rate decimal(5,2) DEFAULT 0,
    tax_amount decimal(12,2) DEFAULT 0,
    total_amount decimal(12,2) NOT NULL,
    paid_amount decimal(12,2) DEFAULT 0,
    status varchar(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'viewed', 'pending', 'paid', 'overdue', 'cancelled')),
    notes text,
    public_token varchar(100) UNIQUE,
    is_draft boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    sent_at timestamptz,
    viewed_at timestamptz,
    paid_at timestamptz
);

CREATE INDEX idx_invoices_seller_id ON invoices(seller_id);
CREATE INDEX idx_invoices_buyer_id ON invoices(buyer_id);
CREATE INDEX idx_invoices_client_id ON invoices(client_id);
CREATE INDEX idx_invoices_invoice_number ON invoices(invoice_number);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_public_token ON invoices(public_token);

-- ============================================
-- 4. INVOICE ITEMS TABLE
-- ============================================
CREATE TABLE invoice_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id uuid NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    description text NOT NULL,
    quantity decimal(10,2) NOT NULL DEFAULT 1,
    rate decimal(12,2) NOT NULL,
    amount decimal(12,2) NOT NULL,
    sort_order integer DEFAULT 0,
    created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_invoice_items_invoice_id ON invoice_items(invoice_id);

-- ============================================
-- 5. INVOICE MILESTONES TABLE
-- ============================================
CREATE TABLE invoice_milestones (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id uuid NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    description varchar(255) NOT NULL,
    percentage decimal(5,2) NOT NULL,
    due_date date NOT NULL,
    amount decimal(12,2) NOT NULL,
    paid_amount decimal(12,2) DEFAULT 0,
    status varchar(20) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue')),
    sort_order integer DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_invoice_milestones_invoice_id ON invoice_milestones(invoice_id);
CREATE INDEX idx_invoice_milestones_status ON invoice_milestones(status);

-- ============================================
-- 6. TRANSACTIONS TABLE
-- ============================================
CREATE TABLE transactions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_number varchar(50) UNIQUE NOT NULL,
    invoice_id uuid REFERENCES invoices(id),
    milestone_id uuid REFERENCES invoice_milestones(id),
    user_id uuid NOT NULL REFERENCES auth.users(id),
    type varchar(20) NOT NULL CHECK (type IN ('payment', 'refund', 'payout', 'chargeback')),
    direction varchar(10) NOT NULL CHECK (direction IN ('credit', 'debit')),
    amount decimal(12,2) NOT NULL,
    payment_method varchar(50),
    payment_gateway varchar(50),
    gateway_transaction_id varchar(255),
    status varchar(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed', 'cancelled', 'refunded')),
    failure_reason text,
    metadata jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    completed_at timestamptz
);

CREATE INDEX idx_transactions_invoice_id ON transactions(invoice_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_transaction_number ON transactions(transaction_number);

-- ============================================
-- 7. DISPUTES TABLE
-- ============================================
CREATE TABLE disputes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_number varchar(50) UNIQUE NOT NULL,
    user_id uuid NOT NULL REFERENCES auth.users(id),
    invoice_id uuid REFERENCES invoices(id),
    transaction_id uuid REFERENCES transactions(id),
    subject varchar(255) NOT NULL,
    type varchar(50) NOT NULL,
    status varchar(20) NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
    priority varchar(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    description text,
    resolution text,
    resolved_by uuid REFERENCES auth.users(id),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    resolved_at timestamptz
);

CREATE INDEX idx_disputes_user_id ON disputes(user_id);
CREATE INDEX idx_disputes_invoice_id ON disputes(invoice_id);
CREATE INDEX idx_disputes_status ON disputes(status);
CREATE INDEX idx_disputes_ticket_number ON disputes(ticket_number);

-- ============================================
-- 8. DISPUTE MESSAGES TABLE
-- ============================================
CREATE TABLE dispute_messages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    dispute_id uuid NOT NULL REFERENCES disputes(id) ON DELETE CASCADE,
    sender_id uuid NOT NULL REFERENCES auth.users(id),
    sender_type varchar(20) NOT NULL CHECK (sender_type IN ('user', 'support', 'admin')),
    message text NOT NULL,
    attachments text[],
    is_internal boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_dispute_messages_dispute_id ON dispute_messages(dispute_id);
CREATE INDEX idx_dispute_messages_sender_id ON dispute_messages(sender_id);

-- ============================================
-- 9. SUBSCRIPTIONS TABLE
-- ============================================
CREATE TABLE subscriptions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id),
    plan_name varchar(50) NOT NULL,
    plan_type varchar(20) NOT NULL CHECK (plan_type IN ('monthly', 'yearly')),
    amount decimal(10,2) NOT NULL,
    status varchar(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired', 'trial')),
    start_date date NOT NULL,
    end_date date,
    renewal_date date,
    auto_renew boolean DEFAULT true,
    trial_end_date date,
    cancelled_at timestamptz,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- ============================================
-- 10. KYC APPLICATIONS TABLE
-- ============================================
CREATE TABLE kyc_applications (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    application_number varchar(50) UNIQUE NOT NULL,
    user_id uuid NOT NULL REFERENCES auth.users(id),
    role varchar(20) NOT NULL CHECK (role IN ('seller', 'buyer')),
    business_name varchar(255),
    status varchar(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected', 'info_requested')),
    documents jsonb NOT NULL,
    review_notes text,
    reviewed_by uuid REFERENCES auth.users(id),
    submitted_at timestamptz DEFAULT now(),
    reviewed_at timestamptz,
    updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_kyc_applications_user_id ON kyc_applications(user_id);
CREATE INDEX idx_kyc_applications_status ON kyc_applications(status);
CREATE INDEX idx_kyc_applications_application_number ON kyc_applications(application_number);

-- ============================================
-- 11. FINANCING REQUESTS TABLE
-- ============================================
CREATE TABLE financing_requests (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id uuid NOT NULL REFERENCES invoices(id),
    seller_id uuid NOT NULL REFERENCES auth.users(id),
    advance_percentage decimal(5,2) NOT NULL,
    advance_amount decimal(12,2) NOT NULL,
    fee_percentage decimal(5,2) NOT NULL,
    fee_amount decimal(12,2) NOT NULL,
    net_amount decimal(12,2) NOT NULL,
    status varchar(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'disbursed', 'repaid', 'defaulted')),
    documents jsonb,
    review_notes text,
    reviewed_by uuid REFERENCES auth.users(id),
    disbursed_at timestamptz,
    repayment_date date,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_financing_requests_invoice_id ON financing_requests(invoice_id);
CREATE INDEX idx_financing_requests_seller_id ON financing_requests(seller_id);
CREATE INDEX idx_financing_requests_status ON financing_requests(status);

-- ============================================
-- 12. EMI PLANS TABLE
-- ============================================
CREATE TABLE emi_plans (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id uuid NOT NULL REFERENCES invoices(id),
    buyer_id uuid NOT NULL REFERENCES auth.users(id),
    total_amount decimal(12,2) NOT NULL,
    number_of_installments integer NOT NULL,
    installment_amount decimal(12,2) NOT NULL,
    status varchar(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'defaulted', 'cancelled')),
    start_date date NOT NULL,
    next_due_date date,
    completed_at timestamptz,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_emi_plans_invoice_id ON emi_plans(invoice_id);
CREATE INDEX idx_emi_plans_buyer_id ON emi_plans(buyer_id);
CREATE INDEX idx_emi_plans_status ON emi_plans(status);

-- ============================================
-- 13. EMI INSTALLMENTS TABLE
-- ============================================
CREATE TABLE emi_installments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    emi_plan_id uuid NOT NULL REFERENCES emi_plans(id) ON DELETE CASCADE,
    installment_number integer NOT NULL,
    amount decimal(12,2) NOT NULL,
    due_date date NOT NULL,
    paid_amount decimal(12,2) DEFAULT 0,
    status varchar(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'failed')),
    transaction_id uuid REFERENCES transactions(id),
    paid_at timestamptz,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_emi_installments_emi_plan_id ON emi_installments(emi_plan_id);
CREATE INDEX idx_emi_installments_status ON emi_installments(status);
CREATE INDEX idx_emi_installments_due_date ON emi_installments(due_date);

-- ============================================
-- 14. PAYOUTS TABLE
-- ============================================
CREATE TABLE payouts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id uuid NOT NULL REFERENCES auth.users(id),
    amount decimal(12,2) NOT NULL,
    bank_account_number varchar(50),
    ifsc_code varchar(11),
    account_holder_name varchar(255),
    status varchar(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
    failure_reason text,
    transaction_id uuid REFERENCES transactions(id),
    initiated_at timestamptz DEFAULT now(),
    completed_at timestamptz,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_payouts_seller_id ON payouts(seller_id);
CREATE INDEX idx_payouts_status ON payouts(status);

-- ============================================
-- 15. NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE notifications (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id),
    type varchar(50) NOT NULL,
    title varchar(255) NOT NULL,
    message text NOT NULL,
    related_invoice_id uuid REFERENCES invoices(id),
    related_transaction_id uuid REFERENCES transactions(id),
    is_read boolean DEFAULT false,
    read_at timestamptz,
    created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);

-- ============================================
-- 16. AUDIT LOGS TABLE
-- ============================================
CREATE TABLE audit_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id),
    action varchar(100) NOT NULL,
    entity_type varchar(50),
    entity_id uuid,
    details jsonb,
    ip_address varchar(45),
    user_agent text,
    created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity_type ON audit_logs(entity_type);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- ============================================
-- 17. PARTNERS TABLE
-- ============================================
CREATE TABLE partners (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name varchar(255) NOT NULL,
    type varchar(50) NOT NULL,
    contact_email varchar(255),
    contact_phone varchar(15),
    is_active boolean DEFAULT true,
    metadata jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_partners_type ON partners(type);
CREATE INDEX idx_partners_is_active ON partners(is_active);

-- ============================================
-- 18. INVOICE TIMELINE TABLE
-- ============================================
CREATE TABLE invoice_timeline (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id uuid NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    event_type varchar(50) NOT NULL,
    description text,
    metadata jsonb,
    created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_invoice_timeline_invoice_id ON invoice_timeline(invoice_id);
CREATE INDEX idx_invoice_timeline_created_at ON invoice_timeline(created_at);

-- ============================================
-- 19. USER SETTINGS TABLE
-- ============================================
CREATE TABLE user_settings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    email_notifications boolean DEFAULT true,
    whatsapp_notifications boolean DEFAULT false,
    invoice_template jsonb,
    payment_reminder_settings jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_user_settings_user_id ON user_settings(user_id);

-- ============================================
-- 20. AUTOPAY SETUPS TABLE
-- ============================================
CREATE TABLE autopay_setups (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    buyer_id uuid NOT NULL REFERENCES auth.users(id),
    method varchar(20) NOT NULL CHECK (method IN ('upi', 'enach')),
    upi_id varchar(255),
    account_number varchar(50),
    ifsc_code varchar(11),
    account_holder_name varchar(255),
    max_amount decimal(12,2) NOT NULL,
    frequency varchar(20) NOT NULL,
    start_date date NOT NULL,
    status varchar(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'cancelled')),
    mandate_id varchar(255),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_autopay_setups_buyer_id ON autopay_setups(buyer_id);
CREATE INDEX idx_autopay_setups_status ON autopay_setups(status);

-- ============================================
-- TRIGGERS: Auto-update updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_invoice_milestones_updated_at BEFORE UPDATE ON invoice_milestones FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_disputes_updated_at BEFORE UPDATE ON disputes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_kyc_applications_updated_at BEFORE UPDATE ON kyc_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_financing_requests_updated_at BEFORE UPDATE ON financing_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_emi_plans_updated_at BEFORE UPDATE ON emi_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_emi_installments_updated_at BEFORE UPDATE ON emi_installments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payouts_updated_at BEFORE UPDATE ON payouts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_partners_updated_at BEFORE UPDATE ON partners FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON user_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_autopay_setups_updated_at BEFORE UPDATE ON autopay_setups FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- FUNCTIONS: Generate Invoice Number
-- ============================================
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TRIGGER AS $$
DECLARE
    last_number integer;
    new_number varchar(50);
BEGIN
    -- Postgres regex is POSIX; use [0-9] (not \d)
    SELECT COALESCE(MAX(CAST(SUBSTRING(invoice_number FROM 'INV-([0-9]+)') AS INTEGER)), 0) INTO last_number
    FROM invoices
    WHERE invoice_number ~ '^INV-[0-9]+$';
    
    new_number := 'INV-' || LPAD((last_number + 1)::text, 6, '0');
    NEW.invoice_number := new_number;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_invoice_number BEFORE INSERT ON invoices
FOR EACH ROW
WHEN (NEW.invoice_number IS NULL OR NEW.invoice_number = '')
EXECUTE FUNCTION generate_invoice_number();

-- ============================================
-- FUNCTIONS: Generate Transaction Number
-- ============================================
CREATE OR REPLACE FUNCTION generate_transaction_number()
RETURNS TRIGGER AS $$
DECLARE
    last_number integer;
    new_number varchar(50);
BEGIN
    -- Postgres regex is POSIX; use [0-9] (not \d)
    SELECT COALESCE(MAX(CAST(SUBSTRING(transaction_number FROM 'TXN([0-9]+)') AS INTEGER)), 0) INTO last_number
    FROM transactions
    WHERE transaction_number ~ '^TXN[0-9]+$';
    
    new_number := 'TXN' || LPAD((last_number + 1)::text, 6, '0');
    NEW.transaction_number := new_number;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_transaction_number BEFORE INSERT ON transactions
FOR EACH ROW
WHEN (NEW.transaction_number IS NULL OR NEW.transaction_number = '')
EXECUTE FUNCTION generate_transaction_number();

-- ============================================
-- FUNCTIONS: Generate Ticket Number
-- ============================================
CREATE OR REPLACE FUNCTION generate_ticket_number()
RETURNS TRIGGER AS $$
DECLARE
    year_part varchar(4);
    last_number integer;
    new_number varchar(50);
BEGIN
    year_part := TO_CHAR(NOW(), 'YYYY');
    -- Postgres regex is POSIX; use [0-9] (not \d)
    SELECT COALESCE(MAX(CAST(SUBSTRING(ticket_number FROM 'TKT-' || year_part || '-([0-9]+)') AS INTEGER)), 0) INTO last_number
    FROM disputes
    WHERE ticket_number LIKE 'TKT-' || year_part || '-%';
    
    new_number := 'TKT-' || year_part || '-' || LPAD((last_number + 1)::text, 3, '0');
    NEW.ticket_number := new_number;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_ticket_number BEFORE INSERT ON disputes
FOR EACH ROW
WHEN (NEW.ticket_number IS NULL OR NEW.ticket_number = '')
EXECUTE FUNCTION generate_ticket_number();

-- ============================================
-- FUNCTIONS: Generate KYC Application Number
-- ============================================
CREATE OR REPLACE FUNCTION generate_kyc_application_number()
RETURNS TRIGGER AS $$
DECLARE
    last_number integer;
    new_number varchar(50);
BEGIN
    -- Postgres regex is POSIX; use [0-9] (not \d)
    SELECT COALESCE(MAX(CAST(SUBSTRING(application_number FROM 'KYC-([0-9]+)') AS INTEGER)), 0) INTO last_number
    FROM kyc_applications
    WHERE application_number ~ '^KYC-[0-9]+$';
    
    new_number := 'KYC-' || LPAD((last_number + 1)::text, 3, '0');
    NEW.application_number := new_number;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_kyc_application_number BEFORE INSERT ON kyc_applications
FOR EACH ROW
WHEN (NEW.application_number IS NULL OR NEW.application_number = '')
EXECUTE FUNCTION generate_kyc_application_number();

-- ============================================
-- ROW LEVEL SECURITY (RLS) - Enable RLS
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE dispute_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE kyc_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE financing_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE emi_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE emi_installments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE autopay_setups ENABLE ROW LEVEL SECURITY;

-- ============================================
-- GRANTS (authenticated users can access tables; RLS still applies)
-- ============================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;

-- ============================================
-- RLS POLICIES (starter policies using auth.uid())
-- ============================================

-- profiles: owner can read/update their profile
DROP POLICY IF EXISTS "Profiles: read own" ON profiles;
CREATE POLICY "Profiles: read own"
ON profiles
FOR SELECT
TO authenticated
USING (id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Profiles: update own" ON profiles;
CREATE POLICY "Profiles: update own"
ON profiles
FOR UPDATE
TO authenticated
USING (id = (SELECT auth.uid()))
WITH CHECK (id = (SELECT auth.uid()));

-- clients: seller can CRUD own clients
DROP POLICY IF EXISTS "Clients: seller CRUD" ON clients;
CREATE POLICY "Clients: seller CRUD"
ON clients
FOR ALL
TO authenticated
USING (seller_id = (SELECT auth.uid()))
WITH CHECK (seller_id = (SELECT auth.uid()));

-- invoices: seller can CRUD own invoices; buyer can read invoices assigned to them
DROP POLICY IF EXISTS "Invoices: seller CRUD" ON invoices;
CREATE POLICY "Invoices: seller CRUD"
ON invoices
FOR ALL
TO authenticated
USING (seller_id = (SELECT auth.uid()))
WITH CHECK (seller_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Invoices: buyer read" ON invoices;
CREATE POLICY "Invoices: buyer read"
ON invoices
FOR SELECT
TO authenticated
USING (buyer_id = (SELECT auth.uid()));

-- invoice_items: access via invoice; only seller can modify
DROP POLICY IF EXISTS "Invoice items: read via invoice" ON invoice_items;
CREATE POLICY "Invoice items: read via invoice"
ON invoice_items
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM invoices i
    WHERE i.id = invoice_items.invoice_id
      AND (i.seller_id = (SELECT auth.uid()) OR i.buyer_id = (SELECT auth.uid()))
  )
);

DROP POLICY IF EXISTS "Invoice items: seller modify via invoice" ON invoice_items;
CREATE POLICY "Invoice items: seller modify via invoice"
ON invoice_items
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM invoices i
    WHERE i.id = invoice_items.invoice_id
      AND i.seller_id = (SELECT auth.uid())
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM invoices i
    WHERE i.id = invoice_items.invoice_id
      AND i.seller_id = (SELECT auth.uid())
  )
);

-- invoice_milestones: access via invoice; only seller can modify
DROP POLICY IF EXISTS "Milestones: read via invoice" ON invoice_milestones;
CREATE POLICY "Milestones: read via invoice"
ON invoice_milestones
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM invoices i
    WHERE i.id = invoice_milestones.invoice_id
      AND (i.seller_id = (SELECT auth.uid()) OR i.buyer_id = (SELECT auth.uid()))
  )
);

DROP POLICY IF EXISTS "Milestones: seller modify via invoice" ON invoice_milestones;
CREATE POLICY "Milestones: seller modify via invoice"
ON invoice_milestones
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM invoices i
    WHERE i.id = invoice_milestones.invoice_id
      AND i.seller_id = (SELECT auth.uid())
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM invoices i
    WHERE i.id = invoice_milestones.invoice_id
      AND i.seller_id = (SELECT auth.uid())
  )
);

-- transactions: user can read their own; sellers/buyers can read transactions tied to their invoices
DROP POLICY IF EXISTS "Transactions: read own or via invoice" ON transactions;
CREATE POLICY "Transactions: read own or via invoice"
ON transactions
FOR SELECT
TO authenticated
USING (
  user_id = (SELECT auth.uid())
  OR EXISTS (
    SELECT 1
    FROM invoices i
    WHERE i.id = transactions.invoice_id
      AND (i.seller_id = (SELECT auth.uid()) OR i.buyer_id = (SELECT auth.uid()))
  )
);

DROP POLICY IF EXISTS "Transactions: insert own" ON transactions;
CREATE POLICY "Transactions: insert own"
ON transactions
FOR INSERT
TO authenticated
WITH CHECK (user_id = (SELECT auth.uid()));

-- disputes: user can CRUD own disputes
DROP POLICY IF EXISTS "Disputes: user CRUD" ON disputes;
CREATE POLICY "Disputes: user CRUD"
ON disputes
FOR ALL
TO authenticated
USING (user_id = (SELECT auth.uid()))
WITH CHECK (user_id = (SELECT auth.uid()));

-- dispute_messages: participant can read; sender can write
DROP POLICY IF EXISTS "Dispute messages: read via dispute" ON dispute_messages;
CREATE POLICY "Dispute messages: read via dispute"
ON dispute_messages
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM disputes d
    WHERE d.id = dispute_messages.dispute_id
      AND d.user_id = (SELECT auth.uid())
  )
);

DROP POLICY IF EXISTS "Dispute messages: sender insert" ON dispute_messages;
CREATE POLICY "Dispute messages: sender insert"
ON dispute_messages
FOR INSERT
TO authenticated
WITH CHECK (
  sender_id = (SELECT auth.uid())
  AND EXISTS (
    SELECT 1
    FROM disputes d
    WHERE d.id = dispute_messages.dispute_id
      AND d.user_id = (SELECT auth.uid())
  )
);

-- subscriptions
DROP POLICY IF EXISTS "Subscriptions: user read" ON subscriptions;
CREATE POLICY "Subscriptions: user read"
ON subscriptions
FOR SELECT
TO authenticated
USING (user_id = (SELECT auth.uid()));

-- kyc_applications
DROP POLICY IF EXISTS "KYC: user CRUD" ON kyc_applications;
CREATE POLICY "KYC: user CRUD"
ON kyc_applications
FOR ALL
TO authenticated
USING (user_id = (SELECT auth.uid()))
WITH CHECK (user_id = (SELECT auth.uid()));

-- financing_requests
DROP POLICY IF EXISTS "Financing: seller CRUD" ON financing_requests;
CREATE POLICY "Financing: seller CRUD"
ON financing_requests
FOR ALL
TO authenticated
USING (seller_id = (SELECT auth.uid()))
WITH CHECK (seller_id = (SELECT auth.uid()));

-- emi_plans
DROP POLICY IF EXISTS "EMI plans: buyer read" ON emi_plans;
CREATE POLICY "EMI plans: buyer read"
ON emi_plans
FOR SELECT
TO authenticated
USING (buyer_id = (SELECT auth.uid()));

-- emi_installments: access via emi_plan
DROP POLICY IF EXISTS "EMI installments: read via plan" ON emi_installments;
CREATE POLICY "EMI installments: read via plan"
ON emi_installments
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM emi_plans p
    WHERE p.id = emi_installments.emi_plan_id
      AND p.buyer_id = (SELECT auth.uid())
  )
);

-- payouts
DROP POLICY IF EXISTS "Payouts: seller read" ON payouts;
CREATE POLICY "Payouts: seller read"
ON payouts
FOR SELECT
TO authenticated
USING (seller_id = (SELECT auth.uid()));

-- notifications
DROP POLICY IF EXISTS "Notifications: user read" ON notifications;
CREATE POLICY "Notifications: user read"
ON notifications
FOR SELECT
TO authenticated
USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Notifications: user update read" ON notifications;
CREATE POLICY "Notifications: user update read"
ON notifications
FOR UPDATE
TO authenticated
USING (user_id = (SELECT auth.uid()))
WITH CHECK (user_id = (SELECT auth.uid()));

-- user_settings
DROP POLICY IF EXISTS "Settings: user CRUD" ON user_settings;
CREATE POLICY "Settings: user CRUD"
ON user_settings
FOR ALL
TO authenticated
USING (user_id = (SELECT auth.uid()))
WITH CHECK (user_id = (SELECT auth.uid()));

-- autopay_setups
DROP POLICY IF EXISTS "Autopay: buyer CRUD" ON autopay_setups;
CREATE POLICY "Autopay: buyer CRUD"
ON autopay_setups
FOR ALL
TO authenticated
USING (buyer_id = (SELECT auth.uid()))
WITH CHECK (buyer_id = (SELECT auth.uid()));