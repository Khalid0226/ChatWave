import React, { useState } from 'react';
import { Plus, ArrowLeft } from 'lucide-react';
import BottomNav from './BottomNav';
import { useTheme } from '../context/ThemeContext'; // ThemeContext import kiya hai

function StatusView({ currentUser, statuses, onAddStatus, onBack }) {
  const { isDarkMode } = useTheme(); // Theme state nikali hai

  const [viewingStatus, setViewingStatus] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStatusText, setNewStatusText] = useState('');

  const handleCreateStatus = (e) => {
    e.preventDefault();
    if (!newStatusText.trim()) return;

    onAddStatus({
      id: Date.now(),
      name: currentUser?.name || 'Pintu Kumar',
      time: 'Just now',
      avatar: (currentUser?.name || 'Pintu').charAt(0).toUpperCase(),
      text: newStatusText
    });

    setNewStatusText('');
    setShowAddModal(false);
  };

  return (
    <div className={`h-[100dvh] w-screen flex flex-col justify-between overflow-hidden relative selection:bg-emerald-500 selection:text-slate-950 transition-colors duration-300 ${
      isDarkMode ? 'bg-[#050811] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Centered Modal Content Area */}
      <div className="flex-1 flex items-center justify-center p-0 md:p-6 overflow-hidden">
        
        {/* Main Card Container */}
        <div className={`w-full h-full md:h-[88vh] md:max-w-2xl md:border md:rounded-2xl flex flex-col shadow-2xl overflow-hidden relative transition-colors duration-300 ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          
          {/* Header */}
          <div className={`h-16 px-4 md:px-6 flex items-center justify-between border-b shrink-0 backdrop-blur-xl transition-colors duration-300 ${
            isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center gap-3">
              <button 
                onClick={onBack}
                className={`hidden md:flex p-2 rounded-xl transition cursor-pointer items-center justify-center ${
                  isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title="Go Back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h3 className="text-sm font-bold tracking-tight text-emerald-500">Status Updates</h3>
            </div>
          </div>

          {/* Main Content List */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 md:pb-6 custom-scrollbar">
            
            {/* My Status Section */}
            <div className={`flex items-center justify-between p-4 border rounded-2xl shadow-md transition-colors duration-300 ${
              isDarkMode ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-slate-950 text-base shadow-lg shadow-emerald-500/20">
                    {(currentUser?.name || 'P').charAt(0).toUpperCase()}
                  </div>
                  <button 
                    onClick={() => setShowAddModal(true)}
                    className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center font-bold text-xs border border-slate-950 cursor-pointer shadow"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>My Status</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Tap to add status update</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAddModal(true)}
                className="px-3.5 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-500 border border-emerald-500/30 text-xs font-semibold rounded-xl transition cursor-pointer"
              >
                Add Status
              </button>
            </div>

            {/* Recent Updates List */}
            <div>
              <p className="text-[11px] font-semibold text-emerald-500 uppercase tracking-wider mb-3 px-1">Recent Updates</p>
              <div className="space-y-3">
                {statuses.map((status) => (
                  <div 
                    key={status.id}
                    onClick={() => setViewingStatus(status)}
                    className={`flex items-center gap-4 p-3.5 border rounded-2xl cursor-pointer transition group ${
                      isDarkMode 
                        ? 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-800/40' 
                        : 'bg-white border-slate-200 hover:bg-slate-100 shadow-sm'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full border-2 border-emerald-500/80 p-0.5 flex items-center justify-center group-hover:scale-105 transition">
                      <div className={`w-full h-full rounded-full flex items-center justify-center font-bold text-emerald-500 text-xs ${
                        isDarkMode ? 'bg-slate-800' : 'bg-slate-100'
                      }`}>
                        {status.avatar}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`text-xs font-bold truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{status.name}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{status.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* View Status Story Modal */}
          {viewingStatus && (
            <div className={`absolute inset-0 z-50 flex flex-col justify-between p-6 animate-fadeIn transition-colors duration-300 ${
              isDarkMode ? 'bg-slate-950' : 'bg-white'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-slate-950 text-xs">
                    {viewingStatus.avatar}
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{viewingStatus.name}</h4>
                    <p className="text-[10px] text-slate-400">{viewingStatus.time}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setViewingStatus(null)}
                  className={`p-2 rounded-xl border cursor-pointer ${
                    isDarkMode ? 'text-slate-400 hover:text-white bg-slate-900 border-slate-800' : 'text-slate-600 hover:text-slate-900 bg-slate-100 border-slate-200'
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 flex items-center justify-center text-center px-4">
                <p className={`text-sm md:text-base font-semibold max-w-lg leading-relaxed ${
                  isDarkMode ? 'text-slate-200' : 'text-slate-800'
                }`}>
                  {viewingStatus.text || "Exploring full-stack web development with React & Django! 🚀"}
                </p>
              </div>

              <div className="text-center text-[10px] text-slate-400 tracking-wider uppercase font-medium">
                End of status update
              </div>
            </div>
          )}

          {/* Add Status Modal */}
          {showAddModal && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
              <div className={`w-full max-w-md border rounded-2xl p-5 space-y-4 shadow-2xl transition-colors duration-300 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-emerald-500">Create Status Update</h3>
                  <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer p-1">
                    ✕
                  </button>
                </div>

                <form onSubmit={handleCreateStatus} className="space-y-4">
                  <textarea
                    rows="4"
                    value={newStatusText}
                    onChange={(e) => setNewStatusText(e.target.value)}
                    placeholder="What's on your mind? Type your status here..."
                    className={`w-full border rounded-xl p-3 text-xs focus:border-emerald-500 focus:outline-none transition resize-none ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-600' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                    autoFocus
                  ></textarea>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className={`px-4 py-2 text-xs font-medium rounded-xl transition cursor-pointer ${
                        isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition cursor-pointer hover:opacity-90"
                    >
                      Post Status
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden shrink-0">
        <BottomNav />
      </div>

    </div>
  );
}

export default StatusView;