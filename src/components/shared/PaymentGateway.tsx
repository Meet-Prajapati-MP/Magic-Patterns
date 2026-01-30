import React, { useState } from 'react';
import {
  CreditCard,
  Smartphone,
  Building,
  Wallet,
  CheckCircle,
  AlertCircle,
  Loader2 } from
'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
interface PaymentGatewayProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onSuccess: () => void;
}
export function PaymentGateway({
  isOpen,
  onClose,
  amount,
  onSuccess
}: PaymentGatewayProps) {
  const [method, setMethod] = useState<
    'upi' | 'card' | 'netbanking' | 'wallet'>(
    'upi');
  const [step, setStep] = useState<
    'select' | 'processing' | 'success' | 'failed'>(
    'select');
  const handlePay = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };
  const handleClose = () => {
    if (step === 'success') {
      onSuccess();
    }
    setStep('select');
    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={step === 'select' ? 'Secure Payment' : ''}
      size="md">

      {step === 'select' &&
      <div className="space-y-6">
          <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
            <span className="text-slate-600">Total Payable</span>
            <span className="text-2xl font-bold text-slate-900">
              ₹{amount.toLocaleString()}
            </span>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-700">
              Select Payment Method
            </p>

            <button
            onClick={() => setMethod('upi')}
            className={`w-full flex items-center p-4 border rounded-lg transition-all ${method === 'upi' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}>

              <Smartphone
              className={`h-6 w-6 ${method === 'upi' ? 'text-blue-600' : 'text-slate-400'}`} />

              <div className="ml-4 text-left">
                <p
                className={`font-medium ${method === 'upi' ? 'text-blue-900' : 'text-slate-900'}`}>

                  UPI
                </p>
                <p className="text-xs text-slate-500">
                  Google Pay, PhonePe, Paytm
                </p>
              </div>
            </button>

            <button
            onClick={() => setMethod('card')}
            className={`w-full flex items-center p-4 border rounded-lg transition-all ${method === 'card' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}>

              <CreditCard
              className={`h-6 w-6 ${method === 'card' ? 'text-blue-600' : 'text-slate-400'}`} />

              <div className="ml-4 text-left">
                <p
                className={`font-medium ${method === 'card' ? 'text-blue-900' : 'text-slate-900'}`}>

                  Credit / Debit Card
                </p>
                <p className="text-xs text-slate-500">
                  Visa, Mastercard, RuPay
                </p>
              </div>
            </button>

            <button
            onClick={() => setMethod('netbanking')}
            className={`w-full flex items-center p-4 border rounded-lg transition-all ${method === 'netbanking' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}>

              <Building
              className={`h-6 w-6 ${method === 'netbanking' ? 'text-blue-600' : 'text-slate-400'}`} />

              <div className="ml-4 text-left">
                <p
                className={`font-medium ${method === 'netbanking' ? 'text-blue-900' : 'text-slate-900'}`}>

                  Net Banking
                </p>
                <p className="text-xs text-slate-500">
                  All Indian banks supported
                </p>
              </div>
            </button>

            <button
            onClick={() => setMethod('wallet')}
            className={`w-full flex items-center p-4 border rounded-lg transition-all ${method === 'wallet' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}>

              <Wallet
              className={`h-6 w-6 ${method === 'wallet' ? 'text-blue-600' : 'text-slate-400'}`} />

              <div className="ml-4 text-left">
                <p
                className={`font-medium ${method === 'wallet' ? 'text-blue-900' : 'text-slate-900'}`}>

                  Wallets
                </p>
                <p className="text-xs text-slate-500">
                  Amazon Pay, MobiKwik, Freecharge
                </p>
              </div>
            </button>
          </div>

          {method === 'upi' &&
        <div className="space-y-4 pt-4 border-t border-slate-100">
              <Input label="Enter UPI ID" placeholder="username@upi" />
              <div className="text-center text-xs text-slate-500">- OR -</div>
              <div className="bg-slate-100 h-48 rounded-lg flex items-center justify-center">
                <p className="text-slate-400 text-sm">QR Code Placeholder</p>
              </div>
            </div>
        }

          {method === 'card' &&
        <div className="space-y-4 pt-4 border-t border-slate-100">
              <Input label="Card Number" placeholder="0000 0000 0000 0000" />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Expiry Date" placeholder="MM/YY" />
                <Input label="CVV" placeholder="123" type="password" />
              </div>
              <Input label="Cardholder Name" placeholder="Name on card" />
            </div>
        }

          <Button onClick={handlePay} className="w-full" size="lg">
            Pay ₹{amount.toLocaleString()}
          </Button>

          <div className="flex items-center justify-center space-x-2 text-xs text-slate-400">
            <AlertCircle className="h-3 w-3" />
            <span>Secured by Trustopay Payments</span>
          </div>
        </div>
      }

      {step === 'processing' &&
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
          <h3 className="text-lg font-semibold text-slate-900">
            Processing Payment...
          </h3>
          <p className="text-sm text-slate-500">
            Please do not close this window
          </p>
        </div>
      }

      {step === 'success' &&
      <div className="flex flex-col items-center justify-center py-8 space-y-4 text-center animate-in fade-in zoom-in duration-300">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">
            Payment Successful!
          </h3>
          <p className="text-slate-600">
            Transaction ID: TXN-{Math.floor(Math.random() * 1000000)}
          </p>
          <div className="w-full bg-slate-50 p-4 rounded-lg mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-500">Amount Paid</span>
              <span className="font-bold text-slate-900">
                ₹{amount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Date</span>
              <span className="font-medium text-slate-900">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
          <Button onClick={handleClose} className="w-full mt-6">
            Done
          </Button>
        </div>
      }
    </Modal>);

}