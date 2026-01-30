import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Phone } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
export function AuthStartPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/auth/verify');
    }, 1000);
  };
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-2xl font-bold text-slate-900">Trustopay</span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
          Welcome to Trustopay
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Enter your phone number to continue
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-slate-700">

                Phone Number
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-slate-500 sm:text-sm">+91</span>
                </div>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="block w-full pl-12 pr-10 py-2 border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="98765 43210"
                  value={phone}
                  onChange={(e) =>
                  setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))
                  }
                  required />

                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Phone className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                required />

              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-slate-900">

                I agree to the{' '}
                <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                  Terms
                </Link>{' '}
                and{' '}
                <Link
                  to="/privacy"
                  className="text-blue-600 hover:text-blue-500">

                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="h-4 w-4" />}>

              Continue
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-slate-500">
                  Secured by Trustopay
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-center space-x-6 text-slate-400">
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4" />
                <span className="text-xs">Bank Grade Security</span>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Having trouble?{' '}
          <Link
            to="/contact"
            className="font-medium text-blue-600 hover:text-blue-500">

            Contact Support
          </Link>
        </p>
      </div>
    </div>);

}