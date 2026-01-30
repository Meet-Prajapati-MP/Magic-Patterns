import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Shield } from 'lucide-react';
import { BuyerLayout } from '../../components/layout/BuyerLayout';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Stepper } from '../../components/ui/Stepper';
import { Input } from '../../components/ui/Input';
export function AutopaySetupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState('upi');
  const steps = [
  {
    title: 'Choose Method'
  },
  {
    title: 'Link Account'
  },
  {
    title: 'Set Limits'
  },
  {
    title: 'Confirm'
  }];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);else
    navigate('/buyer/emi-plans');
  };
  const handleBack = () => {
    if (step === 1) {
      navigate(-1); // Go back to previous page
    } else {
      setStep(Math.max(1, step - 1));
    }
  };
  return (
    <BuyerLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors">

            <ArrowLeft className="h-5 w-5 text-slate-500" />
          </button>
          <h1 className="text-2xl font-bold text-slate-900">Setup Autopay</h1>
        </div>

        <Stepper steps={steps} currentStep={step} className="mb-8" />

        <Card>
          <CardContent className="p-8">
            {step === 1 &&
            <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900">
                  Select Autopay Method
                </h2>
                <div className="space-y-4">
                  <label
                  className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${method === 'upi' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-slate-200 hover:border-slate-300'}`}>

                    <input
                    type="radio"
                    name="method"
                    className="h-5 w-5 text-blue-600"
                    checked={method === 'upi'}
                    onChange={() => setMethod('upi')} />

                    <div className="ml-4">
                      <span className="block font-semibold text-slate-900">
                        UPI Autopay
                      </span>
                      <span className="block text-sm text-slate-500">
                        Instant setup using any UPI app. Best for amounts up to
                        ₹1 Lakh.
                      </span>
                    </div>
                  </label>

                  <label
                  className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${method === 'enach' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-slate-200 hover:border-slate-300'}`}>

                    <input
                    type="radio"
                    name="method"
                    className="h-5 w-5 text-blue-600"
                    checked={method === 'enach'}
                    onChange={() => setMethod('enach')} />

                    <div className="ml-4">
                      <span className="block font-semibold text-slate-900">
                        eNACH (Bank Mandate)
                      </span>
                      <span className="block text-sm text-slate-500">
                        Direct bank debit. Takes 2-3 days to activate. Good for
                        higher amounts.
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            }

            {step === 2 &&
            <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900">
                  Link Your Account
                </h2>
                {method === 'upi' ?
              <div className="space-y-4">
                    <Input label="Enter UPI ID" placeholder="username@upi" />
                    <Button variant="outline" size="sm">
                      Verify
                    </Button>
                  </div> :

              <div className="space-y-4">
                    <Input
                  label="Account Number"
                  placeholder="Enter account number" />

                    <Input label="IFSC Code" placeholder="Enter IFSC code" />
                    <Input
                  label="Account Holder Name"
                  placeholder="Name as per bank records" />

                  </div>
              }
              </div>
            }

            {step === 3 &&
            <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900">
                  Set Limits
                </h2>
                <div className="space-y-4">
                  <Input
                  label="Maximum Amount per Transaction"
                  type="number"
                  defaultValue="50000" />

                  <p className="text-xs text-slate-500">
                    We will never debit more than this amount without your
                    approval.
                  </p>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Frequency
                    </label>
                    <select className="w-full border border-slate-300 rounded-md p-2">
                      <option>Monthly</option>
                      <option>Weekly</option>
                      <option>As presented</option>
                    </select>
                  </div>

                  <Input
                  label="Start Date"
                  type="date"
                  defaultValue="2025-02-01" />

                </div>
              </div>
            }

            {step === 4 &&
            <div className="space-y-6 text-center">
                <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                  <Shield className="h-8 w-8" />
                </div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Confirm Mandate
                </h2>
                <p className="text-slate-600">
                  You are authorizing Trustopay to debit up to ₹50,000 monthly
                  from your account ending in ****1234.
                </p>
                <div className="bg-slate-50 p-4 rounded-lg text-left text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Method</span>
                    <span className="font-medium">UPI Autopay</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Max Amount</span>
                    <span className="font-medium">₹50,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Start Date</span>
                    <span className="font-medium">01 Feb 2025</span>
                  </div>
                </div>
              </div>
            }

            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between">
              <Button variant="ghost" onClick={handleBack}>
                Back
              </Button>
              <Button
                onClick={handleNext}
                rightIcon={
                step < 4 ?
                <ArrowRight className="h-4 w-4" /> :

                <CheckCircle className="h-4 w-4" />

                }>

                {step === 4 ? 'Authorize & Finish' : 'Continue'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </BuyerLayout>);

}