import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Menu, X } from 'lucide-react';
interface PublicLayoutProps {
  children: React.ReactNode;
}
export function PublicLayout({ children }: PublicLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center shadow-sm overflow-hidden">
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
                    parent.className = 'h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm';
                    parent.innerHTML = '<span class="text-white font-bold text-lg">T</span>';
                  }
                }}
              />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              Trustpay
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/product"
              className={`text-sm font-medium transition-colors ${isActive('/product') ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}>

              Product
            </Link>
            <Link
              to="/solutions"
              className={`text-sm font-medium transition-colors ${isActive('/solutions') ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}>

              Solutions
            </Link>
            <Link
              to="/pricing"
              className={`text-sm font-medium transition-colors ${isActive('/pricing') ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}>

              Pricing
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${isActive('/about') ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}>

              Company
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors ${isActive('/contact') ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}>

              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-600 hover:text-slate-900">

                Sign In
              </Button>
            </Link>
            <Link to="/welcome">
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">

                Get Started Free
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>

            {isMobileMenuOpen ?
            <X className="h-6 w-6" /> :

            <Menu className="h-6 w-6" />
            }
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen &&
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full left-0 shadow-lg">
            <div className="px-4 pt-2 pb-6 space-y-1">
              {[
            {
              name: 'Product',
              path: '/product'
            },
            {
              name: 'Solutions',
              path: '/solutions'
            },
            {
              name: 'Pricing',
              path: '/pricing'
            },
            {
              name: 'Company',
              path: '/about'
            },
            {
              name: 'Contact',
              path: '/contact'
            }].
            map((item) =>
            <Link
              key={item.name}
              to={item.path}
              className="block px-3 py-3 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}>

                  {item.name}
                </Link>
            )}
              <div className="pt-4 flex flex-col space-y-3">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-center">
                    Sign In
                  </Button>
                </Link>
                <Link to="/welcome" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full justify-center">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        }
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center space-x-2 mb-6">
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
                <span className="text-xl font-bold text-white">Trustpay</span>
              </Link>
              <p className="text-sm text-slate-400 mb-6 max-w-xs">
                The complete financial stack for India's freelancers, agencies,
                and SMEs. Get paid faster, pay smarter.
              </p>
              <div className="flex space-x-4">
                {/* Social Icons Placeholder */}
                <div className="h-8 w-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-xs font-bold">in</span>
                </div>
                <div className="h-8 w-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors cursor-pointer">
                  <span className="text-xs font-bold">tw</span>
                </div>
                <div className="h-8 w-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors cursor-pointer">
                  <span className="text-xs font-bold">ig</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Product</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    to="/product"
                    className="hover:text-white transition-colors">

                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="/solutions"
                    className="hover:text-white transition-colors">

                    Solutions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="hover:text-white transition-colors">

                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-white transition-colors">

                    API
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Company</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors">

                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-white transition-colors">

                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-white transition-colors">

                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-white transition-colors">

                    Press
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Support</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    to="/help"
                    className="hover:text-white transition-colors">

                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-white transition-colors">

                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/security"
                    className="hover:text-white transition-colors">

                    Security
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-white transition-colors">

                    System Status
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Admin & NBFC Login Panels */}
          <div className="mb-12 pt-8 border-t border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Admin Login Panel */}
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-1">
                      Admin Portal
                    </h4>
                    <p className="text-slate-400 text-sm">
                      Platform management & oversight
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <span className="text-blue-400 font-bold text-xl">A</span>
                  </div>
                </div>
                <Link to="/admin/dashboard">
                  <Button
                    variant="outline"
                    className="w-full text-white border-slate-600 hover:bg-slate-700 hover:border-blue-500">

                    Admin Login
                  </Button>
                </Link>
              </div>

              {/* NBFC Login Panel */}
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 hover:border-green-500 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-1">
                      NBFC Portal
                    </h4>
                    <p className="text-slate-400 text-sm">
                      Financing partner dashboard
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                    <span className="text-green-400 font-bold text-xl">N</span>
                  </div>
                </div>
                <Link to="/nbfc/dashboard">
                  <Button
                    variant="outline"
                    className="w-full text-white border-slate-600 hover:bg-slate-700 hover:border-green-500">

                    NBFC Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-500">
              © 2026 Trustpay India Pvt Ltd. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-slate-500">
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link
                to="/privacy"
                className="hover:text-white transition-colors">

                Privacy
              </Link>
              <Link to="/refund" className="hover:text-white transition-colors">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>);

}