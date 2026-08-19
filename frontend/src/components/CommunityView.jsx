import React, { useState } from 'react';
import { Users, Megaphone, ArrowLeft, Plus, ChevronRight, MessageSquare, UserPlus } from 'lucide-react';
import BottomNav from './BottomNav';

function CommunityView({ communities, onAddCommunity, onBack }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [commName, setCommName] = useState('');
  const [commDesc, setCommDesc] = useState('');
  const [memberInput, setMemberInput] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  
  // Local state to handle adding members inside a community view
  const [newMemberName, setNewMemberName] = useState('');
  const [showAddMemberBox, setShowAddMemberBox] = useState(false);

  // Handle creating a new community
  const handleCreateCommunity = (e) => {
    e.preventDefault();
    if (!commName.trim()) return;

    const newComm = {
      id: Date.now(),
      name: commName,
      description: commDesc || 'A new community space for discussions.',
      members: memberInput ? `${memberInput} members` : '1 member',
      unread: 0,
      announcements: 'Welcome to the newly created community! Stay tuned for updates.',
      groupsList: ['General Discussion Group']
    };

    onAddCommunity(newComm);
    setCommName('');
    setCommDesc('');
    setMemberInput('');
    setShowCreateModal(false);
  };

  // Add member or group to the selected community dynamically
  const handleAddMemberToCommunity = (e) => {
    e.preventDefault();
    if (!newMemberName.trim() || !selectedCommunity) return;

    // Update selected community groups/members locally
    const updatedGroups = [...(selectedCommunity.groupsList || []), newMemberName];
    const updatedComm = { ...selectedCommunity, groupsList: updatedGroups };
    
    setSelectedCommunity(updatedComm);
    setNewMemberName('');
    setShowAddMemberBox(false);
  };

  return (
    <div className="h-[100dvh] w-screen bg-[#050811] text-white flex flex-col justify-between overflow-hidden relative selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Centered Modal Content Area */}
      <div className="flex-1 flex items-center justify-center p-0 md:p-6 overflow-hidden">
        
        {/* Main Card Container */}
        <div className="w-full h-full md:h-[88vh] md:max-w-2xl bg-slate-900 md:border border-slate-800 md:rounded-2xl flex flex-col shadow-2xl overflow-hidden relative">
          
          {/* Header */}
          <div className="h-16 bg-slate-950/80 px-4 md:px-6 flex items-center justify-between border-b border-slate-800 shrink-0 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <button 
                onClick={onBack}
                className="hidden md:flex p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/50 transition cursor-pointer items-center justify-center"
                title="Go Back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h3 className="text-sm font-bold tracking-tight text-emerald-400">Communities</h3>
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 md:pb-6 custom-scrollbar">
            
            {/* Create Community Banner */}
            <div className="flex items-center justify-between p-4 bg-slate-950/50 border border-slate-800/80 rounded-2xl shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">New Community</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Bring together your groups easily</p>
                </div>
              </div>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="p-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl transition cursor-pointer shadow-lg shadow-emerald-500/20"
                title="Add Community"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Communities List */}
            <div>
              <p className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-3 px-1">
                Your Communities
              </p>
              
              <div className="space-y-3">
                {communities.map((comm) => (
                  <div 
                    key={comm.id}
                    onClick={() => setSelectedCommunity(comm)}
                    className="p-4 bg-slate-950/40 border border-slate-800/80 rounded-2xl hover:bg-slate-800/40 transition group cursor-pointer space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 font-bold text-sm shrink-0">
                          {comm.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition">
                            {comm.name}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-medium">{comm.members}</span>
                        </div>
                      </div>
                      
                      {comm.unread > 0 && (
                        <span className="px-2 py-0.5 bg-emerald-500 text-slate-950 font-bold text-[10px] rounded-full">
                          {comm.unread}
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-300 pl-1">
                      {comm.description}
                    </p>

                    {/* Announcement Sub-item */}
                    <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 hover:text-white transition">
                      <div className="flex items-center gap-2">
                        <Megaphone className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="truncate">Announcements & general updates</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Detailed View Modal when a community is clicked */}
          {selectedCommunity && (
            <div className="absolute inset-0 bg-slate-950 z-50 flex flex-col justify-between p-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-base">
                    {selectedCommunity.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{selectedCommunity.name}</h4>
                    <p className="text-[10px] text-slate-400">{selectedCommunity.members}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedCommunity(null)}
                  className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900 border border-slate-800 cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 space-y-4 custom-scrollbar">
                {/* Announcement Box */}
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                    <Megaphone className="w-4 h-4" />
                    <span>Community Announcement</span>
                  </div>
                  <p className="text-xs text-slate-300 pl-6">
                    {selectedCommunity.announcements || selectedCommunity.description}
                  </p>
                </div>

                {/* Add Sub-group / Member Section Header */}
                <div className="flex items-center justify-between pt-2 px-1">
                  <p className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                    Groups in this community
                  </p>
                  <button 
                    onClick={() => setShowAddMemberBox(!showAddMemberBox)}
                    className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl transition cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Add Group/Member</span>
                  </button>
                </div>

                {/* Inline Form to Add New Group/Member */}
                {showAddMemberBox && (
                  <form onSubmit={handleAddMemberToCommunity} className="p-3 bg-slate-900/80 border border-slate-800 rounded-2xl flex gap-2">
                    <input 
                      type="text"
                      placeholder="Enter group or member name..."
                      value={newMemberName}
                      onChange={(e) => setNewMemberName(e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
                      autoFocus
                      required
                    />
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer"
                    >
                      Add
                    </button>
                  </form>
                )}

                {/* Dynamic Groups List */}
                <div className="space-y-2">
                  {(selectedCommunity.groupsList || ['General Discussion Group']).map((grp, idx) => (
                    <div key={idx} className="p-4 bg-slate-900/50 border border-slate-800 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-slate-800/40 transition">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-white">{grp}</h5>
                          <p className="text-[10px] text-slate-400">Tap to open group chats</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center text-[10px] text-slate-500 uppercase tracking-wider font-medium pt-2">
                End of community panel
              </div>
            </div>
          )}

          {/* Create Community Modal */}
          {showCreateModal && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-emerald-400">Create New Community</h3>
                  <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white cursor-pointer p-1">
                    ✕
                  </button>
                </div>

                <form onSubmit={handleCreateCommunity} className="space-y-4">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Community Name</label>
                    <input
                      type="text"
                      value={commName}
                      onChange={(e) => setCommName(e.target.value)}
                      placeholder="e.g. Web Dev Hackers"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none transition"
                      autoFocus
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Initial Members Count (Optional)</label>
                    <input
                      type="number"
                      value={memberInput}
                      onChange={(e) => setMemberInput(e.target.value)}
                      placeholder="e.g. 15"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Description</label>
                    <textarea
                      rows="3"
                      value={commDesc}
                      onChange={(e) => setCommDesc(e.target.value)}
                      placeholder="What is this community about?"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none transition resize-none"
                    ></textarea>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-medium rounded-xl hover:bg-slate-700 transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition cursor-pointer hover:opacity-90"
                    >
                      Create
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

export default CommunityView;