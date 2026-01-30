import React from 'react';
import { PublicLayout } from '../../components/layout/PublicLayout';
export function RefundPage() {
  return (
    <PublicLayout>
      <div className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Refund & Cancellation Policy
          </h1>
          <p className="text-slate-500 mb-12">Last updated: January 25, 2026</p>

          <div className="prose prose-slate max-w-none">
            <h3>1. Subscription Refunds</h3>
            <p>
              We offer a 14-day free trial for all new users. You will not be
              charged during this period. Once your paid subscription begins,
              you may cancel at any time.
            </p>
            <p>
              If you cancel your subscription, you will retain access to the
              service until the end of your current billing period. We generally
              do not offer refunds for partial subscription periods, but
              exceptions may be made on a case-by-case basis if you contact
              support within 7 days of a charge.
            </p>

            <h3>2. Transaction Disputes</h3>
            <p>
              Trustpay facilitates payments between buyers and sellers but is
              not a party to the underlying transaction. If you are a buyer and
              have an issue with goods or services received:
            </p>
            <ul>
              <li>
                <strong>First Step:</strong> Contact the seller directly to
                resolve the issue.
              </li>
              <li>
                <strong>Second Step:</strong> If you cannot resolve the issue
                with the seller, you may raise a dispute through the Trustpay
                platform within 15 days of payment.
              </li>
            </ul>
            <p>
              We will investigate disputes where goods/services were not
              delivered or were significantly different from the description. We
              do not guarantee refunds for quality disputes or buyer's remorse.
            </p>

            <h3>3. Processing Errors</h3>
            <p>
              If a transaction is processed in error (e.g., duplicate charge),
              please contact support@trustpay.in immediately. We will
              investigate and process a full refund for any technical errors on
              our part within 5-7 business days.
            </p>

            <h3>4. Chargebacks</h3>
            <p>
              If you initiate a chargeback with your bank without first
              contacting us, your account may be suspended pending
              investigation. We encourage you to reach out to our support team
              first to resolve any billing issues.
            </p>

            <h3>5. Refund Timeline</h3>
            <p>
              Approved refunds are typically processed within 5-7 business days
              and returned to the original payment method. The time it takes for
              the funds to appear in your account depends on your bank's
              processing times.
            </p>

            <h3>6. Contact Us</h3>
            <p>
              For any questions regarding refunds or cancellations, please
              contact our support team at support@trustpay.in.
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>);

}