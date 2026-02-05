import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, Mail, User, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { sendEmailOTP, validateEmail } from '../../services/otpService';
import { upsertUserProfile } from '../../services/profileService';
import { supabaseClient } from '../../supabase-client';

export function LoginPage() {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'seller';
  
  const validateName = (nameValue: string): string => {
    if (!nameValue.trim()) {
      return 'Name is required';
    }
    if (nameValue.trim().length < 2) {
      return 'Name must be at least 2 characters';
    }
    return '';
  };

  const handleEmailChange = (value: string) => {
    setEmail(value.toLowerCase().trim());
    setEmailError('');
    setErrorMessage('');
    
    // Validate on change if form was submitted
    if (formSubmitted) {
      const validation = validateEmail(value);
      if (!validation.valid) {
        setEmailError(validation.error || '');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setErrorMessage('');
    
    const nameErr = validateName(name);
    setNameError(nameErr);
    
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      setEmailError(emailValidation.error || '');
    }
    
    if (nameErr || !emailValidation.valid) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Send email OTP using Supabase Auth
      const result = await sendEmailOTP(email, {
        name: name.trim()
      });
      
      if (result.success) {
        // Navigate to verify OTP page
        navigate(`/verify-otp?email=${encodeURIComponent(email)}&role=${role}&name=${encodeURIComponent(name.trim())}`);
      } else {
        setErrorMessage(result.message || 'Failed to send verification email. Please try again.');
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error('Error during login:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-xl flex items-center justify-center overflow-hidden">
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
          Login to Trustopay
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Enter your details to continue
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700">
                  Name
                </label>
                {formSubmitted && nameError && (
                  <span className="text-xs text-red-500 font-medium ml-2">{nameError}</span>
                )}
              </div>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={`block w-full pl-10 pr-3 py-3 rounded-md focus:ring-2 focus:outline-none sm:text-sm ${
                    formSubmitted && nameError ? 'border-2 border-red-500 focus:ring-red-500' : 'border border-slate-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (formSubmitted) {
                      setNameError(validateName(e.target.value));
                    }
                  }}
                  required />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700">
                  Email Address
                </label>
                {formSubmitted && emailError && (
                  <span className="text-xs text-red-500 font-medium ml-2">{emailError}</span>
                )}
              </div>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`block w-full pl-10 pr-3 py-3 rounded-md focus:ring-2 focus:outline-none sm:text-sm ${
                    formSubmitted && emailError ? 'border-2 border-red-500 focus:ring-red-500' : 'border border-slate-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  required
                  autoComplete="email" />
              </div>
            </div>

            {errorMessage && (
              <div className="rounded-md bg-red-50 p-4 flex items-start border border-red-200">
                <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="ml-3 flex-1">
                  <p className="text-sm text-red-800 whitespace-pre-line">{errorMessage}</p>
                  {errorMessage.includes('SMS Provider Not Configured') && (
                    <div className="mt-3 pt-3 border-t border-red-200">
                      <a
                        href="https://app.supabase.com/project/_/auth/providers"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-red-600 hover:text-red-700 underline font-medium">
                        Open Supabase Dashboard →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isLoading}
              disabled={!name.trim() || !email.trim() || isLoading}
              rightIcon={<ArrowRight className="h-4 w-4" />}>
              {isLoading ? 'Sending verification code...' : 'Send Verification Code'}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-slate-500">
                  Trusted by 10,000+ freelancers
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}