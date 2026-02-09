import { createClient } from "@supabase/supabase-js";

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://mpmdgskwhfvpihoenuyn.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wbWRnc2t3aGZ2cGlob2VudXluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwOTU2OTUsImV4cCI6MjA4NTY3MTY5NX0.2bkZ1ThLYc7dhxXQ7PV-ghV1umWOYQvvKBC8FLTDPEw";

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'x-client-info': 'trustopay-invoice-app'
    }
  }
});

// Log connection status (development only)
if (import.meta.env.DEV) {
  console.log('🔌 Supabase Client Initialized:', {
    url: supabaseUrl,
    keyPrefix: supabaseAnonKey?.substring(0, 20) + '...',
    keyFormat: supabaseAnonKey?.startsWith('eyJ') ? 'JWT' : supabaseAnonKey?.startsWith('sb_') ? 'Publishable' : 'Unknown'
  });
  
  // Make supabaseClient available globally in browser console for debugging
  if (typeof window !== 'undefined') {
    (window as any).supabaseClient = supabaseClient;
    console.log('💡 Debug: supabaseClient is now available in console as window.supabaseClient');
    console.log('💡 Try: await window.supabaseClient.auth.getUser()');
    
    // Also expose test and diagnostic functions
    import('./services/invoiceService').then((invoiceService) => {
      (window as any).testInvoiceCreation = invoiceService.testInvoiceCreation;
      (window as any).getAllInvoicesUnrestricted = invoiceService.getAllInvoicesUnrestricted;
      (window as any).checkInvoicesForSeller = invoiceService.checkInvoicesForSeller;
      (window as any).checkInvoicesForBuyer = invoiceService.checkInvoicesForBuyer;
      console.log('💡 Debug functions available:');
      console.log('   - testInvoiceCreation() - Test invoice creation');
      console.log('   - getAllInvoicesUnrestricted() - Get ALL invoices (no filters)');
      console.log('   - checkInvoicesForSeller(userId) - Check seller invoices');
      console.log('   - checkInvoicesForBuyer(userId) - Check buyer invoices');
    });
  }
}