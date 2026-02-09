// import React from 'react';
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation } from
'react-router-dom';
import { ProfileProvider } from './components/context/ProfileContext';
// Public
import { LandingPage } from './pages/public/LandingPage';
import { ProductPage } from './pages/public/ProductPage';
import { SolutionsPage } from './pages/public/SolutionsPage';
import { BuyerBenefitsPage } from './pages/public/BuyerBenefitsPage';
import { SellerBenefitsPage } from './pages/public/SellerBenefitsPage';
import { PricingPage } from './pages/public/PricingPage';
import { AboutPage } from './pages/public/AboutPage';
import { ContactPage } from './pages/public/ContactPage';
import { PublicInvoicePage } from './pages/shared/PublicInvoicePage';
import { PaymentFlowPage } from './pages/public/PaymentFlowPage';
import { ReceiptPage } from './pages/public/ReceiptPage';
import { TermsPage } from './pages/public/TermsPage';
import { PrivacyPage } from './pages/public/PrivacyPage';
import { RefundPage } from './pages/public/RefundPage';
import { SecurityPage } from './pages/public/SecurityPage';
import { SupportPage } from './pages/public/SupportPage';
// Auth
import { WelcomePage } from './pages/auth/WelcomePage';
import { AuthStartPage } from './pages/auth/AuthStartPage';
import { LoginPage } from './pages/auth/LoginPage';
import { VerifyOTPPage } from './pages/auth/VerifyOTPPage';
import { OnboardingPage } from './pages/auth/OnboardingPage';
// Dev
import { DevOTPInboxPage } from './pages/dev/DevOTPInboxPage';
// Seller
import { SellerDashboard } from './pages/seller/SellerDashboard';
import { InvoiceListPage } from './pages/seller/InvoiceListPage';
import { CreateInvoicePage } from './pages/seller/CreateInvoicePage';
// import { InvoiceDetailPage } from './pages/seller/InvoiceDetailPage';
// import { ClientsPage } from './pages/seller/ClientsPage';
// import { ClientDetailPage } from './pages/seller/ClientDetailPage';
// import { EMIPlansPage } from './pages/seller/EMIPlansPage';
// import { TransactionsPage } from './pages/seller/TransactionsPage';
// import { PayoutsPage } from './pages/seller/PayoutsPage';
// import { SubscriptionPage } from './pages/seller/SubscriptionPage';
// import { DisputesPage } from './pages/seller/DisputesPage';
// import { SellerSettingsPage } from './pages/seller/SellerSettingsPage';
// import { ProfileSettingsPage } from './pages/seller/settings/ProfileSettingsPage';
// import { BusinessSettingsPage } from './pages/seller/settings/BusinessSettingsPage';
// import { NotificationSettingsPage } from './pages/seller/settings/NotificationSettingsPage';
// import { TemplateSettingsPage } from './pages/seller/settings/TemplateSettingsPage';
// import { FinancingDashboardPage } from './pages/seller/financing/FinancingDashboardPage';
// import { FinancingRequestPage } from './pages/seller/financing/FinancingRequestPage';
// import { FinancingOfferPage } from './pages/seller/financing/FinancingOfferPage';
// import { FinancingDetailPage } from './pages/seller/financing/FinancingDetailPage';
// Buyer
// import { BuyerHomePage } from './pages/buyer/BuyerHomePage';
import { BuyerInvoicesPage } from './pages/buyer/BuyerInvoicesPage';
import { BuyerCreateInvoicePage } from './pages/buyer/BuyerCreateInvoicePage';
import { BuyerInvoiceDetailPage } from './pages/buyer/BuyerInvoiceDetailPage';
import { PaymentGatewayPage } from './pages/buyer/PaymentGatewayPage';
import { PaymentProcessingPage } from './pages/buyer/PaymentProcessingPage';
import { PaymentSuccessPage } from './pages/buyer/PaymentSuccessPage';
import { PaymentFailurePage } from './pages/buyer/PaymentFailurePage';
import { BuyerEMIPage } from './pages/buyer/BuyerEMIPage';
import { EMIDetailPage } from './pages/buyer/EMIDetailPage';
import { AutopaySetupPage } from './pages/buyer/AutopaySetupPage';
import { BuyerTransactionsPage } from './pages/buyer/BuyerTransactionsPage';
import { BuyerProfilePage } from './pages/buyer/BuyerProfilePage';
import { BuyerSupportPage } from './pages/buyer/BuyerSupportPage';
// import { DisputeDetailPage } from './pages/buyer/DisputeDetailPage';
// import { TicketDetailPage } from './pages/buyer/TicketDetailPage';
import { BuyerProfileSettingsPage } from './pages/buyer/settings/ProfileSettingsPage';
import { BuyerNotificationSettingsPage } from './pages/buyer/settings/NotificationSettingsPage';
// Admin
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UserManagementPage } from './pages/admin/UserManagementPage';
import { UserDetailPage } from './pages/admin/UserDetailPage';
import { KYCReviewPage } from './pages/admin/KYCReviewPage';
import { AdminInvoicesPage } from './pages/admin/AdminInvoicesPage';
import { AdminTransactionsPage } from './pages/admin/AdminTransactionsPage';
import { AdminSubscriptionsPage } from './pages/admin/AdminSubscriptionsPage';
import { AdminDisputesPage } from './pages/admin/AdminDisputesPage';
import { AdminPartnersPage } from './pages/admin/AdminPartnersPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AuditLogsPage } from './pages/admin/AuditLogsPage';
// NBFC
import { NBFCDashboard } from './pages/nbfc/NBFCDashboard';
import { ApplicationsPage } from './pages/nbfc/ApplicationsPage';
import { ApplicationDetailPage } from './pages/nbfc/ApplicationDetailPage';
import { DisbursementsPage } from './pages/nbfc/DisbursementsPage';
import { CollectionsPage } from './pages/nbfc/CollectionsPage';
import { NBFCReportsPage } from './pages/nbfc/NBFCReportsPage';
import { NBFCSettingsPage } from './pages/nbfc/NBFCSettingsPage';
import { HomePage } from './pages/dashboard/HomePage';
// import { UpgradeToBusinessPage } from './pages/settings/UpgradeToBusinessPage';
// import { BusinessTeamPage } from './pages/settings/BusinessTeamPage';

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <ProfileProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/buyer-benefits" element={<BuyerBenefitsPage />} />
          <Route path="/seller-benefits" element={<SellerBenefitsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Legal & Support */}
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/refund" element={<RefundPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/help" element={<SupportPage />} />
          {/* Public Payment Flows */}
          <Route path="/invoice/:id/public" element={<PublicInvoicePage />} />
          <Route path="/i/:token" element={<PublicInvoicePage />} />
          {/* Alias */}
          <Route path="/pay/:token" element={<PaymentFlowPage />} />
          <Route path="/receipts/:id" element={<ReceiptPage />} />
          {/* Auth Routes */}
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/auth/start" element={<AuthStartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify-otp" element={<VerifyOTPPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          {/* Dev Routes */}
          <Route path="/dev/otp-inbox" element={<DevOTPInboxPage />} />
          {/* Unified Dashboard Routes (Same for Individual & Business) */}
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/invoices" element={<BuyerInvoicesPage />} />
          <Route path="/invoices/create" element={<BuyerCreateInvoicePage />} />
          <Route path="/invoices/:id" element={<BuyerInvoiceDetailPage />} />
          <Route path="/transactions" element={<BuyerTransactionsPage />} />
          <Route path="/emi-plans" element={<BuyerEMIPage />} />
          <Route path="/emi-plans/:id" element={<EMIDetailPage />} />
          <Route path="/support" element={<BuyerSupportPage />} />
          <Route path="/settings" element={<BuyerProfilePage />} />
          <Route
            path="/settings/notifications"
            element={<BuyerNotificationSettingsPage />} />

          <Route
            path="/settings/profile"
            element={<BuyerProfileSettingsPage />} />

          {/* Payment Routes */}
          <Route path="/invoices/:id/pay" element={<PaymentGatewayPage />} />
          <Route
            path="/payment/processing"
            element={<PaymentProcessingPage />} />

          <Route path="/payment/success" element={<PaymentSuccessPage />} />
          <Route path="/payment/failure" element={<PaymentFailurePage />} />
          <Route path="/autopay/setup" element={<AutopaySetupPage />} />
          
          {/* Seller Routes - Use Seller Pages */}
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/invoices" element={<InvoiceListPage />} />
          <Route path="/seller/invoices/create" element={<CreateInvoicePage />} />

          <Route
            path="/seller/transactions"
            element={<Navigate to="/transactions" replace />} />

          <Route
            path="/seller/emi-plans"
            element={<Navigate to="/emi-plans" replace />} />

          <Route
            path="/buyer/home"
            element={<Navigate to="/dashboard" replace />} />

          <Route
            path="/buyer/invoices"
            element={<Navigate to="/invoices" replace />} />

          <Route
            path="/buyer/create-invoice"
            element={<Navigate to="/invoices/create" replace />} />

          <Route
            path="/buyer/transactions"
            element={<Navigate to="/transactions" replace />} />

          <Route
            path="/buyer/emi-plans"
            element={<Navigate to="/emi-plans" replace />} />

          <Route
            path="/buyer/support"
            element={<Navigate to="/support" replace />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagementPage />} />
          <Route path="/admin/users/:id" element={<UserDetailPage />} />
          <Route path="/admin/kyc-review" element={<KYCReviewPage />} />
          <Route path="/admin/invoices" element={<AdminInvoicesPage />} />
          <Route
            path="/admin/transactions"
            element={<AdminTransactionsPage />} />

          <Route
            path="/admin/subscriptions"
            element={<AdminSubscriptionsPage />} />

          <Route path="/admin/disputes" element={<AdminDisputesPage />} />
          <Route path="/admin/partners" element={<AdminPartnersPage />} />
          <Route path="/admin/audit-logs" element={<AuditLogsPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
          {/* NBFC Routes */}
          <Route path="/nbfc/dashboard" element={<NBFCDashboard />} />
          <Route path="/nbfc/applications" element={<ApplicationsPage />} />
          <Route
            path="/nbfc/applications/:appId"
            element={<ApplicationDetailPage />} />

          <Route path="/nbfc/disbursements" element={<DisbursementsPage />} />
          <Route path="/nbfc/collections" element={<CollectionsPage />} />
          <Route path="/nbfc/reports" element={<NBFCReportsPage />} />
          <Route path="/nbfc/settings" element={<NBFCSettingsPage />} />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ProfileProvider>);

}
export { App };