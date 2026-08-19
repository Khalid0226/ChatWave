import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MessageSquare, CircleDot, Users, Settings,User } from 'lucide-react';

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="h-16 bg-slate-950 border-t border-slate-800 flex items-center justify-around px-2 text-slate-400 shrink-0">
      <button 
        onClick={() => navigate('/dashboard')}
        className={`flex flex-col items-center gap-1 cursor-pointer transition ${path === '/dashboard' ? 'text-emerald-400' : 'hover:text-white'}`}
      >
        <MessageSquare className="w-5 h-5" />
        <span className="text-[10px] font-medium">Chats</span>
      </button>

      <button 
        onClick={() => navigate('/status')}
        className={`flex flex-col items-center gap-1 cursor-pointer transition ${path === '/status' ? 'text-emerald-400' : 'hover:text-white'}`}
      >
        <CircleDot className="w-5 h-5" />
        <span className="text-[10px] font-medium">Status</span>
      </button>

      <button 
        onClick={() => navigate('/communities')}
        className={`flex flex-col items-center gap-1 cursor-pointer transition ${path === '/communities' ? 'text-emerald-400' : 'hover:text-white'}`}
      >
        <Users className="w-5 h-5" />
        <span className="text-[10px] font-medium">Communities</span>
      </button>

      <button 
        onClick={() => navigate('/profile')}
        className={`flex flex-col items-center gap-1 cursor-pointer transition ${path === '/profile' ? 'text-emerald-400' : 'hover:text-white'}`}
      >
        <User className="w-5 h-5" />
        <span className="text-[10px] font-medium">Profile</span>
      </button>
    </div>
  );
}

export default BottomNav;