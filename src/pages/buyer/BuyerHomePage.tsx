import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeftRight,
  CreditCard,
  User,
  PieChart,
  Search,
  Filter,
  PlusCircle,
  HelpCircle } from
'lucide-react';
import { BuyerLayout } from '../../components/layout/BuyerLayout';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { StatusPill } from '../../components/ui/StatusPill';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Input } from '../../components/ui/Input';
export function BuyerHomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <BuyerLayout>
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="bg-blue-600 rounded-2xl p-6 sm:p-10 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Hi Amit,</h1>
            <p className="text-blue-100 text-lg">
              You have 3 pending invoices totaling ₹1,14,500.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/buyer/invoices">
                <Button className="bg-[#2C6CEE] text-white hover:bg-[#2456c4] border border-[#3777F0] shadow-md transition-colors duration-200">
                  View All Invoices
                </Button>
              </Link>
              <Link to="/buyer/create-invoice">
                <Button
                  variant="outline"
                  className="text-blue-700 border-[#DBEAFE] bg-white hover:bg-[#F0F9FF] transition-colors duration-200"
                  leftIcon={<PlusCircle className="h-4 w-4" />}>

                  Create Invoice
                </Button>
              </Link>
            </div>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 rounded-full bg-blue-500 opacity-30"></div>
          <div className="absolute bottom-0 right-20 -mb-10 w-24 h-24 rounded-full bg-blue-400 opacity-30"></div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search invoices, transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm" />

          </div>
          <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>
            Filter
          </Button>
        </div>

        {/* Due Soon Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900">Due Soon</h2>
            <Link
              to="/buyer/invoices"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center">

              See All <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1 */}
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                      RD
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        Rajesh Design Studio
                      </h3>
                      <p className="text-xs text-slate-500">
                        INV-007 • Issued 20 Jan
                      </p>
                    </div>
                  </div>
                  <StatusPill status="warning">Due Tomorrow</StatusPill>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Amount Due</p>
                    <p className="text-2xl font-bold text-slate-900">₹29,550</p>
                  </div>
                  <Link to="/buyer/invoice/INV-007">
                    <Button size="sm">Pay Now</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                      TS
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        TechCraft Solutions
                      </h3>
                      <p className="text-xs text-slate-500">
                        INV-008 • Issued 15 Jan
                      </p>
                    </div>
                  </div>
                  <StatusPill status="neutral">Due in 3 days</StatusPill>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Amount Due</p>
                    <p className="text-2xl font-bold text-slate-900">₹60,000</p>
                  </div>
                  <Link to="/buyer/invoice/INV-008">
                    <Button size="sm">Pay Now</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Overdue Section (Conditional) */}
        <div className="bg-red-50 border border-red-100 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-red-900">1 Invoice Overdue</h3>
              <p className="text-sm text-red-700">
                INV-003 from Priya Design • ₹25,000
              </p>
            </div>
          </div>
          <Link to="/buyer/invoice/INV-003">
            <Button variant="danger" size="sm">
              Pay Immediately
            </Button>
          </Link>
        </div>

        {/* Recent Payments & Quick Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Payments */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardContent className="p-6">
                <h3 className="font-bold text-slate-900 mb-4">
                  Recent Payments
                </h3>
                <div className="space-y-4">
                  {[
                  {
                    to: 'Acme Corp',
                    date: 'Yesterday',
                    amount: '₹12,000'
                  },
                  {
                    to: 'Design Studio',
                    date: '20 Jan',
                    amount: '₹5,000'
                  },
                  {
                    to: 'TechStart',
                    date: '15 Jan',
                    amount: '₹45,000'
                  }].
                  map((payment, i) =>
                  <div
                    key={i}
                    className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">

                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {payment.to}
                          </p>
                          <p className="text-xs text-slate-500">
                            {payment.date}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-slate-900">
                        {payment.amount}
                      </span>
                    </div>
                  )}
                </div>
                <Link
                  to="/buyer/transactions"
                  className="block mt-4 text-center text-sm text-blue-600 font-medium hover:underline">

                  View All History
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/buyer/invoices"
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all text-center flex flex-col items-center justify-center space-y-2 h-32">

                <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                  <FileText className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-slate-700">
                  My Invoices
                </span>
              </Link>
              <Link
                to="/buyer/create-invoice"
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all text-center flex flex-col items-center justify-center space-y-2 h-32">

                <div className="h-10 w-10 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                  <PlusCircle className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-slate-700">
                  Create Invoice
                </span>
              </Link>
              <Link
                to="/buyer/transactions"
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all text-center flex flex-col items-center justify-center space-y-2 h-32">

                <div className="h-10 w-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
                  <ArrowLeftRight className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-slate-700">
                  Transactions
                </span>
              </Link>
              <Link
                to="/buyer/support"
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all text-center flex flex-col items-center justify-center space-y-2 h-32">

                <div className="h-10 w-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-slate-700">
                  Support
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </BuyerLayout>);

}