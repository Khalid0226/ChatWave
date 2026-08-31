import React, { useState } from 'react';
import { MessageSquare, Mail, Lock, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext'; // ThemeContext import kiya hai
import API from '../services/Axios';

function Login({ onSwitchToSignup, onSuccess }) {
  const { isDarkMode } = useTheme(); // Theme state nikali hai

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await API.post('auth/login', formData);
      console.log("Login Response Data:", response.data);

      if (response.status === 200) {
        // App.jsx ki user state ko turant update karne ke liye
        if (onSuccess && response.data.user) {
          onSuccess(response.data.user);
        } else if (response.data.user) {
          // Fallback agar onSuccess prop pass na hua ho toh window reload ya dispatch handle ho sake
          window.location.href = '/dashboard';
          return;
        }

        alert(response.data.message);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden selection:bg-emerald-500 selection:text-slate-950 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-950 via-gray-900 to-emerald-950 text-white' 
        : 'bg-gradient-to-br from-slate-100 via-emerald-50 to-teal-100 text-slate-900'
    }`}>
      
      {/* Dynamic Ambient Background Glows */}
      <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[140px] pointer-events-none transition-opacity duration-300 ${
        isDarkMode ? 'bg-emerald-500/10' : 'bg-emerald-500/20'
      }`}></div>
      <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[140px] pointer-events-none transition-opacity duration-300 ${
        isDarkMode ? 'bg-cyan-500/10' : 'bg-teal-500/20'
      }`}></div>

      {/* Main Card */}
      <div className={`w-full max-w-md px-6 py-6 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-2xl relative z-10 transition-all duration-300 border ${
        isDarkMode 
          ? 'bg-slate-900/60 border-slate-800/80 hover:border-emerald-500/30' 
          : 'bg-white/80 border-slate-200 hover:border-emerald-500/40 shadow-xl'
      }`}>
        
        {/* Subtle top neon border line */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>

        <div className="relative">
          {/* Header */}
          <div className="text-center mb-5">
            <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/25 mb-2 transform hover:scale-105 transition">
              <MessageSquare className="w-6 h-6 font-black" />
            </div>
            <h2 className={`text-2xl font-black tracking-tight bg-gradient-to-r bg-clip-text text-transparent ${
              isDarkMode ? 'from-white via-slate-100 to-emerald-300' : 'from-slate-900 via-slate-800 to-emerald-600'
            }`}>
              Welcome Back
            </h2>
            <p className={`text-xs mt-1 flex items-center justify-center gap-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              <Sparkles className="w-3 h-3 text-emerald-500 animate-pulse" /> Sign in to continue to ChatWave
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-3 p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            
            {/* Email Field */}
            <div>
              <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input 
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="pintu@example.com"
                  className={`w-full border rounded-xl px-4 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition ${
                    isDarkMode 
                      ? 'bg-slate-950/60 border-slate-800 text-white placeholder-slate-600 focus:border-emerald-500/80' 
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-500'
                  }`}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className={`block text-[11px] font-bold uppercase tracking-wider ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Password
                </label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[11px] text-emerald-500 hover:underline font-medium">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input 
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full border rounded-xl px-4 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition ${
                    isDarkMode 
                      ? 'bg-slate-950/60 border-slate-800 text-white placeholder-slate-600 focus:border-emerald-500/80' 
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-500'
                  }`}
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold py-3 rounded-xl text-sm transition duration-200 shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Signing in...
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer switch to signup */}
          <div className={`text-center mt-4 text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Don't have an account?{' '}
            <button 
              onClick={() => navigate('/signup')}
              className="text-emerald-500 hover:text-emerald-400 font-bold hover:underline cursor-pointer transition"
            >
              Sign Up
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;