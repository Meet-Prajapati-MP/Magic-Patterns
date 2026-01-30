import React from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  ArrowUpRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreHorizontal } from
'lucide-react';
import { SellerLayout } from '../../components/layout/SellerLayout';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { StatusPill } from '../../components/ui/StatusPill';
export function SellerDashboard() {
  const stats = [
  {
    label: 'Total Invoiced',
    value: '₹4,50,000',
    trend: '+12%',
    icon: TrendingUp,
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    label: 'Collected',
    value: '₹3,20,000',
    trend: '+8%',
    icon: CheckCircle2,
    color: 'text-green-600',
    bg: 'bg-green-50'
  },
  {
    label: 'Pending',
    value: '₹1,10,000',
    trend: 'Due soon',
    icon: Clock,
    color: 'text-amber-600',
    bg: 'bg-amber-50'
  },
  {
    label: 'Overdue',
    value: '₹20,000',
    trend: 'Action needed',
    icon: AlertCircle,
    color: 'text-red-600',
    bg: 'bg-red-50'
  }];

  const recentInvoices = [
  {
    id: 'INV-001',
    client: 'Acme Corp',
    amount: '₹45,000',
    status: 'paid',
    date: '24 Jan 2024'
  },
  {
    id: 'INV-002',
    client: 'TechStart Inc',
    amount: '₹1,20,000',
    status: 'pending',
    date: '22 Jan 2024'
  },
  {
    id: 'INV-003',
    client: 'Design Studio',
    amount: '₹15,000',
    status: 'overdue',
    date: '15 Jan 2024'
  },
  {
    id: 'INV-004',
    client: 'Global Services',
    amount: '₹85,000',
    status: 'draft',
    date: '25 Jan 2024'
  }];

  return (
    <SellerLayout>
      <div className="space-y-8">
        {/* Header & Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
            <p className="text-slate-500">
              Welcome back, John! Here's what's happening today.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Link to="/seller/invoices/create">
              <Button className="text-blue-700 border-[#DBEAFE] bg-[#F0F9FF] hover:bg-[#E0F2FE] transition-colors duration-200" leftIcon={<Plus className="h-4 w-4" />}>
                Create Invoice
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) =>
          <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${stat.bg}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${stat.trend.includes('+') ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-600'}`}>

                    {stat.trend}
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                  {stat.value}
                </h3>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Invoices */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Invoices</CardTitle>
                <Link
                  to="/seller/invoices"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium">

                  View All
                </Link>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider py-3 px-6">
                          Invoice
                        </th>
                        <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider py-3 px-6">
                          Client
                        </th>
                        <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider py-3 px-6">
                          Amount
                        </th>
                        <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider py-3 px-6">
                          Status
                        </th>
                        <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider py-3 px-6">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {recentInvoices.map((invoice) =>
                      <tr
                        key={invoice.id}
                        className="hover:bg-slate-50 transition-colors">

                          <td className="py-4 px-6 text-sm font-medium text-slate-900">
                            {invoice.id}
                          </td>
                          <td className="py-4 px-6 text-sm text-slate-600">
                            {invoice.client}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-slate-900">
                            {invoice.amount}
                          </td>
                          <td className="py-4 px-6">
                            <StatusPill
                            status={
                            invoice.status === 'paid' ?
                            'success' :
                            invoice.status === 'pending' ?
                            'warning' :
                            invoice.status === 'overdue' ?
                            'error' :
                            'neutral'
                            }>

                              {invoice.status.charAt(0).toUpperCase() +
                            invoice.status.slice(1)}
                            </StatusPill>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <button className="text-slate-400 hover:text-slate-600">
                              <MoreHorizontal className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Reminders / Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Reminders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                  {
                    client: 'TechStart Inc',
                    due: 'Tomorrow',
                    amount: '₹1.2L'
                  },
                  {
                    client: 'Design Studio',
                    due: 'In 3 days',
                    amount: '₹15k'
                  }].
                  map((item, i) =>
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">

                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {item.client}
                        </p>
                        <p className="text-xs text-slate-500">Due {item.due}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-900">
                          {item.amount}
                        </p>
                        <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                          Send Reminder
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  View All Reminders
                </Button>
              </CardContent>
            </Card>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg p-6 text-white shadow-lg">
              <h3 className="text-lg font-bold mb-2">Get Paid Early</h3>
              <p className="text-blue-100 text-sm mb-4">
                Unlock cash from your unpaid invoices instantly.
              </p>
              <Link to="/seller/financing">
                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 border-none">
                  Check Eligibility
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SellerLayout>);

}