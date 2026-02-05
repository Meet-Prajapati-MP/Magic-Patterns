-- ============================================
-- FIX ALL SECURITY & PERFORMANCE ISSUES
-- ============================================
-- Run this in Supabase SQL Editor to fix all 8 issues

-- ============================================
-- PART 0: FIX pg_trgm EXTENSION SECURITY ISSUE
-- Move extension from public schema to dedicated schema
-- ============================================

-- Step 1: Create a dedicated schema for extensions
CREATE SCHEMA IF NOT EXISTS extensions;

-- Step 2: Move pg_trgm extension to extensions schema (if it exists)
-- This moves all extension objects atomically without dropping
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM pg_extension 
        WHERE extname = 'pg_trgm' 
        AND extnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
    ) THEN
        ALTER EXTENSION pg_trgm SET SCHEMA extensions;
    END IF;
END $$;

-- Step 3: Grant permissions to authenticated users
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA extensions TO authenticated;

-- Step 4: Add extensions to search_path for authenticated role
-- This allows implicit resolution of pg_trgm functions
ALTER ROLE authenticated SET search_path = public, extensions;

-- ============================================
-- PART 1: FIX SECURITY ISSUES (6 issues)
-- Fix functions with mutable search_path
-- ============================================

-- Fix update_updated_at_column function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- Fix generate_invoice_number function
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;

-- Fix generate_transaction_number function
CREATE OR REPLACE FUNCTION generate_transaction_number()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;

-- Fix generate_ticket_number function
CREATE OR REPLACE FUNCTION generate_ticket_number()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;

-- Fix generate_kyc_application_number function
CREATE OR REPLACE FUNCTION generate_kyc_application_number()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;

-- ============================================
-- PART 2: FIX PERFORMANCE ISSUES (2 issues)
-- Fix multiple permissive policies on invoice_items and invoice_milestones
-- ============================================

-- Drop existing policies for invoice_items (drop all possible policy names)
DROP POLICY IF EXISTS "Invoice items: access via invoice" ON invoice_items;
DROP POLICY IF EXISTS "Invoice items: seller modify" ON invoice_items;
DROP POLICY IF EXISTS "Invoice items: read via invoice" ON invoice_items;
DROP POLICY IF EXISTS "Invoice items: seller insert" ON invoice_items;
DROP POLICY IF EXISTS "Invoice items: seller update" ON invoice_items;
DROP POLICY IF EXISTS "Invoice items: seller delete" ON invoice_items;

-- Create SINGLE SELECT policy for invoice_items (covers both seller and buyer)
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

-- Create separate policies for INSERT, UPDATE, DELETE (seller only)
CREATE POLICY "Invoice items: seller insert"
ON invoice_items
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM invoices i
    WHERE i.id = invoice_items.invoice_id
      AND i.seller_id = (SELECT auth.uid())
  )
);

CREATE POLICY "Invoice items: seller update"
ON invoice_items
FOR UPDATE
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

CREATE POLICY "Invoice items: seller delete"
ON invoice_items
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM invoices i
    WHERE i.id = invoice_items.invoice_id
      AND i.seller_id = (SELECT auth.uid())
  )
);

-- Drop existing policies for invoice_milestones (drop all possible policy names)
DROP POLICY IF EXISTS "Milestones: access via invoice" ON invoice_milestones;
DROP POLICY IF EXISTS "Milestones: seller modify" ON invoice_milestones;
DROP POLICY IF EXISTS "Milestones: read via invoice" ON invoice_milestones;
DROP POLICY IF EXISTS "Milestones: seller insert" ON invoice_milestones;
DROP POLICY IF EXISTS "Milestones: seller update" ON invoice_milestones;
DROP POLICY IF EXISTS "Milestones: seller delete" ON invoice_milestones;

-- Create SINGLE SELECT policy for invoice_milestones (covers both seller and buyer)
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

-- Create separate policies for INSERT, UPDATE, DELETE (seller only)
CREATE POLICY "Milestones: seller insert"
ON invoice_milestones
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM invoices i
    WHERE i.id = invoice_milestones.invoice_id
      AND i.seller_id = (SELECT auth.uid())
  )
);

CREATE POLICY "Milestones: seller update"
ON invoice_milestones
FOR UPDATE
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

CREATE POLICY "Milestones: seller delete"
ON invoice_milestones
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM invoices i
    WHERE i.id = invoice_milestones.invoice_id
      AND i.seller_id = (SELECT auth.uid())
  )
);
