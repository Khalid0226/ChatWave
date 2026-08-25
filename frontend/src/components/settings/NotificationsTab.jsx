import React from 'react';

function NotificationsTab({ isDarkMode }) {
  return (
    <div className="space-y-6 max-w-xl animate-fadeIn">
      <div>
        <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Notification Preferences</h4>
        <p className="text-[11px] text-slate-400 mt-0.5">Manage alert tones and preview settings.</p>
      </div>

      <div className="space-y-3">
        <div className={`p-4 border rounded-2xl flex items-center justify-between ${
          isDarkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div>
            <h5 className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Message Sounds</h5>
            <p className="text-[10px] text-slate-400">Play sound for incoming messages</p>
          </div>
          <input type="checkbox" defaultChecked className="accent-emerald-500 w-4 h-4 cursor-pointer" />
        </div>

        <div className={`p-4 border rounded-2xl flex items-center justify-between ${
          isDarkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div>
            <h5 className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Community Announcements</h5>
            <p className="text-[10px] text-slate-400">Get alerts for community updates</p>
          </div>
          <input type="checkbox" defaultChecked className="accent-emerald-500 w-4 h-4 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default NotificationsTab;