import React from 'react';
import { NBFCLayout } from '../../components/layout/NBFCLayout';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import {
  FileText,
  CheckCircle,
  XCircle,
  Wallet,
  AlertCircle,
  TrendingUp } from
'lucide-react';
export function NBFCDashboard() {
  const stats = [
  {
    label: 'Pending Apps',
    value: '12',
    icon: FileText,
    color: 'bg-blue-500'
  },
  {
    label: 'Approved',
    value: '45',
    icon: CheckCircle,
    color: 'bg-green-500'
  },
  {
    label: 'Rejected',
    value: '10',
    icon: XCircle,
    color: 'bg-red-500'
  },
  {
    label: 'Active Book',
    value: '₹1.2 Cr',
    icon: Wallet,
    color: 'bg-purple-500'
  },
  {
    label: 'Overdue',
    value: '₹5 L',
    icon: AlertCircle,
    color: 'bg-amber-500'
  },
  {
    label: 'Exposure',
    value: '₹95 L',
    icon: TrendingUp,
    color: 'bg-indigo-500'
  }];

  return (
    <NBFCLayout>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-slate-900">NBFC Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, i) =>
          <Card key={i}>
              <CardContent className="p-6 flex items-center justify-between">
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
              </CardContent>
            </Card>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Applications */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardContent className="p-6">
                <h3 className="font-bold text-slate-900 mb-4">
                  Recent Applications
                </h3>
                <div className="space-y-4">
                  {[
                  {
                    id: 'FA-001',
                    seller: 'Rajesh Kumar',
                    amount: '₹80,000',
                    date: '20 Jan',
                    status: 'Pending'
                  },
                  {
                    id: 'FA-002',
                    seller: 'TechCraft',
                    amount: '₹1,50,000',
                    date: '19 Jan',
                    status: 'Approved'
                  },
                  {
                    id: 'FA-003',
                    seller: 'Priya Design',
                    amount: '₹45,000',
                    date: '18 Jan',
                    status: 'Rejected'
                  }].
                  map((app, i) =>
                  <div
                    key={i}
                    className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">

                      <div>
                        <p className="font-medium text-slate-900">
                          {app.seller}
                        </p>
                        <p className="text-xs text-slate-500">
                          App #{app.id} • {app.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900">{app.amount}</p>
                        <span
                        className={`text-xs font-medium ${app.status === 'Approved' ? 'text-green-600' : app.status === 'Rejected' ? 'text-red-600' : 'text-amber-600'}`}>

                          {app.status}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-slate-900 mb-4">
                  Collections Alerts
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                    <div className="flex items-center space-x-2 text-red-800 font-medium mb-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>Overdue Repayments</span>
                    </div>
                    <p className="text-sm text-red-600">
                      2 invoices totaling ₹5,00,000 are overdue by 15+ days.
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-center space-x-2 text-blue-800 font-medium mb-1">
                      <Wallet className="h-4 w-4" />
                      <span>Upcoming Due</span>
                    </div>
                    <p className="text-sm text-blue-600">
                      5 invoices totaling ₹12,00,000 due in next 7 days.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </NBFCLayout>);

}