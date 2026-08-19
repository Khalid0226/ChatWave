import React, { useState } from 'react';
import { CircleDot, Plus, ArrowLeft, Camera, Image as ImageIcon, Send } from 'lucide-react';

function StatusView({ currentUser, statuses, onAddStatus, onBack }) {
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
    // ❌ Purana wala:
// <div className="flex-1 bg-slate-900 flex flex-col h-full relative text-white overflow-hidden">

// ✅ Naya wala (Yeh lagao):
<div className="h-screen w-full bg-slate-900 flex flex-col relative text-white overflow-hidden">
      
      {/* Header */}
      <div className="h-16 bg-slate-950/60 px-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          {onBack && (
            <button 
              onClick={onBack}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/50 transition cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <h3 className="text-base font-bold tracking-tight text-emerald-400">Status Updates</h3>
        </div>
      </div>

      {/* Main Content List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* My Status Section */}
        <div className="flex items-center justify-between p-3 bg-slate-950/40 border border-slate-800/60 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-slate-950 text-lg shadow-lg">
                {(currentUser?.name || 'P').charAt(0).toUpperCase()}
              </div>
              <button 
                onClick={() => setShowAddModal(true)}
                className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center font-bold text-xs border border-slate-950 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
            <div>
              <h4 className="text-xs font-bold">My Status</h4>
              <p className="text-[10px] text-slate-400">Tap to add status update</p>
            </div>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-xl hover:bg-emerald-500/30 transition cursor-pointer"
          >
            Add Status
          </button>
        </div>

        {/* Recent Updates List */}
        <div>
          <p className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-3">Recent Updates</p>
          <div className="space-y-3">
            {statuses.map((status) => (
              <div 
                key={status.id}
                onClick={() => setViewingStatus(status)}
                className="flex items-center gap-3 p-3 bg-slate-950/40 border border-slate-800/60 rounded-2xl cursor-pointer hover:bg-slate-800/30 transition"
              >
                <div className="w-12 h-12 rounded-full border-2 border-emerald-500 p-0.5 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center font-bold text-emerald-400 text-sm">
                    {status.avatar}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold truncate">{status.name}</h4>
                  <p className="text-[10px] text-slate-400">{status.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* View Status Story Modal */}
      {viewingStatus && (
        <div className="absolute inset-0 bg-slate-950 z-50 flex flex-col justify-between p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-slate-950 text-sm">
                {viewingStatus.avatar}
              </div>
              <div>
                <h4 className="text-xs font-bold">{viewingStatus.name}</h4>
                <p className="text-[10px] text-slate-400">{viewingStatus.time}</p>
              </div>
            </div>
            <button 
              onClick={() => setViewingStatus(null)}
              className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center text-center px-4">
            <p className="text-lg font-semibold text-slate-200">{viewingStatus.text || "Exploring full-stack web development with React & Django! 🚀"}</p>
          </div>

          <div className="text-center text-[10px] text-slate-500">
            End of status update
          </div>
        </div>
      )}

      {/* Add Status Modal */}
      {showAddModal && (
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-emerald-400">Create Status Update</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateStatus} className="space-y-4">
              <textarea
                rows="4"
                value={newStatusText}
                onChange={(e) => setNewStatusText(e.target.value)}
                placeholder="What's on your mind? Type your status here..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none transition resize-none"
                autoFocus
              ></textarea>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-medium rounded-xl hover:bg-slate-700 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition cursor-pointer"
                >
                  Post Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default StatusView;