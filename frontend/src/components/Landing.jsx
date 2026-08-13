import React from 'react';
import { MessageSquare, ShieldCheck, Zap, Radio, Lock, ArrowRight, Search, MoreVertical, Smile, Paperclip, Send } from 'lucide-react';

function Landing({ onGetStarted }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-emerald-950 text-white flex flex-col justify-between selection:bg-emerald-500 selection:text-gray-950">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-6 max-w-7xl mx-auto w-full border-b border-gray-800/60 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-gray-950 shadow-lg shadow-emerald-500/20">
            <MessageSquare className="w-5 h-5 font-bold" />
          </div>
          <span className="text-xl font-extrabold tracking-wide bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            ChatWave
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={onGetStarted}
            className="text-sm font-medium text-gray-300 hover:text-white transition cursor-pointer hidden sm:block"
          >
            Sign In
          </button>
          <button 
            onClick={onGetStarted}
            className="bg-emerald-500 hover:bg-emerald-400 text-gray-950 px-5 py-2.5 rounded-xl font-semibold transition duration-200 cursor-pointer shadow-lg shadow-emerald-500/25 active:scale-95"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 pt-12 pb-20 text-center flex-1 flex flex-col items-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-4 py-2 rounded-full uppercase tracking-wider font-semibold mb-8 backdrop-blur-sm shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Powered by MERN Stack & Socket.io
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6 max-w-4xl">
          Connect with your world <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            instantly & securely.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed">
          A production-grade real-time messaging web app featuring live online presence indicators, instant typing status, and smooth media sharing.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md mb-16">
          <button 
            onClick={onGetStarted}
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold px-8 py-4 rounded-xl text-base transition duration-200 shadow-xl shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2 group"
          >
            Start Chatting Now 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <a 
            href="#features"
            className="w-full sm:w-auto bg-gray-800/80 hover:bg-gray-800 text-gray-200 font-semibold px-8 py-4 rounded-xl text-base border border-gray-700/60 transition duration-200 cursor-pointer flex items-center justify-center"
          >
            Explore Features
          </a>
        </div>

        {/* Pro Mockup Preview Container */}
        <div className="w-full relative rounded-2xl border border-gray-700/80 bg-gray-900/80 p-2 sm:p-4 shadow-2xl shadow-emerald-950/50 backdrop-blur-xl">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-20 pointer-events-none"></div>
          
          <div className="relative rounded-lg overflow-hidden bg-[#0b141a] border border-gray-800 flex flex-col md:flex-row h-[350px] sm:h-[450px] text-left">
            
            {/* Mock Sidebar */}
            <div className="w-full md:w-1/3 border-r border-gray-800 bg-[#111b21] hidden md:flex flex-col">
              <div className="p-3 bg-[#202c33] flex items-center justify-between">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold text-white">P</div>
                <div className="text-gray-400 text-xs">status • online</div>
              </div>
              <div className="p-2">
                <div className="bg-[#202c33] rounded-lg px-3 py-1.5 text-xs text-gray-400 flex items-center gap-2">
                  <Search className="w-3.5 h-3.5" /> Search chats...
                </div>
              </div>
              <div className="flex-1 p-2 space-y-1">
                <div className="bg-[#2a3942] p-2.5 rounded-lg flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center font-bold text-xs text-white">JD</div>
                  <div>
                    <p className="text-xs font-semibold text-white">John Doe</p>
                    <p className="text-[10px] text-gray-400">Bhai project kahan tak hua?</p>
                  </div>
                </div>
                <div className="p-2.5 rounded-lg flex items-center gap-3 hover:bg-[#202c33]/50">
                  <div className="w-9 h-9 rounded-full bg-purple-500 flex items-center justify-center font-bold text-xs text-white">SG</div>
                  <div>
                    <p className="text-xs font-semibold text-gray-300">Study Group</p>
                    <p className="text-[10px] text-gray-500">Meeting at 5 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mock Chat Window */}
            <div className="flex-1 bg-[#0b141a] flex flex-col justify-between">
              <div className="p-3 bg-[#202c33] flex items-center justify-between border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-xs font-bold text-white">JD</div>
                  <div>
                    <p className="text-xs font-semibold text-white">John Doe</p>
                    <p className="text-[10px] text-emerald-400">online</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Search className="w-4 h-4" />
                  <MoreVertical className="w-4 h-4" />
                </div>
              </div>
              
              <div className="p-4 space-y-3 overflow-hidden flex flex-col justify-end">
                <div className="self-start bg-[#202c33] p-2.5 rounded-xl max-w-[70%] text-xs text-gray-200 shadow">
                  Bhai WhatsApp clone ka UI lucide icons ke sath ekdam pro lag raha hai! 🔥
                  <span className="block text-[9px] text-gray-400 text-right mt-1">11:20 AM</span>
                </div>
                <div className="self-end bg-[#005c4b] p-2.5 rounded-xl max-w-[70%] text-xs text-gray-100 shadow">
                  Haan bhai, ab ekdam clean look aa gaya hai. 🚀
                  <span className="block text-[9px] text-emerald-200 text-right mt-1">11:21 AM ✓✓</span>
                </div>
              </div>

              <div className="p-3 bg-[#202c33] flex items-center gap-3">
                <Smile className="w-5 h-5 text-gray-400 cursor-pointer" />
                <Paperclip className="w-5 h-5 text-gray-400 cursor-pointer" />
                <div className="flex-1 bg-[#2a3942] rounded-lg px-3 py-1.5 text-xs text-gray-400">Type a message...</div>
                <Send className="w-4 h-4 text-emerald-400 cursor-pointer" />
              </div>
            </div>

          </div>
        </div>

        {/* Feature Cards Grid */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 text-left w-full">
          <div className="bg-gray-900/40 border border-gray-800 p-8 rounded-2xl backdrop-blur-sm hover:border-emerald-500/40 transition duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-white">Real-Time WebSockets</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Instant delivery powered by Socket.io with zero lag, ensuring seamless conversation flow.</p>
          </div>
          <div className="bg-gray-900/40 border border-gray-800 p-8 rounded-2xl backdrop-blur-sm hover:border-emerald-500/40 transition duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
              <Radio className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-white">Live Status & Typing</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Track online presence indicators and real-time typing events just like modern messaging apps.</p>
          </div>
          <div className="bg-gray-900/40 border border-gray-800 p-8 rounded-2xl backdrop-blur-sm hover:border-emerald-500/40 transition duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-white">Secure MERN Architecture</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Encrypted password hashing, robust JWT session management, and modular database schemas.</p>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm border-t border-gray-800/60 bg-gray-950">
        <p>© 2026 ChatWave • Built with MERN Stack by Pintu</p>
      </footer>

    </div>
  );
}

export default Landing;