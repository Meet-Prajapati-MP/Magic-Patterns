// import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import {
  FileText,
  CheckCircle,
  // AlertCircle,
  ArrowRight,
  Search,
  Filter,
  PlusCircle,
  // HelpCircle,
  ArrowLeftRight,
  TrendingUp,
  PieChart } from
'lucide-react';
import { UnifiedLayout } from '../../components/layout/UnifiedLayout';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { StatusPill } from '../../components/ui/StatusPill';
import { useProfile } from '../../components/context/ProfileContext';
import { getSellerInvoices, getBuyerInvoices } from '../../services/invoiceService';
export function HomePage() {
  // const navigate = useNavigate();
  const { currentAccount } = useProfile();
  const location = useLocation();
  const isSellerRoute = location.pathname.startsWith('/seller');
  const invoicesPath = isSellerRoute ? '/seller/invoices' : '/invoices';
  const createInvoicePath = isSellerRoute ? '/seller/invoices/create' : '/invoices/create';
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    invoicesSent: 0,
    invoicesReceived: 0,
    totalPaid: 0,
    totalReceived: 0,
    loading: true
  });

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount || 0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [sellerResult, buyerResult] = await Promise.all([
          getSellerInvoices(),
          getBuyerInvoices()
        ]);

        const sellerInvoices = (sellerResult.data || []) as any[];
        const buyerInvoices = (buyerResult.data || []) as any[];

        const invoicesSent = sellerInvoices.length;
        const invoicesReceived = buyerInvoices.length;

        const totalReceived = sellerInvoices
          .filter((inv) => inv.status === 'paid')
          .reduce((sum, inv) => sum + (inv.total_amount || 0), 0);

        const totalPaid = buyerInvoices
          .filter((inv) => inv.status === 'paid')
          .reduce((sum, inv) => sum + (inv.total_amount || 0), 0);

        setStats({
          invoicesSent,
          invoicesReceived,
          totalPaid,
          totalReceived,
          loading: false
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setStats((prev) => ({
          ...prev,
          loading: false
        }));
      }
    };

    fetchStats();
  }, []);
  const displayName =
  currentAccount.accountType === 'individual' ?
  currentAccount.name.split(' ')[0] :
  currentAccount.businessName;
  return (
    <UnifiedLayout>
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="bg-blue-600 rounded-2xl p-6 sm:p-10 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              Hi {displayName},
            </h1>
            <p className="text-blue-100 text-lg">
              You have 3 pending invoices totaling ₹1,14,500.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to={invoicesPath}>
                <Button className="bg-[#2C6CEE] text-white hover:bg-[#2456c4] border border-[#3777F0] shadow-md transition-colors duration-200">
                  View All Invoices
                </Button>
              </Link>
              <Link to={createInvoicePath}>
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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Invoices Sent
                  </p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {stats.loading ? '—' : stats.invoicesSent}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                  <FileText className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-600 font-medium flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +8%
                </span>
                <span className="text-slate-500 ml-2">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Invoices Received
                  </p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {stats.loading ? '—' : stats.invoicesReceived}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                  <FileText className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-slate-500">3 pending payment</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Paid
                  </p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {formatCurrency(stats.totalPaid)}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                  <CheckCircle className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-slate-500">This month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Received
                  </p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {formatCurrency(stats.totalReceived)}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                  <ArrowLeftRight className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-slate-500">This month</span>
              </div>
            </CardContent>
          </Card>
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

        {/* Action Required Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900">
              Action Required
            </h2>
            <Link
              to={invoicesPath}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center">

              See All <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Link to="/invoices/INV-007">
                    <Button size="sm">Pay Now</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

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
                        INV-012 • Sent 18 Jan
                      </p>
                    </div>
                  </div>
                  <StatusPill status="warning">Pending</StatusPill>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">
                      Awaiting Payment
                    </p>
                    <p className="text-2xl font-bold text-slate-900">₹60,000</p>
                  </div>
                  <Link to="/invoices/INV-012">
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity & Quick Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardContent className="p-6">
                <h3 className="font-bold text-slate-900 mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {[
                  {
                    action: 'Invoice Sent',
                    detail: 'INV-015 to Acme Corp - ₹12,000',
                    time: 'Yesterday',
                    icon: FileText,
                    color: 'text-blue-600 bg-blue-50'
                  },
                  {
                    action: 'Payment Received',
                    detail: 'INV-013 from Design Studio - ₹5,000',
                    time: '20 Jan',
                    icon: CheckCircle,
                    color: 'text-green-600 bg-green-50'
                  },
                  {
                    action: 'Invoice Paid',
                    detail: 'INV-008 to TechStart - ₹45,000',
                    time: '15 Jan',
                    icon: ArrowLeftRight,
                    color: 'text-purple-600 bg-purple-50'
                  }].
                  map((activity, i) =>
                  <div
                    key={i}
                    className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">

                      <div className="flex items-center space-x-3">
                        <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center ${activity.color}`}>

                          <activity.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {activity.action}
                          </p>
                          <p className="text-xs text-slate-500">
                            {activity.detail}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-slate-400">
                        {activity.time}
                      </span>
                    </div>
                  )}
                </div>
                <Link
                  to="/transactions"
                  className="block mt-4 text-center text-sm text-blue-600 font-medium hover:underline">

                  View All Activity
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link
                to={invoicesPath}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all text-center flex flex-col items-center justify-center space-y-2 h-32">

                <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                  <FileText className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-slate-700">
                  All Invoices
                </span>
              </Link>
              <Link
                to={createInvoicePath}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all text-center flex flex-col items-center justify-center space-y-2 h-32">

                <div className="h-10 w-10 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                  <PlusCircle className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-slate-700">
                  Create Invoice
                </span>
              </Link>
              <Link
                to="/transactions"
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all text-center flex flex-col items-center justify-center space-y-2 h-32">

                <div className="h-10 w-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
                  <ArrowLeftRight className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-slate-700">
                  Transactions
                </span>
              </Link>
              <Link
                to="/emi-plans"
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all text-center flex flex-col items-center justify-center space-y-2 h-32">

                <div className="h-10 w-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600">
                  <PieChart className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-slate-700">
                  EMI Plans
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </UnifiedLayout>);

}