import React from 'react';
import { Sun, Moon } from 'lucide-react';

function AppearanceTab({ isDarkMode, toggleTheme }) {
  return (
    <div className="space-y-6 max-w-xl animate-fadeIn">
      <div>
        <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Theme & Appearance</h4>
        <p className="text-[11px] text-slate-400 mt-0.5">Choose between light and dark layout modes.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div 
          onClick={() => { if (isDarkMode) toggleTheme(); }}
          className={`p-4 rounded-2xl space-y-2 cursor-pointer transition shadow-lg border-2 ${
            !isDarkMode ? 'bg-white border-emerald-500' : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <Sun className="w-5 h-5 text-amber-500" />
            {!isDarkMode && <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 text-xs font-bold">✓</div>}
          </div>
          <h5 className={`text-xs font-bold ${!isDarkMode ? 'text-slate-900' : 'text-white'}`}>Light Mode</h5>
          <p className="text-[10px] text-slate-400">Clean bright interface look.</p>
        </div>

        <div 
          onClick={() => { if (!isDarkMode) toggleTheme(); }}
          className={`p-4 rounded-2xl space-y-2 cursor-pointer transition shadow-lg border-2 ${
            isDarkMode ? 'bg-slate-950 border-emerald-500' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <Moon className="w-5 h-5 text-emerald-500" />
            {isDarkMode && <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 text-xs font-bold">✓</div>}
          </div>
          <h5 className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Cyber Emerald (Dark)</h5>
          <p className="text-[10px] text-slate-400">Default deep dark theme with emerald highlights.</p>
        </div>
      </div>
    </div>
  );
}

export default AppearanceTab;