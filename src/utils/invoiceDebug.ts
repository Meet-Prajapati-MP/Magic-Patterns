/**
 * Comprehensive Invoice Debugging Utility
 * Use this to diagnose invoice creation and retrieval issues
 */

import { supabaseClient } from '../supabase-client';

export interface DebugResult {
  step: string;
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}

/**
 * Run comprehensive diagnostics for invoice system
 */
export async function diagnoseInvoiceSystem(): Promise<DebugResult[]> {
  const results: DebugResult[] = [];

  // Step 1: Check Supabase Connection
  try {
    const { data, error } = await supabaseClient.from('invoices').select('count').limit(1);
    if (error) {
      results.push({
        step: '1. Supabase Connection',
        success: false,
        message: `Connection failed: ${error.message}`,
        error: error
      });
    } else {
      results.push({
        step: '1. Supabase Connection',
        success: true,
        message: 'Successfully connected to Supabase'
      });
    }
  } catch (error: any) {
    results.push({
      step: '1. Supabase Connection',
      success: false,
      message: `Connection error: ${error.message}`,
      error: error
    });
  }

  // Step 2: Check Authentication
  try {
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      results.push({
        step: '2. Authentication',
        success: false,
        message: 'User is NOT authenticated',
        error: authError
      });
      return results; // Stop here if not authenticated
    } else {
      results.push({
        step: '2. Authentication',
        success: true,
        message: `User authenticated: ${user.id}`,
        data: {
          id: user.id,
          email: user.email,
          phone: user.phone
        }
      });
    }

    // Step 3: Check Profile Exists
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      results.push({
        step: '3. Profile Check',
        success: false,
        message: 'Profile does NOT exist in profiles table',
        error: profileError
      });
    } else {
      results.push({
        step: '3. Profile Check',
        success: true,
        message: 'Profile exists',
        data: {
          name: profile.name,
          email: profile.email,
          account_type: profile.account_type
        }
      });
    }

    // Step 4: Check RLS Policies - Try to read invoices
    const { data: invoices, error: invoicesError } = await supabaseClient
      .from('invoices')
      .select('id, invoice_number, seller_id, client_name, total_amount, status')
      .eq('seller_id', user.id)
      .limit(10);

    if (invoicesError) {
      results.push({
        step: '4. RLS Policy Check (Read)',
        success: false,
        message: `RLS policy blocking read: ${invoicesError.message}`,
        error: {
          code: invoicesError.code,
          message: invoicesError.message,
          details: invoicesError.details,
          hint: invoicesError.hint
        }
      });
    } else {
      results.push({
        step: '4. RLS Policy Check (Read)',
        success: true,
        message: `RLS allows read. Found ${invoices?.length || 0} invoices`,
        data: invoices
      });
    }

    // Step 5: Check RLS Policies - Try to insert (test with minimal data)
    const testInvoiceNumber = `TEST-${Date.now()}`;
    const { data: testInsert, error: insertError } = await supabaseClient
      .from('invoices')
      .insert({
        invoice_number: testInvoiceNumber,
        seller_id: user.id,
        client_name: 'Test Client',
        client_email: 'test@example.com',
        invoice_date: new Date().toISOString().split('T')[0],
        payment_type: 'full',
        subtotal: 100,
        total_amount: 100,
        status: 'draft'
      })
      .select()
      .single();

    if (insertError) {
      results.push({
        step: '5. RLS Policy Check (Insert)',
        success: false,
        message: `RLS policy blocking insert: ${insertError.message}`,
        error: {
          code: insertError.code,
          message: insertError.message,
          details: insertError.details,
          hint: insertError.hint
        }
      });
    } else {
      results.push({
        step: '5. RLS Policy Check (Insert)',
        success: true,
        message: 'RLS allows insert. Test invoice created',
        data: testInsert
      });

      // Clean up test invoice
      await supabaseClient
        .from('invoices')
        .delete()
        .eq('id', testInsert.id);
    }

    // Step 6: Check Invoice Items Table
    const { data: items, error: itemsError } = await supabaseClient
      .from('invoice_items')
      .select('id, invoice_id, description')
      .limit(5);

    if (itemsError) {
      results.push({
        step: '6. Invoice Items Table Access',
        success: false,
        message: `Cannot access invoice_items: ${itemsError.message}`,
        error: itemsError
      });
    } else {
      results.push({
        step: '6. Invoice Items Table Access',
        success: true,
        message: `Can access invoice_items. Found ${items?.length || 0} items`,
        data: items
      });
    }

    // Step 7: Check Database Schema
    const { data: schemaCheck, error: schemaError } = await supabaseClient
      .from('invoices')
      .select('*')
      .limit(0);

    if (schemaError && schemaError.code === '42703') {
      results.push({
        step: '7. Database Schema',
        success: false,
        message: 'Schema mismatch - column does not exist',
        error: schemaError
      });
    } else {
      results.push({
        step: '7. Database Schema',
        success: true,
        message: 'Schema appears correct'
      });
    }

    // Step 8: Check All Invoices (for debugging)
    const { data: allInvoices, error: allError } = await supabaseClient
      .from('invoices')
      .select('id, invoice_number, seller_id, client_name, created_at')
      .order('created_at', { ascending: false })
      .limit(5);

    if (allError) {
      results.push({
        step: '8. All Invoices Check',
        success: false,
        message: `Cannot fetch all invoices: ${allError.message}`,
        error: allError
      });
    } else {
      results.push({
        step: '8. All Invoices Check',
        success: true,
        message: `Found ${allInvoices?.length || 0} total invoices in database`,
        data: allInvoices
      });
    }

  } catch (error: any) {
    results.push({
      step: 'Error in Diagnostics',
      success: false,
      message: `Unexpected error: ${error.message}`,
      error: error
    });
  }

  return results;
}

/**
 * Print diagnostic results to console
 */
export function printDiagnostics(results: DebugResult[]) {
  console.log('\n🔍 ========== INVOICE SYSTEM DIAGNOSTICS ==========\n');
  
  results.forEach((result, index) => {
    const icon = result.success ? '✅' : '❌';
    console.log(`${icon} ${result.step}`);
    console.log(`   ${result.message}`);
    
    if (result.data) {
      console.log('   Data:', result.data);
    }
    
    if (result.error) {
      console.log('   Error:', result.error);
    }
    
    console.log('');
  });
  
  console.log('================================================\n');
  
  const failed = results.filter(r => !r.success);
  if (failed.length > 0) {
    console.log(`⚠️  ${failed.length} issue(s) found. Review errors above.`);
  } else {
    console.log('✅ All checks passed!');
  }
}
