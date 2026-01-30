import React from 'react';
interface LoadingStateProps {
  rows?: number;
  className?: string;
}
export function LoadingState({ rows = 3, className = '' }: LoadingStateProps) {
  return (
    <div className={`space-y-4 w-full animate-pulse ${className}`}>
      {[...Array(rows)].map((_, i) =>
      <div key={i} className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-slate-200"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded bg-slate-200"></div>
            <div className="h-4 w-1/2 rounded bg-slate-200"></div>
          </div>
        </div>
      )}
    </div>);

}
export function Skeleton({ className = '' }: {className?: string;}) {
  return <div className={`animate-pulse bg-slate-200 rounded ${className}`} />;
}