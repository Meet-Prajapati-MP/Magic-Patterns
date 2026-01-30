import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, DollarSign, Bell, FileText, TrendingUp } from 'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { Button } from '../../components/ui/Button';
export function SellerBenefitsPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Get Paid Faster, Every Time
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            Professional invoicing, automated reminders, and early payouts for
            modern freelancers and agencies.
          </p>
          <Link to="/welcome">
            <Button size="lg">Sign Up as Seller</Button>
          </Link>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
            {
              icon: FileText,
              title: 'Professional Invoices',
              desc: 'Create GST-compliant invoices in seconds.'
            },
            {
              icon: DollarSign,
              title: 'Multiple Options',
              desc: 'Accept UPI, Cards, and NetBanking easily.'
            },
            {
              icon: TrendingUp,
              title: 'Early Payouts',
              desc: 'Get cash upfront for unpaid invoices (Phase 2).'
            },
            {
              icon: Bell,
              title: 'Auto Reminders',
              desc: "We chase payments so you don't have to."
            },
            {
              icon: Zap,
              title: 'Fast Settlement',
              desc: 'Money in your bank account within 24 hours.'
            }].
            map((item, i) =>
            <div
              key={i}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">

                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-6">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Seller FAQ
          </h2>
          <div className="space-y-6">
            {[
            {
              q: 'How do I get paid early?',
              a: 'Use our Invoice Discounting feature to get up to 90% of invoice value upfront.'
            },
            {
              q: 'What are the fees?',
              a: 'We charge a flat subscription of ₹499/year. Transaction fees apply per payment.'
            },
            {
              q: 'Is it GST compliant?',
              a: 'Yes, all invoices generated are fully GST compliant for India.'
            }].
            map((faq, i) =>
            <div
              key={i}
              className="border border-slate-200 p-6 rounded-lg hover:border-blue-300 transition-colors">

                <h4 className="font-bold text-slate-900 mb-2">{faq.q}</h4>
                <p className="text-slate-600">{faq.a}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-6">
            Start growing your business today
          </h2>
          <Link to="/welcome">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white border-none">

              Create Free Account
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>);

}