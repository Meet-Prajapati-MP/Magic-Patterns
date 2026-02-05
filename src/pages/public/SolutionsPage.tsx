import React from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Building,
  Users,
  ShoppingBag,
  GraduationCap,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Clock,
  Shield,
  Zap } from
'lucide-react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
export function SolutionsPage() {
  return (
    <PublicLayout>
      {/* Section 1: Hero */}
      <section className="pt-24 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Built for Every <span className="text-blue-600">Business Type</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            Whether you're a solo freelancer, a growing agency, or an
            established SME, Trustpay adapts to your unique workflow.
          </p>
        </div>
      </section>

      {/* Section 2: For Freelancers */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <Briefcase className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                For Freelancers
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Stop chasing payments and focus on your craft. Look professional
                with branded invoices and get paid faster.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                'Create professional invoices in seconds',
                'Accept payments via UPI and Cards',
                'Automated payment reminders',
                'Track outstanding payments instantly'].
                map((item, i) =>
                <li key={i} className="flex items-center text-slate-700">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    {item}
                  </li>
                )}
              </ul>
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm italic text-slate-600">
                "Trustpay changed my life. I used to spend 5 hours a week
                chasing invoices. Now it's all automated."
                <div className="mt-2 font-bold text-slate-900 not-italic">
                  — Rahul S., Graphic Designer
                </div>
              </div>
            </div>
            <div className="bg-white p-2 rounded-xl shadow-lg border border-slate-200 rotate-1">
              <div className="bg-slate-50 rounded-lg p-8 aspect-[4/3] flex items-center justify-center">
                <div className="text-center">
                  <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="font-bold text-slate-900">
                    Freelancer Dashboard
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: For Agencies */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 bg-slate-50 p-2 rounded-xl shadow-lg border border-slate-200 -rotate-1">
              <div className="bg-white rounded-lg p-8 aspect-[4/3] flex items-center justify-center">
                <div className="text-center">
                  <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <p className="font-bold text-slate-900">Agency Team View</p>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                <Users className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                For Agencies
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Manage multiple clients, projects, and team members in one
                place. Scale your operations without the financial chaos.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                'Multi-client management dashboard',
                'Milestone-based billing for projects',
                'Team access and permissions',
                'Consolidated revenue reporting'].
                map((item, i) =>
                <li key={i} className="flex items-center text-slate-700">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    {item}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: For SMEs */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="h-12 w-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-6">
                <Building className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                For SMEs
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Robust financial tools for established businesses. Handle GST,
                bulk operations, and accounting with ease.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                'Full GST compliance and reporting',
                'Bulk invoice generation',
                'Integration with accounting software',
                'Vendor management portal'].
                map((item, i) =>
                <li key={i} className="flex items-center text-slate-700">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    {item}
                  </li>
                )}
              </ul>
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm italic text-slate-600">
                "We reduced our outstanding payments by 40% within the first
                month of using Trustpay."
                <div className="mt-2 font-bold text-slate-900 not-italic">
                  — Anita K., Director at TechFlow
                </div>
              </div>
            </div>
            <div className="bg-white p-2 rounded-xl shadow-lg border border-slate-200 rotate-1">
              <div className="bg-slate-50 rounded-lg p-8 aspect-[4/3] flex items-center justify-center">
                <div className="text-center">
                  <div className="h-16 w-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-amber-600" />
                  </div>
                  <p className="font-bold text-slate-900">SME Analytics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5, 6, 7: Other Verticals Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Specialized Solutions
            </h2>
            <p className="text-slate-600">
              Tailored features for specific industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-6">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Consultants
              </h3>
              <p className="text-slate-600 mb-4">
                Retainer billing, time-based invoicing, and project tracking.
              </p>
              <ul className="text-sm space-y-2 text-slate-500">
                <li className="flex items-center">
                  <CheckCircle className="h-3 w-3 mr-2 text-green-500" /> Monthly retainers
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-3 w-3 mr-2 text-green-500" /> Time
                  tracking
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600 mb-6">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                E-commerce
              </h3>
              <p className="text-slate-600 mb-4">
                Payment links, instant checkout pages, and order tracking.
              </p>
              <ul className="text-sm space-y-2 text-slate-500">
                <li className="flex items-center">
                  <CheckCircle className="h-3 w-3 mr-2 text-green-500" /> Instant payment links
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-3 w-3 mr-2 text-green-500" /> Order
                  management
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 mb-6">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Education/Coaching
              </h3>
              <p className="text-slate-600 mb-4">
                Batch payments, installment plans for students, and automated
                receipts.
              </p>
              <ul className="text-sm space-y-2 text-slate-500">
                <li className="flex items-center">
                  <CheckCircle className="h-3 w-3 mr-2 text-green-500" /> EMI
                  for students
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-3 w-3 mr-2 text-green-500" /> Batch
                  invoicing
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Industry Stats */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                87%
              </div>
              <p className="text-slate-300">Faster payment collection</p>
            </div>
            <div className="p-6 border-t md:border-t-0 md:border-l border-slate-800">
              <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">
                ₹0
              </div>
              <p className="text-slate-300">Payment failures</p>
            </div>
            <div className="p-6 border-t md:border-t-0 md:border-l border-slate-800">
              <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">
                4 hrs
              </div>
              <p className="text-slate-300">Saved per week on admin</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Case Studies Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
            {
              company: 'Pixel Perfect Design',
              result: 'Reduced overdue invoices by 90%',
              image: 'bg-blue-100'
            },
            {
              company: 'Marketing Masters',
              result: 'Scaled from 5 to 20 clients seamlessly',
              image: 'bg-purple-100'
            },
            {
              company: 'CodeCraft Solutions',
              result: 'Saved ₹2L annually in admin costs',
              image: 'bg-green-100'
            }].
            map((study, i) =>
            <div key={i} className="group cursor-pointer">
                <div
                className={`h-48 rounded-xl ${study.image} mb-4 flex items-center justify-center group-hover:opacity-90 transition-opacity`}>

                  <span className="font-bold text-slate-400">
                    Case Study Image
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {study.company}
                </h3>
                <p className="text-slate-600 mb-3">{study.result}</p>
                <div className="text-blue-600 font-medium flex items-center group-hover:underline">
                  Read full story <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section 10: CTA Quiz */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Find Your Perfect Solution
          </h2>
          <p className="text-lg text-slate-600 mb-10">
            Tell us about your business and we'll recommend the best setup for
            you.
          </p>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold mb-6">
              What type of business are you?
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <button className="p-4 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
                <Briefcase className="h-6 w-6 mx-auto mb-2 text-slate-500" />
                <span className="font-medium">Freelancer</span>
              </button>
              <button className="p-4 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
                <Users className="h-6 w-6 mx-auto mb-2 text-slate-500" />
                <span className="font-medium">Agency</span>
              </button>
              <button className="p-4 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
                <Building className="h-6 w-6 mx-auto mb-2 text-slate-500" />
                <span className="font-medium">SME</span>
              </button>
              <button className="p-4 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
                <ShoppingBag className="h-6 w-6 mx-auto mb-2 text-slate-500" />
                <span className="font-medium">E-commerce</span>
              </button>
            </div>
            <Link to="/welcome">
              <Button size="lg">Get My Recommendation</Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>);

}