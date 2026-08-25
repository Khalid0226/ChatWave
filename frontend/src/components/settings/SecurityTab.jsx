import React from 'react';
import { CheckCircle2 } from 'lucide-react';

function SecurityTab({ 
  currentPassword, setCurrentPassword, 
  newPassword, setNewPassword, 
  confirmPassword, setConfirmPassword, 
  passwordError, passwordSuccess, 
  handleResetPassword, isDarkMode 
}) {
  return (
    <div className="space-y-6 max-w-xl animate-fadeIn">
      <div>
        <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Security & Reset Password</h4>
        <p className="text-[11px] text-slate-400 mt-0.5">Keep your account secure by updating your password regularly.</p>
      </div>

      {passwordSuccess && (
        <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-500 text-xs">
          <CheckCircle2 className="w-4 h-4" />
          <span>Password updated successfully!</span>
        </div>
      )}

      {passwordError && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 text-xs">
          {passwordError}
        </div>
      )}

      <form onSubmit={handleResetPassword} className="space-y-4">
        <div>
          <label className={`text-[11px] font-semibold block mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Current Password</label>
          <input 
            type="password"
            placeholder="••••••••"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={`w-full border rounded-xl p-3 text-xs focus:border-emerald-500 focus:outline-none transition ${
              isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
            required
          />
        </div>

        <div>
          <label className={`text-[11px] font-semibold block mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>New Password</label>
          <input 
            type="password"
            placeholder="At least 6 characters"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`w-full border rounded-xl p-3 text-xs focus:border-emerald-500 focus:outline-none transition ${
              isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
            required
          />
        </div>

        <div>
          <label className={`text-[11px] font-semibold block mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Confirm New Password</label>
          <input 
            type="password"
            placeholder="Re-enter new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full border rounded-xl p-3 text-xs focus:border-emerald-500 focus:outline-none transition ${
              isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
            required
          />
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition cursor-pointer hover:opacity-90"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}

export default SecurityTab;