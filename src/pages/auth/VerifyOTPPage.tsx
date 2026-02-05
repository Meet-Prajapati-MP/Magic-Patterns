import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { verifyEmailOTP, resendEmailOTP } from '../../services/otpService';
import { upsertUserProfile } from '../../services/profileService';
import { AlertCircle, CheckCircle, Mail } from 'lucide-react';

export function VerifyOTPPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(60); // 60 seconds cooldown
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const role = searchParams.get('role') || 'seller';
  const name = searchParams.get('name') || '';

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Auto-focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    
    // Only allow digits
    if (value && isNaN(Number(value))) {
      return;
    }

    // Update OTP array
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take last character
    setOtp(newOtp);
    setErrorMessage('');
    setSuccessMessage('');

    // Auto-focus next input
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits are entered
    if (newOtp.every(digit => digit !== '') && index === 5) {
      handleVerify(newOtp.join(''));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Handle paste
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then(text => {
        const digits = text.replace(/\D/g, '').slice(0, 6);
        if (digits.length === 6) {
          const newOtp = digits.split('');
          setOtp(newOtp);
          inputRefs.current[5]?.focus();
          // Auto-verify after paste
          setTimeout(() => handleVerify(digits), 100);
        }
      });
    }
  };

  const handleVerify = async (otpValue?: string) => {
    const otpCode = otpValue || otp.join('');
    
    if (otpCode.length !== 6) {
      setErrorMessage('Please enter all 6 digits');
      return;
    }

    if (!email) {
      setErrorMessage('Email address is missing. Please start over.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const result = await verifyEmailOTP(email, otpCode);
      
      if (result.success) {
        setSuccessMessage('Email verified successfully!');
        
        // Store session if available
        if (result.session && result.user) {
          // Session is automatically stored by Supabase client
          // Save user details to profile
          try {
            await upsertUserProfile(result.user.id, {
              name: name || result.user.user_metadata?.name || result.user.user_metadata?.full_name || '',
              email: result.user.email || email,
              phone: undefined
            });
          } catch (profileError) {
            console.error('Error saving user profile:', profileError);
            // Don't block navigation if profile save fails
          }
        }
        
        // Store user data in localStorage for immediate display
        const userData = {
          name: name || result.user?.user_metadata?.name || '',
          email: email,
          role: role
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Navigate based on role
        setTimeout(() => {
          if (role === 'seller') {
            navigate('/seller/dashboard');
          } else {
            navigate('/buyer/home');
          }
        }, 500);
      } else {
        setErrorMessage(result.message || 'Invalid OTP. Please try again.');
        setIsLoading(false);
        // Clear OTP on error
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (error: any) {
      console.error('Error during verification:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (timer > 0 || !email) {
      return;
    }
    
    setIsResending(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      const result = await resendEmailOTP(email, {
        name: name
      });
      
      if (result.success) {
        setSuccessMessage('Verification code resent successfully!');
        setTimer(60); // Reset timer to 60 seconds
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      } else {
        setErrorMessage(result.message || 'Failed to resend verification code. Please try again.');
      }
    } catch (error: any) {
      console.error('Error resending OTP:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsResending(false);
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-xl flex items-center justify-center overflow-hidden bg-white shadow-sm">
            <img 
              src="/logo.png" 
              alt="Trustopay Logo" 
              className="h-full w-full object-contain"
              onError={(e) => {
                // Fallback to blue background with T if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.className = 'h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center';
                  parent.innerHTML = '<span class="text-white font-bold text-2xl">T</span>';
                }
              }}
            />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
          Verify Email
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          We sent a verification code to
        </p>
        <div className="mt-1 flex items-center justify-center space-x-2">
          <Mail className="h-4 w-4 text-slate-500" />
          <p className="text-sm font-medium text-slate-900">{email}</p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div className="flex justify-center space-x-2">
              {otp.map((data, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className={`w-12 h-14 border rounded-lg text-center text-2xl font-semibold focus:ring-2 focus:outline-none transition-all ${
                    errorMessage
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={(e) => e.target.select()}
                  disabled={isLoading}
                />
              ))}
            </div>

            {errorMessage && (
              <div className="rounded-md bg-red-50 p-3 flex items-start">
                <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="ml-3">
                  <p className="text-sm text-red-800">{errorMessage}</p>
                </div>
              </div>
            )}

            {successMessage && (
              <div className="rounded-md bg-green-50 p-3 flex items-start">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div className="ml-3">
                  <p className="text-sm text-green-800">{successMessage}</p>
                </div>
              </div>
            )}

            <Button
              onClick={() => handleVerify()}
              className="w-full"
              size="lg"
              isLoading={isLoading}
              disabled={otp.some((d) => d === '') || isLoading}>
              {isLoading ? 'Verifying...' : 'Verify & Continue'}
            </Button>

            <div className="text-center text-sm">
              {timer > 0 ? (
                <p className="text-slate-500">
                  Resend OTP in <span className="font-semibold">{timer}s</span>
                </p>
              ) : (
                <button
                  onClick={handleResendOTP}
                  disabled={isResending}
                  className="text-blue-600 hover:text-blue-500 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  {isResending ? 'Sending...' : 'Resend OTP'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>);

}