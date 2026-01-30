import React from 'react';
import { PublicLayout } from '../../components/layout/PublicLayout';
export function TermsPage() {
  return (
    <PublicLayout>
      <div className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-slate-500 mb-12">Last updated: January 25, 2026</p>

          <div className="prose prose-slate max-w-none">
            <h3>1. Introduction</h3>
            <p>
              Welcome to Trustpay. By accessing or using our website and
              services, you agree to be bound by these Terms of Service and our
              Privacy Policy. If you do not agree to these terms, please do not
              use our services.
            </p>

            <h3>2. Definitions</h3>
            <p>
              "Trustpay", "we", "us", or "our" refers to Trustpay India Pvt Ltd.
              "User", "you", or "your" refers to any individual or entity using
              our services. "Services" refers to the invoicing, payment
              processing, and related financial tools provided by Trustpay.
            </p>

            <h3>3. Account Registration</h3>
            <p>
              To use our services, you must register for an account. You agree
              to provide accurate, current, and complete information during the
              registration process and to update such information to keep it
              accurate, current, and complete. You are responsible for
              safeguarding your password and for all activities that occur under
              your account.
            </p>

            <h3>4. Payment Services</h3>
            <p>
              Trustpay facilitates payments between buyers and sellers. We are
              not a bank and do not offer banking services. We partner with
              RBI-regulated entities to process payments. By using our payment
              services, you agree to comply with all applicable laws and
              regulations regarding financial transactions.
            </p>

            <h3>5. Fees and Charges</h3>
            <p>
              We charge fees for the use of our services as described on our
              Pricing page. We reserve the right to change our fees upon notice.
              You are responsible for all taxes applicable to the fees and
              charges in any applicable jurisdiction.
            </p>

            <h3>6. Prohibited Activities</h3>
            <p>
              You may not use our services for any illegal or unauthorized
              purpose. You agree not to violate any laws in your jurisdiction
              (including but not limited to copyright or trademark laws).
            </p>

            <h3>7. Termination</h3>
            <p>
              We may terminate or suspend your account immediately, without
              prior notice or liability, for any reason whatsoever, including
              without limitation if you breach the Terms.
            </p>

            <h3>8. Limitation of Liability</h3>
            <p>
              In no event shall Trustpay, nor its directors, employees,
              partners, agents, suppliers, or affiliates, be liable for any
              indirect, incidental, special, consequential or punitive damages,
              including without limitation, loss of profits, data, use,
              goodwill, or other intangible losses.
            </p>

            <h3>9. Governing Law</h3>
            <p>
              These Terms shall be governed and construed in accordance with the
              laws of India, without regard to its conflict of law provisions.
            </p>

            <h3>10. Changes</h3>
            <p>
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. If a revision is material we will try to
              provide at least 30 days notice prior to any new terms taking
              effect.
            </p>

            <h3>11. Contact Us</h3>
            <p>
              If you have any questions about these Terms, please contact us at
              legal@trustpay.in.
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>);

}