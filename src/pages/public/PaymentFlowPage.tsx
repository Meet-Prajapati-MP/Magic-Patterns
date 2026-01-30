import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  CheckCircle,
  Lock,
  CreditCard,
  Smartphone,
  Building } from
'lucide-react';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { PaymentGateway } from '../../components/shared/PaymentGateway';
export function PaymentFlowPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [paymentType, setPaymentType] = useState('full'); // full, partial, emi
  const [emiPlan, setEmiPlan] = useState('3');
  const [customAmount, setCustomAmount] = useState('');
  // Mock Invoice Data
  const invoice = {
    id: 'INV-001',
    amount: 40000,
    seller: 'Rajesh Design Studio',
    dueDate: '31 Jan 2025'
  };
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) setStep(1.5); // OTP step
  };
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) setStep(2); // Payment options
  };
  const handlePaymentSuccess = () => {
    navigate('/buyer/payment/processing');
    setTimeout(() => {
      navigate('/buyer/payment/success');
    }, 2000);
  };
  const getPaymentAmount = () => {
    if (paymentType === 'full') return invoice.amount;
    if (paymentType === 'partial') return parseInt(customAmount) || 0;
    if (paymentType === 'emi')
    return Math.ceil(invoice.amount / parseInt(emiPlan));
    return invoice.amount;
  };
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold text-slate-900">Trustopay</span>
          </div>
          <div className="flex items-center text-sm text-slate-500">
            <Lock className="h-4 w-4 mr-1" />
            Secure Payment
          </div>
        </div>

        {/* Steps Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-200 -z-10" />
            {[1, 2, 3].map((s) =>
            <div
              key={s}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${Math.floor(step) >= s ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>

                {s}
              </div>
            )}
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-500 font-medium">
            <span>Verify</span>
            <span>Options</span>
            <span>Payment</span>
          </div>
        </div>

        {/* Step 1: Verify Identity */}
        {step === 1 &&
        <Card>
            <CardHeader>
              <CardTitle>Verify Identity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-6">
                To securely process your payment for invoice{' '}
                <strong>#{invoice.id}</strong>, please verify your phone number.
              </p>
              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-slate-500 sm:text-sm">+91</span>
                    </div>
                    <input
                    type="tel"
                    className="block w-full pl-12 pr-10 py-2 border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))
                    }
                    required />

                  </div>
                </div>
                <Button
                type="submit"
                className="w-full"
                rightIcon={<ArrowRight className="h-4 w-4" />}>

                  Continue
                </Button>
              </form>
            </CardContent>
          </Card>
        }

        {/* Step 1.5: OTP */}
        {step === 1.5 &&
        <Card>
            <CardHeader>
              <CardTitle>Enter Verification Code</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-6">
                We sent a 6-digit code to <strong>+91 {phone}</strong>
              </p>
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <Input
                placeholder="123456"
                value={otp}
                onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))
                }
                className="text-center text-2xl tracking-widest" />

                <Button
                type="submit"
                className="w-full"
                rightIcon={<CheckCircle className="h-4 w-4" />}>

                  Verify & Continue
                </Button>
                <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-sm text-blue-600 hover:text-blue-700">

                  Change Phone Number
                </button>
              </form>
            </CardContent>
          </Card>
        }

        {/* Step 2: Payment Options */}
        {step === 2 &&
        <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-slate-500">Invoice Amount</p>
                    <p className="text-2xl font-bold text-slate-900">
                      ₹{invoice.amount.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">Due Date</p>
                    <p className="font-medium text-slate-900">
                      {invoice.dueDate}
                    </p>
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-4">
                  <p className="text-sm font-medium text-slate-700 mb-3">
                    Select Payment Amount
                  </p>

                  <div className="space-y-3">
                    <label
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentType === 'full' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-slate-200 hover:border-slate-300'}`}>

                      <input
                      type="radio"
                      name="paymentType"
                      className="h-4 w-4 text-blue-600"
                      checked={paymentType === 'full'}
                      onChange={() => setPaymentType('full')} />

                      <div className="ml-3 flex-1">
                        <span className="block font-medium text-slate-900">
                          Pay Full Amount
                        </span>
                        <span className="block text-sm text-slate-500">
                          Clear the entire invoice
                        </span>
                      </div>
                      <span className="font-bold text-slate-900">
                        ₹{invoice.amount.toLocaleString()}
                      </span>
                    </label>

                    <label
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentType === 'partial' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-slate-200 hover:border-slate-300'}`}>

                      <input
                      type="radio"
                      name="paymentType"
                      className="h-4 w-4 text-blue-600"
                      checked={paymentType === 'partial'}
                      onChange={() => setPaymentType('partial')} />

                      <div className="ml-3 flex-1">
                        <span className="block font-medium text-slate-900">
                          Pay Partial Amount
                        </span>
                        <span className="block text-sm text-slate-500">
                          Pay what you can now
                        </span>
                      </div>
                      {paymentType === 'partial' ?
                    <input
                      type="number"
                      className="w-24 p-1 border rounded text-right"
                      placeholder="Amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      onClick={(e) => e.stopPropagation()} /> :


                    <span className="text-sm text-slate-400">Custom</span>
                    }
                    </label>

                    <label
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentType === 'emi' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-slate-200 hover:border-slate-300'}`}>

                      <input
                      type="radio"
                      name="paymentType"
                      className="h-4 w-4 text-blue-600"
                      checked={paymentType === 'emi'}
                      onChange={() => setPaymentType('emi')} />

                      <div className="ml-3 flex-1">
                        <span className="block font-medium text-slate-900">
                          Pay in EMI
                        </span>
                        <span className="block text-sm text-slate-500">
                          Split into monthly payments
                        </span>
                      </div>
                      {paymentType === 'emi' ?
                    <select
                      className="p-1 border rounded text-sm"
                      value={emiPlan}
                      onChange={(e) => setEmiPlan(e.target.value)}
                      onClick={(e) => e.stopPropagation()}>

                          <option value="3">3 Months</option>
                          <option value="6">6 Months</option>
                        </select> :

                    <span className="text-sm text-slate-400">Plans</span>
                    }
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="ghost" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
              onClick={() => setStep(3)}
              rightIcon={<ArrowRight className="h-4 w-4" />}>

                Continue to Payment
              </Button>
            </div>
          </div>
        }

        {/* Step 3: Payment Method */}
        {step === 3 &&
        <div className="space-y-6">
            <div className="mb-4">
              <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep(2)}
              leftIcon={<ArrowLeft className="h-4 w-4" />}>

                Back to Options
              </Button>
            </div>

            <PaymentGateway
            amount={getPaymentAmount().toLocaleString()}
            invoiceId={invoice.id}
            onSuccess={handlePaymentSuccess}
            onFailure={() => alert('Payment Failed')}
            onCancel={() => setStep(2)} />

          </div>
        }

        {/* Footer Trust */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-4 text-slate-400 grayscale opacity-70 mb-4">
            <Shield className="h-5 w-5" />
            <Lock className="h-5 w-5" />
            <span className="text-sm font-medium">PCI-DSS Compliant</span>
          </div>
          <p className="text-xs text-slate-400">
            © 2025 Trustopay India Pvt Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </div>);

}