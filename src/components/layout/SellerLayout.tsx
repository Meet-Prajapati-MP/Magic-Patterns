import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Users,
  PieChart,
  ArrowLeftRight,
  Wallet,
  CreditCard,
  AlertCircle,
  Settings,
  Menu,
  X,
  Bell,
  LogOut,
  User,
  Briefcase } from
'lucide-react';
import { Dropdown } from '../ui/Dropdown';
import { getCurrentUserProfile, getUserInitials } from '../../services/profileService';
interface SellerLayoutProps {
  children: React.ReactNode;
}
export function SellerLayout({ children }: SellerLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Initialize from localStorage if available
  const getInitialName = () => {
    if (typeof window !== 'undefined') {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        try {
          const userData = JSON.parse(storedUserData);
          if (userData.name) {
            return userData.name;
          }
        } catch (e) {
          // Ignore parse errors
        }
      }
    }
    return 'User';
  };
  
  const initialName = getInitialName();
  const [userName, setUserName] = useState(initialName);
  const [userInitials, setUserInitials] = useState(getUserInitials(initialName));
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch user profile on mount
  useEffect(() => {
    // First, try to get name from localStorage (from login)
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        const userData = JSON.parse(storedUserData);
        if (userData.name) {
          setUserName(userData.name);
          setUserInitials(getUserInitials(userData.name));
          return; // Use stored data, skip profile fetch
        }
      } catch (e) {
        console.error('Error parsing stored user data:', e);
      }
    }

    // Fallback: Fetch from Supabase profile
    const fetchUserProfile = async () => {
      const { data: profile, error } = await getCurrentUserProfile();
      if (profile && !error) {
        const name = profile.name || 'User';
        setUserName(name);
        setUserInitials(getUserInitials(name));
      }
    };
    fetchUserProfile();
  }, []);
  const navigation = [
  {
    name: 'Dashboard',
    href: '/seller/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'Invoices',
    href: '/seller/invoices',
    icon: FileText
  },
  {
    name: 'Clients',
    href: '/seller/clients',
    icon: Users
  },
  // Payment Links removed
  {
    name: 'EMI Plans',
    href: '/seller/emi-plans',
    icon: PieChart
  },
  {
    name: 'Transactions',
    href: '/seller/transactions',
    icon: ArrowLeftRight
  },
  {
    name: 'Payouts',
    href: '/seller/payouts',
    icon: Wallet
  },
  {
    name: 'Subscription',
    href: '/seller/subscription',
    icon: CreditCard
  },
  {
    name: 'Disputes',
    href: '/seller/disputes',
    icon: AlertCircle
  },
  {
    name: 'Settings',
    href: '/seller/settings',
    icon: Settings
  }];

  const isActive = (path: string) => location.pathname.startsWith(path);
  const handleLogout = () => {
    // In a real app, clear auth tokens here
    navigate('/login');
  };
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 fixed inset-y-0 z-50">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center overflow-hidden">
              <img 
                src="/logo.png" 
                alt="Trustopay Logo" 
                className="h-full w-full object-contain"
                onError={(e) => {
                  // Fallback to blue background with T if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.className = 'h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center';
                    parent.innerHTML = '<span class="text-white font-bold text-lg">T</span>';
                  }
                }}
              />
            </div>
            <span className="text-xl font-bold text-slate-900">Trustopay</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navigation.map((item) =>
          <Link
            key={item.name}
            to={item.href}
            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${isActive(item.href) ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>

              <item.icon
              className={`mr-3 h-5 w-5 ${isActive(item.href) ? 'text-blue-600' : 'text-slate-400'}`} />

              {item.name}
            </Link>
          )}
        </div>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center p-3 rounded-lg bg-slate-50 border border-slate-100">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
              {userInitials}
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">
                {userName}
              </p>
              <p className="text-xs text-slate-500 truncate">Seller</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-200 px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg flex items-center justify-center overflow-hidden">
            <img 
              src="/logo.png" 
              alt="Trustopay Logo" 
              className="h-full w-full object-contain"
              onError={(e) => {
                // Fallback to blue background with T if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.className = 'h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center';
                  parent.innerHTML = '<span class="text-white font-bold text-lg">T</span>';
                }
              }}
            />
          </div>
          <span className="text-lg font-bold text-slate-900">Trustopay</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-600">

          {isMobileMenuOpen ?
          <X className="h-6 w-6" /> :

          <Menu className="h-6 w-6" />
          }
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen &&
      <div className="lg:hidden fixed inset-0 z-30 bg-white pt-16">
          <div className="p-4 space-y-1">
            {navigation.map((item) =>
          <Link
            key={item.name}
            to={item.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center px-4 py-3 text-base font-medium rounded-md ${isActive(item.href) ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}>

                <item.icon
              className={`mr-3 h-5 w-5 ${isActive(item.href) ? 'text-blue-600' : 'text-slate-400'}`} />

                {item.name}
              </Link>
          )}
            <div className="pt-4 mt-4 border-t border-slate-100">
              <button
              onClick={handleLogout}
              className="flex items-center px-4 py-3 text-base font-medium text-red-600 rounded-md hover:bg-red-50 w-full">

                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      }

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:pl-64 pt-16 lg:pt-0">
        <header className="hidden lg:flex h-16 bg-white border-b border-slate-200 items-center justify-between px-8 sticky top-0 z-30">
          <h1 className="text-xl font-semibold text-slate-900">
            {navigation.find((n) => isActive(n.href))?.name || 'Dashboard'}
          </h1>
          <div className="flex items-center space-x-4">
            {/* Notifications Dropdown */}
            <Dropdown
              trigger={
              <button className="p-2 text-slate-400 hover:text-slate-600 relative rounded-full hover:bg-slate-100 transition-colors">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
                </button>
              }
              width="w-80"
              items={[
              {
                label: 'New payment received: ₹45,000',
                icon: <Wallet className="h-4 w-4 text-green-500" />,
                onClick: () => navigate('/seller/transactions')
              },
              {
                label: 'Invoice #INV-003 is overdue',
                icon: <AlertCircle className="h-4 w-4 text-red-500" />,
                onClick: () => navigate('/seller/invoices')
              },
              {
                label: 'New feature: EMI Plans',
                icon: <PieChart className="h-4 w-4 text-blue-500" />,
                onClick: () => navigate('/seller/emi-plans')
              }]
              } />


            {/* Profile Dropdown */}
            <Dropdown
              trigger={
              <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-slate-100 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">
                    JD
                  </div>
                </button>
              }
              items={[
              {
                label: 'Profile Settings',
                icon: <User className="h-4 w-4" />,
                onClick: () => navigate('/seller/settings/profile')
              },
              {
                label: 'Business Settings',
                icon: <Briefcase className="h-4 w-4" />,
                onClick: () => navigate('/seller/settings/business')
              },
              {
                label: 'Logout',
                icon: <LogOut className="h-4 w-4" />,
                variant: 'danger',
                onClick: handleLogout
              }]
              } />

          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>);

}