import React from 'react';
import { CheckCircle2 } from 'lucide-react';

function ProfileTab({ name, about, phone, setName, setAbout, setPhone, profileSuccess, handleSaveProfile, isDarkMode }) {
  return (
    <div className="space-y-6 max-w-xl animate-fadeIn">
      <div>
        <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Account Information</h4>
        <p className="text-[11px] text-slate-400 mt-0.5">Update your personal details visible to others.</p>
      </div>

      {profileSuccess && (
        <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-500 text-xs">
          <CheckCircle2 className="w-4 h-4" />
          <span>Profile updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSaveProfile} className="space-y-4">
        <div className="flex items-center gap-4 py-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 font-bold text-xl shadow-lg">
            {name ? name.charAt(0) : 'U'}
          </div>
          <div>
            <h5 className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{name}</h5>
            <span className="text-[10px] text-emerald-500">Active Account</span>
          </div>
        </div>

        <div>
          <label className={`text-[11px] font-semibold block mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Full Name</label>
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full border rounded-xl p-3 text-xs focus:border-emerald-500 focus:outline-none transition ${
              isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
            required
          />
        </div>

        <div>
          <label className={`text-[11px] font-semibold block mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>About Bio</label>
          <input 
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className={`w-full border rounded-xl p-3 text-xs focus:border-emerald-500 focus:outline-none transition ${
              isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
          />
        </div>

        <div>
          <label className={`text-[11px] font-semibold block mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Phone Number</label>
          <input 
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full border rounded-xl p-3 text-xs focus:border-emerald-500 focus:outline-none transition ${
              isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
          />
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition cursor-pointer hover:opacity-90"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default ProfileTab;