import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shield, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { InvoicePreview } from '../../components/shared/InvoicePreview';
import { Card, CardContent } from '../../components/ui/Card';
export function PublicInvoicePage() {
  const { id } = useParams();
  // Mock logged in state - in real app check auth context
  const isLoggedIn = false;
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold text-slate-900">Trustopay</span>
          </div>
          <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-medium border border-green-100">
            <Lock className="h-3 w-3" />
            <span>Secure Invoice</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Invoice Preview */}
          <div className="lg:col-span-2">
            <InvoicePreview />
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-6">
            {/* Seller Profile */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-sm font-medium text-slate-500 mb-4">
                  Invoice From
                </h3>
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-lg">
                    RD
                  </div>
                  <div>
                    <div className="flex items-center space-x-1">
                      <h4 className="font-bold text-slate-900">
                        Rajesh Design Studio
                      </h4>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <p className="text-sm text-slate-500">
                      rajesh@designstudio.in
                    </p>
                    <p className="text-sm text-slate-500">+91 98765 43210</p>
                    <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      KYC Verified
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Action */}
            <Card className="border-blue-200 shadow-md">
              <CardContent className="p-6">
                <div className="mb-6">
                  <p className="text-sm text-slate-500 mb-1">
                    Total Amount Due
                  </p>
                  <p className="text-3xl font-bold text-slate-900">₹29,500</p>
                  <p className="text-sm text-red-600 mt-1 font-medium">
                    Due by 27 Jan 2025
                  </p>
                </div>

                {isLoggedIn ?
                <Link to={`/buyer/invoice/${id}`}>
                    <Button className="w-full h-12 text-lg">Pay Invoice</Button>
                  </Link> :

                <div className="space-y-3">
                    <Link to={`/login?redirect=/buyer/invoice/${id}`}>
                      <Button className="w-full h-12 text-lg">
                        Login to Pay
                      </Button>
                    </Link>
                    <p className="text-xs text-center text-slate-500">
                      You need to login to securely process this payment.
                    </p>
                  </div>
                }
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <div className="bg-slate-100 rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-3 text-sm text-slate-600">
                <Shield className="h-5 w-5 text-slate-400" />
                <span>Payments secured by Trustopay</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-slate-600">
                <Lock className="h-5 w-5 text-slate-400" />
                <span>256-bit SSL encryption</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-slate-600">
                <AlertCircle className="h-5 w-5 text-slate-400" />
                <span>24/7 Support available</span>
              </div>
            </div>

            <div className="text-center">
              <button className="text-sm text-slate-500 hover:text-slate-700 underline">
                Report an issue with this invoice
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>);

}