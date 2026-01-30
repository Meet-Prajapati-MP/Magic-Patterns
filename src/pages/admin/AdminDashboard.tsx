import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  FileText,
  CreditCard,
  AlertCircle,
  ArrowUpRight,
  TrendingUp } from
'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
export function AdminDashboard() {
  const navigate = useNavigate();
  const stats = [
  {
    label: 'Total Users',
    value: '12,450',
    trend: '+5%',
    icon: Users,
    color: 'bg-blue-500'
  },
  {
    label: 'Total Invoices',
    value: '45,600',
    trend: '+12%',
    icon: FileText,
    color: 'bg-purple-500'
  },
  {
    label: 'GMV',
    value: '₹12.5 Cr',
    trend: '+15%',
    icon: TrendingUp,
    color: 'bg-green-500'
  },
  {
    label: 'Active Subs',
    value: '7,100',
    trend: '+2%',
    icon: CreditCard,
    color: 'bg-amber-500'
  }];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) =>
          <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div
                  className={`h-12 w-12 rounded-lg flex items-center justify-center text-white ${stat.color}`}>

                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-green-600 font-medium flex items-center">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    {stat.trend}
                  </span>
                  <span className="text-slate-500 ml-2">vs last month</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

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
                    action: 'New User Signup',
                    detail: 'Priya Sharma (Seller)',
                    time: '2 hours ago'
                  },
                  {
                    action: 'KYC Submitted',
                    detail: 'Amit Patel',
                    time: '3 hours ago'
                  },
                  {
                    action: 'Dispute Raised',
                    detail: '#D-045 by TechCraft',
                    time: '5 hours ago'
                  },
                  {
                    action: 'Subscription',
                    detail: 'Rajesh Kumar purchased Pro',
                    time: '1 day ago'
                  }].
                  map((item, i) =>
                  <div
                    key={i}
                    className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">

                      <div>
                        <p className="font-medium text-slate-900">
                          {item.action}
                        </p>
                        <p className="text-sm text-slate-500">{item.detail}</p>
                      </div>
                      <span className="text-xs text-slate-400">
                        {item.time}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-slate-900 mb-4">
                  Action Required
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="h-5 w-5 text-amber-600" />
                      <span className="text-sm font-medium text-amber-900">
                        5 Pending KYC
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white"
                      onClick={() => navigate('/admin/kyc-review')}>

                      Review
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <span className="text-sm font-medium text-red-900">
                        2 Open Disputes
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white"
                      onClick={() => navigate('/admin/disputes')}>

                      Resolve
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>);

}