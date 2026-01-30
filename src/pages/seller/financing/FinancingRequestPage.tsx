import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Upload, ArrowRight, ArrowLeft } from 'lucide-react';
import { SellerLayout } from '../../../components/layout/SellerLayout';
import { Button } from '../../../components/ui/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../../components/ui/Card';
import { Select } from '../../../components/ui/Select';
import { Input } from '../../../components/ui/Input';
export function FinancingRequestPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const renderStep1 = () =>
  <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
        <h4 className="font-bold text-blue-900 mb-2">Eligibility Criteria</h4>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-center">
            <Check className="h-4 w-4 mr-2" /> Invoice must be unpaid and not
            overdue
          </li>
          <li className="flex items-center">
            <Check className="h-4 w-4 mr-2" /> Minimum amount ₹10,000
          </li>
          <li className="flex items-center">
            <Check className="h-4 w-4 mr-2" /> Client must be a verified
            business
          </li>
        </ul>
      </div>

      <Select
      label="Select Invoice"
      options={[
      {
        value: '',
        label: 'Select an invoice...'
      },
      {
        value: 'INV-004',
        label: 'INV-004 - Global Services - ₹85,000'
      }]
      } />


      <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-slate-500">Invoice Amount</span>
          <span className="font-bold">₹85,000</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-slate-500">Client</span>
          <span className="font-medium">Global Services</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-slate-500">Due Date</span>
          <span className="font-medium">25 Feb 2025</span>
        </div>
      </div>
    </div>;

  const renderStep2 = () =>
  <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Advance Amount (80-90%)
        </label>
        <input
        type="range"
        min="80"
        max="90"
        defaultValue="85"
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" />

        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>80%</span>
          <span>90%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
        <div>
          <p className="text-xs text-slate-500">Advance Amount</p>
          <p className="text-lg font-bold text-slate-900">₹72,250</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Est. Fee (2%)</p>
          <p className="text-lg font-bold text-slate-900">₹1,700</p>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-slate-900">Supporting Documents</h4>
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
          <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-slate-600">Upload Contract / SOW</p>
          <p className="text-xs text-slate-400">PDF, JPG up to 5MB</p>
        </div>
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
          <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-slate-600">Upload Proof of Work</p>
        </div>
      </div>
    </div>;

  const renderStep3 = () =>
  <div className="space-y-6 text-center">
      <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Check className="h-8 w-8 text-green-600" />
      </div>
      <h3 className="text-xl font-bold text-slate-900">
        Application Submitted!
      </h3>
      <p className="text-slate-500 max-w-md mx-auto">
        Your request for invoice financing has been submitted. Our partners will
        review it within 24-48 hours.
      </p>
      <div className="p-4 bg-slate-50 rounded-lg max-w-sm mx-auto mt-6">
        <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
          Application Ref
        </p>
        <p className="font-mono font-bold text-lg">APP-2025-892</p>
      </div>
    </div>;

  return (
    <SellerLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center space-x-4">
          {step < 3 &&
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-full">

              <ArrowLeft className="h-5 w-5 text-slate-500" />
            </button>
          }
          <h2 className="text-2xl font-bold text-slate-900">
            {step === 3 ? 'Success' : 'Request Financing'}
          </h2>
        </div>

        {step < 3 &&
        <div className="flex items-center justify-between mb-8 px-4">
            {[1, 2].map((s) =>
          <div key={s} className="flex flex-col items-center relative z-10">
                <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>

                  {s}
                </div>
                <span className="text-xs mt-2 text-slate-500">
                  {s === 1 ? 'Select Invoice' : 'Details'}
                </span>
              </div>
          )}
            <div className="absolute left-0 right-0 h-0.5 bg-slate-200 -z-10 top-12 mx-auto w-1/2" />
          </div>
        }

        <Card>
          <CardContent className="p-6">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}

            <div className="mt-8 flex justify-end space-x-4">
              {step === 1 &&
              <Button
                onClick={() => setStep(2)}
                rightIcon={<ArrowRight className="h-4 w-4" />}>

                  Continue
                </Button>
              }
              {step === 2 &&
              <Button onClick={() => setStep(3)}>Submit Application</Button>
              }
              {step === 3 &&
              <Button onClick={() => navigate('/seller/financing')}>
                  Back to Dashboard
                </Button>
              }
            </div>
          </CardContent>
        </Card>
      </div>
    </SellerLayout>);

}