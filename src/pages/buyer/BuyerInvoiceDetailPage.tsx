import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, Share2, MessageCircle, ArrowLeft } from 'lucide-react';
import { BuyerLayout } from '../../components/layout/BuyerLayout';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { InvoicePreview } from '../../components/shared/InvoicePreview';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
export function BuyerInvoiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paymentOption, setPaymentOption] = useState('full');
  const [customAmount, setCustomAmount] = useState('');
  const handlePay = () => {
    navigate(`/buyer/invoice/${id}/pay`);
  };
  return (
    <BuyerLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center space-x-4 mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            leftIcon={<ArrowLeft className="h-4 w-4" />}>

            Back
          </Button>
          <h1 className="text-2xl font-bold text-slate-900">Invoice {id}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Invoice Preview */}
          <div className="lg:col-span-2">
            <InvoicePreview />
          </div>

          {/* Payment Actions Sidebar */}
          <div className="space-y-6">
            <Card className="border-blue-200 shadow-md sticky top-24">
              <CardHeader className="bg-blue-50 border-b border-blue-100">
                <CardTitle className="text-blue-900">Payment Options</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  {/* Option 1: Full Payment */}
                  <label
                    className={`flex items-start p-3 border rounded-lg cursor-pointer transition-colors ${paymentOption === 'full' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:bg-slate-50'}`}>

                    <input
                      type="radio"
                      name="payment"
                      className="mt-1 mr-3"
                      checked={paymentOption === 'full'}
                      onChange={() => setPaymentOption('full')} />

                    <div>
                      <span className="font-semibold text-slate-900">
                        Pay Full Amount
                      </span>
                      <p className="text-lg font-bold text-blue-600">₹29,550</p>
                      <p className="text-xs text-slate-500">
                        Includes ₹50 processing fee
                      </p>
                    </div>
                  </label>

                  {/* Option 2: Milestones */}
                  <label
                    className={`flex items-start p-3 border rounded-lg cursor-pointer transition-colors ${paymentOption === 'milestone' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:bg-slate-50'}`}>

                    <input
                      type="radio"
                      name="payment"
                      className="mt-1 mr-3"
                      checked={paymentOption === 'milestone'}
                      onChange={() => setPaymentOption('milestone')} />

                    <div className="w-full">
                      <span className="font-semibold text-slate-900">
                        Pay Milestone
                      </span>
                      {paymentOption === 'milestone' &&
                      <div className="mt-2">
                          <Select
                          options={[
                          {
                            value: '1',
                            label: 'Milestone 1 - Design (₹20,000)'
                          },
                          {
                            value: '2',
                            label: 'Milestone 2 - Logo (₹9,500)'
                          }]
                          }
                          className="text-sm" />

                        </div>
                      }
                    </div>
                  </label>

                  {/* Option 3: Custom Amount */}
                  <label
                    className={`flex items-start p-3 border rounded-lg cursor-pointer transition-colors ${paymentOption === 'custom' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:bg-slate-50'}`}>

                    <input
                      type="radio"
                      name="payment"
                      className="mt-1 mr-3"
                      checked={paymentOption === 'custom'}
                      onChange={() => setPaymentOption('custom')} />

                    <div className="w-full">
                      <span className="font-semibold text-slate-900">
                        Pay Partial Amount
                      </span>
                      {paymentOption === 'custom' &&
                      <div className="mt-2">
                          <Input
                          placeholder="Enter amount (min ₹5,000)"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          type="number" />

                        </div>
                      }
                    </div>
                  </label>

                  {/* Option 4: EMI */}
                  <label
                    className={`flex items-start p-3 border rounded-lg cursor-pointer transition-colors ${paymentOption === 'emi' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:bg-slate-50'}`}>

                    <input
                      type="radio"
                      name="payment"
                      className="mt-1 mr-3"
                      checked={paymentOption === 'emi'}
                      onChange={() => setPaymentOption('emi')} />

                    <div>
                      <span className="font-semibold text-slate-900">
                        Pay via EMI
                      </span>
                      <p className="text-xs text-slate-500">
                        Starts at ₹2,600/month
                      </p>
                    </div>
                  </label>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="flex justify-between mb-4">
                    <span className="text-slate-600">Total to Pay</span>
                    <span className="text-xl font-bold text-slate-900">
                      {paymentOption === 'full' ?
                      '₹29,550' :
                      paymentOption === 'milestone' ?
                      '₹20,000' :
                      paymentOption === 'custom' ?
                      `₹${customAmount || '0'}` :
                      'Select Plan'}
                    </span>
                  </div>
                  <Button className="w-full h-12 text-lg" onClick={handlePay}>
                    Confirm & Pay
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                leftIcon={<Download className="h-4 w-4" />}>

                Download
              </Button>
              <Button
                variant="outline"
                leftIcon={<Share2 className="h-4 w-4" />}>

                Share
              </Button>
              <Button
                variant="outline"
                className="col-span-2"
                leftIcon={<MessageCircle className="h-4 w-4" />}>

                Contact Seller
              </Button>
            </div>
          </div>
        </div>
      </div>
    </BuyerLayout>);

}