import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, CreditCard, PieChart, Clock, CheckCircle } from 'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { Button } from '../../components/ui/Button';
export function BuyerBenefitsPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Pay Invoices Your Way
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Trustopay gives you flexible payment options, secure escrow, and
            complete control over your business spending.
          </p>
          <Link to="/welcome">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white border-none">

              Sign Up as Buyer
            </Button>
          </Link>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
            {
              icon: PieChart,
              title: 'Split Payments',
              desc: 'Break large invoices into manageable chunks.'
            },
            {
              icon: Clock,
              title: 'EMI Options',
              desc: 'Pay over 3, 6, or 12 months for better cash flow.'
            },
            {
              icon: Shield,
              title: 'Secure Escrow',
              desc: 'Funds are held safely until milestones are met.'
            },
            {
              icon: CreditCard,
              title: 'Multiple Methods',
              desc: 'Pay via UPI, Card, NetBanking, or Wallet.'
            }].
            map((item, i) =>
            <div
              key={i}
              className="p-6 border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">

                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
            {
              step: '1',
              title: 'Receive Invoice',
              desc: 'Get a professional payment link from your vendor.'
            },
            {
              step: '2',
              title: 'Choose Method',
              desc: 'Select full payment, milestones, or EMI plan.'
            },
            {
              step: '3',
              title: 'Pay Securely',
              desc: 'Complete payment via our secure gateway.'
            }].
            map((item, i) =>
            <div key={i} className="relative">
                <div className="h-16 w-16 bg-white border-2 border-blue-600 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 mx-auto mb-6 z-10 relative">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
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
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
            {
              q: 'Is my payment secure?',
              a: 'Yes, we use bank-grade encryption and RBI-compliant payment gateways.'
            },
            {
              q: 'Can I pay in installments?',
              a: 'Yes, if the seller enables it, you can choose 3, 6, or 12 month EMI plans.'
            },
            {
              q: 'Do I need an account?',
              a: 'You can view invoices without an account, but need one to make payments for security.'
            }].
            map((faq, i) =>
            <div key={i} className="bg-slate-50 p-6 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-2">{faq.q}</h4>
                <p className="text-slate-600">{faq.a}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to simplify your payments?
          </h2>
          <Link to="/welcome">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 border-none">

              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>);

}