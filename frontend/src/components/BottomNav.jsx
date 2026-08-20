import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MessageSquare, CircleDot, Users, Settings, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext'; // ThemeContext import kiya hai

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const { isDarkMode } = useTheme(); // Theme state nikali hai

  return (
    <div className={`h-16 border-t flex items-center justify-around px-2 shrink-0 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-slate-950 border-slate-800 text-slate-400' 
        : 'bg-white border-slate-200 text-slate-500'
    }`}>
      <button 
        onClick={() => navigate('/dashboard')}
        className={`flex flex-col items-center gap-1 cursor-pointer transition ${
          path === '/dashboard' 
            ? 'text-emerald-500' 
            : isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'
        }`}
      >
        <MessageSquare className="w-5 h-5" />
        <span className="text-[10px] font-medium">Chats</span>
      </button>

      <button 
        onClick={() => navigate('/status')}
        className={`flex flex-col items-center gap-1 cursor-pointer transition ${
          path === '/status' 
            ? 'text-emerald-500' 
            : isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'
        }`}
      >
        <CircleDot className="w-5 h-5" />
        <span className="text-[10px] font-medium">Status</span>
      </button>

      <button 
        onClick={() => navigate('/communities')}
        className={`flex flex-col items-center gap-1 cursor-pointer transition ${
          path === '/communities' 
            ? 'text-emerald-500' 
            : isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'
        }`}
      >
        <Users className="w-5 h-5" />
        <span className="text-[10px] font-medium">Communities</span>
      </button>

      <button 
        onClick={() => navigate('/profile')}
        className={`flex flex-col items-center gap-1 cursor-pointer transition ${
          path === '/profile' 
            ? 'text-emerald-500' 
            : isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'
        }`}
      >
        <User className="w-5 h-5" />
        <span className="text-[10px] font-medium">Profile</span>
      </button>
    </div>
  );
}

export default BottomNav;