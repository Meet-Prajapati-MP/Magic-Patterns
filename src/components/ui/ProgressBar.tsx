import React from 'react';
interface ProgressBarProps {
  value: number; // 0 to 100
  color?: 'blue' | 'green' | 'red' | 'amber';
  label?: string;
  showPercentage?: boolean;
  className?: string;
  height?: 'sm' | 'md' | 'lg';
}
export function ProgressBar({
  value,
  color = 'blue',
  label,
  showPercentage = false,
  className = '',
  height = 'md'
}: ProgressBarProps) {
  const colors = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
    amber: 'bg-amber-500'
  };
  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };
  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) &&
      <div className="flex justify-between mb-1">
          {label &&
        <span className="text-xs font-medium text-slate-700">{label}</span>
        }
          {showPercentage &&
        <span className="text-xs font-medium text-slate-700">
              {Math.round(value)}%
            </span>
        }
        </div>
      }
      <div className={`w-full bg-slate-200 rounded-full ${heights[height]}`}>
        <div
          className={`${colors[color]} ${heights[height]} rounded-full transition-all duration-500 ease-out`}
          style={{
            width: `${Math.min(Math.max(value, 0), 100)}%`
          }}>
        </div>
      </div>
    </div>);

}