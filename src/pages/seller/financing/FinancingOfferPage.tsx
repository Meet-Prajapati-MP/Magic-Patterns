import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, AlertTriangle } from 'lucide-react';
import { SellerLayout } from '../../../components/layout/SellerLayout';
import { Button } from '../../../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../../components/ui/Card';
import { Modal } from '../../../components/ui/Modal';
export function FinancingOfferPage() {
  const navigate = useNavigate();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  return (
    <SellerLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
            Offer Received
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Financing Offer</h2>
          <p className="text-slate-500 mt-2">
            Review the terms for Invoice #INV-004
          </p>
        </div>

        <Card className="border-t-4 border-t-blue-600 shadow-lg">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-500 mb-1">Invoice Value</p>
                <p className="text-xl font-bold text-slate-900">₹85,000</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-600 mb-1">
                  Advance Amount (85%)
                </p>
                <p className="text-2xl font-bold text-blue-900">₹72,250</p>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-500 mb-1">Processing Fee</p>
                <p className="text-xl font-bold text-slate-900">₹1,700</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-slate-900 mb-4">
                  Repayment Terms
                </h4>
                <div className="flex justify-between items-center p-4 border border-slate-200 rounded-lg">
                  <div>
                    <p className="font-medium">Repayment Due Date</p>
                    <p className="text-sm text-slate-500">
                      When client pays the invoice
                    </p>
                  </div>
                  <p className="font-bold text-slate-900">25 Feb 2025</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-4">
                  Net Disbursement
                </h4>
                <div className="flex justify-between items-center p-6 bg-green-50 rounded-lg border border-green-100">
                  <div>
                    <p className="text-green-800 font-medium">
                      Amount to receive now
                    </p>
                    <p className="text-xs text-green-600">
                      Disbursed within 4 hours
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-green-700">₹70,550</p>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  size="lg"
                  onClick={() => setIsConfirmOpen(true)}>

                  Accept Offer
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  size="lg"
                  onClick={() => navigate('/seller/financing')}>

                  Decline
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Confirm Acceptance">

        <div className="space-y-4">
          <div className="p-4 bg-amber-50 text-amber-800 rounded-lg text-sm flex items-start">
            <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
            <p>
              By accepting, you agree to the terms of service. The repayment
              amount of ₹72,250 will be automatically deducted when the client
              pays the invoice.
            </p>
          </div>
          <div className="pt-4 flex space-x-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setIsConfirmOpen(false)}>

              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={() => navigate('/seller/financing')}>

              Confirm & Accept
            </Button>
          </div>
        </div>
      </Modal>
    </SellerLayout>);

}