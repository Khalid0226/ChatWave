import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquare, Search, Send, Phone, Video, MoreVertical,
  Smile, Paperclip, CheckCheck, LogOut, ArrowLeft, X,
  CircleDot, Users, Settings, User, UserPlus, Trash2
} from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import BottomNav from './BottomNav';
import AddContactModal from './AddContactModal';
import { useTheme } from '../context/ThemeContext';
import API from '../services/Axios';
import {io} from 'socket.io-client'

const socket = io(import.meta.env.VITE_BACKEND_BASE_URL,{
  withCredentials:true
})

function ChatDashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const [showChatMenu, setShowChatMenu] = useState(false);

  // Contacts & Modal states
  const [contacts, setContacts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [name] = useState(user?.name || 'Pintu Kumar');

  // Backend se added contacts fetch karne ke liye
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await API.get('/chat/my-contacts');
        setContacts(response.data.contacts || []);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
      }
    };
    fetchContacts();
  }, []);

  const [messages, setMessages] = useState([]);

  // Contact select karne par chat/messages fetch karne ka function
  const handleSelectChat = async (contact) => {
    setSelectedChat(contact);
    setShowChatMenu(false);
    try {
      // Agar backend par messages fetch karne ka route ho toh yahan call karein:
      // const response = await API.get(`/chat/messages/${contact._id}`);
      // setMessages(response.data.messages || []);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };


  useEffect(()=>{
    socket.on('receive_message',(data)=>{
      setMessages((prevMessages)=>[...prevMessages,data])
    })

    return()=>{
      socket.off('receive_message')
    }
  },[])

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim() && !selectedFile) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'me',
      text: messageText + (selectedFile ? ` [Attached: ${selectedFile.name}]` : ''),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    socket.emit('send_message',newMessage)

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

  const handleLogout = async () => {
    try {
      const response = await API.post('/auth/logout');
      if(response.status === 200){
        alert(response.data.message);
      }
      navigate('/login');
    } catch (error) {
      console.error(error);
    } finally {
      navigate('/login');
    }
  };

  // Remove Contact function
  const removeContact = async (contactId) => {
    const confirmDelete = window.confirm('Kya aap is contact ko hatana chahte hain?');
    if (!confirmDelete) return;

    try {
      const response = await API.delete(`/chat/remove-contact/${contactId}`);

      if (response.status === 200) {
        setContacts((prevContact) => prevContact.filter((c) => c._id !== contactId));
      }

      if (selectedChat?._id === contactId) {
        setSelectedChat(null);
      }
      setShowChatMenu(false);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Contact remove karne me error aaya.");
    }
  };

  return (
    <div className={`h-[100dvh] w-screen flex flex-col md:flex-row overflow-hidden selection:bg-emerald-500 selection:text-white relative transition-colors duration-300 ${
      isDarkMode ? 'bg-[#050811] text-white' : 'bg-slate-50 text-slate-900'
    }`}>

      {/* Desktop Rail / Sidebar */}
      <div className={`hidden md:flex w-16 border-r flex-col items-center py-4 justify-between z-35 shrink-0 transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-950 border-slate-800/80' : 'bg-white border-slate-200'
      }`}>
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="p-3 rounded-xl transition cursor-pointer bg-emerald-500/20 text-emerald-500"
            title="Chats"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('/status')}
            className={`p-3 rounded-xl transition cursor-pointer ${
              isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title="Status"
          >
            <CircleDot className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('/communities')}
            className={`p-3 rounded-xl transition cursor-pointer ${
              isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title="Communities"
          >
            <Users className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => navigate('/settings')}
            className={`p-3 rounded-xl transition cursor-pointer ${
              isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>

          <div
            onClick={() => navigate('/profile')}
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold cursor-pointer shadow-lg shadow-emerald-500/20 hover:scale-105 transition overflow-hidden"
            title="Profile"
          >
            {user?.avatar ? (
              <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              name.charAt(0).toUpperCase()
            )}
          </div>
        </div>
      </div>

      {/* Main Content Layout Wrapper */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">

        {/* Chats List Sidebar */}
        <div className={`w-full md:w-80 lg:w-96 border-r flex flex-col backdrop-blur-xl transition-colors duration-300 ${
          isDarkMode ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white/70 border-slate-200'
        } ${selectedChat ? 'hidden md:flex' : 'flex'} flex-1 md:flex-initial pb-16 md:pb-0`}>

          {/* Chats Header with Add Contact Button */}
          <div className={`p-4 border-b flex items-center justify-between relative transition-colors duration-300 ${
            isDarkMode ? 'border-slate-800/80' : 'border-slate-200'
          }`}>
            <h3 className="text-base font-bold tracking-tight text-emerald-500">ChatWave</h3>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAddModalOpen(true)}
                title="Add Contact"
                className="p-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 text-xs font-bold bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
              >
                <UserPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Add</span>
              </button>

              <div className="relative md:hidden">
                <button
                  onClick={() => setShowMenuDropdown(!showMenuDropdown)}
                  className={`p-2 rounded-xl transition cursor-pointer ${
                    isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <MoreVertical className="w-5 h-5" />
                </button>

                {showMenuDropdown && (
                  <div className={`absolute right-0 mt-2 w-44 border rounded-2xl shadow-2xl py-2 z-50 text-xs transition-colors duration-300 ${
                    isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-700'
                  }`}>
                    <button
                      onClick={() => { navigate('/profile'); setShowMenuDropdown(false); }}
                      className={`w-full text-left px-4 py-2.5 flex items-center gap-2 cursor-pointer ${
                        isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
                      }`}
                    >
                      <User className="w-4 h-4 text-emerald-500" /> Profile
                    </button>
                    <button
                      onClick={() => { navigate('/settings'); setShowMenuDropdown(false); }}
                      className={`w-full text-left px-4 py-2.5 flex items-center gap-2 cursor-pointer ${
                        isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
                      }`}
                    >
                      <Settings className="w-4 h-4 text-emerald-500" /> Settings
                    </button>
                    <div className={`border-t my-1 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}></div>
                    <button
                      onClick={handleLogout}
                      className={`w-full text-left px-4 py-2.5 text-red-400 flex items-center gap-2 font-medium cursor-pointer ${
                        isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
                      }`}
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={handleLogout}
                title="Logout"
                className={`hidden md:block p-2 rounded-xl transition cursor-pointer ${
                  isDarkMode ? 'text-slate-400 hover:text-red-400 hover:bg-slate-800/50' : 'text-slate-500 hover:text-red-600 hover:bg-slate-100'
                }`}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="p-3">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search contacts"
                className={`w-full border rounded-xl px-4 py-2 pl-9 text-xs placeholder-slate-400 focus:outline-none transition ${
                  isDarkMode 
                    ? 'bg-slate-950/60 border-slate-800/80 focus:border-emerald-500/80 text-white' 
                    : 'bg-white border-slate-200 focus:border-emerald-500 text-slate-900 shadow-sm'
                }`}
              />
            </div>
          </div>

          {/* Dynamic Contacts List */}
          <div className="flex-1 overflow-y-auto px-2 space-y-1">
            {contacts.length === 0 ? (
              <div className="text-center py-10 px-4 text-slate-400 text-xs">
                No contacts added yet. Click on <span className="text-emerald-500 font-bold">Add</span> to search & add contacts via phone number!
              </div>
            ) : (
              contacts.map((contact) => (
                <div
                  key={contact._id}
                  onClick={() => handleSelectChat(contact)}
                  className={`p-3 rounded-2xl flex items-center justify-between cursor-pointer transition ${
                    selectedChat?._id === contact._id 
                      ? 'bg-emerald-500/10 border border-emerald-500/20' 
                      : isDarkMode ? 'hover:bg-slate-800/30 border border-transparent' : 'hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="relative">
                      <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr flex items-center justify-center font-bold text-emerald-500 border overflow-hidden ${
                        isDarkMode ? 'from-slate-800 to-slate-700 border-slate-700' : 'from-slate-100 to-slate-200 border-slate-300'
                      }`}>
                        {contact.avatar ? (
                          <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
                        ) : (
                          contact.name.charAt(0).toUpperCase()
                        )}
                      </div>
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950"></span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <h4 className={`text-xs font-bold truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{contact.name}</h4>
                      </div>
                      <p className="text-xs text-slate-400 truncate">{contact.about || 'Hey there! I am using ChatWave.'}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>

        {/* Main Chat Area */}
        <div className={`flex-1 flex flex-col relative transition-colors duration-300 ${
          isDarkMode ? 'bg-slate-950/40' : 'bg-slate-50/50'
        } ${selectedChat ? 'flex' : 'hidden md:flex'}`}>

          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className={`h-16 border-b px-4 md:px-6 flex items-center justify-between relative z-30 backdrop-blur-xl transition-colors duration-300 ${
                isDarkMode ? 'border-slate-800/80 bg-slate-950/80' : 'border-slate-200 bg-white/90'
              }`}>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedChat(null)}
                    className={`md:hidden p-1.5 rounded-lg transition cursor-pointer ${
                      isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <div className="relative">
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-tr flex items-center justify-center font-bold text-emerald-500 border overflow-hidden ${
                      isDarkMode ? 'from-slate-800 to-slate-700 border-slate-700' : 'from-slate-100 to-slate-200 border-slate-300'
                    }`}>
                      {selectedChat.avatar ? (
                        <img src={selectedChat.avatar} alt={selectedChat.name} className="w-full h-full object-cover" />
                      ) : (
                        selectedChat.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-950"></span>
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{selectedChat.name}</h3>
                    <p className="text-[10px] text-slate-400">Active now</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 md:gap-2 text-slate-400 relative">
                  <button className={`p-2 rounded-xl transition cursor-pointer ${isDarkMode ? 'hover:bg-slate-800/50 hover:text-white' : 'hover:bg-slate-100 hover:text-slate-900'}`}>
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className={`p-2 rounded-xl transition cursor-pointer ${isDarkMode ? 'hover:bg-slate-800/50 hover:text-white' : 'hover:bg-slate-100 hover:text-slate-900'}`}>
                    <Video className="w-4 h-4" />
                  </button>
                  
                  {/* Chat 3-dots Menu */}
                  <div className="relative">
                    <button 
                      onClick={() => setShowChatMenu(!showChatMenu)}
                      className={`p-2 rounded-xl transition cursor-pointer ${isDarkMode ? 'hover:bg-slate-800/50 hover:text-white' : 'hover:bg-slate-100 hover:text-slate-900'}`}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {showChatMenu && (
                      <div className={`absolute right-0 top-10 w-44 border rounded-2xl shadow-2xl py-2 z-50 text-xs transition-colors duration-300 ${
                        isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-700'
                      }`}>
                        <button
                          onClick={() => removeContact(selectedChat._id)}
                          className={`w-full text-left px-4 py-2.5 text-red-400 flex items-center gap-2 font-medium cursor-pointer ${
                            isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
                          }`}
                        >
                          <Trash2 className="w-4 h-4" /> Delete Contact
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Messages Feed */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 z-10">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
                  >
                    <div className={`max-w-[80%] md:max-w-md px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'me' 
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-slate-950 font-medium rounded-br-none shadow-lg shadow-emerald-500/10' 
                        : isDarkMode 
                          ? 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none' 
                          : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                      {msg.time} {msg.sender === 'me' && <CheckCheck className="w-3 h-3 text-emerald-500" />}
                    </span>
                  </div>
                ))}
              </div>

              {/* Message Input Box */}
              <div className={`p-3 md:p-4 border-t backdrop-blur-xl z-10 relative transition-colors duration-300 ${
                isDarkMode ? 'border-slate-800/80' : 'border-slate-200 bg-white/80'
              }`}>
                {selectedFile && (
                  <div className={`flex items-center justify-between border px-3 py-2 rounded-xl mb-2 text-xs ${
                    isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}>
                    <span className="truncate max-w-[250px]">📎 Attached: {selectedFile.name}</span>
                    <button onClick={() => setSelectedFile(null)} className="text-slate-400 hover:text-red-400 cursor-pointer">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {showEmojiPicker && (
                  <div className="absolute bottom-20 left-4 z-30 shadow-2xl">
                    <EmojiPicker
                      theme={isDarkMode ? "dark" : "light"}
                      width={300}
                      height={400}
                      skinTonesDisabled
                      onEmojiClick={(emojiData) => {
                        setMessageText((prev) => prev + emojiData.emoji);
                        setShowEmojiPicker(false);
                      }}
                    />
                  </div>
                )}

                <form onSubmit={handleSendMessage} className="flex items-center gap-2 md:gap-3">
                  <div className={`flex-1 relative flex items-center border rounded-xl px-3 transition ${
                    isDarkMode 
                      ? 'bg-slate-900/80 border-slate-800 focus-within:border-emerald-500/80' 
                      : 'bg-white border-slate-300 focus-within:border-emerald-500 shadow-sm'
                  }`}>
                    <button
                      type="button"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="text-slate-400 hover:text-emerald-500 p-1.5 transition cursor-pointer"
                    >
                      <Smile className="w-5 h-5" />
                    </button>

                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Type a message..."
                      className={`w-full bg-transparent px-3 py-3 text-xs placeholder-slate-400 focus:outline-none ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}
                    />

                    <label className="text-slate-400 hover:text-emerald-500 p-1.5 transition cursor-pointer">
                      <Paperclip className="w-5 h-5" />
                      <input type="file" onChange={handleFileChange} className="hidden" />
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 p-3 rounded-xl transition shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center justify-center"
                  >
                    <Send className="w-4 h-4 font-bold" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 hidden md:flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <MessageSquare className="w-12 h-12 mb-3 opacity-20 text-emerald-500" />
              <p className="text-sm font-medium">Select a chat to start messaging</p>
            </div>
          )}

        </div>

      </div>

      {/* Add Contact Modal Component */}
      <AddContactModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onContactAdded={(newContact) => {
          setContacts((prev) => [...prev, newContact]);
        }}
        isDarkMode={isDarkMode}
      />

      {/* WhatsApp-style Mobile Bottom Navigation Bar */}
      {!selectedChat && (
        <div className="md:hidden absolute bottom-0 left-0 right-0 z-30">
          <BottomNav />
        </div>
      )}
    </div>
  );
}

export default ChatDashboard;