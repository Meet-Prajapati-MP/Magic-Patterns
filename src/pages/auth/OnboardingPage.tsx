import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Briefcase,
  Building,
  Upload,
  Check,
  ArrowRight,
  ArrowLeft } from
'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
export function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<'individual' | 'agency'>(
    'individual'
  );
  const [isLoading, setIsLoading] = useState(false);
  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate('/seller/dashboard');
      }, 1500);
    }
  };
  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };
  const renderStep1 = () =>
  <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Basic Profile</h2>
        <p className="text-slate-500">Let's get to know you better</p>
      </div>
      <div className="flex justify-center mb-6">
        <div className="h-24 w-24 bg-slate-100 rounded-full flex items-center justify-center border-2 border-dashed border-slate-300 cursor-pointer hover:border-blue-500 transition-colors">
          <Upload className="h-8 w-8 text-slate-400" />
        </div>
      </div>
      <Input label="Full Name" placeholder="e.g. Rajesh Kumar" />
      <Input
      label="Email Address"
      type="email"
      placeholder="rajesh@example.com" />

    </div>;

  const renderStep2 = () =>
  <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Choose Account Type
        </h2>
        <p className="text-slate-500">How do you operate?</p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <button
        onClick={() => setAccountType('individual')}
        className={`p-6 border-2 rounded-xl flex items-center text-left transition-all ${accountType === 'individual' ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}>

          <div
          className={`h-12 w-12 rounded-full flex items-center justify-center ${accountType === 'individual' ? 'bg-blue-200 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>

            <User className="h-6 w-6" />
          </div>
          <div className="ml-4">
            <h3
            className={`font-bold ${accountType === 'individual' ? 'text-blue-900' : 'text-slate-900'}`}>

              Individual Freelancer
            </h3>
            <p className="text-sm text-slate-500">
              I work solo and bill clients directly
            </p>
          </div>
          {accountType === 'individual' &&
        <Check className="ml-auto h-6 w-6 text-blue-600" />
        }
        </button>

        <button
        onClick={() => setAccountType('agency')}
        className={`p-6 border-2 rounded-xl flex items-center text-left transition-all ${accountType === 'agency' ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}>

          <div
          className={`h-12 w-12 rounded-full flex items-center justify-center ${accountType === 'agency' ? 'bg-blue-200 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>

            <Building className="h-6 w-6" />
          </div>
          <div className="ml-4">
            <h3
            className={`font-bold ${accountType === 'agency' ? 'text-blue-900' : 'text-slate-900'}`}>

              Agency / Business
            </h3>
            <p className="text-sm text-slate-500">
              I have a team or registered company
            </p>
          </div>
          {accountType === 'agency' &&
        <Check className="ml-auto h-6 w-6 text-blue-600" />
        }
        </button>
      </div>
    </div>;

  const renderStep3 = () =>
  <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Business Details</h2>
        <p className="text-slate-500">Tell us about your business</p>
      </div>
      <Input label="Business Name" placeholder="e.g. TechCraft Solutions" />
      <Input label="GSTIN (Optional)" placeholder="22AAAAA0000A1Z5" />
      <Input label="Registered Address" placeholder="Full business address" />
      <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors">
        <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
        <p className="text-sm text-slate-600">Upload Business Logo</p>
      </div>
    </div>;

  const renderStep4 = () =>
  <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">KYC Verification</h2>
        <p className="text-slate-500">
          Required for payments (Secure & Private)
        </p>
      </div>
      <div className="space-y-4">
        <div className="p-4 border border-slate-200 rounded-lg flex items-center justify-between">
          <div>
            <p className="font-medium text-slate-900">PAN Card</p>
            <p className="text-xs text-slate-500">
              Required for tax compliance
            </p>
          </div>
          <Button variant="outline" size="sm">
            Upload
          </Button>
        </div>
        <div className="p-4 border border-slate-200 rounded-lg flex items-center justify-between">
          <div>
            <p className="font-medium text-slate-900">Aadhaar Card</p>
            <p className="text-xs text-slate-500">Identity verification</p>
          </div>
          <Button variant="outline" size="sm">
            Upload
          </Button>
        </div>
        <div className="p-4 border border-slate-200 rounded-lg flex items-center justify-between">
          <div>
            <p className="font-medium text-slate-900">Bank Account</p>
            <p className="text-xs text-slate-500">For receiving payouts</p>
          </div>
          <Button variant="outline" size="sm">
            Add Details
          </Button>
        </div>
      </div>
    </div>;

  const renderStep5 = () =>
  <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Permissions</h2>
        <p className="text-slate-500">Stay updated with your payments</p>
      </div>
      <div className="space-y-4">
        {['WhatsApp Notifications', 'Email Updates', 'Push Notifications'].map(
        (item, i) =>
        <div
          key={i}
          className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">

              <span className="font-medium text-slate-900">{item}</span>
              <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
                <input
              type="checkbox"
              defaultChecked
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />

                <label className="toggle-label block overflow-hidden h-6 rounded-full bg-blue-600 cursor-pointer"></label>
              </div>
            </div>

      )}
      </div>
    </div>;

  const renderStep6 = () =>
  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 text-center">
      <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
        <Briefcase className="h-10 w-10" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900">You're all set!</h2>
      <p className="text-slate-600 max-w-sm mx-auto">
        Your seller account is ready. You can also switch to Buyer mode anytime
        from the top menu.
      </p>
      <div className="bg-slate-50 p-4 rounded-lg inline-block text-left w-full max-w-sm">
        <div className="flex items-center space-x-3 mb-2">
          <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
          <div className="h-4 w-24 bg-slate-200 rounded"></div>
        </div>
        <p className="text-xs text-slate-500">
          Look for the "Switch Mode" toggle in your dashboard.
        </p>
      </div>
    </div>;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 h-1.5 rounded-full mb-8 overflow-hidden">
          <div
            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
            style={{
              width: `${step / 6 * 100}%`
            }}>
          </div>
        </div>

        <Card className="p-8">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
          {step === 5 && renderStep5()}
          {step === 6 && renderStep6()}

          <div className="mt-8 flex justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={step === 1}
              leftIcon={<ArrowLeft className="h-4 w-4" />}>

              Back
            </Button>
            <Button
              onClick={handleNext}
              isLoading={isLoading}
              rightIcon={
              step === 6 ? undefined : <ArrowRight className="h-4 w-4" />
              }>

              {step === 6 ? 'Go to Dashboard' : 'Next'}
            </Button>
          </div>
        </Card>
      </div>
    </div>);

}