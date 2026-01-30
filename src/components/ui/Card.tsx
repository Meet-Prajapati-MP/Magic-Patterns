import React from 'react';
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
export function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div
      className={`bg-white rounded-lg border border-slate-200 shadow-sm ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''} ${className}`}
      onClick={onClick}>

      {children}
    </div>);

}
export function CardHeader({ children, className = '' }: CardProps) {
  return (
    <div className={`p-6 border-b border-slate-100 ${className}`}>
      {children}
    </div>);

}
export function CardTitle({ children, className = '' }: CardProps) {
  return (
    <h3 className={`text-lg font-semibold text-slate-900 ${className}`}>
      {children}
    </h3>);

}
export function CardContent({ children, className = '' }: CardProps) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
export function CardFooter({ children, className = '' }: CardProps) {
  return (
    <div className={`p-6 pt-0 flex items-center ${className}`}>{children}</div>);

}