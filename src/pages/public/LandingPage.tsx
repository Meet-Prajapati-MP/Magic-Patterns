import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle,
  Zap,
  IndianRupee,
  ArrowRight,
  Play,
  Clock,
  AlertTriangle,
  Users,
  CreditCard,
  Smartphone,
  Globe,
  ChevronDown,
  ChevronUp,
  Star,
  Layout,
  Mail,
  PieChart,
  Link as LinkIcon,
  Landmark,
  TrendingUp,
  Bell } from
'lucide-react';
import { Button } from '../../components/ui/Button';
import { PublicLayout } from '../../components/layout/PublicLayout';
// import { Card, CardContent } from '../../components/ui/Card';
// import { Input } from '../../components/ui/Input';
export function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [emiSplit, setEmiSplit] = useState(false);
  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };
  return (
    <PublicLayout>
      {/* Section 1: Hero */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-50 mb-8 border border-blue-100">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
            Trustpay 2.0 is here
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6 leading-tight">
            Get Paid Faster. <br className="hidden md:block" />
            <span className="text-blue-600">Pay Smarter.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            India's most trusted invoicing and payments platform for
            freelancers, agencies, and SMEs. Send invoices, collect payments,
            and offer EMI — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
            <Link to="/welcome">
              <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                Start Free Trial
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              leftIcon={<Play className="h-4 w-4" />}>

              Watch Demo
            </Button>
          </div>

          {/* Dashboard Mockup */}
          <div className="relative mx-auto max-w-5xl rounded-xl bg-slate-900 p-2 shadow-2xl ring-1 ring-slate-900/10">
            <div className="rounded-lg bg-slate-800 overflow-hidden aspect-[16/9] flex items-center justify-center border border-slate-700">
              <div className="text-center">
                <div className="h-20 w-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Layout className="h-10 w-10 text-blue-400" />
                </div>
                <p className="text-slate-400 font-medium">
                  Dashboard Interface Preview
                </p>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-slate-500 font-medium">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>10,000+ Businesses</span>
            </div>
            <div className="flex items-center space-x-2">
              <IndianRupee className="h-5 w-5 text-green-600" />
              <span>₹50Cr+ Processed</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-amber-500 fill-current" />
              <span>4.9★ Rating</span>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-50 opacity-50 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-indigo-50 opacity-50 blur-3xl"></div>
        </div>
      </section>

      {/* Section 2: Trust Bar */}
      <section className="py-10 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">
            Trusted Payment Infrastructure
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholder Logos */}
            <div className="text-xl font-bold text-slate-600">Razorpay</div>
            <div className="text-xl font-bold text-slate-600">UPI</div>
            <div className="text-xl font-bold text-slate-600">VISA</div>
            <div className="text-xl font-bold text-slate-600">Mastercard</div>
            <div className="text-xl font-bold text-slate-600">RuPay</div>
            <div className="text-xl font-bold text-slate-600">Paytm</div>
            <div className="text-xl font-bold text-slate-600">PhonePe</div>
          </div>
        </div>
      </section>

      {/* Section 3: Problem Statement */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              The Payment Problem Every Business Faces
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Running a business is hard enough without worrying about cash
              flow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-red-50 p-8 rounded-2xl border border-red-100 text-center">
              <div className="h-14 w-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600">
                <Clock className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Late Payments
              </h3>
              <p className="text-slate-600">
                45% of invoices are paid late, causing stress and uncertainty.
              </p>
            </div>
            <div className="bg-amber-50 p-8 rounded-2xl border border-amber-100 text-center">
              <div className="h-14 w-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-600">
                <AlertTriangle className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Cash Flow Gaps
              </h3>
              <p className="text-slate-600">
                Businesses wait 30-90 days for money they've already earned.
              </p>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
              <div className="h-14 w-14 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-600">
                <Mail className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Manual Follow-ups
              </h3>
              <p className="text-slate-600">
                Hours wasted every week sending awkward payment reminders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Solution Overview */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">
            One Platform. Complete Payment Control.
          </h2>

          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-700 -translate-y-1/2 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {[
              {
                step: '1',
                title: 'Create Invoice',
                icon: Layout
              },
              {
                step: '2',
                title: 'Send Link',
                icon: Zap
              },
              {
                step: '3',
                title: 'Get Paid',
                icon: IndianRupee
              },
              {
                step: '4',
                title: 'Track',
                icon: PieChart
              }].
              map((item, i) =>
              <div
                key={i}
                className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-colors">

                  <div className="h-12 w-12 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700 text-blue-400">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                </div>
              )}
            </div>
          </div>

          <p className="mt-12 text-slate-400 max-w-2xl mx-auto">
            Trustpay handles the entire lifecycle of your payments, from the
            moment you finish work to the moment money hits your bank account.
          </p>
        </div>
      </section>

      {/* Section 5: How It Works (Seller) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-50 mb-6">
                For Sellers
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Get Paid on Day 1
              </h2>
              <div className="space-y-8">
                {[
                {
                  title: 'Create professional invoice',
                  desc: 'Takes less than 2 minutes with our templates.'
                },
                {
                  title: 'Send via WhatsApp/Email',
                  desc: 'Reach clients where they are instantly.'
                },
                {
                  title: 'Buyer pays via any method',
                  desc: 'UPI, Card, Net Banking, or EMI options.'
                },
                {
                  title: 'Money in your bank',
                  desc: 'Instant settlement available for eligible users.'
                }].
                map((item, i) =>
                <div key={i} className="flex">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-4">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{item.title}</h3>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-10">
                <Link to="/welcome">
                  <Button size="lg">Start Sending Invoices</Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 bg-slate-50 p-8 rounded-2xl border border-slate-200">
              {/* Abstract representation of seller flow */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-4 border border-slate-100">
                <div className="flex justify-between items-center mb-4">
                  <div className="h-8 w-24 bg-slate-100 rounded"></div>
                  <div className="h-8 w-8 bg-blue-100 rounded-full"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-slate-50 rounded"></div>
                  <div className="h-4 w-3/4 bg-slate-50 rounded"></div>
                  <div className="h-4 w-1/2 bg-slate-50 rounded"></div>
                </div>
                <div className="mt-6 flex justify-end">
                  <div className="h-10 w-32 bg-blue-600 rounded"></div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold text-sm flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" /> Payment Received
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: How It Works (Buyer) */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row-reverse items-center gap-16">
            <div className="flex-1">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-green-600 bg-green-50 mb-6">
                For Buyers
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Pay Your Way
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Trustpay gives you the flexibility to pay large invoices in
                manageable chunks, keeping your cash flow healthy.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <PieChart className="h-6 w-6 text-blue-600 mb-2" />
                  <h3 className="font-bold text-slate-900">Split Payments</h3>
                  <p className="text-sm text-slate-500">
                    Break invoices into parts
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <Clock className="h-6 w-6 text-blue-600 mb-2" />
                  <h3 className="font-bold text-slate-900">EMI Options</h3>
                  <p className="text-sm text-slate-500">3, 6, or 12 months</p>
                </div>
              </div>

              <Link to="/buyer-benefits">
                <Button
                  variant="outline"
                  rightIcon={<ArrowRight className="h-4 w-4" />}>

                  See Payment Options
                </Button>
              </Link>
            </div>
            <div className="flex-1 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center p-4 border border-blue-500 bg-blue-50 rounded-lg">
                  <div className="h-5 w-5 rounded-full border-2 border-blue-600 flex items-center justify-center mr-3">
                    <div className="h-2.5 w-2.5 rounded-full bg-blue-600"></div>
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-slate-900">
                      Pay in 3 EMIs
                    </span>
                    <span className="block text-xs text-slate-500">
                      ₹20,000 / month
                    </span>
                  </div>
                  <span className="font-bold text-blue-700">₹60,000</span>
                </div>
                <div className="flex items-center p-4 border border-slate-200 rounded-lg opacity-60">
                  <div className="h-5 w-5 rounded-full border-2 border-slate-300 mr-3"></div>
                  <div className="flex-1">
                    <span className="font-bold text-slate-900">
                      Pay Full Amount
                    </span>
                  </div>
                  <span className="font-bold text-slate-700">₹60,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Everything You Need to Get Paid
            </h2>
            <p className="text-lg text-slate-600">
              Powerful tools built for the modern Indian business ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
            {
              icon: Layout,
              title: 'Professional Invoices',
              desc: 'Templates, branding, and GST compliance built-in.'
            },
            {
              icon: CreditCard,
              title: 'Multiple Methods',
              desc: 'Accept UPI, cards, wallets, and net banking.'
            },
            {
              icon: Bell,
              title: 'Auto Reminders',
              desc: 'We chase payments via WhatsApp and Email.'
            },
            {
              icon: PieChart,
              title: 'EMI / Split Pay',
              desc: 'Let buyers pay in installments to close deals faster.'
            },
            {
              icon: TrendingUp,
              title: 'Real-time Tracking',
              desc: 'Know exactly when invoices are viewed and paid.'
            },
            {
              icon: Users,
              title: 'Client Management',
              desc: 'CRM to manage contacts and payment history.'
            },
            {
              icon: LinkIcon,
              title: 'Payment Links',
              desc: 'Quick collection links without full invoices.'
            },
            {
              icon: Landmark,
              title: 'Bank Payouts',
              desc: 'Instant settlement to your bank account.'
            }].
            map((feature, i) =>
            <div
              key={i}
              className="p-6 rounded-xl border border-slate-100 hover:shadow-lg transition-shadow bg-white">

                <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600">{feature.desc}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section 8: Payment Methods Showcase */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">
            Accept Every Payment Method
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
            {
              icon: Smartphone,
              label: 'UPI QR'
            },
            {
              icon: CreditCard,
              label: 'Cards'
            },
            {
              icon: Globe,
              label: 'Net Banking'
            },
            {
              icon: Zap,
              label: 'Wallets'
            },
            {
              icon: Clock,
              label: 'EMI'
            }].
            map((method, i) =>
            <div
              key={i}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm">

                <method.icon className="h-10 w-10 text-slate-700 mb-4" />
                <span className="font-bold text-slate-900">{method.label}</span>
              </div>
            )}
          </div>
          <p className="mt-8 text-slate-500 font-medium">
            100+ payment options supported
          </p>
        </div>
      </section>

      {/* Section 9: Split Payments & EMI UI */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Let Your Clients Pay in Parts
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                High ticket size? No problem. Offer EMI options to reduce
                friction and get paid faster.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-slate-700">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Higher conversion rates on large invoices
                </li>
                <li className="flex items-center text-slate-700">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Faster decision making by clients
                </li>
                <li className="flex items-center text-slate-700">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  You get paid, we manage the collection
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-100">
                <div>
                  <p className="text-sm text-slate-500">Total Due</p>
                  <p className="text-3xl font-bold text-slate-900">₹50,000</p>
                </div>
                <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                  INV-2024-001
                </div>
              </div>

              <div className="space-y-4">
                <div
                  className={`p-4 border rounded-xl cursor-pointer transition-all ${!emiSplit ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-slate-200 hover:border-slate-300'}`}
                  onClick={() => setEmiSplit(false)}>

                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">
                      Pay Full Amount
                    </span>
                    <span className="font-bold">₹50,000</span>
                  </div>
                </div>

                <div
                  className={`p-4 border rounded-xl cursor-pointer transition-all ${emiSplit ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-slate-200 hover:border-slate-300'}`}
                  onClick={() => setEmiSplit(true)}>

                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-900">
                      Split into 3 EMIs
                    </span>
                    <span className="font-bold">₹16,667 / mo</span>
                  </div>
                  {emiSplit &&
                  <div className="mt-4 pt-4 border-t border-blue-200 space-y-2 text-sm">
                      <div className="flex justify-between text-slate-600">
                        <span>1st Payment (Today)</span>
                        <span>₹16,667</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>2nd Payment (Next Month)</span>
                        <span>₹16,667</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>3rd Payment (Month 3)</span>
                        <span>₹16,666</span>
                      </div>
                    </div>
                  }
                </div>
              </div>

              <Button className="w-full mt-6" size="lg">
                Proceed to Pay ₹{emiSplit ? '16,667' : '50,000'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: Phase 2 Teaser */}
      <section className="py-24 bg-indigo-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-purple-500 opacity-20 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-indigo-200 bg-indigo-800 mb-6 border border-indigo-700">
            Phase 2 Feature
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Coming Soon: Get 90% Upfront
          </h2>
          <p className="text-xl text-indigo-200 max-w-2xl mx-auto mb-10">
            Don't wait for clients to pay. Get 90% of your invoice value on Day
            1 through our invoice discounting partners.
          </p>

          <div className="max-w-md mx-auto bg-indigo-800/50 p-2 rounded-lg border border-indigo-700 flex flex-col sm:flex-row gap-2 focus-within:border-indigo-400 focus-within:bg-indigo-700/50 transition-all duration-200">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent border-none text-white placeholder-indigo-300 focus:ring-0 focus:outline-none px-4 py-2 transition-all duration-200" />

            <Button className="text-white transition-colors duration-200" style={{ backgroundColor: '#1D4ED8' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e40af'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1D4ED8'}>
              Join Waitlist
            </Button>
          </div>
          <p className="mt-4 text-sm text-indigo-300">
            Powered by RBI-registered NBFCs
          </p>
        </div>
      </section>

      {/* Section 11: Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">
            Loved by 10,000+ Businesses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
            {
              quote:
              'Trustpay has completely transformed how I handle my freelance finances. No more chasing payments!',
              name: 'Priya M.',
              role: 'Freelance Designer',
              rating: 5
            },
            {
              quote:
              'The EMI feature helped us close 3 major deals last month. Clients love the flexibility.',
              name: 'Rahul S.',
              role: 'Agency Founder',
              rating: 5
            },
            {
              quote:
              'Professional invoices and automated reminders save me at least 5 hours every week.',
              name: 'Arjun K.',
              role: 'Consultant',
              rating: 5
            }].
            map((item, i) =>
            <div
              key={i}
              className="bg-slate-50 p-8 rounded-2xl border border-slate-100">

                <div className="flex mb-4 text-amber-400">
                  {[...Array(item.rating)].map((_, j) =>
                <Star key={j} className="h-5 w-5 fill-current" />
                )}
                </div>
                <p className="text-slate-700 mb-6 italic">"{item.quote}"</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-3">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{item.name}</p>
                    <p className="text-sm text-slate-500">{item.role}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section 12: Pricing Preview */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-600 mb-12">
            One plan, all features. No hidden fees.
          </p>

          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            <div className="p-8 bg-slate-900 text-white">
              <h3 className="text-xl font-bold mb-2">Professional Plan</h3>
              <div className="flex justify-center items-baseline my-4">
                <span className="text-5xl font-extrabold">₹499</span>
                <span className="text-slate-400 ml-2">/ year</span>
              </div>
              <p className="text-sm text-slate-400">Less than ₹42 per month</p>
            </div>
            <div className="p-8">
              <ul className="space-y-4 mb-8 text-left">
                {[
                'Unlimited invoices',
                'All payment methods',
                'Automated reminders',
                'Client management',
                'Priority support'].
                map((feature, i) =>
                <li key={i} className="flex items-center text-slate-700">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                )}
              </ul>
              <Link to="/welcome">
                <Button className="w-full" size="lg">
                  Start Free Trial
                </Button>
              </Link>
              <div className="mt-4">
                <Link
                  to="/pricing"
                  className="text-sm text-blue-600 hover:underline">

                  Questions? See full pricing →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 13: FAQ Accordion */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
            {
              q: 'How does Trustpay work?',
              a: 'Trustpay is an invoicing and payments platform. You create an invoice, send it to your client, and they pay via any method. We settle the money to your bank account.'
            },
            {
              q: 'What payment methods are supported?',
              a: 'We support UPI, Credit/Debit Cards, Net Banking, Wallets, and EMI options.'
            },
            {
              q: 'How much does it cost?',
              a: 'We charge a flat subscription of ₹499/year. Standard payment gateway transaction fees apply (approx 2%).'
            },
            {
              q: 'Is my money safe?',
              a: 'Yes, we use RBI-compliant payment gateways and bank-grade security to process all transactions.'
            },
            {
              q: 'How fast do I get paid?',
              a: 'Settlements typically happen within T+1 days (next working day).'
            },
            {
              q: 'Can buyers pay in EMI?',
              a: 'Yes, if you enable it, buyers can choose to pay in 3, 6, or 12 month installments.'
            },
            {
              q: 'Do I need GST registration?',
              a: 'No, you can use Trustpay as an individual freelancer without GST.'
            },
            {
              q: 'How do reminders work?',
              a: 'We automatically send email and WhatsApp reminders before the due date and for overdue payments.'
            },
            {
              q: 'What is invoice discounting?',
              a: 'It is a feature (coming soon) where you can get up to 90% of your invoice value upfront from our NBFC partners.'
            },
            {
              q: 'How do I contact support?',
              a: 'You can reach us via email at support@trustpay.in or use the in-app chat.'
            }].
            map((faq, i) =>
            <div
              key={i}
              className="border border-slate-200 rounded-lg overflow-hidden">

                <button
                className="w-full flex justify-between items-center p-4 text-left bg-slate-50 hover:bg-slate-100 transition-colors"
                onClick={() => toggleFaq(i)}>

                  <span className="font-bold text-slate-900">{faq.q}</span>
                  {activeFaq === i ?
                <ChevronUp className="h-5 w-5 text-slate-500" /> :

                <ChevronDown className="h-5 w-5 text-slate-500" />
                }
                </button>
                {activeFaq === i &&
              <div className="p-4 bg-white border-t border-slate-200 text-slate-600">
                    {faq.a}
                  </div>
              }
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section 14: Final CTA Banner */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Get Paid Faster?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join 10,000+ businesses already using Trustpay to manage their
            finances.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/welcome">
              <Button
                size="lg"
                className="w-full sm:w-auto px-8 py-3 rounded-md text-white font-medium bg-[#1D4ED8] shadow-sm hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#1D4ED8]/20 border-2 border-transparent hover:border-white/30 transition-all duration-200">

                Get Started Free
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-8 py-3 rounded-md text-white font-medium border border-white/30 bg-transparent hover:!bg-transparent hover:!border-white/30">

                Talk to Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>);

}