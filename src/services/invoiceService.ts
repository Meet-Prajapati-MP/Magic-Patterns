import { supabaseClient } from '../supabase-client';

export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface InvoiceMilestone {
  description: string;
  percentage: number;
  dueDate: string;
  amount: number;
}

export interface CreateInvoiceData {
  // Client info
  clientId?: string;
  clientName: string;
  clientEmail: string;
  clientAddress?: string;
  clientGstin?: string;
  
  // Invoice details
  invoiceDate: string;
  dueDate?: string;
  paymentType: 'full' | 'milestone' | 'split';
  
  // Financial
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  
  // Items
  items: InvoiceItem[];
  
  // Milestones (for milestone/split payments)
  milestones?: InvoiceMilestone[];
  
  // Notes
  notes?: string;
  
  // Status
  status?: 'draft' | 'sent' | 'viewed' | 'pending' | 'paid' | 'overdue' | 'cancelled';
  isDraft?: boolean;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  seller_id: string;
  buyer_id: string | null;
  client_id: string | null;
  client_name: string;
  client_email: string;
  client_address: string | null;
  client_gstin: string | null;
  invoice_date: string;
  due_date: string | null;
  payment_type: string;
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total_amount: number;
  paid_amount: number;
  status: string;
  notes: string | null;
  public_token: string | null;
  is_draft: boolean;
  created_at: string;
  updated_at: string;
  sent_at: string | null;
  viewed_at: string | null;
  paid_at: string | null;
}

/**
 * Generate unique invoice number
 */
function generateInvoiceNumber(): string {
  const prefix = 'INV';
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Create a new invoice with items and milestones
 */
export async function createInvoice(
  invoiceData: CreateInvoiceData,
  sellerId: string
): Promise<{ success: boolean; invoiceId?: string; error?: string }> {
  try {
    // Get current user if sellerId not provided
    let userId = sellerId;
    if (!userId) {
      const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
      if (userError || !user) {
        console.error('Authentication error:', userError);
        console.error('No user found. User must be authenticated to create invoices.');
        return { success: false, error: 'Not authenticated. Please login first.' };
      }
      userId = user.id;
    }

    if (!userId) {
      return { success: false, error: 'User ID is required to create invoice' };
    }

    console.log('Creating invoice for user:', userId);

    // Generate invoice number
    const invoiceNumber = generateInvoiceNumber();

    // Prepare invoice data
    const invoicePayload = {
      invoice_number: invoiceNumber,
      seller_id: userId,
      buyer_id: null, // Will be set if buyer is known
      client_id: invoiceData.clientId || null,
      client_name: invoiceData.clientName,
      client_email: invoiceData.clientEmail,
      client_address: invoiceData.clientAddress || null,
      client_gstin: invoiceData.clientGstin || null,
      invoice_date: invoiceData.invoiceDate,
      due_date: invoiceData.dueDate || null,
      payment_type: invoiceData.paymentType,
      subtotal: invoiceData.subtotal,
      tax_rate: invoiceData.taxRate,
      tax_amount: invoiceData.taxAmount,
      total_amount: invoiceData.totalAmount,
      paid_amount: 0,
      status: invoiceData.status || (invoiceData.isDraft ? 'draft' : 'sent'),
      notes: invoiceData.notes || null,
      is_draft: invoiceData.isDraft || false,
      sent_at: invoiceData.isDraft ? null : new Date().toISOString()
    };

    // Insert invoice
    console.log('Inserting invoice payload:', invoicePayload);
    console.log('Current auth user:', await supabaseClient.auth.getUser());
    
    const { data: invoice, error: invoiceError } = await supabaseClient
      .from('invoices')
      .insert(invoicePayload)
      .select()
      .single();

    if (invoiceError) {
      console.error('❌ ERROR CREATING INVOICE:', invoiceError);
      console.error('Error code:', invoiceError.code);
      console.error('Error message:', invoiceError.message);
      console.error('Error details:', invoiceError.details);
      console.error('Error hint:', invoiceError.hint);
      console.error('Full error object:', JSON.stringify(invoiceError, null, 2));
      
      // Check if it's an RLS policy error
      if (invoiceError.code === '42501' || 
          invoiceError.message?.includes('policy') || 
          invoiceError.message?.includes('permission') ||
          invoiceError.message?.includes('row-level security') ||
          invoiceError.message?.includes('RLS')) {
        return { 
          success: false, 
          error: `RLS Policy Error: ${invoiceError.message}. Run 'supabase_disable_rls_dev.sql' to disable RLS for development, or ensure you are authenticated.` 
        };
      }
      
      // Check if it's a foreign key constraint error
      if (invoiceError.code === '23503') {
        return {
          success: false,
          error: `Foreign key error: ${invoiceError.message}. The seller_id might not exist in auth.users table.`
        };
      }
      
      // Check if it's a NOT NULL constraint error
      if (invoiceError.code === '23502') {
        return {
          success: false,
          error: `Required field missing: ${invoiceError.message}. Check that all required fields are provided.`
        };
      }
      
      return { 
        success: false, 
        error: `Database error (${invoiceError.code}): ${invoiceError.message || 'Failed to create invoice'}` 
      };
    }

    console.log('Invoice created successfully:', invoice);

    const invoiceId = invoice.id;

    // Insert invoice items
    if (invoiceData.items && invoiceData.items.length > 0) {
      const itemsPayload = invoiceData.items.map((item, index) => ({
        invoice_id: invoiceId,
        description: item.description,
        quantity: item.quantity,
        rate: item.rate,
        amount: item.amount,
        sort_order: index
      }));

      const { error: itemsError } = await supabaseClient
        .from('invoice_items')
        .insert(itemsPayload);

      if (itemsError) {
        console.error('Error creating invoice items:', itemsError);
        // Don't fail the whole operation, but log it
      }
    }

    // Insert milestones if payment type is milestone or split
    if ((invoiceData.paymentType === 'milestone' || invoiceData.paymentType === 'split') 
        && invoiceData.milestones && invoiceData.milestones.length > 0) {
      const milestonesPayload = invoiceData.milestones.map((milestone, index) => ({
        invoice_id: invoiceId,
        description: milestone.description,
        percentage: milestone.percentage,
        due_date: milestone.dueDate,
        amount: milestone.amount,
        paid_amount: 0,
        status: 'pending',
        sort_order: index
      }));

      const { error: milestonesError } = await supabaseClient
        .from('invoice_milestones')
        .insert(milestonesPayload);

      if (milestonesError) {
        console.error('Error creating invoice milestones:', milestonesError);
        // Don't fail the whole operation, but log it
      }
    }

    return { success: true, invoiceId };
  } catch (error: any) {
    console.error('Error in createInvoice:', error);
    return { success: false, error: error.message || 'Failed to create invoice' };
  }
}

/**
 * Get invoices for current user (seller)
 */
export async function getSellerInvoices(
  sellerId?: string
): Promise<{ data: Invoice[] | null; error: string | null }> {
  try {
    let userId = sellerId;
    if (!userId) {
      const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
      if (userError || !user) {
        console.warn('No authenticated user. Trying to fetch all invoices (RLS must be disabled).');
        // If RLS is disabled, we can fetch all invoices
        // Otherwise, this will fail and return empty array
        const { data, error } = await supabaseClient
          .from('invoices')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching invoices (no auth):', error);
          // If it's an RLS error, return empty array instead of error
          if (error.code === '42501' || error.message?.includes('policy') || error.message?.includes('permission')) {
            console.warn('RLS is enabled. Invoices cannot be fetched without authentication.');
            return { data: [], error: null }; // Return empty array, not error
          }
          return { data: null, error: error.message };
        }
        
        return { data: (data as Invoice[]) || [], error: null };
      }
      userId = user.id;
    }

    console.log('Fetching invoices for user:', userId);
    const { data, error } = await supabaseClient
      .from('invoices')
      .select('*')
      .eq('seller_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Error fetching invoices:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      // If RLS error, return empty array instead of error
      if (error.code === '42501' || error.message?.includes('policy') || error.message?.includes('permission')) {
        console.warn('RLS policy error. Returning empty array.');
        return { data: [], error: null };
      }
      
      return { data: null, error: error.message };
    }

    console.log('✅ Fetched invoices:', data?.length || 0, 'invoices');
    return { data: (data as Invoice[]) || [], error: null };
  } catch (error: any) {
    console.error('❌ Error in getSellerInvoices:', error);
    return { data: [], error: null }; // Return empty array instead of error
  }
}

/**
 * Get invoices for buyer
 */
export async function getBuyerInvoices(
  buyerId?: string
): Promise<{ data: Invoice[] | null; error: string | null }> {
  try {
    let userId = buyerId;
    if (!userId) {
      const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
      if (userError || !user) {
        console.warn('No authenticated user. Trying to fetch all invoices (RLS must be disabled).');
        // If RLS is disabled, we can fetch all invoices
        // Otherwise, this will fail and return empty array
        const { data, error } = await supabaseClient
          .from('invoices')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching invoices (no auth):', error);
          // If it's an RLS error, return empty array instead of error
          if (error.code === '42501' || error.message?.includes('policy') || error.message?.includes('permission')) {
            console.warn('RLS is enabled. Invoices cannot be fetched without authentication.');
            return { data: [], error: null }; // Return empty array, not error
          }
          return { data: null, error: error.message };
        }
        
        return { data: (data as Invoice[]) || [], error: null };
      }
      userId = user.id;
    }

    console.log('Fetching buyer invoices for user:', userId);
    const { data, error } = await supabaseClient
      .from('invoices')
      .select('*')
      .eq('buyer_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Error fetching buyer invoices:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      // If RLS error, return empty array instead of error
      if (error.code === '42501' || error.message?.includes('policy') || error.message?.includes('permission')) {
        console.warn('RLS policy error. Returning empty array.');
        return { data: [], error: null };
      }
      
      return { data: null, error: error.message };
    }

    console.log('✅ Fetched buyer invoices:', data?.length || 0, 'invoices');
    return { data: (data as Invoice[]) || [], error: null };
  } catch (error: any) {
    console.error('❌ Error in getBuyerInvoices:', error);
    return { data: [], error: null }; // Return empty array instead of error
  }
}

/**
 * Get invoice by ID with items and milestones
 */
export async function getInvoiceById(
  invoiceId: string
): Promise<{ data: any | null; error: string | null }> {
  try {
    // Get invoice
    const { data: invoice, error: invoiceError } = await supabaseClient
      .from('invoices')
      .select('*')
      .eq('id', invoiceId)
      .single();

    if (invoiceError) {
      return { data: null, error: invoiceError.message };
    }

    // Get invoice items
    const { data: items, error: itemsError } = await supabaseClient
      .from('invoice_items')
      .select('*')
      .eq('invoice_id', invoiceId)
      .order('sort_order', { ascending: true });

    if (itemsError) {
      console.error('Error fetching invoice items:', itemsError);
    }

    // Get milestones if any
    const { data: milestones } = await supabaseClient
      .from('invoice_milestones')
      .select('*')
      .eq('invoice_id', invoiceId)
      .order('sort_order', { ascending: true });

    return {
      data: {
        ...invoice,
        items: items || [],
        milestones: milestones || []
      },
      error: null
    };
  } catch (error: any) {
    console.error('Error in getInvoiceById:', error);
    return { data: null, error: error.message || 'Failed to fetch invoice' };
  }
}

/**
 * Format amount for display
 */
export function formatAmount(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}
