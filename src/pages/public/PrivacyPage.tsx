import React from 'react';
import { PublicLayout } from '../../components/layout/PublicLayout';
export function PrivacyPage() {
  return (
    <PublicLayout>
      <div className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-500 mb-12">Last updated: January 25, 2026</p>

          <div className="prose prose-slate max-w-none">
            <h3>1. Introduction</h3>
            <p>
              Trustpay respects your privacy and is committed to protecting your
              personal data. This privacy policy will inform you as to how we
              look after your personal data when you visit our website or use
              our services and tell you about your privacy rights and how the
              law protects you.
            </p>

            <h3>2. Data We Collect</h3>
            <p>
              We may collect, use, store and transfer different kinds of
              personal data about you which we have grouped together follows:
            </p>
            <ul>
              <li>
                <strong>Identity Data:</strong> includes first name, last name,
                username or similar identifier.
              </li>
              <li>
                <strong>Contact Data:</strong> includes billing address,
                delivery address, email address and telephone numbers.
              </li>
              <li>
                <strong>Financial Data:</strong> includes bank account and
                payment card details.
              </li>
              <li>
                <strong>Transaction Data:</strong> includes details about
                payments to and from you and other details of products and
                services you have purchased from us.
              </li>
              <li>
                <strong>Technical Data:</strong> includes internet protocol (IP)
                address, your login data, browser type and version, time zone
                setting and location, browser plug-in types and versions,
                operating system and platform and other technology on the
                devices you use to access this website.
              </li>
            </ul>

            <h3>3. How We Use Your Data</h3>
            <p>
              We will only use your personal data when the law allows us to.
              Most commonly, we will use your personal data in the following
              circumstances:
            </p>
            <ul>
              <li>
                Where we need to perform the contract we are about to enter into
                or have entered into with you.
              </li>
              <li>
                Where it is necessary for our legitimate interests (or those of
                a third party) and your interests and fundamental rights do not
                override those interests.
              </li>
              <li>
                Where we need to comply with a legal or regulatory obligation.
              </li>
            </ul>

            <h3>4. Data Security</h3>
            <p>
              We have put in place appropriate security measures to prevent your
              personal data from being accidentally lost, used or accessed in an
              unauthorized way, altered or disclosed. In addition, we limit
              access to your personal data to those employees, agents,
              contractors and other third parties who have a business need to
              know.
            </p>

            <h3>5. Data Retention</h3>
            <p>
              We will only retain your personal data for as long as necessary to
              fulfil the purposes we collected it for, including for the
              purposes of satisfying any legal, accounting, or reporting
              requirements.
            </p>

            <h3>6. Your Legal Rights</h3>
            <p>
              Under certain circumstances, you have rights under data protection
              laws in relation to your personal data, including the right to
              request access, correction, erasure, restriction, transfer, to
              object to processing, to portability of data and (where the lawful
              ground of processing is consent) to withdraw consent.
            </p>

            <h3>7. Third-Party Links</h3>
            <p>
              This website may include links to third-party websites, plug-ins
              and applications. Clicking on those links or enabling those
              connections may allow third parties to collect or share data about
              you. We do not control these third-party websites and are not
              responsible for their privacy statements.
            </p>

            <h3>8. Contact Details</h3>
            <p>
              If you have any questions about this privacy policy or our privacy
              practices, please contact us at privacy@trustpay.in.
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>);

}