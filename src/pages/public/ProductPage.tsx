import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle,
  Zap,
  Shield,
  CreditCard,
  PieChart,
  Bell,
  Users,
  Link as LinkIcon,
  BarChart,
  Lock,
  ArrowRight,
  Smartphone,
  Mail,
  Globe,
  Layers } from
'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
export function ProductPage() {
  return (
    <PublicLayout>
      {/* Section 1: Hero */}
      <section className="pt-24 pb-20 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-blue-300 bg-blue-900/50 mb-8 border border-blue-700">
            <span className="flex h-2 w-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
            The All-in-One Finance Stack
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            The Complete <span className="text-blue-400">Payment Platform</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            From invoice creation to bank settlement — manage your entire
            financial workflow in one place. Built for India's modern
            businesses.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
            <Link to="/welcome">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white border-none">

                Get Started Free
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                size="lg"
                className="text-white border-slate-700 hover:bg-slate-800">

                Talk to Sales
              </Button>
            </Link>
          </div>

          {/* Hero Image / Dashboard Mockup */}
          <div className="relative mx-auto max-w-5xl rounded-xl bg-slate-800 p-2 shadow-2xl ring-1 ring-white/10">
            <div className="rounded-lg bg-slate-900 overflow-hidden aspect-[16/9] flex items-center justify-center border border-slate-700">
              {/* Placeholder for Product Screenshot */}
              <div className="text-center">
                <div className="h-20 w-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart className="h-10 w-10 text-blue-400" />
                </div>
                <p className="text-slate-400 font-medium">
                  Dashboard Interface Preview
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Invoice Creation */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <Layers className="h-6 w-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Create Professional Invoices in Minutes
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Stop using Word documents and spreadsheets. Create beautiful,
                GST-compliant invoices that make you look professional and get
                you paid faster.
              </p>

              <ul className="space-y-4">
                {[
                'Custom branding with your logo and colors',
                'Automatic GST calculation and compliance',
                'Save items and clients for quick reuse',
                'Attach files and contracts securely',
                'Multi-currency support for international clients'].
                map((item, i) =>
                <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                )}
              </ul>
            </div>
            <div className="relative rounded-2xl bg-slate-50 border border-slate-200 p-4 shadow-lg rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="aspect-[4/3] bg-white rounded-xl border border-slate-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="h-8 w-8 text-slate-400" />
                  </div>
                  <p className="text-slate-400 font-medium">
                    Invoice Builder UI
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Payment Collection */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Collect Payments Your Way
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Give your clients the flexibility they need while ensuring you get
              paid on time.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
            {
              icon: Smartphone,
              title: 'UPI & QR',
              desc: 'Instant payments via any UPI app'
            },
            {
              icon: CreditCard,
              title: 'Cards',
              desc: 'Credit & Debit cards supported'
            },
            {
              icon: Globe,
              title: 'Net Banking',
              desc: '50+ banks supported'
            },
            {
              icon: Zap,
              title: 'Wallets',
              desc: 'Paytm, PhonePe, Amazon Pay'
            }].
            map((item, i) =>
            <div
              key={i}
              className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">

                <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            )}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm font-medium text-slate-500 bg-white inline-flex items-center px-4 py-2 rounded-full border border-slate-200 shadow-sm">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Instant settlement to your bank account available
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Automated Reminders */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              {/* Mockup of Reminder Flow */}
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg rounded-tl-none text-sm text-slate-600 w-3/4">
                      <p className="font-medium text-slate-900 mb-1">
                        Invoice #INV-001 is due tomorrow
                      </p>
                      <p>
                        Hi Acme Corp, just a friendly reminder that your invoice
                        for ₹45,000 is due tomorrow.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                      <Smartphone className="h-4 w-4" />
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg rounded-tl-none text-sm text-slate-600 w-3/4">
                      <p className="font-medium text-slate-900 mb-1">
                        WhatsApp Reminder
                      </p>
                      <p>
                        Your payment is now 3 days overdue. Please click here to
                        pay: trustpay.in/pay/xyz
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="h-12 w-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-6">
                <Bell className="h-6 w-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Never Chase Payments Manually
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Set up automated reminders via Email and WhatsApp. We'll gently
                nudge your clients before the due date and follow up if they're
                late.
              </p>

              <div className="space-y-6">
                {[
                {
                  title: 'Smart Scheduling',
                  desc: 'Auto-send on due date, 3 days overdue, and 7 days overdue.'
                },
                {
                  title: 'Multi-channel',
                  desc: 'Reach clients where they are - Email, SMS, and WhatsApp.'
                },
                {
                  title: 'Professional Tone',
                  desc: 'Templates designed to be firm but polite to maintain relationships.'
                }].
                map((item, i) =>
                <div key={i}>
                    <h3 className="font-bold text-slate-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Client Management */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Know Your Clients Better
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Keep track of who pays on time, total revenue per client, and
              outstanding balances.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              <div className="p-8 text-center">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Contact Book</h3>
                <p className="text-sm text-slate-600">
                  Store client details, GSTINs, and multiple contacts in one
                  place.
                </p>
              </div>
              <div className="p-8 text-center">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
                  <PieChart className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">
                  Payment History
                </h3>
                <p className="text-sm text-slate-600">
                  View lifetime value and payment reliability for every client.
                </p>
              </div>
              <div className="p-8 text-center">
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mx-auto mb-4">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Notes & Files</h3>
                <p className="text-sm text-slate-600">
                  Keep private notes and contract documents attached to client
                  profiles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: EMI & Split Payments */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                Increases conversion by 35%
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Offer Flexible Payment Options
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Close bigger deals by letting your clients pay in installments.
                You can offer 3, 6, or 12 month EMI plans directly on your
                invoices.
              </p>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
                <h4 className="font-bold text-slate-900 mb-4">
                  How it works for you:
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm text-slate-700">
                    <CheckCircle className="h-4 w-4 text-blue-600 mr-3" />
                    Enable EMI option on any invoice over ₹10,000
                  </li>
                  <li className="flex items-center text-sm text-slate-700">
                    <CheckCircle className="h-4 w-4 text-blue-600 mr-3" />
                    Client chooses their preferred plan
                  </li>
                  <li className="flex items-center text-sm text-slate-700">
                    <CheckCircle className="h-4 w-4 text-blue-600 mr-3" />
                    We collect payments automatically each month
                  </li>
                  <li className="flex items-center text-sm text-slate-700">
                    <CheckCircle className="h-4 w-4 text-blue-600 mr-3" />
                    Get paid upfront (with Invoice Discounting enabled)
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl transform rotate-3 opacity-20"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-slate-900">Payment Options</h3>
                  <span className="text-sm text-slate-500">
                    Invoice #INV-001
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="p-4 border border-slate-200 rounded-lg flex justify-between items-center hover:border-blue-500 cursor-pointer">
                    <div>
                      <p className="font-bold text-slate-900">
                        Pay Full Amount
                      </p>
                      <p className="text-xs text-slate-500">
                        Instant settlement
                      </p>
                    </div>
                    <span className="font-bold">₹60,000</span>
                  </div>
                  <div className="p-4 border-2 border-blue-600 bg-blue-50 rounded-lg flex justify-between items-center cursor-pointer relative">
                    <div className="absolute -top-3 right-4 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                      Recommended
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Pay in 3 EMIs</p>
                      <p className="text-xs text-slate-500">₹20,000 / month</p>
                    </div>
                    <span className="font-bold text-blue-700">₹20,000 x 3</span>
                  </div>
                  <div className="p-4 border border-slate-200 rounded-lg flex justify-between items-center hover:border-blue-500 cursor-pointer">
                    <div>
                      <p className="font-bold text-slate-900">Pay in 6 EMIs</p>
                      <p className="text-xs text-slate-500">₹10,000 / month</p>
                    </div>
                    <span className="font-bold">₹10,000 x 6</span>
                  </div>
                </div>
                <Button className="w-full mt-6">Proceed to Pay</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Analytics Dashboard */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Track Everything in Real-Time
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Get a clear view of your business health with our powerful
              analytics dashboard.
            </p>
          </div>

          <div className="relative mx-auto max-w-5xl bg-slate-800 rounded-xl p-2 shadow-2xl ring-1 ring-white/10">
            <div className="bg-slate-900 rounded-lg p-8 border border-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                {
                  label: 'Total Revenue',
                  value: '₹12,45,000',
                  change: '+12%',
                  color: 'text-blue-400'
                },
                {
                  label: 'Outstanding',
                  value: '₹3,20,000',
                  change: '4 invoices',
                  color: 'text-yellow-400'
                },
                {
                  label: 'Overdue',
                  value: '₹45,000',
                  change: 'Action needed',
                  color: 'text-red-400'
                },
                {
                  label: 'Avg. Payment Time',
                  value: '12 Days',
                  change: '-2 days',
                  color: 'text-green-400'
                }].
                map((stat, i) =>
                <div
                  key={i}
                  className="bg-slate-800 p-4 rounded-lg border border-slate-700">

                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">
                      {stat.label}
                    </p>
                    <p className={`text-2xl font-bold ${stat.color}`}>
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{stat.change}</p>
                  </div>
                )}
              </div>

              {/* Chart Placeholder */}
              <div className="h-64 bg-slate-800 rounded-lg border border-slate-700 flex items-center justify-center">
                <div className="text-center">
                  <BarChart className="h-12 w-12 text-slate-600 mx-auto mb-2" />
                  <p className="text-slate-500">Revenue Trends Chart</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Payment Links */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                <LinkIcon className="h-6 w-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Quick Payments Without Invoices
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Need to collect a deposit, retainer, or quick fee? Create a
                secure payment link in seconds and share it via WhatsApp, Email,
                or SMS.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                'Collect booking fees',
                'Sell digital products',
                'Accept donations',
                'Event registrations',
                'Consultation fees',
                'Advance payments'].
                map((item, i) =>
                <div
                  key={i}
                  className="flex items-center p-3 bg-slate-50 rounded-lg border border-slate-100">

                    <CheckCircle className="h-4 w-4 text-purple-500 mr-3" />
                    <span className="text-sm font-medium text-slate-700">
                      {item}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="order-1 lg:order-2 bg-slate-50 p-8 rounded-2xl border border-slate-200 text-center">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 max-w-sm mx-auto">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                  <LinkIcon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">
                  Web Design Advance
                </h3>
                <p className="text-2xl font-bold text-slate-900 mb-6">
                  ₹25,000
                </p>
                <div className="bg-slate-50 p-3 rounded border border-slate-200 text-xs text-slate-500 break-all mb-4">
                  trustpay.in/pay/lnk_837492
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    Copy Link
                  </Button>
                  <Button variant="outline" size="sm">
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Security & Compliance */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Bank-Grade Security
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Your data and money are protected by the highest security
              standards in the industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
            {
              icon: Lock,
              title: 'PCI-DSS Compliant',
              desc: 'Highest standard for payment security'
            },
            {
              icon: Shield,
              title: '256-bit Encryption',
              desc: 'All data is encrypted at rest and in transit'
            },
            {
              icon: CheckCircle,
              title: 'RBI Compliant',
              desc: 'Fully compliant with Indian banking regulations'
            },
            {
              icon: Smartphone,
              title: '2-Factor Auth',
              desc: 'Extra layer of security for your account'
            }].
            map((item, i) =>
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">

                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section 10: Integration Ready */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            Works With Your Favorite Tools
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholder Logos */}
            <div className="text-xl font-bold text-slate-400 flex items-center">
              <Layers className="mr-2" /> Tally
            </div>
            <div className="text-xl font-bold text-slate-400 flex items-center">
              <Layers className="mr-2" /> Zoho
            </div>
            <div className="text-xl font-bold text-slate-400 flex items-center">
              <Layers className="mr-2" /> QuickBooks
            </div>
            <div className="text-xl font-bold text-slate-400 flex items-center">
              <Layers className="mr-2" /> Slack
            </div>
            <div className="text-xl font-bold text-slate-400 flex items-center">
              <Layers className="mr-2" /> Zapier
            </div>
          </div>
          <div className="mt-12">
            <Link to="/contact">
              <Button variant="outline">View API Documentation</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-blue-600 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to upgrade your payment stack?
          </h2>
          <Link to="/welcome">
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 py-3 rounded-md text-white font-medium bg-[#1D4ED8] shadow-sm hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#1D4ED8]/20 border-2 border-transparent hover:border-white/30 transition-all duration-200">

              Get Started Free
            </Button>
          </Link>
          <p className="text-blue-200 mt-4 text-sm">
            No credit card required • 14-day free trial
          </p>
        </div>
      </section>
    </PublicLayout>);

}
// Helper icon component for file text
function FileText(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">

      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>);

}