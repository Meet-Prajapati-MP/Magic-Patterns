import React, { useId } from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
export function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || useId();
  return (
    <div className="w-full">
      {label &&
      <div className="flex items-center justify-between mb-1.5">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-slate-700">
          {label}
        </label>
        {error &&
        <span className="text-xs text-red-500 font-medium ml-2">{error}</span>
        }
      </div>
      }
      {!label && error &&
      <div className="mb-1.5">
        <span className="text-xs text-red-500 font-medium">{error}</span>
      </div>
      }
      <div className="relative">
        {leftIcon &&
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            {leftIcon}
          </div>
        }
        <input
          id={inputId}
          className={`
            flex h-10 w-full rounded-md bg-white px-3 py-2 text-sm placeholder:text-slate-400 
            focus:outline-none focus:ring-2 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50
            transition-all duration-200
            ${error && typeof error === 'string' && error.trim().length > 0 ? '!border-2 !border-red-500 focus:ring-red-500' : 'border border-slate-300 focus:ring-blue-500'}
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
            ${className}
          `}
          {...props} />

        {rightIcon &&
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
            {rightIcon}
          </div>
        }
      </div>
      {!error && helperText &&
      <p className="mt-1 text-xs text-slate-500">{helperText}</p>
      }
    </div>);

}