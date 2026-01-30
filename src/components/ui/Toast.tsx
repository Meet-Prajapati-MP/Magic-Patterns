import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, XCircle, X } from 'lucide-react';
export type ToastType = 'success' | 'error' | 'info' | 'warning';
interface ToastProps {
  type: ToastType;
  message: string;
  duration?: number;
  onClose: () => void;
}
export function Toast({ type, message, duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  const styles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800'
  };
  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
    warning: AlertCircle
  };
  const Icon = icons[type];
  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center p-4 mb-4 rounded-lg border shadow-lg animate-in slide-in-from-right-5 fade-in duration-300 ${styles[type]}`}>

      <Icon className="w-5 h-5 mr-3" />
      <div className="text-sm font-medium">{message}</div>
      <button
        onClick={onClose}
        className="ml-4 p-1 rounded-full hover:bg-black/5 transition-colors">

        <X className="w-4 h-4" />
      </button>
    </div>);

}