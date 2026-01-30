import React from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Book,
  MessageCircle,
  Mail,
  FileText,
  CreditCard,
  User,
  Shield } from
'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
export function SupportPage() {
  return (
    <PublicLayout>
      {/* Hero Search */}
      <section className="bg-blue-600 py-20 text-center text-white">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            How can we help you?
          </h1>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search for articles, guides, and help..."
              className="w-full pl-12 pr-4 py-4 rounded-lg text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-400/50 shadow-lg" />

          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
            {
              icon: Book,
              title: 'Getting Started',
              desc: 'Account setup, verification, and basics'
            },
            {
              icon: FileText,
              title: 'Invoicing',
              desc: 'Creating, sending, and managing invoices'
            },
            {
              icon: CreditCard,
              title: 'Payments',
              desc: 'Payment methods, fees, and settlements'
            },
            {
              icon: User,
              title: 'Account Management',
              desc: 'Profile settings, team members, and roles'
            },
            {
              icon: Shield,
              title: 'Security & Privacy',
              desc: '2FA, password reset, and data protection'
            },
            {
              icon: MessageCircle,
              title: 'Troubleshooting',
              desc: 'Common issues and error messages'
            }].
            map((cat, i) =>
            <div
              key={i}
              className="bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">

                <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  <cat.icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{cat.title}</h3>
                <p className="text-sm text-slate-500">{cat.desc}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            Popular Articles
          </h2>
          <div className="space-y-4">
            {[
            'How to verify your bank account for payouts',
            'Setting up automated payment reminders',
            'Understanding transaction fees and GST',
            'How to enable EMI options for your clients',
            'Integrating Trustpay with Tally/Zoho'].
            map((article, i) =>
            <Link
              key={i}
              to="#"
              className="block p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">

                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-medium">{article}</span>
                  <span className="text-slate-400 text-sm">Read article →</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            Still need help?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
              <Mail className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Email Support</h3>
              <p className="text-slate-600 mb-6">
                Get a response within 24 hours
              </p>
              <Button variant="outline" className="w-full">
                support@trustpay.in
              </Button>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
              <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Live Chat</h3>
              <p className="text-slate-600 mb-6">
                Available Mon-Fri, 9am - 6pm
              </p>
              <Button className="w-full">Start Chat</Button>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-sm text-slate-500">
              Check our{' '}
              <Link to="#" className="text-blue-600 hover:underline">
                System Status
              </Link>{' '}
              page for real-time updates.
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>);

}