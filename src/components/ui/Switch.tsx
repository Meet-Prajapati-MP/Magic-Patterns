import React from 'react';
interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
}
export function Switch({ checked, onChange, label, id }: SwitchProps) {
  return (
    <div
      className="flex items-center cursor-pointer"
      onClick={() => onChange(!checked)}>

      <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
        <div
          className={`block w-10 h-6 rounded-full transition-colors duration-200 ${checked ? 'bg-blue-600' : 'bg-slate-300'}`}>
        </div>
        <div
          className={`
            absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer top-1 transition-transform duration-200
            ${checked ? 'translate-x-5' : 'translate-x-1'}
          `}>
        </div>
      </div>
      {label &&
      <label
        htmlFor={id}
        className="text-sm font-medium text-slate-700 cursor-pointer select-none">

          {label}
        </label>
      }
    </div>);

}