import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, Search, User, LogOut, Menu, X, Shield, Calendar } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-slate-200/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-primary-800 flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:scale-105 transition-transform duration-200">
                <Home className="text-white w-5 h-5" />
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary-700 to-primary-900 bg-clip-text text-transparent">
                PRIME STAY
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive('/')
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            
            <Link
              to="/search"
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive('/search')
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Explore PGs</span>
            </Link>

            <Link
              to="/locations"
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive('/locations')
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span>Locations</span>
            </Link>

            <Link
              to="/how-it-works"
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive('/how-it-works')
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span>How It Works</span>
            </Link>

            <Link
              to="/blog"
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive('/blog')
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span>Blog</span>
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive('/dashboard')
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {user.role === 'admin' ? (
                    <Shield className="w-4 h-4 text-amber-500 animate-pulse" />
                  ) : (
                    <Calendar className="w-4 h-4 text-primary-500" />
                  )}
                  <span>{user.role === 'admin' ? 'Admin Portal' : 'My Bookings'}</span>
                </Link>

                <div className="h-6 w-px bg-slate-200 mx-2"></div>

                <div className="flex items-center space-x-3 pl-2">
                  <div className="flex flex-col text-right">
                    <span className="text-xs font-semibold text-slate-400">Welcome,</span>
                    <span className="text-sm font-bold text-slate-800">{user.name.split(' ')[0]}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center p-2.5 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="h-6 w-px bg-slate-200 mx-1"></div>
                <Link
                  to="/list-your-pg"
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive('/list-your-pg')
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  <span>List Your PG</span>
                </Link>
                <Link
                  to="/login"
                  className="ml-1 flex items-center space-x-1.5 px-5 py-2.5 rounded-xl text-sm font-bold bg-primary-600 text-white hover:bg-primary-700 shadow-md shadow-primary-500/10 hover:shadow-lg hover:shadow-primary-500/20 active:scale-95 transition-all duration-150"
                >
                  <User className="w-4 h-4" />
                  <span>Login / Sign Up</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus:outline-none transition-all"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200/50 bg-white/95 backdrop-blur-lg animate-in fade-in duration-200">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {[
              { to: '/', label: 'Home', icon: <Home className="w-5 h-5" /> },
              { to: '/search', label: 'Explore PGs', icon: <Search className="w-5 h-5" /> },
              { to: '/locations', label: '📍 Locations', icon: null },
              { to: '/how-it-works', label: '⚡ How It Works', icon: null },
              { to: '/blog', label: '📖 Blog', icon: null },
              { to: '/about', label: 'ℹ️ About Us', icon: null },
              { to: '/contact', label: '📞 Contact', icon: null },
              { to: '/list-your-pg', label: '🏠 List Your PG', icon: null },
            ].map(item => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  isActive(item.to) ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    isActive('/dashboard') ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  <span>{user.role === 'admin' ? 'Admin Portal' : 'My Bookings'}</span>
                </Link>
                
                <div className="border-t border-slate-150 my-2 pt-2"></div>
                
                <div className="px-4 py-2 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400">Logged in as</span>
                    <span className="text-sm font-bold text-slate-800">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-semibold text-sm transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="pt-4 px-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 shadow-md shadow-primary-500/10 transition-all"
                >
                  <User className="w-5 h-5" />
                  <span>Login / Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
