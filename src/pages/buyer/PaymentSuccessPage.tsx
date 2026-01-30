import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Download, Share2, ArrowRight, Mail } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
export function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">
            Payment Successful!
          </h1>
          <p className="text-slate-600">
            Your payment has been processed successfully.
          </p>
        </div>

        <Card className="overflow-hidden border-t-4 border-t-green-500">
          <CardContent className="p-6 space-y-6">
            <div className="text-center pb-6 border-b border-slate-100">
              <p className="text-sm text-slate-500 mb-1">Amount Paid</p>
              <p className="text-3xl font-bold text-slate-900">₹29,550</p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Payment To</span>
                <span className="font-medium text-slate-900">
                  Rajesh Design Studio
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Invoice #</span>
                <span className="font-medium text-slate-900">INV-007</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Transaction ID</span>
                <span className="font-medium text-slate-900">
                  TXN1234567890
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date & Time</span>
                <span className="font-medium text-slate-900">
                  25 Jan 2025, 2:30 PM
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Method</span>
                <span className="font-medium text-slate-900">
                  UPI (amit@paytm)
                </span>
              </div>
            </div>

            <div className="flex space-x-3 pt-2">
              <Button
                variant="outline"
                className="flex-1"
                leftIcon={<Download className="h-4 w-4" />}>

                Receipt
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                leftIcon={<Share2 className="h-4 w-4" />}>

                Share
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Link to="/buyer/invoice/INV-007">
            <Button className="w-full" size="lg">
              View Invoice
            </Button>
          </Link>
          <Link to="/buyer/home">
            <Button variant="secondary" className="w-full" size="lg">
              Go to Dashboard
            </Button>
          </Link>
        </div>

        <p className="text-center text-xs text-slate-500 flex items-center justify-center">
          <Mail className="h-3 w-3 mr-1" />
          Receipt sent to amit@example.com
        </p>
      </div>
    </div>);

}