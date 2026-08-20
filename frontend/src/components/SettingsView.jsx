import React, { useState, useEffect } from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  Moon, 
  Sun,
  LogOut, 
  ArrowLeft, 
  Key, 
  CheckCircle2, 
  ChevronRight 
} from 'lucide-react';
import BottomNav from './BottomNav';
import { useTheme } from '../context/ThemeContext';

function SettingsView({ user, onUpdateUser, onLogout, onBack }) {
  // Active settings tab state ('account', 'security', 'notifications', 'appearance')
  const [activeTab, setActiveTab] = useState('account');

  // Mobile specific view sub-state ('main', 'profile', 'password', 'notifications', 'appearance')
  const [mobileSubView, setMobileSubView] = useState('main');

  // Theme Context hook integration
  const { isDarkMode, toggleTheme } = useTheme();

  // Profile Form State
  const [name, setName] = useState(user?.name || '');
  const [about, setAbout] = useState(user?.about || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Sync state if user prop changes or loads asynchronously
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setAbout(user.about || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  // Password Reset Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Handle Profile Update
  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (onUpdateUser) {
      onUpdateUser({ name, about, phone });
    }
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  // Handle Password Reset
  const handleResetPassword = (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Please fill in all password fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirm password do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return;
    }

    setPasswordSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  return (
    <div className={`h-[100dvh] w-screen flex flex-col justify-between overflow-hidden relative selection:bg-emerald-500 selection:text-slate-950 transition-colors duration-300 ${
      isDarkMode ? 'bg-[#050811] text-white' : 'bg-slate-100 text-slate-900'
    }`}>
      
      {/* 📱 MOBILE VIEW: WhatsApp Style List Navigation */}
      <div className="flex md:hidden flex-col h-full w-full overflow-hidden">
        
        {/* Mobile Header */}
        <div className={`h-16 px-4 flex items-center justify-between border-b backdrop-blur-xl shrink-0 z-10 transition-colors ${
          isDarkMode ? 'border-slate-800 bg-slate-950/80' : 'border-slate-200 bg-white/80'
        }`}>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                if (mobileSubView !== 'main') {
                  setMobileSubView('main');
                } else {
                  onBack();
                }
              }}
              className={`p-2 rounded-xl transition cursor-pointer flex items-center justify-center ${
                isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h3 className="text-sm font-bold tracking-tight text-emerald-500">
              {mobileSubView === 'main' && 'Settings'}
              {mobileSubView === 'profile' && 'Account & Profile'}
              {mobileSubView === 'password' && 'Security & Password'}
              {mobileSubView === 'notifications' && 'Notifications'}
              {mobileSubView === 'appearance' && 'Appearance'}
            </h3>
          </div>
        </div>

        {/* Mobile Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar pb-20">
          
          {/* MAIN SETTINGS LIST */}
          {mobileSubView === 'main' && (
            <div className="space-y-4 animate-fadeIn">
              
              {/* Profile Card Banner */}
              <div 
                onClick={() => setMobileSubView('profile')}
                className={`border rounded-2xl p-4 flex items-center gap-4 cursor-pointer active:scale-98 transition shadow-lg ${
                  isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 font-bold text-lg shadow-md shrink-0">
                  {name ? name.charAt(0) : 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`text-xs font-bold truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{name || 'User'}</h4>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">{about || 'Hey there! I am using this app.'}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              </div>

              {/* Options List Group */}
              <div className={`border rounded-2xl overflow-hidden divide-y ${
                isDarkMode ? 'bg-slate-900/50 border-slate-800 divide-slate-800/60' : 'bg-white border-slate-200 divide-slate-100'
              }`}>
                <div 
                  onClick={() => setMobileSubView('profile')}
                  className={`p-4 flex items-center justify-between cursor-pointer transition ${isDarkMode ? 'active:bg-slate-800/40' : 'active:bg-slate-50'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className={`text-xs font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Account</h5>
                      <p className="text-[10px] text-slate-400">Privacy, security, change name</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>

                <div 
                  onClick={() => setMobileSubView('password')}
                  className={`p-4 flex items-center justify-between cursor-pointer transition ${isDarkMode ? 'active:bg-slate-800/40' : 'active:bg-slate-50'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-teal-500/10 text-teal-500">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className={`text-xs font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Security & Password</h5>
                      <p className="text-[10px] text-slate-400">Password management & updates</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>

                <div 
                  onClick={() => setMobileSubView('notifications')}
                  className={`p-4 flex items-center justify-between cursor-pointer transition ${isDarkMode ? 'active:bg-slate-800/40' : 'active:bg-slate-50'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className={`text-xs font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Notifications</h5>
                      <p className="text-[10px] text-slate-400">Message tones & alerts</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>

                <div 
                  onClick={() => setMobileSubView('appearance')}
                  className={`p-4 flex items-center justify-between cursor-pointer transition ${isDarkMode ? 'active:bg-slate-800/40' : 'active:bg-slate-50'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
                      <Moon className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className={`text-xs font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Appearance</h5>
                      <p className="text-[10px] text-slate-400">Theme & interface style</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="w-full bg-rose-500/10 border border-rose-500/20 text-rose-500 hover:bg-rose-500/20 p-3.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" /> Log Out
              </button>

            </div>
          )}

          {/* MOBILE SUB-VIEW: ACCOUNT & PROFILE */}
          {mobileSubView === 'profile' && (
            <div className="space-y-4 animate-fadeIn">
              {profileSuccess && (
                <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-500 text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Profile updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className={`border p-4 rounded-2xl space-y-4 ${
                isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div>
                  <label className={`text-[11px] font-semibold block mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Full Name</label>
                  <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full border rounded-xl p-3 text-xs focus:border-emerald-500 focus:outline-none transition ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className={`text-[11px] font-semibold block mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>About Bio</label>
                  <input 
                    type="text"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className={`w-full border rounded-xl p-3 text-xs focus:border-emerald-500 focus:outline-none transition ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className={`text-[11px] font-semibold block mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Phone Number</label>
                  <input 
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full border rounded-xl p-3 text-xs focus:border-emerald-500 focus:outline-none transition ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition cursor-pointer"
                >
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {/* MOBILE SUB-VIEW: SECURITY & PASSWORD */}
          {mobileSubView === 'password' && (
            <div className="space-y-4 animate-fadeIn">
              {passwordSuccess && (
                <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-500 text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Password updated successfully!</span>
                </div>
              )}

              {passwordError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 text-xs">
                  {passwordError}
                </div>
              )}

              <form onSubmit={handleResetPassword} className={`border p-4 rounded-2xl space-y-4 ${
                isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div>
                  <label className={`text-[11px] font-semibold block mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Current Password</label>
                  <input 
                    type="password"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className={`w-full border rounded-xl p-3 text-xs focus:border-emerald-500 focus:outline-none transition ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className={`text-[11px] font-semibold block mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>New Password</label>
                  <input 
                    type="password"
                    placeholder="At least 6 chars"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={`w-full border rounded-xl p-3 text-xs focus:border-emerald-500 focus:outline-none transition ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className={`text-[11px] font-semibold block mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Confirm New Password</label>
                  <input 
                    type="password"
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full border rounded-xl p-3 text-xs focus:border-emerald-500 focus:outline-none transition ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition cursor-pointer"
                >
                  Update Password
                </button>
              </form>
            </div>
          )}

          {/* MOBILE SUB-VIEW: NOTIFICATIONS */}
          {mobileSubView === 'notifications' && (
            <div className={`space-y-3 animate-fadeIn border p-4 rounded-2xl ${
              isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className={`flex items-center justify-between py-2 border-b ${isDarkMode ? 'border-slate-800/60' : 'border-slate-100'}`}>
                <div>
                  <h5 className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Message Sounds</h5>
                  <p className="text-[10px] text-slate-400">Play sound for incoming messages</p>
                </div>
                <input type="checkbox" defaultChecked className="accent-emerald-500 w-4 h-4 cursor-pointer" />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <h5 className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Community Alerts</h5>
                  <p className="text-[10px] text-slate-400">Get updates for groups</p>
                </div>
                <input type="checkbox" defaultChecked className="accent-emerald-500 w-4 h-4 cursor-pointer" />
              </div>
            </div>
          )}

          {/* MOBILE SUB-VIEW: APPEARANCE */}
          {mobileSubView === 'appearance' && (
            <div className={`space-y-3 animate-fadeIn border p-4 rounded-2xl ${
              isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <h5 className={`text-xs font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Select Theme Mode</h5>
              <div className="grid grid-cols-2 gap-3">
                <div 
                  onClick={() => { if (isDarkMode) toggleTheme(); }}
                  className={`p-3 rounded-xl border cursor-pointer transition flex flex-col gap-2 ${
                    !isDarkMode ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 font-semibold' : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <Sun className="w-5 h-5 text-amber-500" />
                  <span className="text-xs font-bold">Light Mode</span>
                </div>
                <div 
                  onClick={() => { if (!isDarkMode) toggleTheme(); }}
                  className={`p-3 rounded-xl border cursor-pointer transition flex flex-col gap-2 ${
                    isDarkMode ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-semibold' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <Moon className="w-5 h-5 text-emerald-500" />
                  <span className="text-xs font-bold">Dark Mode</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* 💻 DESKTOP VIEW: Sidebar Layout */}
      <div className="hidden md:flex flex-1 items-center justify-center p-6 overflow-hidden">
        <div className={`w-full h-[88vh] max-w-4xl border rounded-2xl flex flex-row shadow-2xl overflow-hidden relative transition-colors ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          
          {/* Left Sidebar */}
          <div className={`w-72 border-r flex flex-col shrink-0 transition-colors ${
            isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className={`h-16 px-6 flex items-center justify-between border-b backdrop-blur-xl ${
              isDarkMode ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <div className="flex items-center gap-3">
                <button 
                  onClick={onBack}
                  className={`flex p-2 rounded-xl transition cursor-pointer items-center justify-center ${
                    isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                  title="Go Back"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h3 className="text-sm font-bold tracking-tight text-emerald-500">Settings</h3>
              </div>
            </div>

            <div className="flex flex-col p-4 gap-1.5 overflow-y-auto">
              <button
                onClick={() => setActiveTab('account')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'account' 
                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-sm' 
                    : isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-900/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <User className="w-4 h-4 shrink-0" />
                <span>Account & Profile</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'security' 
                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-sm' 
                    : isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-900/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Lock className="w-4 h-4 shrink-0" />
                <span>Security & Password</span>
              </button>

              <button
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'notifications' 
                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-sm' 
                    : isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-900/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Bell className="w-4 h-4 shrink-0" />
                <span>Notifications</span>
              </button>

              <button
                onClick={() => setActiveTab('appearance')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'appearance' 
                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-sm' 
                    : isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-900/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Moon className="w-4 h-4 shrink-0" />
                <span>Appearance</span>
              </button>

              <div className={`my-2 border-t ${isDarkMode ? 'border-slate-800/80' : 'border-slate-200'}`}></div>

              <button
                onClick={onLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition cursor-pointer"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span>Log Out</span>
              </button>
            </div>
          </div>

          {/* Right Content Area (Desktop) */}
          <div className={`flex-1 overflow-y-auto p-8 space-y-6 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
            {activeTab === 'account' && (
              <div className="space-y-6 max-w-xl">
                <div>
                  <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Account Information</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Update your personal details visible to others.</p>
                </div>

                {profileSuccess && (
                  <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-500 text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Profile updated successfully!</span>
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="flex items-center gap-4 py-2">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 font-bold text-xl shadow-lg">
                      {name ? name.charAt(0) : 'U'}
                    </div>
                    <div>
                      <h5 className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{name}</h5>
                      <span className="text-[10px] text-emerald-500">Active Account</span>
                    </div>
                  </div>

                  <div>
                    <label className={`text-[11px] font-semibold block mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Full Name</label>
                    <input 
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full border rounded-xl p-3 text-xs focus:border-emerald-500 focus:outline-none transition ${
                        isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                      required
                    />
                  </div>

                  <div>
                    <label className={`text-[11px] font-semibold block mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>About Bio</label>
                    <input 
                      type="text"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      className={`w-full border rounded-xl p-3 text-xs focus:border-emerald-500 focus:outline-none transition ${
                        isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`text-[11px] font-semibold block mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Phone Number</label>
                    <input 
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full border rounded-xl p-3 text-xs focus:border-emerald-500 focus:outline-none transition ${
                        isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition cursor-pointer hover:opacity-90"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6 max-w-xl">
                <div>
                  <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Security & Reset Password</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Keep your account secure by updating your password regularly.</p>
                </div>

                {passwordSuccess && (
                  <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-500 text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Password updated successfully!</span>
                  </div>
                )}

                {passwordError && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 text-xs">
                    {passwordError}
                  </div>
                )}

                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div>
                    <label className={`text-[11px] font-semibold block mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Current Password</label>
                    <input 
                      type="password"
                      placeholder="••••••••"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className={`w-full border rounded-xl p-3 text-xs focus:border-emerald-500 focus:outline-none transition ${
                        isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                      required
                    />
                  </div>

                  <div>
                    <label className={`text-[11px] font-semibold block mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>New Password</label>
                    <input 
                      type="password"
                      placeholder="At least 6 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className={`w-full border rounded-xl p-3 text-xs focus:border-emerald-500 focus:outline-none transition ${
                        isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                      required
                    />
                  </div>

                  <div>
                    <label className={`text-[11px] font-semibold block mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Confirm New Password</label>
                    <input 
                      type="password"
                      placeholder="Re-enter new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full border rounded-xl p-3 text-xs focus:border-emerald-500 focus:outline-none transition ${
                        isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition cursor-pointer hover:opacity-90"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6 max-w-xl">
                <div>
                  <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Notification Preferences</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Manage alert tones and preview settings.</p>
                </div>

                <div className="space-y-3">
                  <div className={`p-4 border rounded-2xl flex items-center justify-between ${
                    isDarkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div>
                      <h5 className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Message Sounds</h5>
                      <p className="text-[10px] text-slate-400">Play sound for incoming messages</p>
                    </div>
                    <input type="checkbox" defaultChecked className="accent-emerald-500 w-4 h-4 cursor-pointer" />
                  </div>

                  <div className={`p-4 border rounded-2xl flex items-center justify-between ${
                    isDarkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div>
                      <h5 className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Community Announcements</h5>
                      <p className="text-[10px] text-slate-400">Get alerts for community updates</p>
                    </div>
                    <input type="checkbox" defaultChecked className="accent-emerald-500 w-4 h-4 cursor-pointer" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6 max-w-xl">
                <div>
                  <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Theme & Appearance</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Choose between light and dark layout modes.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div 
                    onClick={() => { if (isDarkMode) toggleTheme(); }}
                    className={`p-4 rounded-2xl space-y-2 cursor-pointer transition shadow-lg border-2 ${
                      !isDarkMode ? 'bg-white border-emerald-500' : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Sun className="w-5 h-5 text-amber-500" />
                      {!isDarkMode && <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 text-xs font-bold">✓</div>}
                    </div>
                    <h5 className={`text-xs font-bold ${!isDarkMode ? 'text-slate-900' : 'text-white'}`}>Light Mode</h5>
                    <p className="text-[10px] text-slate-400">Clean bright interface look.</p>
                  </div>

                  <div 
                    onClick={() => { if (!isDarkMode) toggleTheme(); }}
                    className={`p-4 rounded-2xl space-y-2 cursor-pointer transition shadow-lg border-2 ${
                      isDarkMode ? 'bg-slate-950 border-emerald-500' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Moon className="w-5 h-5 text-emerald-500" />
                      {isDarkMode && <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 text-xs font-bold">✓</div>}
                    </div>
                    <h5 className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Cyber Emerald (Dark)</h5>
                    <p className="text-[10px] text-slate-400">Default deep dark theme with emerald highlights.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden shrink-0">
        <BottomNav />
      </div>

    </div>
  );
}

export default SettingsView;