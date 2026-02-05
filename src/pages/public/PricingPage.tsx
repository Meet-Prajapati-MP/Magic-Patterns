import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, HelpCircle, Shield, X } from 'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
export function PricingPage() {
  return (
    <PublicLayout>
      {/* Section 1: Hero */}
      <section className="pt-24 pb-20 bg-slate-900 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Simple Pricing. <span className="text-blue-400">No Hidden Fees.</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            One plan, all features, unlimited potential. Start growing your
            business today.
          </p>
        </div>
      </section>

      {/* Section 2: Main Pricing Card */}
      <section className="py-20 bg-white -mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 relative z-10">
            <div className="bg-blue-600 p-2 text-center text-white text-sm font-bold">
              MOST POPULAR
            </div>
            <div className="p-8 text-center border-b border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Professional Plan
              </h3>
              <div className="flex justify-center items-baseline my-6">
                <span className="text-5xl font-extrabold text-slate-900">
                  ₹499
                </span>
                <span className="text-slate-500 ml-2">/ year</span>
              </div>
              <p className="text-sm text-slate-500 mb-8">
                Equivalent to just ₹42/month
              </p>
              <Link to="/welcome">
                <Button size="lg" className="w-full">
                  Start Free Trial
                </Button>
              </Link>
              <p className="text-xs text-slate-400 mt-4">
                14 days free • No credit card required
              </p>
            </div>
            <div className="p-8 bg-slate-50">
              <p className="font-bold text-slate-900 mb-4">
                Everything included:
              </p>
              <ul className="space-y-4">
                {[
                'Unlimited invoices & clients',
                'All payment methods (UPI, Cards, EMI)',
                'Automated WhatsApp & Email reminders',
                'Client management (CRM)',
                'Payment links & pages',
                'EMI & Split payment options',
                'Real-time analytics dashboard',
                'Priority email & chat support',
                'API access for integrations'].
                map((feature, i) =>
                <li
                  key={i}
                  className="flex items-start text-slate-700 text-sm">

                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Payment Fees Table */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Transaction Fees
            </h2>
            <p className="text-lg text-slate-600">
              Standard payment gateway charges apply only when you get paid.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 font-bold text-slate-900">
                    Payment Method
                  </th>
                  <th className="p-4 font-bold text-slate-900">
                    Fee per Transaction
                  </th>
                  <th className="p-4 font-bold text-slate-900">
                    Settlement Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-4 text-slate-700">UPI</td>
                  <td className="p-4 text-slate-700 font-medium">0% (Free)</td>
                  <td className="p-4 text-slate-700">Instant</td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-700">Debit Cards</td>
                  <td className="p-4 text-slate-700 font-medium">1%</td>
                  <td className="p-4 text-slate-700">T+1 Day</td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-700">Credit Cards</td>
                  <td className="p-4 text-slate-700 font-medium">2%</td>
                  <td className="p-4 text-slate-700">T+1 Day</td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-700">Net Banking</td>
                  <td className="p-4 text-slate-700 font-medium">1.5%</td>
                  <td className="p-4 text-slate-700">T+1 Day</td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-700">EMI / Split Pay</td>
                  <td className="p-4 text-slate-700 font-medium">2-3%</td>
                  <td className="p-4 text-slate-700">T+1 Day</td>
                </tr>
              </tbody>
            </table>
            <div className="p-4 bg-blue-50 border-t border-blue-100 text-sm text-blue-800 flex items-start">
              <HelpCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <p>
                <strong>Pro Tip:</strong> You can choose to pass these fees to
                your client or absorb them yourself in the invoice settings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: What's Included */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              What You Get
            </h2>
            <p className="text-lg text-slate-600">
              Every feature is included. We don't hide tools behind expensive
              tiers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
            {
              title: 'Unlimited Invoicing',
              desc: 'Create and send as many invoices as you need. No caps, no limits.'
            },
            {
              title: 'Smart Reminders',
              desc: 'Automated follow-ups via WhatsApp and Email to get you paid faster.'
            },
            {
              title: 'Client Portal',
              desc: 'Give your clients a professional dashboard to view and pay invoices.'
            },
            {
              title: 'Recurring Billing',
              desc: 'Set up subscriptions or retainers that auto-bill your clients.'
            },
            {
              title: 'Expense Tracking',
              desc: 'Log your business expenses to see your true profit (Coming Soon).'
            },
            {
              title: 'GST Reports',
              desc: 'One-click GSTR-1 reports to make tax filing a breeze.'
            }].
            map((item, i) =>
            <div
              key={i}
              className="bg-white p-6 rounded-xl border border-slate-200">

                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section 5: Compare to Others */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Why Choose Trustpay?
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-slate-100">
                  <th className="p-4 w-1/3"></th>
                  <th className="p-4 w-1/3 text-center bg-blue-50 rounded-t-xl border-t border-x border-blue-100">
                    <span className="text-blue-600 font-bold text-lg">
                      Trustpay
                    </span>
                  </th>
                  <th className="p-4 w-1/3 text-center text-slate-500 font-medium">
                    Traditional Software
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                {
                  feature: 'Annual Cost',
                  us: '₹499',
                  them: '₹5,000+'
                },
                {
                  feature: 'Payment Gateway',
                  us: 'Integrated',
                  them: 'Separate Setup'
                },
                {
                  feature: 'WhatsApp Reminders',
                  us: 'Included',
                  them: 'Extra Cost / Manual'
                },
                {
                  feature: 'EMI Options',
                  us: 'Included',
                  them: 'Not Available'
                },
                {
                  feature: 'Invoice Discounting',
                  us: 'Available',
                  them: 'Not Available'
                },
                {
                  feature: 'Setup Time',
                  us: '2 Minutes',
                  them: 'Days'
                }].
                map((row, i) =>
                <tr key={i}>
                    <td className="p-4 font-medium text-slate-900">
                      {row.feature}
                    </td>
                    <td className="p-4 text-center bg-blue-50/30 border-x border-blue-50 font-bold text-slate-900">
                      {row.us}
                    </td>
                    <td className="p-4 text-center text-slate-500">
                      {row.them}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 6: Enterprise */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-lg text-slate-300 mb-8">
            For large agencies and enterprises processing over ₹1 Crore/month.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left max-w-2xl mx-auto">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-blue-400 mr-3" /> Volume
              discounts
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-blue-400 mr-3" /> Dedicated
              account manager
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-blue-400 mr-3" /> Custom API
              integrations
            </div>
          </div>
          <Link to="/contact">
            <Button
              variant="outline"
              size="lg"
              className="text-white border-white hover:bg-white/10">

              Contact Sales
            </Button>
          </Link>
        </div>
      </section>

      {/* Section 7: FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Pricing FAQ
          </h2>
          <div className="space-y-6">
            {[
            {
              q: 'When am I charged?',
              a: 'You are charged ₹499 once a year. Your first 14 days are completely free.'
            },
            {
              q: 'Can I cancel anytime?',
              a: 'Yes, you can cancel your subscription at any time from your dashboard. You will retain access until the end of your billing period.'
            },
            {
              q: 'Is there a free trial?',
              a: 'Yes, we offer a 14-day free trial with full access to all features. No credit card required to start.'
            },
            {
              q: 'What happens after the trial?',
              a: 'You will be asked to subscribe to the annual plan to continue sending invoices. Your data will be saved.'
            },
            {
              q: 'Are there any hidden fees?',
              a: 'No hidden fees. You only pay the annual subscription + standard transaction fees when you receive payments.'
            }].
            map((faq, i) =>
            <div
              key={i}
              className="bg-slate-50 p-6 rounded-lg border border-slate-100">

                <h4 className="font-bold text-slate-900 mb-2">{faq.q}</h4>
                <p className="text-slate-600">{faq.a}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section 8: Final CTA */}
      <section className="py-20 bg-blue-600 text-center text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">
            Start your free trial today
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join 10,000+ businesses growing with Trustpay.
          </p>
          <Link to="/welcome">
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 py-3 rounded-md text-white font-medium bg-[#1D4ED8] shadow-sm hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#1D4ED8]/20 border-2 border-transparent hover:border-white/30 transition-all duration-200">

              Get Started Free
            </Button>
          </Link>
          <div className="mt-6 flex items-center justify-center text-sm text-blue-200">
            <Shield className="h-4 w-4 mr-2" />
            30-day money-back guarantee
          </div>
        </div>
      </section>
    </PublicLayout>);

}