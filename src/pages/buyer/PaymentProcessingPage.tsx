import React, { useEffect } from 'react';
import { Loader2, ShieldCheck } from 'lucide-react';
import { ProgressBar } from '../../components/ui/ProgressBar';
export function PaymentProcessingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center">
            <span className="text-white font-bold text-3xl">T</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative flex justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 pt-16">
            Processing Payment...
          </h2>
          <p className="text-slate-500">
            Please do not close this window or press back.
          </p>
        </div>

        <div className="space-y-2">
          <ProgressBar value={65} showPercentage={false} className="h-2" />
          <p className="text-xs text-slate-400">Contacting bank servers...</p>
        </div>

        <div className="flex items-center justify-center space-x-2 text-sm text-green-600 bg-green-50 py-2 rounded-lg">
          <ShieldCheck className="h-4 w-4" />
          <span>Your payment is being securely processed</span>
        </div>
      </div>
    </div>);

}