import React, { useEffect, useState, useRef } from 'react';
import { MoreHorizontal } from 'lucide-react';
interface DropdownItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'danger';
}
interface DropdownProps {
  trigger?: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  width?: string;
}
export function Dropdown({
  trigger,
  items,
  align = 'right',
  width = 'w-48'
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node))
      {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger ||
        <button className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        }
      </div>

      {isOpen &&
      <div
        className={`
            absolute z-50 mt-2 ${width} rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none
            ${align === 'right' ? 'right-0' : 'left-0'}
            animate-in fade-in zoom-in-95 duration-100
          `}>

          <div className="py-1" role="menu" aria-orientation="vertical">
            {items.map((item, index) =>
          <button
            key={index}
            onClick={() => {
              item.onClick();
              setIsOpen(false);
            }}
            className={`
                  w-full text-left px-4 py-2 text-sm flex items-center space-x-2
                  ${item.variant === 'danger' ? 'text-red-600 hover:bg-red-50' : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'}
                `}
            role="menuitem">

                {item.icon && <span className="h-4 w-4">{item.icon}</span>}
                <span>{item.label}</span>
              </button>
          )}
          </div>
        </div>
      }
    </div>);

}