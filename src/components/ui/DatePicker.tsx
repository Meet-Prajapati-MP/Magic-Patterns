import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
export function DatePicker({
  label,
  error,
  className = '',
  ...props
}: DatePickerProps) {
  // In a real app, use a library like date-fns or react-day-picker
  // This is a native implementation for simplicity
  return (
    <div className="w-full">
      {label &&
      <div className="flex items-center justify-between mb-1.5">
        <label className="block text-sm font-medium text-slate-700">
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
        <input
          type="date"
          className={`
            block w-full rounded-md bg-white px-3 py-2 text-sm placeholder:text-slate-400 
            focus:outline-none focus:ring-2 focus:border-transparent
            ${error && typeof error === 'string' && error.trim().length > 0 ? '!border-2 !border-red-500 focus:ring-red-500' : 'border border-slate-300 focus:ring-blue-500'}
            ${className}
          `}
          {...props} />

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
          <CalendarIcon className="h-4 w-4" />
        </div>
      </div>
    </div>);

}