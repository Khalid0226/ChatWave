import React, { useState } from 'react';
import { 
  MessageSquare, Search, Send, Phone, Video, MoreVertical, 
  Smile, Paperclip, CheckCheck, LogOut, ArrowLeft, X, 
  CircleDot, Users, Settings, Bell, Lock, Camera, Edit2, Check, 
  Globe, Shield, HelpCircle, User, Plus, Image as ImageIcon
} from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';

function ChatDashboard({ user, onLogout }) {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [activeNav, setActiveNav] = useState('chats'); // 'chats', 'status', 'communities', 'settings', 'profile'

  // Profile editable states
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [name, setName] = useState(user?.name || 'Pintu Kumar');
  const [about, setAbout] = useState('Full-stack MERN Developer & Tech Enthusiast 🚀');
  const [phone, setPhone] = useState('+91 98765 43210');

  const [messages, setMessages] = useState([
    { id: 1, sender: 'them', text: 'Hey Pintu! Kaise ho? ChatWave ka frontend kaisa chal raha hai?', time: '10:30 AM' },
    { id: 2, sender: 'me', text: 'Ekdum mast chal raha hai! Ekdum professional look aa raha hai.', time: '10:32 AM' }
  ]);

  const chats = [
    { id: 1, name: 'Rahul Sharma', lastMsg: 'Ekdum mast chal raha hai!', time: '10:32 AM', avatar: 'RS', online: true },
    { id: 2, name: 'Priya Verma', lastMsg: 'Kal college milte hain.', time: 'Yesterday', avatar: 'PV', online: false },
    { id: 3, name: 'Web Dev Group', lastMsg: 'Meeting link bhej diya hai.', time: 'Monday', avatar: 'WD', online: true }
  ];

  const statuses = [
    { id: 1, name: 'Rahul Sharma', time: 'Today at 9:15 AM', avatar: 'RS' },
    { id: 2, name: 'Priya Verma', time: 'Yesterday at 8:45 PM', avatar: 'PV' }
  ];

  const communities = [
    { id: 1, name: 'MERN Stack Developers India', members: '345 members', desc: 'Discussing React, Node, and Tailwind CSS tricks.' },
    { id: 2, name: 'College Official Group', members: '1,200 members', desc: 'Official announcements and assignments.' }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim() && !selectedFile) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'me',
      text: messageText + (selectedFile ? ` [Attached: ${selectedFile.name}]` : ''),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setMessageText('');
    setSelectedFile(null);
    setShowEmojiPicker(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="h-[100dvh] w-screen bg-[#050811] text-white flex overflow-hidden selection:bg-emerald-500 selection:text-slate-950">

      {/* Leftmost WhatsApp Rail (Icons Bar) */}
      <div className="w-16 bg-slate-950 border-r border-slate-800/80 flex flex-col items-center py-4 justify-between z-30 shrink-0">
        <div className="flex flex-col items-center gap-4">
          <button 
            onClick={() => setActiveNav('chats')}
            className={`p-3 rounded-xl transition cursor-pointer ${activeNav === 'chats' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
            title="Chats"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setActiveNav('status')}
            className={`p-3 rounded-xl transition cursor-pointer ${activeNav === 'status' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
            title="Status"
          >
            <CircleDot className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setActiveNav('communities')}
            className={`p-3 rounded-xl transition cursor-pointer ${activeNav === 'communities' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
            title="Communities"
          >
            <Users className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-3">
          <button 
            onClick={() => setActiveNav('settings')}
            className={`p-3 rounded-xl transition cursor-pointer ${activeNav === 'settings' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          
          {/* User Profile Avatar at Bottom */}
          <div 
            onClick={() => setActiveNav('profile')}
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold cursor-pointer shadow-lg shadow-emerald-500/20 hover:scale-105 transition"
            title="Profile"
          >
            {name.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      {/* 1. Profile Drawer */}
      {activeNav === 'profile' && (
        <div className="w-full md:w-80 lg:w-96 bg-slate-900 border-r border-slate-800 z-20 flex flex-col text-white shadow-2xl transition-all">
          <div className="h-16 bg-slate-950/60 px-4 flex items-center gap-4 border-b border-slate-800">
            <button 
              onClick={() => setActiveNav('chats')}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/50 transition cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h3 className="text-sm font-bold tracking-tight">Profile</h3>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pb-6">
            <div className="flex flex-col items-center py-6 bg-slate-900/40">
              <div className="relative group">
                <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-3xl shadow-xl shadow-emerald-500/20">
                  {name.charAt(0).toUpperCase()}
                </div>
                <label className="absolute inset-0 bg-slate-950/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer text-white text-[10px] font-medium text-center px-2">
                  <Camera className="w-5 h-5 mb-1" />
                  CHANGE PHOTO
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>

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
                  onClick={() => setIsEditingName(!isEditingName)}
                  className="p-2 text-slate-400 hover:text-emerald-400 transition cursor-pointer ml-2"
                >
                  {isEditingName ? <Check className="w-4 h-4 text-emerald-400" /> : <Edit2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

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

            <div className="bg-slate-950/40 px-6 py-4 border-y border-slate-800/60 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-1">Phone</p>
                <span className="text-xs font-medium text-slate-300">{phone}</span>
              </div>
              <Phone className="w-4 h-4 text-slate-500" />
            </div>

            <div className="px-2 space-y-1 pt-2">
              <div className="flex items-center gap-4 px-4 py-3 hover:bg-slate-800/40 rounded-xl cursor-pointer transition text-xs text-slate-300">
                <Bell className="w-4 h-4 text-slate-400" />
                <span>Notifications</span>
              </div>
              <div className="flex items-center gap-4 px-4 py-3 hover:bg-slate-800/40 rounded-xl cursor-pointer transition text-xs text-slate-300">
                <Lock className="w-4 h-4 text-slate-400" />
                <span>Privacy & Security</span>
              </div>
              <div className="flex items-center gap-4 px-4 py-3 hover:bg-slate-800/40 rounded-xl cursor-pointer transition text-xs text-slate-300" onClick={onLogout}>
                <LogOut className="w-4 h-4 text-red-400" />
                <span className="text-red-400 font-medium">Log out</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Status Drawer */}
      {activeNav === 'status' && (
        <div className="w-full md:w-80 lg:w-96 bg-slate-900 border-r border-slate-800 z-20 flex flex-col text-white shadow-2xl transition-all">
          <div className="h-16 bg-slate-950/60 px-4 flex items-center gap-4 border-b border-slate-800">
            <h3 className="text-base font-bold tracking-tight">Status Updates</h3>
          </div>
          <div className="p-4 border-b border-slate-800/80 flex items-center gap-3 cursor-pointer hover:bg-slate-800/40 transition">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold relative">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold">My Status</h4>
              <p className="text-[10px] text-slate-400">Click to add status update</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <p className="text-[10px] uppercase text-emerald-400 font-semibold tracking-wider">Recent updates</p>
            {statuses.map(s => (
              <div key={s.id} className="flex items-center gap-3 p-3 bg-slate-950/40 border border-slate-800/60 rounded-xl hover:bg-slate-800/40 cursor-pointer transition">
                <div className="w-10 h-10 rounded-full border-2 border-emerald-500 flex items-center justify-center font-bold text-emerald-400 bg-slate-800">{s.avatar}</div>
                <div>
                  <h4 className="text-xs font-bold">{s.name}</h4>
                  <p className="text-[10px] text-slate-400">{s.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Communities Drawer */}
      {activeNav === 'communities' && (
        <div className="w-full md:w-80 lg:w-96 bg-slate-900 border-r border-slate-800 z-20 flex flex-col text-white shadow-2xl transition-all">
          <div className="h-16 bg-slate-950/60 px-4 flex items-center gap-4 border-b border-slate-800">
            <h3 className="text-base font-bold tracking-tight">Communities</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {communities.map(c => (
              <div key={c.id} className="p-4 bg-slate-950/40 border border-slate-800/60 rounded-2xl space-y-2 hover:border-emerald-500/40 transition">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center font-bold text-slate-950">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold">{c.name}</h4>
                    <p className="text-[10px] text-emerald-400">{c.members}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Settings Drawer */}
      {activeNav === 'settings' && (
        <div className="w-full md:w-80 lg:w-96 bg-slate-900 border-r border-slate-800 z-20 flex flex-col text-white shadow-2xl transition-all">
          <div className="h-16 bg-slate-950/60 px-4 flex items-center gap-4 border-b border-slate-800">
            <h3 className="text-base font-bold tracking-tight">Settings</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            <div className="flex items-center gap-4 px-4 py-3 hover:bg-slate-800/40 rounded-xl cursor-pointer transition text-xs text-slate-300">
              <User className="w-4 h-4 text-emerald-400" />
              <span>Account Preferences</span>
            </div>
            <div className="flex items-center gap-4 px-4 py-3 hover:bg-slate-800/40 rounded-xl cursor-pointer transition text-xs text-slate-300">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Privacy & Security</span>
            </div>
            <div className="flex items-center gap-4 px-4 py-3 hover:bg-slate-800/40 rounded-xl cursor-pointer transition text-xs text-slate-300">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Theme & Appearance</span>
            </div>
            <div className="flex items-center gap-4 px-4 py-3 hover:bg-slate-800/40 rounded-xl cursor-pointer transition text-xs text-slate-300">
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span>Help & Support</span>
            </div>
          </div>
        </div>
      )}

      {/* 5. Chats Sidebar (Shown when activeNav is 'chats') */}
      {activeNav === 'chats' && (
        <div className={`w-full md:w-80 lg:w-96 bg-slate-900/40 border-r border-slate-800/80 flex flex-col backdrop-blur-xl ${selectedChat ? 'hidden md:flex' : 'flex'}`}>

          {/* Sidebar Header */}
          <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
            <h3 className="text-base font-bold tracking-tight">Chats</h3>
            <button
              onClick={onLogout}
              title="Logout"
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800/50 rounded-xl transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="p-3">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search or start new chat"
                className="w-full bg-slate-950/60 border border-slate-800/80 focus:border-emerald-500/80 rounded-xl px-4 py-2 pl-9 text-xs text-white placeholder-slate-600 focus:outline-none transition"
              />
            </div>
          </div>

          {/* Chats List */}
          <div className="flex-1 overflow-y-auto px-2 space-y-1">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`p-3 rounded-2xl flex items-center gap-3 cursor-pointer transition ${selectedChat?.id === chat.id ? 'bg-emerald-500/10 border border-emerald-500/20' : 'hover:bg-slate-800/30 border border-transparent'}`}
              >
                <div className="relative">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center font-bold text-emerald-400 border border-slate-700">
                    {chat.avatar}
                  </div>
                  {chat.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h4 className="text-xs font-bold truncate">{chat.name}</h4>
                    <span className="text-[10px] text-slate-500">{chat.time}</span>
                  </div>
                  <p className="text-xs text-slate-400 truncate">{chat.lastMsg}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* Main Chat Area */}
      <div className={`flex-1 flex-col bg-slate-950/40 relative ${selectedChat ? 'flex' : 'hidden md:flex'}`}>

        {selectedChat ? (
          <>
            {/* Ambient Glow */}
            <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none"></div>

            {/* Chat Header */}
            <div className="h-16 border-b border-slate-800/80 px-4 md:px-6 flex items-center justify-between backdrop-blur-xl z-10">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedChat(null)}
                  className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50 transition cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center font-bold text-emerald-400 border border-slate-700">
                    {selectedChat.avatar}
                  </div>
                  {selectedChat.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-950"></span>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold">{selectedChat.name}</h3>
                  <p className="text-[10px] text-slate-400">{selectedChat.online ? 'Active now' : 'Offline'}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 md:gap-2 text-slate-400">
                <button className="p-2 hover:bg-slate-800/50 hover:text-white rounded-xl transition cursor-pointer">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-slate-800/50 hover:text-white rounded-xl transition cursor-pointer">
                  <Video className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-slate-800/50 hover:text-white rounded-xl transition cursor-pointer">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 z-10">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`max-w-[80%] md:max-w-md px-4 py-3 rounded-2xl text-xs leading-relaxed ${msg.sender === 'me' ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-slate-950 font-medium rounded-br-none shadow-lg shadow-emerald-500/10' : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'}`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                    {msg.time} {msg.sender === 'me' && <CheckCheck className="w-3 h-3 text-emerald-400" />}
                  </span>
                </div>
              ))}
            </div>

            {/* Message Input Box */}
            <div className="p-3 md:p-4 border-t border-slate-800/80 backdrop-blur-xl z-10 relative">

              {/* File Preview Bar */}
              {selectedFile && (
                <div className="flex items-center justify-between bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl mb-2 text-xs text-slate-300">
                  <span className="truncate max-w-[250px]">📎 Attached: {selectedFile.name}</span>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="text-slate-400 hover:text-red-400 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Emoji Picker Tray */}
              {showEmojiPicker && (
                <div className="absolute bottom-20 left-4 z-30 shadow-2xl">
                  <EmojiPicker
                    theme="dark"
                    width={300}
                    height={400}
                    skinTonesDisabled
                    searchPlaceholder="Search emojis..."
                    onEmojiClick={(emojiData) => {
                      setMessageText((prev) => prev + emojiData.emoji);
                      setShowEmojiPicker(false);
                    }}
                  />
                </div>
              )}

              <form onSubmit={handleSendMessage} className="flex items-center gap-2 md:gap-3">
                <div className="flex-1 relative flex items-center bg-slate-900/80 border border-slate-800 focus-within:border-emerald-500/80 rounded-xl px-3 transition">
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="text-slate-400 hover:text-white p-1.5 transition cursor-pointer"
                  >
                    <Smile className="w-5 h-5" />
                  </button>

                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full bg-transparent px-3 py-3 text-xs text-white placeholder-slate-600 focus:outline-none"
                  />

                  <label className="text-slate-400 hover:text-white p-1.5 transition cursor-pointer">
                    <Paperclip className="w-5 h-5" />
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 p-3 rounded-xl transition shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center justify-center"
                >
                  <Send className="w-4 h-4 font-bold" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 hidden md:flex flex-col items-center justify-center text-center p-6 text-slate-500">
            <MessageSquare className="w-12 h-12 mb-3 opacity-20 text-emerald-400" />
            <p className="text-sm font-medium">Select a chat to start messaging</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default ChatDashboard;