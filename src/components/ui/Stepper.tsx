import React, { Fragment } from 'react';
import { Check } from 'lucide-react';
interface Step {
  title: string;
  description?: string;
}
interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}
export function Stepper({ steps, currentStep, className = '' }: StepperProps) {
  return (
    <div className={`w-full ${className}`}>
      {/* Desktop Horizontal Stepper */}
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isLast = index === steps.length - 1;
          return (
            <Fragment key={index}>
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors border-2 ${isCompleted ? 'bg-blue-600 border-blue-600 text-white' : isCurrent ? 'bg-white border-blue-600 text-blue-600' : 'bg-white border-slate-300 text-slate-500'}`}>

                  {isCompleted ? <Check className="h-4 w-4" /> : stepNumber}
                </div>
                <span
                  className={`text-xs font-medium mt-2 ${isCurrent ? 'text-blue-600' : 'text-slate-500'}`}>

                  {step.title}
                </span>
              </div>
              {!isLast &&
              <div
                className={`flex-1 h-0.5 mx-4 ${isCompleted ? 'bg-blue-600' : 'bg-slate-200'}`} />

              }
            </Fragment>);

        })}
      </div>

      {/* Mobile Vertical Stepper (Simplified) */}
      <div className="md:hidden flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-slate-500">
            Step {currentStep} of {steps.length}:
          </span>
          <span className="text-sm font-bold text-slate-900">
            {steps[currentStep - 1]?.title}
          </span>
        </div>
        <div className="flex space-x-1">
          {steps.map((_, index) =>
          <div
            key={index}
            className={`h-1.5 w-6 rounded-full ${index + 1 <= currentStep ? 'bg-blue-600' : 'bg-slate-200'}`} />

          )}
        </div>
      </div>
    </div>);

}