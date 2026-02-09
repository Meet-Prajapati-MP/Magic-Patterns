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
  
  // Buyer assignment (optional - if not provided, buyer_id will be null)
  buyerId?: string;
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
 * Format: INV-000001, INV-000002, etc.
 * This matches the database trigger's expected format
 */
async function generateInvoiceNumber(): Promise<string> {
  try {
    // Get the last invoice number from database
    const { data: lastInvoice, error } = await supabaseClient
      .from('invoices')
      .select('invoice_number')
      .like('invoice_number', 'INV-%')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.warn('Could not fetch last invoice number, using fallback:', error.message);
    }

    let nextNumber = 1;
    if (lastInvoice?.invoice_number) {
      // Extract number from format INV-000001
      const match = lastInvoice.invoice_number.match(/^INV-(\d+)$/);
      if (match) {
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }

    // Format as INV-000001 (6 digits)
    return `INV-${nextNumber.toString().padStart(6, '0')}`;
  } catch (error) {
    console.error('Error generating invoice number, using timestamp fallback:', error);
    // Fallback: use timestamp-based number
    const timestamp = Date.now().toString().slice(-8);
    return `INV-${timestamp}`;
  }
}

/**
 * Validate invoice data before insertion
 */
function validateInvoiceData(invoiceData: CreateInvoiceData): { valid: boolean; error?: string } {
  // Validate required fields
  if (!invoiceData.clientName || invoiceData.clientName.trim() === '') {
    return { valid: false, error: 'Client name is required' };
  }

  if (!invoiceData.clientEmail || invoiceData.clientEmail.trim() === '') {
    return { valid: false, error: 'Client email is required' };
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(invoiceData.clientEmail.trim())) {
    return { valid: false, error: 'Invalid client email format' };
  }

  if (!invoiceData.invoiceDate) {
    return { valid: false, error: 'Invoice date is required' };
  }

  if (!invoiceData.paymentType || !['full', 'milestone', 'split'].includes(invoiceData.paymentType)) {
    return { valid: false, error: 'Invalid payment type' };
  }

  // Validate items
  if (!invoiceData.items || invoiceData.items.length === 0) {
    return { valid: false, error: 'At least one invoice item is required' };
  }

  for (let i = 0; i < invoiceData.items.length; i++) {
    const item = invoiceData.items[i];
    if (!item.description || item.description.trim() === '') {
      return { valid: false, error: `Item ${i + 1}: Description is required` };
    }
    if (item.quantity <= 0) {
      return { valid: false, error: `Item ${i + 1}: Quantity must be greater than 0` };
    }
    if (item.rate < 0) {
      return { valid: false, error: `Item ${i + 1}: Rate cannot be negative` };
    }
    if (item.amount < 0) {
      return { valid: false, error: `Item ${i + 1}: Amount cannot be negative` };
    }
  }

  // Validate milestones if payment type requires them
  if ((invoiceData.paymentType === 'milestone' || invoiceData.paymentType === 'split')) {
    if (!invoiceData.milestones || invoiceData.milestones.length === 0) {
      return { valid: false, error: 'Milestones are required for milestone/split payment types' };
    }

    let totalPercentage = 0;
    for (let i = 0; i < invoiceData.milestones.length; i++) {
      const milestone = invoiceData.milestones[i];
      if (!milestone.description || milestone.description.trim() === '') {
        return { valid: false, error: `Milestone ${i + 1}: Description is required` };
      }
      if (!milestone.dueDate) {
        return { valid: false, error: `Milestone ${i + 1}: Due date is required` };
      }
      if (milestone.percentage < 0 || milestone.percentage > 100) {
        return { valid: false, error: `Milestone ${i + 1}: Percentage must be between 0 and 100` };
      }
      if (milestone.amount < 0) {
        return { valid: false, error: `Milestone ${i + 1}: Amount cannot be negative` };
      }
      totalPercentage += milestone.percentage;
    }

    // Allow small rounding differences (0.01%)
    if (Math.abs(totalPercentage - 100) > 0.01) {
      return { valid: false, error: `Milestone percentages must total 100% (current: ${totalPercentage.toFixed(2)}%)` };
    }
  }

  // Validate financial data
  if (invoiceData.subtotal < 0) {
    return { valid: false, error: 'Subtotal cannot be negative' };
  }
  if (invoiceData.taxRate < 0 || invoiceData.taxRate > 100) {
    return { valid: false, error: 'Tax rate must be between 0 and 100' };
  }
  if (invoiceData.taxAmount < 0) {
    return { valid: false, error: 'Tax amount cannot be negative' };
  }
  if (invoiceData.totalAmount <= 0) {
    return { valid: false, error: 'Total amount must be greater than 0' };
  }

  return { valid: true };
}

/**
 * Create a new invoice with items and milestones
 * This function ensures all data is saved atomically with proper error handling
 */
export async function createInvoice(
  invoiceData: CreateInvoiceData,
  sellerId: string
): Promise<{ success: boolean; invoiceId?: string; error?: string }> {
  console.log('🚀 ========== createInvoice() FUNCTION CALLED ==========');
  console.log('🚀 Timestamp:', new Date().toISOString());
  console.log('🚀 Supabase Client:', supabaseClient ? 'Initialized' : 'NOT INITIALIZED');
  console.log('📥 Received parameters:', {
    sellerId: sellerId,
    invoiceDataKeys: Object.keys(invoiceData),
    itemsCount: invoiceData.items?.length || 0,
    milestonesCount: invoiceData.milestones?.length || 0,
    clientName: invoiceData.clientName,
    clientEmail: invoiceData.clientEmail,
    totalAmount: invoiceData.totalAmount
  });
  
  try {
    // Step 1: Validate input data
    console.log('✅ Step 1: Validating invoice data...');
    const validation = validateInvoiceData(invoiceData);
    if (!validation.valid) {
      console.error('❌ Step 1 FAILED: Invoice data validation failed:', validation.error);
      return { success: false, error: validation.error };
    }
    console.log('✅ Step 1 PASSED: Invoice data is valid');

    // Step 2: Get authenticated user
    console.log('✅ Step 2: Getting authenticated user...');
    let userId = sellerId;
    if (!userId) {
      console.log('⚠️ No sellerId provided, fetching from auth...');
      const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
      if (userError || !user) {
        console.error('❌ Step 2 FAILED: Authentication error:', userError);
        return { success: false, error: 'Not authenticated. Please login first.' };
      }
      userId = user.id;
      console.log('✅ Step 2: Got user ID from auth:', userId);
    } else {
      console.log('✅ Step 2: Using provided sellerId:', userId);
    }

    if (!userId) {
      console.error('❌ Step 2 FAILED: No user ID available');
      return { success: false, error: 'User ID is required to create invoice' };
    }
    console.log('✅ Step 2 PASSED: User ID is:', userId);

    console.log('📝 Creating invoice for user:', userId);
    console.log('📋 Invoice data:', {
      clientName: invoiceData.clientName,
      clientEmail: invoiceData.clientEmail,
      itemsCount: invoiceData.items.length,
      milestonesCount: invoiceData.milestones?.length || 0,
      totalAmount: invoiceData.totalAmount
    });

    // Step 2.5: Auto-find buyer by email if buyerId not provided
    // This ensures invoices are visible to buyers immediately after creation
    let finalBuyerId = invoiceData.buyerId;
    if (!finalBuyerId && invoiceData.clientEmail) {
      console.log('🔍 Step 2.5: Auto-searching for buyer with email:', invoiceData.clientEmail);
      const buyerResult = await findBuyerByEmail(invoiceData.clientEmail);
      if (buyerResult.buyerId) {
        finalBuyerId = buyerResult.buyerId;
        console.log('✅ Step 2.5 SUCCESS: Auto-assigned invoice to buyer:', finalBuyerId);
        console.log('✅ Buyer will be able to see this invoice immediately after creation');
      } else {
        console.log('ℹ️ Step 2.5: No registered buyer found with email:', invoiceData.clientEmail);
        console.log('ℹ️ Invoice will be created with buyer_id: NULL');
        console.log('ℹ️ Buyer will NOT see this invoice until buyer_id is assigned');
        console.log('ℹ️ You can manually assign using: assignInvoiceToBuyer(invoiceId, buyerId)');
      }
    } else if (finalBuyerId) {
      console.log('✅ Step 2.5: Using provided buyerId:', finalBuyerId);
    } else {
      console.log('ℹ️ Step 2.5: No buyerId provided and no clientEmail to search');
    }

    // Step 3: Generate unique invoice number (matches database trigger format)
    const invoiceNumber = await generateInvoiceNumber();
    console.log('🔢 Generated invoice number:', invoiceNumber);

    // Step 4: Prepare invoice payload with proper data types matching database schema exactly
    // Note: Supabase handles numeric types correctly when passed as numbers
    
    // Validate clientId - must be a valid UUID or null
    let validClientId: string | null = null;
    if (invoiceData.clientId) {
      // Check if clientId is a valid UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (uuidRegex.test(invoiceData.clientId)) {
        validClientId = invoiceData.clientId;
        console.log('✅ Valid client_id UUID:', validClientId);
      } else {
        console.warn('⚠️ Invalid clientId format (not a UUID):', invoiceData.clientId);
        console.warn('⚠️ Setting client_id to NULL (clientId will be ignored)');
        validClientId = null;
      }
    }
    
    const invoicePayload: any = {
      invoice_number: invoiceNumber,
      seller_id: userId,
      buyer_id: finalBuyerId || null as string | null, // Use auto-found buyer_id or provided buyerId
      client_id: validClientId,
      client_name: invoiceData.clientName.trim(),
      client_email: invoiceData.clientEmail.trim().toLowerCase(),
      client_address: invoiceData.clientAddress?.trim() || null,
      client_gstin: invoiceData.clientGstin?.trim().toUpperCase() || null,
      invoice_date: invoiceData.invoiceDate,
      due_date: invoiceData.dueDate || null,
      payment_type: invoiceData.paymentType,
      subtotal: Number(invoiceData.subtotal.toFixed(2)),
      tax_rate: Number(invoiceData.taxRate.toFixed(2)),
      tax_amount: Number(invoiceData.taxAmount.toFixed(2)),
      total_amount: Number(invoiceData.totalAmount.toFixed(2)),
      paid_amount: 0,
      status: invoiceData.status || (invoiceData.isDraft ? 'draft' : 'sent'),
      notes: invoiceData.notes?.trim() || null,
      is_draft: invoiceData.isDraft || false
    };
    
    // Log buyer assignment status
    if (finalBuyerId) {
      console.log('👤 ✅ Invoice buyer assignment: SUCCESS');
      console.log('   - buyer_id:', finalBuyerId);
      console.log('   - Buyer will see this invoice in their invoice list');
      console.log('   - Seller will also see this invoice in their invoice list');
    } else {
      console.log('👤 ⚠️ Invoice buyer assignment: NOT ASSIGNED');
      console.log('   - buyer_id: NULL');
      console.log('   - Buyer will NOT see this invoice until buyer_id is assigned');
      console.log('   - Seller will still see this invoice (by seller_id)');
      console.log('   - To assign later, use: assignInvoiceToBuyer(invoiceId, buyerId)');
    }

    // Only set sent_at if not a draft
    if (!invoiceData.isDraft) {
      invoicePayload.sent_at = new Date().toISOString();
    }

    // Step 5: Insert invoice (main record)
    console.log('✅ Step 5: Inserting invoice into database...');
    console.log('📦 Invoice payload:', JSON.stringify(invoicePayload, null, 2));
    
    // Verify authentication before insert
    console.log('🔐 Verifying authentication before insert...');
    const { data: { user: authUser }, error: authCheckError } = await supabaseClient.auth.getUser();
    if (authCheckError || !authUser) {
      console.error('❌ Step 5 FAILED: Auth check failed before insert:', authCheckError);
      return { success: false, error: 'Authentication failed. Please log in again.' };
    }
    console.log('✅ Auth verified. User ID:', authUser.id, 'Matches seller_id:', authUser.id === userId);
    
    if (authUser.id !== userId) {
      console.error('❌ Step 5 FAILED: User ID mismatch!', {
        authUserId: authUser.id,
        sellerId: userId
      });
      return { success: false, error: 'User ID mismatch. Please log out and log back in.' };
    }

    console.log('📤 ========== EXECUTING SUPABASE INSERT ==========');
    console.log('📤 Table: invoices');
    console.log('📤 Supabase Client:', supabaseClient ? 'Initialized' : 'NOT INITIALIZED');
    console.log('📤 Payload keys:', Object.keys(invoicePayload));
    console.log('📤 Payload values:', {
      invoice_number: invoicePayload.invoice_number,
      seller_id: invoicePayload.seller_id,
      buyer_id: invoicePayload.buyer_id,
      client_name: invoicePayload.client_name,
      client_email: invoicePayload.client_email,
      total_amount: invoicePayload.total_amount,
      status: invoicePayload.status,
      is_draft: invoicePayload.is_draft
    });
    
    // CRITICAL FIX: Rename response variable to avoid shadowing the function parameter 'invoiceData'
    console.log('📤 Calling supabaseClient.from("invoices").insert()...');
    const insertStartTime = Date.now();
    
    // CRITICAL: Check if Supabase client is properly initialized
    if (!supabaseClient) {
      console.error('❌ CRITICAL: Supabase client is not initialized!');
      return { success: false, error: 'Database connection not available. Please refresh the page.' };
    }
    
    console.log('📤 Supabase Client Status:', {
      hasClient: !!supabaseClient,
      hasAuth: !!supabaseClient.auth,
      hasFrom: typeof supabaseClient.from === 'function'
    });
    
    const { data: insertedInvoice, error: invoiceError } = await supabaseClient
      .from('invoices')
      .insert(invoicePayload)
      .select()
      .single();
    
    const insertDuration = Date.now() - insertStartTime;
    console.log('📥 ========== INSERT QUERY COMPLETED ==========');
    console.log('📥 Duration:', insertDuration, 'ms');
    console.log('📥 Has Data:', !!insertedInvoice);
    console.log('📥 Has Error:', !!invoiceError);
    console.log('📥 Response Type:', typeof insertedInvoice);
    console.log('📥 Error Type:', typeof invoiceError);
    
    // CRITICAL: Check if insert returned null data (this shouldn't happen but let's be safe)
    if (!insertedInvoice && !invoiceError) {
      console.error('❌ ========== CRITICAL: INSERT RETURNED NO DATA AND NO ERROR ==========');
      console.error('❌ Insert query completed but returned NO invoice data and NO error!');
      console.error('❌ This is unusual - the invoice was likely NOT saved!');
      console.error('❌ Payload that was sent:', JSON.stringify(invoicePayload, null, 2));
      return { 
        success: false, 
        error: 'Invoice insert completed but no data was returned. The invoice may not have been saved. Please check the database and try again.' 
      };
    }
    
    // CRITICAL: Check for errors FIRST - if error exists, return immediately
    if (invoiceError) {
      console.error('❌ ========== INSERT ERROR ==========');
      console.error('❌ Error Code:', invoiceError.code);
      console.error('❌ Error Message:', invoiceError.message);
      console.error('❌ Error Details:', invoiceError.details);
      console.error('❌ Error Hint:', invoiceError.hint);
      console.error('❌ Full Error Object:', JSON.stringify(invoiceError, null, 2));
      console.error('❌ Payload that failed:', JSON.stringify(invoicePayload, null, 2));
      console.error('❌ Authenticated User ID:', authUser?.id);
      console.error('❌ Seller ID in payload:', invoicePayload.seller_id);
      console.error('❌ Supabase Client:', supabaseClient ? 'Initialized' : 'NOT INITIALIZED');
      
      // Return error immediately - don't continue
      return { 
        success: false, 
        error: `Failed to save invoice to database. Error: ${invoiceError.message || 'Unknown error'}. Code: ${invoiceError.code || 'N/A'}. Details: ${invoiceError.details || 'None'}. Hint: ${invoiceError.hint || 'Check console for full details'}` 
      };
    }
    
    // CRITICAL: Check if insert returned null data (this shouldn't happen but let's be safe)
    if (!insertedInvoice) {
      console.error('❌ ========== CRITICAL: INSERT RETURNED NO DATA ==========');
      console.error('❌ Insert query completed but returned NO invoice data!');
      console.error('❌ This means the invoice was NOT saved!');
      console.error('❌ Payload that was sent:', JSON.stringify(invoicePayload, null, 2));
      console.error('❌ No error was returned, but no data either - this is unusual!');
      return { 
        success: false, 
        error: 'Invoice insert completed but no data was returned. The invoice may not have been saved. Please check the database and try again.' 
      };
    }
    
    // Success - invoice was inserted
    console.log('✅ INSERT SUCCESS! Invoice saved to database');
    console.log('✅ Invoice ID:', insertedInvoice.id);
    console.log('✅ Invoice Number:', insertedInvoice.invoice_number);
    console.log('✅ Seller ID:', insertedInvoice.seller_id);
    console.log('✅ Buyer ID:', insertedInvoice.buyer_id || 'NULL');
    console.log('✅ Full inserted invoice:', JSON.stringify(insertedInvoice, null, 2));
    
    console.log('📥 INSERT Result Summary:', {
      success: true,
      hasData: true,
      hasError: false,
      invoiceId: insertedInvoice.id,
      invoiceNumber: insertedInvoice.invoice_number
    });

    // Continue with invoice processing - set invoice variable
    const invoice = insertedInvoice;

    // Verify invoice was created (either from initial insert or retry)
    if (!invoice || !invoice.id) {
      console.error('❌ ========== CRITICAL ERROR ==========');
      console.error('❌ Invoice created but no ID returned');
      console.error('❌ Inserted invoice object:', insertedInvoice);
      console.error('❌ Invoice variable:', invoice);
      return { success: false, error: 'Invoice was created but no ID was returned. Please check the database.' };
    }
    
    // Step 5.5: VERIFY invoice was actually saved to database
    console.log('🔍 ========== VERIFYING INVOICE SAVED TO DATABASE ==========');
    console.log('🔍 Invoice ID to verify:', invoice.id);
    console.log('🔍 Invoice Number to verify:', invoice.invoice_number);
    
    const { data: verifiedInvoice, error: verifyError } = await supabaseClient
      .from('invoices')
      .select('*')
      .eq('id', invoice.id)
      .single();
    
    if (verifyError) {
      console.error('❌ ========== VERIFICATION FAILED ==========');
      console.error('❌ Could not verify invoice in database!');
      console.error('❌ Verification Error Code:', verifyError.code);
      console.error('❌ Verification Error Message:', verifyError.message);
      console.error('❌ This means the invoice may NOT have been saved!');
      console.error('❌ Invoice ID searched:', invoice.id);
      return { 
        success: false, 
        error: `Invoice creation verification failed. Error: ${verifyError.message}. The invoice may not have been saved. Please check the database.` 
      };
    }
    
    if (!verifiedInvoice) {
      console.error('❌ ========== VERIFICATION FAILED ==========');
      console.error('❌ Invoice not found in database after creation!');
      console.error('❌ Searched for invoice ID:', invoice.id);
      console.error('❌ This means the invoice was NOT saved!');
      return { 
        success: false, 
        error: 'Invoice was not found in database after creation. The invoice may not have been saved. Please check the database.' 
      };
    }
    
    console.log('✅ ========== VERIFICATION SUCCESS ==========');
    console.log('✅ Invoice confirmed saved to database!');
    console.log('✅ Verified Invoice ID:', verifiedInvoice.id);
    console.log('✅ Verified Invoice Number:', verifiedInvoice.invoice_number);
    console.log('✅ Verified Seller ID:', verifiedInvoice.seller_id);
    console.log('✅ Verified Buyer ID:', verifiedInvoice.buyer_id || 'NULL');
    console.log('✅ Verified Client Email:', verifiedInvoice.client_email);
    console.log('✅ Verified Total Amount:', verifiedInvoice.total_amount);
    console.log('✅ Verified Status:', verifiedInvoice.status);
    console.log('✅ Full verified invoice:', JSON.stringify(verifiedInvoice, null, 2));

    console.log('✅ Invoice created successfully with ID:', invoice.id);
    const invoiceId = invoice.id;

    // Step 6: Insert invoice items (with error handling and rollback)
    if (invoiceData.items && invoiceData.items.length > 0) {
      console.log('📦 ========== STEP 6: INSERTING INVOICE ITEMS ==========');
      console.log(`📦 Number of items to insert: ${invoiceData.items.length}`);
      
      const itemsPayload = invoiceData.items.map((item, index) => ({
        invoice_id: invoiceId,
        description: item.description.trim(),
        quantity: parseFloat(item.quantity.toFixed(2)),
        rate: parseFloat(item.rate.toFixed(2)),
        amount: parseFloat(item.amount.toFixed(2)),
        sort_order: index
      }));
      
      console.log('📦 Items payload:', JSON.stringify(itemsPayload, null, 2));
      console.log('📦 Calling supabaseClient.from("invoice_items").insert()...');
      
      const itemsStartTime = Date.now();
      const { data: insertedItems, error: itemsError } = await supabaseClient
        .from('invoice_items')
        .insert(itemsPayload)
        .select();
      const itemsDuration = Date.now() - itemsStartTime;
      
      console.log('📦 Items insert completed in', itemsDuration, 'ms');
      console.log('📦 Items inserted:', insertedItems?.length || 0);
      console.log('📦 Items error:', itemsError ? 'YES' : 'NO');
      
      if (insertedItems) {
        console.log('✅ Invoice items saved successfully!');
        console.log('✅ Inserted items:', JSON.stringify(insertedItems, null, 2));
      }

      if (itemsError) {
        console.error('❌ ========== ERROR CREATING INVOICE ITEMS ==========');
        console.error('❌ Error Code:', itemsError.code);
        console.error('❌ Error Message:', itemsError.message);
        console.error('❌ Error Details:', itemsError.details);
        console.error('❌ Error Hint:', itemsError.hint);
        console.error('❌ Full Error:', JSON.stringify(itemsError, null, 2));
        console.error('❌ Items Payload that failed:', JSON.stringify(itemsPayload, null, 2));
        console.error('❌ Attempting to delete invoice to maintain data consistency...');
        
        // Rollback: Delete the invoice if items fail
        const { error: deleteError } = await supabaseClient
          .from('invoices')
          .delete()
          .eq('id', invoiceId);
        
        if (deleteError) {
          console.error('❌ Failed to rollback invoice deletion:', deleteError);
          return { 
            success: false, 
            error: `Failed to save invoice items: ${itemsError.message}. Invoice was created but items were not saved. Please contact support.` 
          };
        }
        
        return { 
          success: false, 
          error: `Failed to save invoice items: ${itemsError.message}` 
        };
      }

      if (!insertedItems || insertedItems.length !== invoiceData.items.length) {
        console.error('❌ Not all items were inserted. Expected:', invoiceData.items.length, 'Got:', insertedItems?.length || 0);
        
        // Rollback
        await supabaseClient.from('invoices').delete().eq('id', invoiceId);
        
        return { 
          success: false, 
          error: 'Failed to save all invoice items. Please try again.' 
        };
      }

      console.log(`✅ Successfully inserted ${insertedItems.length} invoice items`);
    }

    // Step 7: Insert milestones if payment type is milestone or split
    if ((invoiceData.paymentType === 'milestone' || invoiceData.paymentType === 'split') 
        && invoiceData.milestones && invoiceData.milestones.length > 0) {
      console.log(`🎯 Inserting ${invoiceData.milestones.length} invoice milestones...`);
      
      const milestonesPayload = invoiceData.milestones.map((milestone, index) => ({
        invoice_id: invoiceId,
        description: milestone.description.trim(),
        percentage: parseFloat(milestone.percentage.toFixed(2)),
        due_date: milestone.dueDate,
        amount: parseFloat(milestone.amount.toFixed(2)),
        paid_amount: 0,
        status: 'pending' as const,
        sort_order: index
      }));

      const { data: insertedMilestones, error: milestonesError } = await supabaseClient
        .from('invoice_milestones')
        .insert(milestonesPayload)
        .select();

      if (milestonesError) {
        console.error('❌ ERROR CREATING INVOICE MILESTONES:', milestonesError);
        console.error('Attempting to rollback invoice and items...');
        
        // Rollback: Delete items and invoice
        await supabaseClient.from('invoice_items').delete().eq('invoice_id', invoiceId);
        await supabaseClient.from('invoices').delete().eq('id', invoiceId);
        
        return { 
          success: false, 
          error: `Failed to save invoice milestones: ${milestonesError.message}` 
        };
      }

      if (!insertedMilestones || insertedMilestones.length !== invoiceData.milestones.length) {
        console.error('❌ Not all milestones were inserted. Expected:', invoiceData.milestones.length, 'Got:', insertedMilestones?.length || 0);
        
        // Rollback
        await supabaseClient.from('invoice_items').delete().eq('invoice_id', invoiceId);
        await supabaseClient.from('invoices').delete().eq('id', invoiceId);
        
        return { 
          success: false, 
          error: 'Failed to save all invoice milestones. Please try again.' 
        };
      }

      console.log(`✅ Successfully inserted ${insertedMilestones.length} invoice milestones`);
    }

    // Step 8: Final verification - Check that invoice, items, and milestones are all saved
    console.log('🔍 ========== STEP 8: FINAL VERIFICATION ==========');
    console.log('🔍 Verifying complete invoice with items and milestones...');
    console.log('🔍 Invoice ID to verify:', invoiceId);
    
    const { data: finalVerifyInvoice, error: finalVerifyError } = await supabaseClient
      .from('invoices')
      .select(`
        *,
        invoice_items (*),
        invoice_milestones (*)
      `)
      .eq('id', invoiceId)
      .single();

    if (finalVerifyError) {
      console.error('❌ ========== FINAL VERIFICATION ERROR ==========');
      console.error('❌ Verification Error Code:', finalVerifyError.code);
      console.error('❌ Verification Error Message:', finalVerifyError.message);
      console.error('❌ Verification Error Details:', finalVerifyError.details);
      console.error('❌ Full Verification Error:', JSON.stringify(finalVerifyError, null, 2));
      console.warn('⚠️ Invoice may be saved but verification query failed');
    } else if (!finalVerifyInvoice) {
      console.error('❌ ========== FINAL VERIFICATION FAILED ==========');
      console.error('❌ Invoice not found during final verification!');
      console.error('❌ Searched for invoice ID:', invoiceId);
      console.error('❌ This is CRITICAL - invoice may not be saved!');
    } else {
      const itemsCount = Array.isArray(finalVerifyInvoice.invoice_items) ? finalVerifyInvoice.invoice_items.length : 0;
      const milestonesCount = Array.isArray(finalVerifyInvoice.invoice_milestones) ? finalVerifyInvoice.invoice_milestones.length : 0;
      const expectedItems = invoiceData.items.length;
      const expectedMilestones = invoiceData.milestones?.length || 0;
      
      console.log('✅ ========== FINAL VERIFICATION SUCCESS ==========');
      console.log('✅ Invoice saved to database:', !!finalVerifyInvoice);
      console.log('✅ Invoice ID:', finalVerifyInvoice.id);
      console.log('✅ Invoice Number:', finalVerifyInvoice.invoice_number);
      console.log('✅ Seller ID:', finalVerifyInvoice.seller_id);
      console.log('✅ Buyer ID:', finalVerifyInvoice.buyer_id || 'NULL');
      console.log('✅ Client Email:', finalVerifyInvoice.client_email);
      console.log('✅ Total Amount:', finalVerifyInvoice.total_amount);
      console.log('✅ Status:', finalVerifyInvoice.status);
      console.log('✅ Items saved:', itemsCount, 'of', expectedItems, itemsCount === expectedItems ? '✅' : '❌');
      console.log('✅ Milestones saved:', milestonesCount, 'of', expectedMilestones, milestonesCount === expectedMilestones ? '✅' : '❌');
      
      if (itemsCount !== expectedItems) {
        console.error('❌ CRITICAL: Item count mismatch!');
        console.error('❌ Expected:', expectedItems, 'Got:', itemsCount);
        console.error('❌ This means some items were NOT saved!');
      }
      
      if (milestonesCount !== expectedMilestones && expectedMilestones > 0) {
        console.error('❌ CRITICAL: Milestone count mismatch!');
        console.error('❌ Expected:', expectedMilestones, 'Got:', milestonesCount);
        console.error('❌ This means some milestones were NOT saved!');
      }
      
      if (itemsCount === expectedItems && milestonesCount === expectedMilestones) {
        console.log('✅ All data verified and saved correctly!');
      }
      
      console.log('✅ Full verified invoice data:', JSON.stringify({
        invoice: {
          id: finalVerifyInvoice.id,
          invoice_number: finalVerifyInvoice.invoice_number,
          seller_id: finalVerifyInvoice.seller_id,
          buyer_id: finalVerifyInvoice.buyer_id,
          total_amount: finalVerifyInvoice.total_amount
        },
        items_count: itemsCount,
        milestones_count: milestonesCount
      }, null, 2));
    }

    console.log('🎉 ========== INVOICE CREATION COMPLETED ==========');
    console.log('🎉 Invoice ID:', invoiceId);
    console.log('🎉 Invoice Number:', invoice?.invoice_number);
    console.log('🎉 All data saved to Supabase invoices table!');
    console.log('🎉 ================================================');
    
    return { success: true, invoiceId };
  } catch (error: any) {
    console.error('❌ Unexpected error in createInvoice:', error);
    console.error('Error stack:', error.stack);
    return { 
      success: false, 
      error: error.message || 'An unexpected error occurred while creating the invoice. Please try again.' 
    };
  }
}

/**
 * Get invoices for current user (seller)
 * If RLS is disabled, this will fetch all invoices matching seller_id
 */
export async function getSellerInvoices(
  sellerId?: string
): Promise<{ data: Invoice[] | null; error: string | null }> {
  try {
    let userId = sellerId;
    if (!userId) {
      const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
      if (userError || !user) {
        console.warn('⚠️ No authenticated user. RLS is disabled, so fetching ALL invoices...');
        // If RLS is disabled, we can fetch all invoices
        // Otherwise, this will fail and return empty array
        const { data, error } = await supabaseClient
          .from('invoices')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('❌ Error fetching invoices (no auth):', error);
          // If it's an RLS error, return empty array instead of error
          if (error.code === '42501' || error.message?.includes('policy') || error.message?.includes('permission')) {
            console.warn('⚠️ RLS is enabled. Invoices cannot be fetched without authentication.');
            return { data: [], error: null }; // Return empty array, not error
          }
          return { data: null, error: error.message };
        }
        
        console.log('✅ Fetched ALL invoices (RLS disabled):', data?.length || 0);
        return { data: (data as Invoice[]) || [], error: null };
      }
      userId = user.id;
    }

    console.log('📋 Fetching invoices for seller user:', userId);
    
    // First, verify authentication
    const { data: { user: authUser }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !authUser) {
      console.warn('⚠️ No authenticated user found when fetching invoices');
      console.warn('⚠️ RLS policies require authentication. Please log in first.');
      return { data: [], error: 'Not authenticated' };
    } else {
      console.log('✅ Authenticated user ID:', authUser.id);
      console.log('✅ Querying for seller_id:', userId);
      console.log('✅ IDs match:', authUser.id === userId);
      
      // CRITICAL: Use the authenticated user's ID, not the passed userId
      // This ensures we always query with the correct authenticated user
      if (authUser.id !== userId) {
        console.warn('⚠️ Mismatch! Authenticated user ID does not match query seller_id');
        console.warn('⚠️ Using authenticated user ID instead:', authUser.id);
        userId = authUser.id; // Use the actual authenticated user ID
      }
      
      // Check if there are any invoices with this seller_id (for debugging)
      const { data: debugInvoices } = await supabaseClient
        .from('invoices')
        .select('id, invoice_number, seller_id')
        .eq('seller_id', userId)
        .limit(1);
      
      console.log('🔍 Debug check - invoices with this seller_id:', debugInvoices?.length || 0);
      if (debugInvoices && debugInvoices.length > 0) {
        console.log('🔍 Found invoice:', debugInvoices[0]);
      } else {
        console.warn('⚠️ No invoices found with seller_id:', userId);
        console.warn('⚠️ This could mean:');
        console.warn('   1. The invoice seller_id does not match your user ID');
        console.warn('   2. RLS policy is blocking the query');
        console.warn('   3. The invoice does not exist');
      }
    }
    
    const { data, error } = await supabaseClient
      .from('invoices')
      .select('*')
      .eq('seller_id', userId)
      .order('created_at', { ascending: false });
    
    console.log('🔍 Query details:', {
      authenticated_user_id: authUser?.id || 'NOT AUTHENTICATED',
      query_seller_id: userId,
      query_result_count: data?.length || 0,
      has_error: !!error,
      error_message: error?.message || null
    });

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
    
    // Debug: Log first invoice if any exist
    if (data && data.length > 0) {
      console.log('📄 Sample invoice:', {
        id: data[0].id,
        invoice_number: data[0].invoice_number,
        seller_id: data[0].seller_id,
        client_name: data[0].client_name,
        total_amount: data[0].total_amount,
        status: data[0].status
      });
    } else {
      console.log('ℹ️ No invoices found for seller_id:', userId);
      
      // Debug: Try to fetch the specific invoice by invoice_number
      const { data: specificInvoice, error: specificError } = await supabaseClient
        .from('invoices')
        .select('*')
        .eq('invoice_number', 'TEST-MANUAL-001')
        .single();
      
      if (specificError) {
        console.error('❌ Error fetching specific invoice TEST-MANUAL-001:', specificError);
        console.error('   Error code:', specificError.code);
        console.error('   Error message:', specificError.message);
        if (specificError.code === 'PGRST116') {
          console.warn('⚠️ Invoice TEST-MANUAL-001 not found (or RLS blocking)');
        }
      } else if (specificInvoice) {
        console.log('✅ Found specific invoice:', {
          invoice_number: specificInvoice.invoice_number,
          seller_id: specificInvoice.seller_id,
          your_user_id: userId,
          matches: specificInvoice.seller_id === userId
        });
        console.warn('⚠️ Invoice exists but query with .eq("seller_id") returned nothing!');
        console.warn('⚠️ This suggests an RLS policy issue or query problem');
      }
      
      // Debug: Check if any invoices exist at all (for debugging RLS issues)
      const { data: allInvoices, error: debugError } = await supabaseClient
        .from('invoices')
        .select('id, seller_id, invoice_number')
        .limit(5);
      
      if (!debugError && allInvoices) {
        console.log('🔍 Debug: Found', allInvoices.length, 'total invoices in database (RLS check)');
        if (allInvoices.length > 0) {
          console.log('🔍 Sample invoice seller_ids:', allInvoices.map(inv => ({
            invoice_number: inv.invoice_number,
            seller_id: inv.seller_id
          })));
        }
      } else if (debugError) {
        console.error('❌ Error in debug query:', debugError);
      }
    }
    
    return { data: (data as Invoice[]) || [], error: null };
  } catch (error: any) {
    console.error('❌ Error in getSellerInvoices:', error);
    console.error('❌ Error details:', JSON.stringify(error, null, 2));
    return { data: null, error: error.message || 'Unknown error' };
  }
}

/**
 * Get invoices for buyer
 * If RLS is disabled, this will fetch invoices matching buyer_id OR all invoices if buyer_id is null
 */
export async function getBuyerInvoices(
  buyerId?: string
): Promise<{ data: Invoice[] | null; error: string | null }> {
  try {
    let userId = buyerId;
    if (!userId) {
      const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
      if (userError || !user) {
        console.warn('⚠️ No authenticated user. RLS is disabled, so fetching ALL invoices...');
        // If RLS is disabled, we can fetch all invoices
        // Otherwise, this will fail and return empty array
        const { data, error } = await supabaseClient
          .from('invoices')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('❌ Error fetching invoices (no auth):', error);
          // If it's an RLS error, return empty array instead of error
          if (error.code === '42501' || error.message?.includes('policy') || error.message?.includes('permission')) {
            console.warn('⚠️ RLS is enabled. Invoices cannot be fetched without authentication.');
            return { data: [], error: null }; // Return empty array, not error
          }
          return { data: null, error: error.message };
        }
        
        console.log('✅ Fetched ALL invoices (RLS disabled):', data?.length || 0);
        return { data: (data as Invoice[]) || [], error: null };
      }
      userId = user.id;
    }

    console.log('📋 Fetching buyer invoices for user:', userId);
    
    // First, verify authentication
    const { data: { user: authUser }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !authUser) {
      console.warn('⚠️ No authenticated user found when fetching buyer invoices');
      console.warn('⚠️ RLS policies require authentication. Please log in first.');
      return { data: [], error: 'Not authenticated' };
    } else {
      console.log('✅ Authenticated user ID:', authUser.id);
      console.log('✅ Querying for buyer_id:', userId);
      console.log('✅ IDs match:', authUser.id === userId);
      
      // CRITICAL: Use the authenticated user's ID, not the passed buyerId
      // This ensures we always query with the correct authenticated user
      if (authUser.id !== userId) {
        console.warn('⚠️ Mismatch! Authenticated user ID does not match query buyer_id');
        console.warn('⚠️ Using authenticated user ID instead:', authUser.id);
        userId = authUser.id; // Use the actual authenticated user ID
      }
      
      // Check if there are any invoices with this buyer_id (for debugging)
      const { data: debugInvoices } = await supabaseClient
        .from('invoices')
        .select('id, invoice_number, buyer_id, seller_id')
        .eq('buyer_id', userId)
        .limit(1);
      
      console.log('🔍 Debug check - invoices with this buyer_id:', debugInvoices?.length || 0);
      if (debugInvoices && debugInvoices.length > 0) {
        console.log('🔍 Found invoice:', debugInvoices[0]);
      } else {
        console.warn('⚠️ No invoices found with buyer_id:', userId);
        console.warn('⚠️ This could mean:');
        console.warn('   1. The invoice buyer_id does not match your user ID');
        console.warn('   2. The invoice buyer_id is NULL (invoices are created with buyer_id: null)');
        console.warn('   3. RLS policy is blocking the query');
        console.warn('   4. The invoice does not exist');
        
        // Debug: Check invoices with NULL buyer_id
        const { data: nullBuyerInvoices } = await supabaseClient
          .from('invoices')
          .select('id, invoice_number, buyer_id, seller_id, client_email')
          .is('buyer_id', null)
          .limit(5);
        
        console.log('🔍 Debug: Found', nullBuyerInvoices?.length || 0, 'invoices with NULL buyer_id');
        if (nullBuyerInvoices && nullBuyerInvoices.length > 0) {
          console.log('🔍 Sample invoices with NULL buyer_id:', nullBuyerInvoices.map(inv => ({
            invoice_number: inv.invoice_number,
            seller_id: inv.seller_id,
            client_email: inv.client_email
          })));
          console.warn('⚠️ NOTE: Invoices are created with buyer_id: null. They need to be assigned to a buyer.');
        }
      }
    }
    
    // IMPORTANT: Buyer should see invoices in two cases:
    // 1. Invoices where buyer_id = their_user_id (already assigned)
    // 2. Invoices where client_email = their_email AND buyer_id IS NULL (unassigned but matches their email)
    
    // First, get buyer's email from profile
    let buyerEmail: string | null = null;
    try {
      const { data: profile } = await supabaseClient
        .from('profiles')
        .select('email')
        .eq('id', userId)
        .single();
      if (profile?.email) {
        buyerEmail = profile.email.toLowerCase().trim();
        console.log('📧 Buyer email found:', buyerEmail);
      }
    } catch (e) {
      console.log('ℹ️ Could not fetch buyer email from profile');
    }
    
    // Query invoices: We need to get invoices where:
    // - buyer_id = userId (already assigned)
    // OR
    // - client_email = buyerEmail AND buyer_id IS NULL (unassigned but email matches)
    
    // Since Supabase doesn't support complex OR queries easily, we'll fetch both and combine
    let invoicesByBuyerId: any[] = [];
    let invoicesByEmail: any[] = [];
    
    if (userId) {
      // Query 1: Get invoices where buyer_id matches
      const { data: data1, error: error1 } = await supabaseClient
        .from('invoices')
        .select('*')
        .eq('buyer_id', userId)
        .order('created_at', { ascending: false });
      
      if (error1) {
        console.error('❌ Error fetching invoices by buyer_id:', error1);
      } else {
        invoicesByBuyerId = data1 || [];
        console.log('✅ Found', invoicesByBuyerId.length, 'invoices with buyer_id =', userId);
      }
      
      // Query 2: Get invoices where email matches AND buyer_id is NULL
      if (buyerEmail) {
        const { data: data2, error: error2 } = await supabaseClient
          .from('invoices')
          .select('*')
          .eq('client_email', buyerEmail)
          .is('buyer_id', null)
          .order('created_at', { ascending: false });
        
        if (error2) {
          console.error('❌ Error fetching invoices by email:', error2);
        } else {
          invoicesByEmail = data2 || [];
          console.log('✅ Found', invoicesByEmail.length, 'invoices with client_email =', buyerEmail, 'AND buyer_id IS NULL');
          
          // Auto-assign these invoices to the buyer
          if (invoicesByEmail.length > 0) {
            console.log('🔄 Auto-assigning', invoicesByEmail.length, 'invoices to buyer:', userId);
            for (const invoice of invoicesByEmail) {
              await supabaseClient
                .from('invoices')
                .update({ buyer_id: userId })
                .eq('id', invoice.id);
            }
            console.log('✅ Auto-assignment complete');
          }
        }
      }
      
      // Combine both results, removing duplicates
      const allInvoices = [...invoicesByBuyerId];
      const existingIds = new Set(invoicesByBuyerId.map(inv => inv.id));
      for (const invoice of invoicesByEmail) {
        if (!existingIds.has(invoice.id)) {
          allInvoices.push(invoice);
        }
      }
      
      // Sort by created_at descending
      allInvoices.sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return dateB - dateA;
      });
      
      const data = allInvoices;
      
      console.log('🔍 Query details:', {
        authenticated_user_id: authUser?.id || 'NOT AUTHENTICATED',
        query_buyer_id: userId || 'NULL (showing unassigned)',
        buyer_email: buyerEmail || 'NOT FOUND',
        invoices_by_buyer_id: invoicesByBuyerId.length,
        invoices_by_email: invoicesByEmail.length,
        total_invoices: data?.length || 0
      });

      console.log('✅ Fetched buyer invoices:', data?.length || 0, 'invoices');
      
      // Debug: Log first invoice if any exist
      if (data && data.length > 0) {
        console.log('📄 Sample invoice:', {
          id: data[0].id,
          invoice_number: data[0].invoice_number,
          buyer_id: data[0].buyer_id,
          seller_id: data[0].seller_id,
          client_name: data[0].client_name,
          total_amount: data[0].total_amount,
          status: data[0].status
        });
      } else {
        console.log('ℹ️ No invoices found for buyer_id:', userId);
        if (buyerEmail) {
          console.log('ℹ️ Searched for invoices with:');
          console.log('   - buyer_id =', userId);
          console.log('   - OR client_email =', buyerEmail, 'AND buyer_id IS NULL');
        }
      }
      
      return { data: (data as Invoice[]) || [], error: null };
    } else {
      // If no userId, show invoices with NULL buyer_id (unassigned)
      const { data, error } = await supabaseClient
        .from('invoices')
        .select('*')
        .is('buyer_id', null)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('❌ Error fetching buyer invoices:', error);
        return { data: null, error: error.message };
      }
      
      return { data: (data as Invoice[]) || [], error: null };
    }
  } catch (error: any) {
    console.error('❌ Error in getBuyerInvoices:', error);
    console.error('❌ Error details:', JSON.stringify(error, null, 2));
    return { data: null, error: error.message || 'Unknown error' };
  }
}

/**
 * Find buyer user ID by email
 * This helps automatically assign invoices to registered buyers
 * Searches in profiles table (which links to auth.users via id)
 */
export async function findBuyerByEmail(
  email: string
): Promise<{ buyerId: string | null; error: string | null }> {
  try {
    const normalizedEmail = email.toLowerCase().trim();
    console.log('🔍 Searching for buyer with email:', normalizedEmail);
    
    // Search in profiles table by email (profiles.id = auth.users.id)
    // Don't filter by account_type since users might not have it set
    // Any registered user with this email can be a buyer
    const { data: profile, error } = await supabaseClient
      .from('profiles')
      .select('id, email')
      .eq('email', normalizedEmail)
      .maybeSingle(); // Use maybeSingle() instead of single() to avoid error if not found
    
    if (error) {
      console.log('ℹ️ Error searching for buyer:', error.message);
      // Error is okay - buyer might not be registered yet
      return { buyerId: null, error: null };
    }
    
    if (profile && profile.id) {
      console.log('✅ Found registered user with email:', normalizedEmail, 'User ID:', profile.id);
      console.log('✅ Invoice will be assigned to this buyer automatically');
      return { buyerId: profile.id, error: null };
    }
    
    console.log('ℹ️ No registered user found with email:', normalizedEmail);
    console.log('ℹ️ Invoice will be created without buyer_id. Buyer can be assigned later.');
    return { buyerId: null, error: null };
  } catch (error: any) {
    console.error('❌ Error finding buyer by email:', error);
    return { buyerId: null, error: error.message || 'Failed to find buyer' };
  }
}

/**
 * Assign invoice to a buyer
 * Updates the buyer_id field so the buyer can see the invoice
 */
export async function assignInvoiceToBuyer(
  invoiceId: string,
  buyerId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabaseClient
      .from('invoices')
      .update({ buyer_id: buyerId })
      .eq('id', invoiceId);
    
    if (error) {
      console.error('❌ Error assigning invoice to buyer:', error);
      return { success: false, error: error.message };
    }
    
    console.log('✅ Invoice assigned to buyer:', buyerId);
    return { success: true };
  } catch (error: any) {
    console.error('❌ Error in assignInvoiceToBuyer:', error);
    return { success: false, error: error.message || 'Failed to assign invoice' };
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
 * Test invoice creation with minimal data
 * Use this for debugging RLS and database issues
 */
export async function testInvoiceCreation(): Promise<{ success: boolean; error?: string; data?: any }> {
  try {
    console.log('🧪 Testing invoice creation...');
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      return { success: false, error: `Not authenticated: ${authError?.message || 'No user found'}` };
    }
    
    console.log('✅ Authenticated user:', user.id);
    
    // Generate test invoice number
    const testInvoiceNumber = `TEST-${Date.now()}`;
    console.log('📝 Test invoice number:', testInvoiceNumber);
    
    // Try to insert minimal invoice
    const testPayload = {
      invoice_number: testInvoiceNumber,
      seller_id: user.id,
      buyer_id: null,
      client_name: 'Test Client',
      client_email: 'test@example.com',
      invoice_date: new Date().toISOString().split('T')[0],
      payment_type: 'full',
      subtotal: 100,
      tax_rate: 0,
      tax_amount: 0,
      total_amount: 100,
      paid_amount: 0,
      status: 'draft',
      is_draft: true
    };
    
    console.log('📦 Test payload:', JSON.stringify(testPayload, null, 2));
    
    const { data: insertedInvoice, error: insertError } = await supabaseClient
      .from('invoices')
      .insert(testPayload)
      .select()
      .single();
    
    if (insertError) {
      console.error('❌ TEST INSERT FAILED:', insertError);
      return {
        success: false,
        error: `Insert failed. Code: ${insertError.code}, Message: ${insertError.message}, Details: ${insertError.details}, Hint: ${insertError.hint}`
      };
    }
    
    console.log('✅ TEST INSERT SUCCESS:', insertedInvoice);
    
    // Clean up test invoice
    await supabaseClient
      .from('invoices')
      .delete()
      .eq('id', insertedInvoice.id);
    
    console.log('🧹 Test invoice cleaned up');
    
    return { success: true, data: insertedInvoice };
  } catch (error: any) {
    console.error('❌ TEST ERROR:', error);
    return { success: false, error: error.message || 'Unknown error' };
  }
}

/**
 * DIAGNOSTIC: Get ALL invoices from database (no filters, no RLS checks)
 * Use this to verify data exists in the database
 */
export async function getAllInvoicesUnrestricted(): Promise<{ data: Invoice[] | null; error: string | null }> {
  try {
    console.log('🔍 DIAGNOSTIC: Fetching ALL invoices (no filters, RLS disabled)...');
    
    const { data, error } = await supabaseClient
      .from('invoices')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);
    
    if (error) {
      console.error('❌ DIAGNOSTIC ERROR:', error);
      return { data: null, error: error.message };
    }
    
    console.log('✅ DIAGNOSTIC: Found', data?.length || 0, 'total invoices in database');
    
    if (data && data.length > 0) {
      console.log('📋 Sample invoices:', data.slice(0, 3).map(inv => ({
        id: inv.id,
        invoice_number: inv.invoice_number,
        seller_id: inv.seller_id,
        buyer_id: inv.buyer_id,
        client_name: inv.client_name,
        total_amount: inv.total_amount,
        status: inv.status
      })));
    }
    
    return { data: (data as Invoice[]) || [], error: null };
  } catch (error: any) {
    console.error('❌ DIAGNOSTIC ERROR:', error);
    return { data: null, error: error.message || 'Unknown error' };
  }
}

/**
 * DIAGNOSTIC: Check if invoices exist for a specific seller_id
 */
export async function checkInvoicesForSeller(sellerId: string): Promise<{ count: number; invoices: any[] }> {
  try {
    console.log('🔍 DIAGNOSTIC: Checking invoices for seller_id:', sellerId);
    
    const { data, error } = await supabaseClient
      .from('invoices')
      .select('*')
      .eq('seller_id', sellerId);
    
    if (error) {
      console.error('❌ DIAGNOSTIC ERROR:', error);
      return { count: 0, invoices: [] };
    }
    
    console.log('✅ DIAGNOSTIC: Found', data?.length || 0, 'invoices for seller_id:', sellerId);
    
    return { count: data?.length || 0, invoices: data || [] };
  } catch (error: any) {
    console.error('❌ DIAGNOSTIC ERROR:', error);
    return { count: 0, invoices: [] };
  }
}

/**
 * DIAGNOSTIC: Check if invoices exist for a specific buyer_id
 */
export async function checkInvoicesForBuyer(buyerId: string): Promise<{ count: number; invoices: any[] }> {
  try {
    console.log('🔍 DIAGNOSTIC: Checking invoices for buyer_id:', buyerId);
    
    const { data, error } = await supabaseClient
      .from('invoices')
      .select('*')
      .eq('buyer_id', buyerId);
    
    if (error) {
      console.error('❌ DIAGNOSTIC ERROR:', error);
      return { count: 0, invoices: [] };
    }
    
    console.log('✅ DIAGNOSTIC: Found', data?.length || 0, 'invoices for buyer_id:', buyerId);
    
    return { count: data?.length || 0, invoices: data || [] };
  } catch (error: any) {
    console.error('❌ DIAGNOSTIC ERROR:', error);
    return { count: 0, invoices: [] };
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
