import React from 'react';
import { useParams } from 'react-router-dom';
import { Download, Printer, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
export function ReceiptPage() {
  const { id } = useParams();
  // Mock Receipt Data
  const receipt = {
    receiptNo: 'RCP-' + (id || '001'),
    date: '25 Jan 2025',
    invoiceNo: 'INV-001',
    from: {
      name: 'Rajesh Design Studio',
      address: '123 Freelance Hub, Bangalore, KA 560034',
      email: 'rajesh@designstudio.in'
    },
    to: {
      name: 'Acme Corp',
      address: '456 Business Park, Mumbai, MH 400001',
      email: 'billing@acme.com'
    },
    amount: 47200,
    method: 'UPI (amit@paytm)',
    transactionId: 'TXN123456789',
    status: 'Success'
  };
  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8 print:bg-white print:p-0">
      <div className="max-w-2xl mx-auto print:max-w-none">
        {/* Actions Bar - Hidden when printing */}
        <div className="flex justify-between items-center mb-8 print:hidden">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            leftIcon={<ArrowLeft className="h-4 w-4" />}>

            Back
          </Button>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => window.print()}
              leftIcon={<Printer className="h-4 w-4" />}>

              Print
            </Button>
            <Button leftIcon={<Download className="h-4 w-4" />}>
              Download PDF
            </Button>
          </div>
        </div>

        {/* Receipt Card */}
        <Card className="print:shadow-none print:border-none">
          <CardContent className="p-8 md:p-12">
            {/* Header */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-8 mb-8">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center print:bg-blue-600">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <span className="text-xl font-bold text-slate-900">
                  Trustopay
                </span>
              </div>
              <div className="text-right">
                <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-wide">
                  Receipt
                </h1>
                <p className="text-slate-500 mt-1">#{receipt.receiptNo}</p>
              </div>
            </div>

            {/* Success Banner */}
            <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-8 flex items-center justify-center text-green-700 print:bg-transparent print:border-none print:p-0 print:justify-start print:mb-4">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="font-medium">Payment Successful</span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">
                  From
                </p>
                <h3 className="font-bold text-slate-900">
                  {receipt.from.name}
                </h3>
                <p className="text-sm text-slate-500 whitespace-pre-line">
                  {receipt.from.address}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  {receipt.from.email}
                </p>
              </div>
              <div className="text-right print:text-left">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">
                  To
                </p>
                <h3 className="font-bold text-slate-900">{receipt.to.name}</h3>
                <p className="text-sm text-slate-500 whitespace-pre-line">
                  {receipt.to.address}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  {receipt.to.email}
                </p>
              </div>
            </div>

            {/* Transaction Info */}
            <div className="bg-slate-50 rounded-lg p-6 mb-8 print:bg-transparent print:p-0 print:border print:border-slate-200">
              <div className="grid grid-cols-2 gap-y-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase">Date Paid</p>
                  <p className="font-medium text-slate-900">{receipt.date}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase">
                    Payment Method
                  </p>
                  <p className="font-medium text-slate-900">{receipt.method}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase">
                    Invoice Number
                  </p>
                  <p className="font-medium text-slate-900">
                    {receipt.invoiceNo}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase">
                    Transaction ID
                  </p>
                  <p className="font-medium text-slate-900 font-mono text-xs">
                    {receipt.transactionId}
                  </p>
                </div>
              </div>
            </div>

            {/* Amount */}
            <div className="border-t border-slate-200 pt-8 flex justify-between items-center">
              <p className="font-medium text-slate-900">Amount Paid</p>
              <p className="text-3xl font-bold text-slate-900">
                ₹{receipt.amount.toLocaleString()}
              </p>
            </div>
          </CardContent>

          {/* Footer */}
          <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 text-center print:hidden">
            <p className="text-xs text-slate-500">
              This is a computer-generated receipt and does not require a
              signature.
            </p>
          </div>
        </Card>

        <div className="mt-8 text-center print:block hidden">
          <p className="text-xs text-slate-500">
            Generated by Trustopay on {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>);

}