import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, Mail, Lock, User, Phone, LogIn, AlertCircle } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, login, register, error, setError } = useAuth();
  
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'user', // Defaults to user
  });

  const [loading, setLoading] = useState(false);
  const redirectPath = searchParams.get('redirect') || '/';

  // If already logged in, redirect away
  useEffect(() => {
    if (user) {
      navigate(redirectPath);
    }
    setError(null);
  }, [user, navigate, redirectPath]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let result;
    if (isRegister) {
      result = await register(
        formData.name,
        formData.email,
        formData.password,
        formData.phone,
        formData.role
      );
    } else {
      result = await login(formData.email, formData.password);
    }

    setLoading(false);
    if (result.success) {
      navigate(redirectPath);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl border border-slate-100 shadow-xl relative overflow-hidden">
        {/* Decorative Top Gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-600 to-indigo-650"></div>

        {/* Brand Logo */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary-600 to-primary-800 text-white shadow-md shadow-primary-500/20 mb-4">
            <Home className="w-6 h-6" />
          </div>
          <h2 className="font-display font-extrabold text-2xl text-slate-800">
            {isRegister ? 'Join Prime Stay' : 'Welcome Back'}
          </h2>
          <p className="text-slate-450 text-xs font-semibold mt-1">
            {isRegister ? 'Create an account to book your PG' : 'Sign in to access your bookings dashboard'}
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="flex items-center space-x-2.5 p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Authentication Form */}
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {isRegister && (
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">Full Name</label>
              <div className="relative">
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-sm font-semibold placeholder-slate-400 focus:outline-none focus:border-primary-500"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">Email Address</label>
            <div className="relative">
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-sm font-semibold placeholder-slate-400 focus:outline-none focus:border-primary-500"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">Phone Number</label>
              <div className="relative">
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-sm font-semibold placeholder-slate-400 focus:outline-none focus:border-primary-500"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">Password</label>
            <div className="relative">
              <input
                name="password"
                type="password"
                required
                placeholder="Min 6 characters"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-sm font-semibold placeholder-slate-400 focus:outline-none focus:border-primary-500"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            </div>
          </div>

          {/* User/Admin Role (Admin option to help testing) */}
          {isRegister && (
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">Select Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 focus:outline-none focus:border-primary-500 cursor-pointer"
              >
                <option value="user">Student / Resident</option>
                <option value="admin">PG Owner / Admin</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-extrabold rounded-xl shadow-lg shadow-primary-500/10 hover:shadow-lg hover:shadow-primary-500/20 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center space-x-2 text-sm cursor-pointer"
          >
            <LogIn className="w-4.5 h-4.5" />
            <span>{loading ? 'Processing...' : isRegister ? 'Create Account' : 'Sign In'}</span>
          </button>
        </form>

        {/* Toggle between Register/Login */}
        <div className="border-t border-slate-100 pt-5 text-center">
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setError(null);
            }}
            className="text-xs font-bold text-primary-650 hover:text-primary-850 hover:underline transition-all"
          >
            {isRegister
              ? 'Already have an account? Sign In'
              : "Don't have an account? Register here"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
