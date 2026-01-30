import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, RefreshCw, HelpCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
export function PaymentFailurePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-4">
            <XCircle className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Payment Failed</h1>
          <p className="text-slate-600">We couldn't process your payment.</p>
        </div>

        <Card className="overflow-hidden border-t-4 border-t-red-500">
          <CardContent className="p-6 space-y-6">
            <div className="bg-red-50 p-4 rounded-lg border border-red-100 text-center">
              <p className="text-sm font-medium text-red-800">
                Error: Insufficient funds
              </p>
              <p className="text-xs text-red-600 mt-1">
                Please check your account balance or try a different payment
                method.
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Attempted Amount</span>
                <span className="font-medium text-slate-900">₹29,550</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Method</span>
                <span className="font-medium text-slate-900">
                  UPI (amit@paytm)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date & Time</span>
                <span className="font-medium text-slate-900">
                  25 Jan 2025, 2:30 PM
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Link to="/buyer/invoice/INV-007/pay">
            <Button
              className="w-full"
              size="lg"
              leftIcon={<RefreshCw className="h-4 w-4" />}>

              Try Again
            </Button>
          </Link>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              leftIcon={<ArrowLeft className="h-4 w-4" />}>

              Change Method
            </Button>
            <Button
              variant="outline"
              leftIcon={<HelpCircle className="h-4 w-4" />}>

              Contact Support
            </Button>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/buyer/home"
            className="text-sm text-slate-500 hover:text-slate-700">

            Cancel and go to Dashboard
          </Link>
        </div>
      </div>
    </div>);

}