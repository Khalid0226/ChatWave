import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  Moon, 
  LogOut, 
  ArrowLeft, 
  Key, 
  CheckCircle2, 
  ChevronRight,
  Shield,
  HelpCircle
} from 'lucide-react';
import BottomNav from './BottomNav';

function SettingsView({ user, onUpdateUser, onLogout, onBack }) {
  // Active settings tab state ('account', 'security', 'notifications', 'appearance')
  const [activeTab, setActiveTab] = useState('account');

  // Mobile specific view sub-state for WhatsApp-style navigation ('main', 'profile', 'password', 'notifications', 'appearance')
  const [mobileSubView, setMobileSubView] = useState('main');

  // Profile Form State
  const [name, setName] = useState(user?.name || '');
  const [about, setAbout] = useState(user?.about || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [profileSuccess, setProfileSuccess] = useState(false);

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
    <div className="h-[100dvh] w-screen bg-[#050811] text-white flex flex-col justify-between overflow-hidden relative selection:bg-emerald-500 selection:text-slate-950">
      
      {/* 📱 MOBILE VIEW: WhatsApp Style List Navigation */}
      <div className="flex md:hidden flex-col h-full w-full overflow-hidden">
        
        {/* Mobile Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl shrink-0 z-10">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                if (mobileSubView !== 'main') {
                  setMobileSubView('main');
                } else {
                  onBack();
                }
              }}
              className="p-2 text-slate-400 hover:text-white rounded-xl transition cursor-pointer flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h3 className="text-sm font-bold tracking-tight text-emerald-400">
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
          
          {/* MAIN SETTINGS LIST (WhatsApp Style) */}
          {mobileSubView === 'main' && (
            <div className="space-y-4 animate-fadeIn">
              
              {/* Profile Card Banner */}
              <div 
                onClick={() => setMobileSubView('profile')}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 cursor-pointer active:scale-98 transition shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 font-bold text-lg shadow-md shrink-0">
                  {name ? name.charAt(0) : 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{name || 'Pintu Kumar'}</h4>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">{about || 'Hey there! I am using ChatWave.'}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
              </div>

              {/* Options List Group */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-800/60">
                <div 
                  onClick={() => setMobileSubView('profile')}
                  className="p-4 flex items-center justify-between cursor-pointer active:bg-slate-800/40 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-200">Account</h5>
                      <p className="text-[10px] text-slate-400">Privacy, security, change name</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </div>

                <div 
                  onClick={() => setMobileSubView('password')}
                  className="p-4 flex items-center justify-between cursor-pointer active:bg-slate-800/40 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-200">Security & Password</h5>
                      <p className="text-[10px] text-slate-400">Password management & updates</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </div>

                <div 
                  onClick={() => setMobileSubView('notifications')}
                  className="p-4 flex items-center justify-between cursor-pointer active:bg-slate-800/40 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-200">Notifications</h5>
                      <p className="text-[10px] text-slate-400">Message tones & alerts</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </div>

                <div 
                  onClick={() => setMobileSubView('appearance')}
                  className="p-4 flex items-center justify-between cursor-pointer active:bg-slate-800/40 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                      <Moon className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-200">Appearance</h5>
                      <p className="text-[10px] text-slate-400">Theme & interface style</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="w-full bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 p-3.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" /> Log Out
              </button>

            </div>
          )}

          {/* MOBILE SUB-VIEW: ACCOUNT & PROFILE */}
          {mobileSubView === 'profile' && (
            <div className="space-y-4 animate-fadeIn">
              {profileSuccess && (
                <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Profile updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-4 bg-slate-900/50 border border-slate-800 p-4 rounded-2xl">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">Full Name</label>
                  <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-emerald-500 focus:outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">About Bio</label>
                  <input 
                    type="text"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-emerald-500 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">Phone Number</label>
                  <input 
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-emerald-500 focus:outline-none transition"
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
                <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Password updated successfully!</span>
                </div>
              )}

              {passwordError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs">
                  {passwordError}
                </div>
              )}

              <form onSubmit={handleResetPassword} className="space-y-4 bg-slate-900/50 border border-slate-800 p-4 rounded-2xl">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">Current Password</label>
                  <input 
                    type="password"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-emerald-500 focus:outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">New Password</label>
                  <input 
                    type="password"
                    placeholder="At least 6 chars"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-emerald-500 focus:outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">Confirm New Password</label>
                  <input 
                    type="password"
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-emerald-500 focus:outline-none transition"
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
            <div className="space-y-3 animate-fadeIn bg-slate-900/50 border border-slate-800 p-4 rounded-2xl">
              <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
                <div>
                  <h5 className="text-xs font-bold text-white">Message Sounds</h5>
                  <p className="text-[10px] text-slate-400">Play sound for incoming messages</p>
                </div>
                <input type="checkbox" defaultChecked className="accent-emerald-500 w-4 h-4 cursor-pointer" />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <h5 className="text-xs font-bold text-white">Community Alerts</h5>
                  <p className="text-[10px] text-slate-400">Get updates for groups</p>
                </div>
                <input type="checkbox" defaultChecked className="accent-emerald-500 w-4 h-4 cursor-pointer" />
              </div>
            </div>
          )}

          {/* MOBILE SUB-VIEW: APPEARANCE */}
          {mobileSubView === 'appearance' && (
            <div className="space-y-3 animate-fadeIn bg-slate-900/50 border border-slate-800 p-4 rounded-2xl">
              <div className="p-3 bg-slate-950 border-2 border-emerald-500 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-emerald-400">Active Theme</span>
                <h5 className="text-xs font-bold text-white">Cyber Emerald (Dark)</h5>
              </div>
            </div>
          )}

        </div>

      </div>


      {/* 💻 DESKTOP VIEW: Sidebar Layout (Aapka Pasandida Design) */}
      <div className="hidden md:flex flex-1 items-center justify-center p-6 overflow-hidden">
        <div className="w-full h-[88vh] max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl flex flex-row shadow-2xl overflow-hidden relative">
          
          {/* Left Sidebar */}
          <div className="w-72 bg-slate-950/80 border-r border-slate-800 flex flex-col shrink-0">
            <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <button 
                  onClick={onBack}
                  className="flex p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/50 transition cursor-pointer items-center justify-center"
                  title="Go Back"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h3 className="text-sm font-bold tracking-tight text-emerald-400">Settings</h3>
              </div>
            </div>

            <div className="flex flex-col p-4 gap-1.5 overflow-y-auto">
              <button
                onClick={() => setActiveTab('account')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'account' 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                }`}
              >
                <User className="w-4 h-4 shrink-0" />
                <span>Account & Profile</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'security' 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                }`}
              >
                <Lock className="w-4 h-4 shrink-0" />
                <span>Security & Password</span>
              </button>

              <button
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'notifications' 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                }`}
              >
                <Bell className="w-4 h-4 shrink-0" />
                <span>Notifications</span>
              </button>

              <button
                onClick={() => setActiveTab('appearance')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'appearance' 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                }`}
              >
                <Moon className="w-4 h-4 shrink-0" />
                <span>Appearance</span>
              </button>

              <div className="my-2 border-t border-slate-800/80"></div>

              <button
                onClick={onLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span>Log Out</span>
              </button>
            </div>
          </div>

          {/* Right Content Area (Desktop) */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-900">
            {activeTab === 'account' && (
              <div className="space-y-6 max-w-xl">
                <div>
                  <h4 className="text-sm font-bold text-white">Account Information</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Update your personal details visible to others.</p>
                </div>

                {profileSuccess && (
                  <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs">
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
                      <h5 className="text-xs font-bold text-white">{name}</h5>
                      <span className="text-[10px] text-emerald-400">Active Account</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Full Name</label>
                    <input 
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-emerald-500 focus:outline-none transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">About Bio</label>
                    <input 
                      type="text"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-emerald-500 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Phone Number</label>
                    <input 
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-emerald-500 focus:outline-none transition"
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
                  <h4 className="text-sm font-bold text-white">Security & Reset Password</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Keep your account secure by updating your password regularly.</p>
                </div>

                {passwordSuccess && (
                  <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Password updated successfully!</span>
                  </div>
                )}

                {passwordError && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs">
                    {passwordError}
                  </div>
                )}

                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Current Password</label>
                    <input 
                      type="password"
                      placeholder="••••••••"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-emerald-500 focus:outline-none transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">New Password</label>
                    <input 
                      type="password"
                      placeholder="At least 6 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-emerald-500 focus:outline-none transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Confirm New Password</label>
                    <input 
                      type="password"
                      placeholder="Re-enter new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-emerald-500 focus:outline-none transition"
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
                  <h4 className="text-sm font-bold text-white">Notification Preferences</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Manage alert tones and preview settings.</p>
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-2xl flex items-center justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-white">Message Sounds</h5>
                      <p className="text-[10px] text-slate-400">Play sound for incoming messages</p>
                    </div>
                    <input type="checkbox" defaultChecked className="accent-emerald-500 w-4 h-4 cursor-pointer" />
                  </div>

                  <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-2xl flex items-center justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-white">Community Announcements</h5>
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
                  <h4 className="text-sm font-bold text-white">Theme & Appearance</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Customize how the app looks on your screen.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-950 border-2 border-emerald-500 rounded-2xl space-y-2 cursor-pointer shadow-lg">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 text-xs font-bold">✓</div>
                    <h5 className="text-xs font-bold text-white">Cyber Emerald (Dark)</h5>
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