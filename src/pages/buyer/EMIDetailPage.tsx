import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, AlertCircle, CheckCircle } from 'lucide-react';
import { BuyerLayout } from '../../components/layout/BuyerLayout';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { StatusPill } from '../../components/ui/StatusPill';
export function EMIDetailPage() {
  const { id } = useParams();
  const schedule = [
  {
    num: 1,
    date: '01 Jan 2025',
    amount: '₹10,000',
    status: 'paid',
    paidDate: '01 Jan 2025'
  },
  {
    num: 2,
    date: '01 Feb 2025',
    amount: '₹10,000',
    status: 'pending',
    paidDate: '-'
  },
  {
    num: 3,
    date: '01 Mar 2025',
    amount: '₹10,000',
    status: 'upcoming',
    paidDate: '-'
  },
  {
    num: 4,
    date: '01 Apr 2025',
    amount: '₹10,000',
    status: 'upcoming',
    paidDate: '-'
  },
  {
    num: 5,
    date: '01 May 2025',
    amount: '₹10,000',
    status: 'upcoming',
    paidDate: '-'
  },
  {
    num: 6,
    date: '01 Jun 2025',
    amount: '₹10,000',
    status: 'upcoming',
    paidDate: '-'
  }];

  return (
    <BuyerLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-4 mb-2">
          <Link to="/buyer/emi-plans">
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<ArrowLeft className="h-4 w-4" />}>

              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">
            EMI Plan Details
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Summary Card */}
          <Card className="md:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100">
              <div>
                <CardTitle>Plan Summary</CardTitle>
                <p className="text-sm text-slate-500 mt-1">
                  Invoice INV-008 • TechCraft Solutions
                </p>
              </div>
              <StatusPill status="success">Active</StatusPill>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
              <div>
                <p className="text-sm text-slate-500">Total Amount</p>
                <p className="text-lg font-bold text-slate-900">₹60,000</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Monthly EMI</p>
                <p className="text-lg font-bold text-slate-900">₹10,000</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Duration</p>
                <p className="text-lg font-bold text-slate-900">6 Months</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Next Due</p>
                <p className="text-lg font-bold text-red-600">01 Feb 2025</p>
              </div>
            </CardContent>
          </Card>

          {/* Schedule */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Repayment Schedule</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 font-medium">
                  <tr>
                    <th className="px-6 py-3">#</th>
                    <th className="px-6 py-3">Due Date</th>
                    <th className="px-6 py-3">Amount</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {schedule.map((item) =>
                  <tr
                    key={item.num}
                    className={item.status === 'paid' ? 'bg-slate-50/50' : ''}>

                      <td className="px-6 py-4 text-slate-500">{item.num}</td>
                      <td className="px-6 py-4">{item.date}</td>
                      <td className="px-6 py-4 font-medium">{item.amount}</td>
                      <td className="px-6 py-4">
                        <StatusPill
                        status={
                        item.status === 'paid' ?
                        'success' :
                        item.status === 'pending' ?
                        'warning' :
                        'neutral'
                        }>

                          {item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)}
                        </StatusPill>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {item.status === 'pending' &&
                      <Button size="sm">Pay</Button>
                      }
                        {item.status === 'paid' &&
                      <span className="text-green-600 text-xs font-medium flex items-center justify-end">
                            <CheckCircle className="h-3 w-3 mr-1" /> Paid
                          </span>
                      }
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Sidebar Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Autopay</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Active</p>
                    <p className="text-xs text-slate-500">UPI: amit@paytm</p>
                  </div>
                </div>
                <Link to="/buyer/autopay/setup">
                  <Button variant="outline" className="w-full" size="sm">
                    Manage Settings
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full"
                  leftIcon={<Download className="h-4 w-4" />}>

                  Download Schedule
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  leftIcon={<AlertCircle className="h-4 w-4" />}>

                  Report Issue
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BuyerLayout>);

}