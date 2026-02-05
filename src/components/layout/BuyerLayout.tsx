import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  ArrowLeftRight,
  PieChart,
  HelpCircle,
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
interface BuyerLayoutProps {
  children: React.ReactNode;
}
export function BuyerLayout({ children }: BuyerLayoutProps) {
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
    href: '/buyer/home',
    icon: LayoutDashboard
  },
  {
    name: 'My Invoices',
    href: '/buyer/invoices',
    icon: FileText
  },
  {
    name: 'Create Invoice',
    href: '/buyer/create-invoice',
    icon: PlusCircle
  },
  {
    name: 'Transactions',
    href: '/buyer/transactions',
    icon: ArrowLeftRight
  },
  {
    name: 'EMI Plans',
    href: '/buyer/emi-plans',
    icon: PieChart
  },
  {
    name: 'Support',
    href: '/buyer/support',
    icon: HelpCircle
  },
  {
    name: 'Settings',
    href: '/buyer/settings/profile',
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
              <p className="text-xs text-slate-500 truncate">Buyer</p>
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
                label: 'New invoice from TechStart: ₹45,000',
                icon: <FileText className="h-4 w-4 text-blue-500" />,
                onClick: () => navigate('/buyer/invoices')
              },
              {
                label: 'Payment successful: ₹12,000',
                icon: <ArrowLeftRight className="h-4 w-4 text-green-500" />,
                onClick: () => navigate('/buyer/transactions')
              },
              {
                label: 'Ticket #T-102 updated',
                icon: <HelpCircle className="h-4 w-4 text-amber-500" />,
                onClick: () => navigate('/buyer/support')
              }]
              } />


            {/* Profile Dropdown */}
            <Dropdown
              trigger={
              <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-slate-100 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">
                    AB
                  </div>
                </button>
              }
              items={[
              {
                label: 'Profile Settings',
                icon: <User className="h-4 w-4" />,
                onClick: () => navigate('/buyer/settings/profile')
              },
              {
                label: 'Notification Settings',
                icon: <Bell className="h-4 w-4" />,
                onClick: () => navigate('/buyer/settings/notifications')
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