import React, { useState } from 'react';
import { MessageSquare, Mail, Lock, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Login({ onSwitchToSignup, onSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Temporary Frontend-only Mock
    setTimeout(() => {
      setLoading(false);
      console.log('Mock Login Data:', formData);
      
      if (onSuccess) {
        onSuccess(formData);
      } else {
        alert('Login Successful! (Frontend Mock)');
        navigate('/dashboard')
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-emerald-950 text-white flex items-center justify-center p-4 relative overflow-hidden selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-slate-900/60 border border-slate-800/80 px-6 py-6 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-2xl relative z-10 transition-all duration-300 hover:border-emerald-500/30">
        
        {/* Subtle top neon border line */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>

        <div className="relative">
          {/* Header */}
          <div className="text-center mb-5">
            <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/25 mb-2 transform hover:scale-105 transition">
              <MessageSquare className="w-6 h-6 font-black" />
            </div>
            <h2 className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-300 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-slate-400 text-xs mt-1 flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" /> Sign in to continue to ChatWave
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-3 p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            
            {/* Email Field */}
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </span>
                <input 
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="pintu@example.com"
                  className="w-full bg-slate-950/60 border border-slate-800 focus:border-emerald-500/80 rounded-xl px-4 py-2.5 pl-10 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">Password</label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[11px] text-emerald-400 hover:underline">Forgot Password?</a>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </span>
                <input 
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-slate-950/60 border border-slate-800 focus:border-emerald-500/80 rounded-xl px-4 py-2.5 pl-10 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition"
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
          <div className="text-center mt-4 text-xs text-slate-400">
            Don't have an account?{' '}
            <button 
              onClick={()=>navigate('/signup')}
              className="text-emerald-400 hover:text-emerald-300 font-bold hover:underline cursor-pointer transition"
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