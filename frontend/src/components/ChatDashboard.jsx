import React, { useState } from 'react';
import { MessageSquare, Search, Send, Phone, Video, MoreVertical, Smile, Paperclip, CheckCheck, LogOut, ArrowLeft, X } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';

function ChatDashboard({ user, onLogout }) {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [messages, setMessages] = useState([
    { id: 1, sender: 'them', text: 'Hey Pintu! Kaise ho? ChatWave ka frontend kaisa chal raha hai?', time: '10:30 AM' },
    { id: 2, sender: 'me', text: 'Ekdum mast chal raha hai! Ekdum professional look aa raha hai.', time: '10:32 AM' }
  ]);

  const chats = [
    { id: 1, name: 'Rahul Sharma', lastMsg: 'Ekdum mast chal raha hai!', time: '10:32 AM', avatar: 'RS', online: true },
    { id: 2, name: 'Priya Verma', lastMsg: 'Kal college milte hain.', time: 'Yesterday', avatar: 'PV', online: false },
    { id: 3, name: 'Web Dev Group', lastMsg: 'Meeting link bhej diya hai.', time: 'Monday', avatar: 'WD', online: true }
  ];

  const emojis = ['😀', '😂', '🔥', '👍', '❤️', '🚀', '😎', '🎉', '💻', '✨'];

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

      {/* Sidebar - Chat List */}
      <div className={`w-full md:w-80 lg:w-96 bg-slate-900/40 border-r border-slate-800/80 flex flex-col backdrop-blur-xl ${selectedChat ? 'hidden md:flex' : 'flex'}`}>

        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-emerald-500/20">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'P'}
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight">{user?.name || 'Pintu Kumar'}</h3>
              <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span> Online
              </p>
            </div>
          </div>
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
                    lazyLoad={true}
                    previewConfig={{ showPreview: false }} // Neeche ka extra space hatane ke liye
                    onEmojiClick={(emojiData) => {
                      setMessageText((prev) => prev + emojiData.emoji);
                      setShowEmojiPicker(false);
                    }}
                  />
                </div>
              )}

              <form onSubmit={handleSendMessage} className="flex items-center gap-2 md:gap-3">

                {/* Input Container with Inside Icons */}
                <div className="flex-1 relative flex items-center bg-slate-900/80 border border-slate-800 focus-within:border-emerald-500/80 rounded-xl px-3 transition">

                  {/* Emoji Button Inside */}
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="text-slate-400 hover:text-white p-1.5 transition cursor-pointer"
                  >
                    <Smile className="w-5 h-5" />
                  </button>

                  {/* Text Input Field */}
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full bg-transparent px-3 py-3 text-xs text-white placeholder-slate-600 focus:outline-none"
                  />

                  {/* Attachment Button Inside */}
                  <label className="text-slate-400 hover:text-white p-1.5 transition cursor-pointer">
                    <Paperclip className="w-5 h-5" />
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Send Button */}
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