import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
export function VerifyOTPPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mobile = searchParams.get('mobile');
  const role = searchParams.get('role');
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;
    setOtp([...otp.map((d, idx) => idx === index ? element.value : d)]);
    // Focus next input
    if (element.nextSibling && element.value !== '') {
      ;(element.nextSibling as HTMLInputElement).focus();
    }
  };
  const handleVerify = () => {
    setIsLoading(true);
    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      // If new user -> onboarding, else -> dashboard
      // For demo, we'll go to seller dashboard if role is seller
      if (role === 'seller') {
        navigate('/seller/dashboard');
      } else {
        navigate('/buyer/home');
      }
    }, 1000);
  };
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">T</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
          Verify OTP
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          We sent a code to +91 {mobile}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div className="flex justify-center space-x-2">
              {otp.map((data, index) =>
              <input
                key={index}
                type="text"
                maxLength={1}
                className="w-10 h-12 border border-slate-300 rounded-md text-center text-xl font-semibold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()} />

              )}
            </div>

            <Button
              onClick={handleVerify}
              className="w-full"
              size="lg"
              isLoading={isLoading}
              disabled={otp.some((d) => d === '')}>

              Verify & Continue
            </Button>

            <div className="text-center text-sm">
              {timer > 0 ?
              <p className="text-slate-500">Resend OTP in {timer}s</p> :

              <button className="text-blue-600 hover:text-blue-500 font-medium">
                  Resend OTP
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>);

}