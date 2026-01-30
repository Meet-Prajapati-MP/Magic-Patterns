import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, ShoppingBag, Globe } from 'lucide-react';
import { Button } from '../../components/ui/Button';
export function WelcomePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">T</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
          Welcome to Trustopay
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Choose how you want to continue
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 space-y-4">
          <Link to="/login?role=seller" className="block group">
            <div className="flex items-center p-4 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer">
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-200">
                <Briefcase className="h-5 w-5" />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-sm font-semibold text-slate-900">
                  Continue as Seller
                </h3>
                <p className="text-xs text-slate-500">
                  Freelancers, Agencies, Service Providers
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-blue-500" />
            </div>
          </Link>

          <Link to="/login?role=buyer" className="block group">
            <div className="flex items-center p-4 border border-slate-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all cursor-pointer">
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 group-hover:bg-green-200">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-sm font-semibold text-slate-900">
                  Continue as Buyer
                </h3>
                <p className="text-xs text-slate-500">
                  Clients, Businesses hiring talent
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-green-500" />
            </div>
          </Link>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-slate-500">or</span>
            </div>
          </div>

          <Link to="/">
            <Button
              variant="outline"
              className="w-full"
              leftIcon={<Globe className="h-4 w-4" />}>

              Explore Platform
            </Button>
          </Link>
        </div>
        <p className="mt-6 text-center text-xs text-slate-500">
          By continuing, you agree to our{' '}
          <Link to="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>);

}