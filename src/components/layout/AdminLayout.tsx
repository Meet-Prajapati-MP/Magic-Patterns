import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Shield,
  FileText,
  ArrowLeftRight,
  CreditCard,
  AlertCircle,
  Handshake,
  Settings,
  Menu,
  X,
  LogOut } from
'lucide-react';
interface AdminLayoutProps {
  children: React.ReactNode;
}
export function AdminLayout({ children }: AdminLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigation = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'Users',
    href: '/admin/users',
    icon: Users
  },
  {
    name: 'KYC Review',
    href: '/admin/kyc-review',
    icon: Shield
  },
  {
    name: 'Invoices',
    href: '/admin/invoices',
    icon: FileText
  },
  {
    name: 'Transactions',
    href: '/admin/transactions',
    icon: ArrowLeftRight
  },
  {
    name: 'Subscriptions',
    href: '/admin/subscriptions',
    icon: CreditCard
  },
  {
    name: 'Disputes',
    href: '/admin/disputes',
    icon: AlertCircle
  },
  {
    name: 'Partners',
    href: '/admin/partners',
    icon: Handshake
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings
  }];

  const isActive = (path: string) => location.pathname.startsWith(path);
  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-white fixed inset-y-0 z-50">
        <div className="p-6 border-b border-slate-800 flex items-center space-x-2">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <span className="text-xl font-bold">Trustopay Admin</span>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navigation.map((item) =>
          <Link
            key={item.name}
            to={item.href}
            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${isActive(item.href) ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>

              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )}
        </div>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center p-3 rounded-lg bg-slate-800">
            <div className="h-10 w-10 rounded-full bg-blue-900 flex items-center justify-center text-blue-200 font-semibold">
              AD
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                Admin User
              </p>
              <p className="text-xs text-slate-400 truncate">Super Admin</p>
            </div>
            <button className="ml-auto text-slate-400 hover:text-white">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-slate-900 text-white px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <span className="text-lg font-bold">Trustopay Admin</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-400">

          {isMobileMenuOpen ?
          <X className="h-6 w-6" /> :

          <Menu className="h-6 w-6" />
          }
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen &&
      <div className="lg:hidden fixed inset-0 z-30 bg-slate-900 pt-16">
          <div className="p-4 space-y-1">
            {navigation.map((item) =>
          <Link
            key={item.name}
            to={item.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center px-4 py-3 text-base font-medium rounded-md ${isActive(item.href) ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>

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