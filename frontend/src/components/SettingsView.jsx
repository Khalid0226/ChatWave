import React, { useState, useEffect } from 'react';
import { User, Lock, Bell, Moon, LogOut, ArrowLeft, ChevronRight } from 'lucide-react';
import BottomNav from './BottomNav';
import { useTheme } from '../context/ThemeContext';

// Import sub-tabs
import ProfileTab from './settings/ProfileTab';
import SecurityTab from './settings/SecurityTab';
import NotificationsTab from './settings/NotificationsTab';
import AppearanceTab from './settings/AppearanceTab';

function SettingsView({ user, onUpdateUser, onLogout, onBack }) {
  const [activeTab, setActiveTab] = useState('account');
  const [mobileSubView, setMobileSubView] = useState('main');
  const { isDarkMode, toggleTheme } = useTheme();

  // Profile Form State
  const [name, setName] = useState(user?.name || '');
  const [about, setAbout] = useState(user?.about || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [profileSuccess, setProfileSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setAbout(user.about || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  // Password Reset State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (onUpdateUser) onUpdateUser({ name, about, phone });
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

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
    <div className={`h-[100dvh] w-screen flex flex-col justify-between overflow-hidden relative transition-colors duration-300 ${
      isDarkMode ? 'bg-[#050811] text-white' : 'bg-slate-100 text-slate-900'
    }`}>
      
      {/* Mobile View */}
      <div className="flex md:hidden flex-col h-full w-full overflow-hidden">
        <div className={`h-16 px-4 flex items-center justify-between border-b backdrop-blur-xl shrink-0 z-10 ${
          isDarkMode ? 'border-slate-800 bg-slate-950/80' : 'border-slate-200 bg-white/80'
        }`}>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => mobileSubView !== 'main' ? setMobileSubView('main') : onBack()}
              className={`p-2 rounded-xl transition cursor-pointer ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
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

        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
          {mobileSubView === 'main' && (
            <div className="space-y-4">
              <div 
                onClick={() => setMobileSubView('profile')}
                className={`border rounded-2xl p-4 flex items-center gap-4 cursor-pointer ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 font-bold text-lg">
                  {name ? name.charAt(0) : 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`text-xs font-bold truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{name || 'User'}</h4>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">{about || 'Hey there!'}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              <div className={`border rounded-2xl overflow-hidden divide-y ${isDarkMode ? 'bg-slate-900/50 border-slate-800 divide-slate-800' : 'bg-white border-slate-200 divide-slate-100'}`}>
                <div onClick={() => setMobileSubView('profile')} className="p-4 flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3"><User className="w-4 h-4 text-emerald-500" /><span className="text-xs font-bold">Account</span></div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
                <div onClick={() => setMobileSubView('password')} className="p-4 flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3"><Lock className="w-4 h-4 text-teal-500" /><span className="text-xs font-bold">Security & Password</span></div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
                <div onClick={() => setMobileSubView('notifications')} className="p-4 flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3"><Bell className="w-4 h-4 text-blue-500" /><span className="text-xs font-bold">Notifications</span></div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
                <div onClick={() => setMobileSubView('appearance')} className="p-4 flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3"><Moon className="w-4 h-4 text-purple-500" /><span className="text-xs font-bold">Appearance</span></div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              <button onClick={onLogout} className="w-full bg-rose-500/10 border border-rose-500/20 text-rose-500 p-3.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer">
                <LogOut className="w-4 h-4" /> Log Out
              </button>
            </div>
          )}

          {mobileSubView === 'profile' && (
            <ProfileTab {...{ name, about, phone, setName, setAbout, setPhone, profileSuccess, handleSaveProfile, isDarkMode }} />
          )}
          {mobileSubView === 'password' && (
            <SecurityTab {...{ currentPassword, setCurrentPassword, newPassword, setNewPassword, confirmPassword, setConfirmPassword, passwordError, passwordSuccess, handleResetPassword, isDarkMode }} />
          )}
          {mobileSubView === 'notifications' && <NotificationsTab isDarkMode={isDarkMode} />}
          {mobileSubView === 'appearance' && <AppearanceTab isDarkMode={isDarkMode} toggleTheme={toggleTheme} />}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex flex-1 items-center justify-center p-6 overflow-hidden">
        <div className={`w-full h-[88vh] max-w-4xl border rounded-2xl flex flex-row shadow-2xl overflow-hidden ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          
          <div className={`w-72 border-r flex flex-col shrink-0 ${isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className={`h-16 px-6 flex items-center justify-between border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
              <div className="flex items-center gap-3">
                <button onClick={onBack} className={`p-2 rounded-xl cursor-pointer ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}><ArrowLeft className="w-5 h-5" /></button>
                <h3 className="text-sm font-bold text-emerald-500">Settings</h3>
              </div>
            </div>

            <div className="flex flex-col p-4 gap-1.5">
              <button 
                onClick={() => setActiveTab('account')} 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold cursor-pointer transition ${
                  activeTab === 'account' 
                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                    : isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <User className="w-4 h-4" /> Account & Profile
              </button>
              
              <button 
                onClick={() => setActiveTab('security')} 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold cursor-pointer transition ${
                  activeTab === 'security' 
                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                    : isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Lock className="w-4 h-4" /> Security & Password
              </button>
              
              <button 
                onClick={() => setActiveTab('notifications')} 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold cursor-pointer transition ${
                  activeTab === 'notifications' 
                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                    : isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Bell className="w-4 h-4" /> Notifications
              </button>
              
              <button 
                onClick={() => setActiveTab('appearance')} 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold cursor-pointer transition ${
                  activeTab === 'appearance' 
                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                    : isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Moon className="w-4 h-4" /> Appearance
              </button>

              <div className={`my-2 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}></div>
              
              <button onClick={onLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 cursor-pointer transition">
                <LogOut className="w-4 h-4" /> Log Out
              </button>
            </div>
          </div>

          <div className={`flex-1 overflow-y-auto p-8 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
            {activeTab === 'account' && <ProfileTab {...{ name, about, phone, setName, setAbout, setPhone, profileSuccess, handleSaveProfile, isDarkMode }} />}
            {activeTab === 'security' && <SecurityTab {...{ currentPassword, setCurrentPassword, newPassword, setNewPassword, confirmPassword, setConfirmPassword, passwordError, passwordSuccess, handleResetPassword, isDarkMode }} />}
            {activeTab === 'notifications' && <NotificationsTab isDarkMode={isDarkMode} />}
            {activeTab === 'appearance' && <AppearanceTab isDarkMode={isDarkMode} toggleTheme={toggleTheme} />}
          </div>

        </div>
      </div>

      <div className="md:hidden shrink-0"><BottomNav /></div>
    </div>
  );
}

export default SettingsView;