import React, { useState } from 'react';
import { ArrowLeft, Camera, Edit2, Check, Phone, Bell, Lock, HelpCircle } from 'lucide-react';
import BottomNav from './BottomNav';

function ProfileModal({ user, onClose, onUpdateProfile }) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  
  const [name, setName] = useState(user?.name || 'Pintu Kumar');
  const [about, setAbout] = useState(user?.about || 'Full-stack MERN Developer & Tech Enthusiast 🚀');
  const [phone] = useState(user?.phone || '+91 98765 43210');

  return (
    // Outer Wrapper jo poori screen ko cover karega aur content ko center layega
    <div className="h-[100dvh] w-screen bg-[#050811] text-white flex flex-col justify-between overflow-hidden relative selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Centered Modal Content Area */}
      <div className="flex-1 flex items-center justify-center p-0 md:p-6 overflow-hidden">
        
        {/* Main Card Container */}
        <div className="w-full h-full md:h-[88vh] md:max-w-2xl bg-slate-900 md:border border-slate-800 md:rounded-2xl flex flex-col shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="h-16 bg-slate-950/80 px-4 md:px-6 flex items-center gap-4 border-b border-slate-800 shrink-0 backdrop-blur-xl">
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/50 transition cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h3 className="text-sm font-bold tracking-tight text-white">Profile</h3>
          </div>

          {/* Scrollable Body (Custom scrollbar taaki ganda scrollbar na dikhe) */}
          <div className="flex-1 overflow-y-auto space-y-4 pb-20 md:pb-6">
            
            {/* Avatar Section */}
            <div className="flex flex-col items-center py-6 bg-slate-950/30 border-b border-slate-800/60">
              <div className="relative group">
                <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-3xl shadow-xl shadow-emerald-500/20">
                  {name.charAt(0).toUpperCase()}
                </div>
                <label className="absolute inset-0 bg-slate-950/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer text-white text-[10px] font-semibold tracking-wider">
                  <Camera className="w-5 h-5 mb-1" />
                  CHANGE PHOTO
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>

            {/* Name Section */}
            <div className="bg-slate-950/40 px-6 py-4 border-y border-slate-800/60">
              <p className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-1">Your name</p>
              <div className="flex items-center justify-between">
                {isEditingName ? (
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-900 border border-emerald-500 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                    autoFocus
                  />
                ) : (
                  <span className="text-xs font-medium text-slate-200">{name}</span>
                )}
                
                <button 
                  onClick={() => {
                    if (isEditingName && onUpdateProfile) {
                      onUpdateProfile({ name, about });
                    }
                    setIsEditingName(!isEditingName);
                  }}
                  className="p-2 text-slate-400 hover:text-emerald-400 transition cursor-pointer ml-2 shrink-0"
                >
                  {isEditingName ? <Check className="w-4 h-4 text-emerald-400" /> : <Edit2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-slate-950/40 px-6 py-4 border-y border-slate-800/60">
              <p className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-1">About</p>
              <div className="flex items-center justify-between">
                {isEditingAbout ? (
                  <input 
                    type="text" 
                    value={about} 
                    onChange={(e) => setAbout(e.target.value)}
                    className="w-full bg-slate-900 border border-emerald-500 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                    autoFocus
                  />
                ) : (
                  <span className="text-xs font-medium text-slate-200">{about}</span>
                )}
                
                <button 
                  onClick={() => {
                    if (isEditingAbout && onUpdateProfile) {
                      onUpdateProfile({ name, about });
                    }
                    setIsEditingAbout(!isEditingAbout);
                  }}
                  className="p-2 text-slate-400 hover:text-emerald-400 transition cursor-pointer ml-2 shrink-0"
                >
                  {isEditingAbout ? <Check className="w-4 h-4 text-emerald-400" /> : <Edit2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Phone Section */}
            <div className="bg-slate-950/40 px-6 py-4 border-y border-slate-800/60 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-1">Phone</p>
                <span className="text-xs font-medium text-slate-300">{phone}</span>
              </div>
              <Phone className="w-4 h-4 text-slate-500" />
            </div>

            {/* Settings Options */}
            <div className="px-4 space-y-1 pt-2">
              <div className="flex items-center gap-4 px-4 py-3 hover:bg-slate-800/40 rounded-xl cursor-pointer transition text-xs text-slate-300">
                <Bell className="w-4 h-4 text-slate-400" />
                <span>Notifications</span>
              </div>
              <div className="flex items-center gap-4 px-4 py-3 hover:bg-slate-800/40 rounded-xl cursor-pointer transition text-xs text-slate-300">
                <Lock className="w-4 h-4 text-slate-400" />
                <span>Privacy & Security</span>
              </div>
              <div className="flex items-center gap-4 px-4 py-3 hover:bg-slate-800/40 rounded-xl cursor-pointer transition text-xs text-slate-300">
                <HelpCircle className="w-4 h-4 text-slate-400" />
                <span>Help & Support</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Bottom Navigation Bar (Sirf mobile par dikhega) */}
      <div className="md:hidden shrink-0">
        <BottomNav />
      </div>

    </div>
  );
}

export default ProfileModal;