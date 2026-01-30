import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Wallet,
  BarChart,
  Settings,
  Menu,
  X,
  LogOut } from
'lucide-react';
interface NBFCLayoutProps {
  children: React.ReactNode;
}
export function NBFCLayout({ children }: NBFCLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigation = [
  {
    name: 'Dashboard',
    href: '/nbfc/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'Applications',
    href: '/nbfc/applications',
    icon: FileText
  },
  {
    name: 'Collections',
    href: '/nbfc/collections',
    icon: Wallet
  },
  {
    name: 'Reports',
    href: '/nbfc/reports',
    icon: BarChart
  },
  {
    name: 'Settings',
    href: '/nbfc/settings',
    icon: Settings
  }];

  const isActive = (path: string) => location.pathname.startsWith(path);
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-emerald-900 text-white fixed inset-y-0 z-50">
        <div className="p-6 border-b border-emerald-800 flex items-center space-x-2">
          <div className="h-8 w-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <span className="text-xl font-bold">ABC Finance</span>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navigation.map((item) =>
          <Link
            key={item.name}
            to={item.href}
            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${isActive(item.href) ? 'bg-emerald-600 text-white' : 'text-emerald-100 hover:bg-emerald-800 hover:text-white'}`}>

              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )}
        </div>

        <div className="p-4 border-t border-emerald-800">
          <div className="flex items-center p-3 rounded-lg bg-emerald-800">
            <div className="h-10 w-10 rounded-full bg-emerald-700 flex items-center justify-center text-white font-semibold">
              VS
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                Vikram Singh
              </p>
              <p className="text-xs text-emerald-200 truncate">Loan Officer</p>
            </div>
            <button className="ml-auto text-emerald-200 hover:text-white">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-emerald-900 text-white px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <span className="text-lg font-bold">ABC Finance</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-emerald-100">

          {isMobileMenuOpen ?
          <X className="h-6 w-6" /> :

          <Menu className="h-6 w-6" />
          }
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen &&
      <div className="lg:hidden fixed inset-0 z-30 bg-emerald-900 pt-16">
          <div className="p-4 space-y-1">
            {navigation.map((item) =>
          <Link
            key={item.name}
            to={item.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center px-4 py-3 text-base font-medium rounded-md ${isActive(item.href) ? 'bg-emerald-600 text-white' : 'text-emerald-100 hover:bg-emerald-800 hover:text-white'}`}>

                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
          )}
          </div>
        </div>
      }

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:pl-64 pt-16 lg:pt-0">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>);

}