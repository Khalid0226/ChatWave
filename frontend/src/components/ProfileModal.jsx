import React, { useState } from 'react';
import { ArrowLeft, Camera, Edit2, Check, Phone, Bell, Lock, HelpCircle } from 'lucide-react';

function ProfileModal({ user, onClose, onUpdateProfile }) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  
  const [name, setName] = useState(user?.name || 'Pintu Kumar');
  const [about, setAbout] = useState('Full-stack MERN Developer & Tech Enthusiast 🚀');
  const [phone, setPhone] = useState('+91 98765 43210');

  return (
    <div className="absolute inset-y-0 left-0 w-full md:w-80 lg:w-96 bg-slate-900 border-r border-slate-800 z-50 flex flex-col text-white shadow-2xl transition-all duration-300">
      
      {/* Header */}
      <div className="h-16 bg-slate-950/60 px-4 flex items-center gap-4 border-b border-slate-800">
        <button 
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/50 transition cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h3 className="text-sm font-bold tracking-tight">Profile</h3>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-6">
        
        {/* Avatar Section */}
        <div className="flex flex-col items-center py-6 bg-slate-900/40">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-4xl shadow-xl shadow-emerald-500/20">
              {name.charAt(0).toUpperCase()}
            </div>
            <label className="absolute inset-0 bg-slate-950/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer text-white text-xs font-medium">
              <Camera className="w-6 h-6 mb-1" />
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
              className="p-2 text-slate-400 hover:text-emerald-400 transition cursor-pointer ml-2"
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
              onClick={() => setIsEditingAbout(!isEditingAbout)}
              className="p-2 text-slate-400 hover:text-emerald-400 transition cursor-pointer ml-2"
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
        <div className="px-2 space-y-1 pt-2">
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
  );
}

export default ProfileModal;