import React from 'react';
import { ArrowRightLeft } from 'lucide-react';
interface ModeSwitchProps {
  mode: 'seller' | 'buyer';
  onChange: (mode: 'seller' | 'buyer') => void;
}
export function ModeSwitch({ mode, onChange }: ModeSwitchProps) {
  return (
    <button
      onClick={() => onChange(mode === 'seller' ? 'buyer' : 'seller')}
      className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-sm font-medium text-slate-700">

      <ArrowRightLeft className="h-4 w-4" />
      <span>Switch to {mode === 'seller' ? 'Buyer' : 'Seller'}</span>
    </button>);

}