import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Phone,
  Mail } from
'lucide-react';
import { SellerLayout } from '../../../components/layout/SellerLayout';
import { Button } from '../../../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../../components/ui/Card';
import { StatusPill } from '../../../components/ui/StatusPill';
import { Timeline } from '../../../components/shared/Timeline';
export function FinancingDetailPage() {
  const { id } = useParams();
  const timelineEvents = [
  {
    title: 'Application Submitted',
    description: 'Request for ₹80,000 (80%) submitted',
    date: '20 Jan 2025, 10:30 AM',
    icon: FileText,
    status: 'completed' as const
  },
  {
    title: 'Offer Received',
    description: 'Offer from ABC Finance Ltd',
    date: '21 Jan 2025, 02:15 PM',
    icon: CheckCircle,
    status: 'completed' as const
  },
  {
    title: 'Offer Accepted',
    description: 'Terms accepted by you',
    date: '21 Jan 2025, 02:45 PM',
    icon: CheckCircle,
    status: 'completed' as const
  },
  {
    title: 'Disbursement Processed',
    description: '₹78,000 sent to HDFC Bank ****1234 (UTR789012)',
    date: '21 Jan 2025, 04:00 PM',
    icon: Wallet,
    status: 'completed' as const
  },
  {
    title: 'Repayment Due',
    description: '₹82,000 due from settlement',
    date: '15 Feb 2025',
    icon: Clock,
    status: 'upcoming' as const
  }];

  // Import Wallet icon locally since it's used in timeline
  function Wallet(props: React.SVGProps<SVGSVGElement>) {
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

        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
      </svg>);

  }
  return (
    <SellerLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <Link to="/seller/financing">
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<ArrowLeft className="h-4 w-4" />}>

              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Financing Details
            </h1>
            <p className="text-slate-500">Application #{id || 'FA-001'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Financing Summary</CardTitle>
                <StatusPill status="success">Active</StatusPill>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-slate-500">Financed Amount</p>
                  <p className="text-xl font-bold text-slate-900">₹80,000</p>
                  <p className="text-xs text-slate-500">80% of Invoice Value</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Net Received</p>
                  <p className="text-xl font-bold text-green-600">₹78,000</p>
                  <p className="text-xs text-slate-500">After ₹2,000 fees</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Repayment Amount</p>
                  <p className="text-lg font-semibold text-slate-900">
                    ₹82,000
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Due Date</p>
                  <p className="text-lg font-semibold text-slate-900">
                    15 Feb 2025
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Repayment Status */}
            <Card>
              <CardHeader>
                <CardTitle>Repayment Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">
                      Pending Repayment
                    </h4>
                    <p className="text-sm text-blue-700 mt-1">
                      ₹82,000 will be automatically deducted from your
                      settlement on or before 15 Feb 2025.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <Timeline events={timelineEvents} />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Invoice */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Related Invoice</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Invoice #</span>
                    <span className="text-sm font-medium">INV-005</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Client</span>
                    <span className="text-sm font-medium">Amit Patel</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Total Amount</span>
                    <span className="text-sm font-medium">₹1,00,000</span>
                  </div>
                  <Link to="/seller/invoices/INV-005" className="block mt-4">
                    <Button variant="outline" className="w-full" size="sm">
                      View Invoice
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-sm">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <a
                      href="mailto:financing@trustopay.in"
                      className="text-blue-600 hover:underline">

                      financing@trustopay.in
                    </a>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-600">1800-123-4567</span>
                  </div>
                  <Button variant="secondary" className="w-full" size="sm">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SellerLayout>);

}