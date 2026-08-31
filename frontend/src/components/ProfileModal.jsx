import React, { useState, useEffect } from 'react';
import { ArrowLeft, Camera, Edit2, Check, Phone, Bell, Lock, HelpCircle } from 'lucide-react';
import BottomNav from './BottomNav';
import { useTheme } from '../context/ThemeContext';
import API from '../services/Axios';

function ProfileModal({ user, onClose, onUpdateProfile }) {
  const { isDarkMode } = useTheme();

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  const [name, setName] = useState(user?.name || 'Pintu Kumar');
  const [about, setAbout] = useState(user?.about || 'Full-stack MERN Developer & Tech Enthusiast 🚀');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');

  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user?.avatar || '');
  const [loading, setLoading] = useState(false);

  // Parent ya user prop change hone par local state ko sync karne ke liye
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setAbout(user.about || '');
      setPhone(user.phone || '');
      if (user.avatar) {
        setAvatar(user.avatar);
        setPreviewUrl(user.avatar);
      }
    }
  }, [user]);

  // File select hone par preview aur state update karne ke liye
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Instant preview ke liye
    }
  };

  const updateProfile = async (updatedFields) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('name', updatedFields.name !== undefined ? updatedFields.name : name);
      formData.append('about', updatedFields.about !== undefined ? updatedFields.about : about);
      formData.append('phone', updatedFields.phone !== undefined ? updatedFields.phone : phone);

      if (selectedFile) {
        formData.append('profilePic', selectedFile);
      }

      const response = await API.put('/update-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Backend se jo updated user object aaya hai
      const updatedUser = response.data.updateUser || response.data.user;

      if (updatedUser) {
        if (updatedUser.avatar) {
          setPreviewUrl(updatedUser.avatar);
          setAvatar(updatedUser.avatar);
        }
      }

      if (onUpdateProfile) {
        onUpdateProfile(updatedUser); // Parent component ko naya user data bhejein
      }

      if (response.status === 200) {
        alert(response.data.message || 'Profile updated successfully!');
        setSelectedFile(null); // File reset karein
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Failed to update profile!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`h-[100dvh] w-screen flex flex-col justify-between overflow-hidden relative selection:bg-emerald-500 selection:text-slate-950 transition-colors duration-300 ${isDarkMode ? 'bg-[#050811] text-white' : 'bg-slate-50 text-slate-900'
      }`}>

      {/* Centered Modal Content Area */}
      <div className="flex-1 flex items-center justify-center p-0 md:p-6 overflow-hidden">

        {/* Main Card Container */}
        <div className={`w-full h-full md:h-[88vh] md:max-w-2xl md:border md:rounded-2xl flex flex-col shadow-2xl overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>

          {/* Header */}
          <div className={`h-16 px-4 md:px-6 flex items-center gap-4 border-b shrink-0 backdrop-blur-xl transition-colors duration-300 ${isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200'
            }`}>
            <button
              onClick={onClose}
              className={`hidden md:flex p-2 rounded-xl transition cursor-pointer items-center justify-center ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              title="Go Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h3 className="text-sm font-bold tracking-tight text-emerald-500">Profile</h3>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto space-y-4 pb-20 md:pb-6 custom-scrollbar">

            {/* Avatar Section */}
            <div className={`flex flex-col items-center py-6 border-b transition-colors duration-300 ${isDarkMode ? 'bg-slate-950/30 border-slate-800/60' : 'bg-slate-50/50 border-slate-200'
              }`}>
              <div className="relative group">
                <div className="w-28 h-28 rounded-full overflow-hidden bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-3xl shadow-xl shadow-emerald-500/20">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    name.charAt(0).toUpperCase()
                  )}
                </div>
                <label className="absolute inset-0 bg-slate-950/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer text-white text-[10px] font-semibold tracking-wider">
                  <Camera className="w-5 h-5 mb-1" />
                  CHANGE PHOTO
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              </div>
              {selectedFile && (
                <button
                  onClick={() => updateProfile({ name, about, phone })}
                  disabled={loading}
                  className="mt-3 px-4 py-1.5 bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg shadow-md hover:bg-emerald-600 transition"
                >
                  {loading ? 'Uploading...' : 'Upload New Photo'}
                </button>
              )}
            </div>

            {/* Name Section */}
            <div className={`px-6 py-4 border-y transition-colors duration-300 ${isDarkMode ? 'bg-slate-950/40 border-slate-800/60' : 'bg-slate-50/60 border-slate-200'
              }`}>
              <p className="text-[11px] font-semibold text-emerald-500 uppercase tracking-wider mb-1">Your name</p>
              <div className="flex items-center justify-between">
                {isEditingName ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full border border-emerald-500 rounded-lg px-3 py-1.5 text-xs focus:outline-none ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900 shadow-sm'
                      }`}
                    autoFocus
                  />
                ) : (
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{name}</span>
                )}

                <button
                  onClick={() => {
                    if (isEditingName) {
                      updateProfile({ name });
                    }
                    setIsEditingName(!isEditingName);
                  }}
                  className="p-2 text-slate-400 hover:text-emerald-500 transition cursor-pointer ml-2 shrink-0"
                >
                  {isEditingName ? <Check className="w-4 h-4 text-emerald-500" /> : <Edit2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* About Section */}
            <div className={`px-6 py-4 border-y transition-colors duration-300 ${isDarkMode ? 'bg-slate-950/40 border-slate-800/60' : 'bg-slate-50/60 border-slate-200'
              }`}>
              <p className="text-[11px] font-semibold text-emerald-500 uppercase tracking-wider mb-1">About</p>
              <div className="flex items-center justify-between">
                {isEditingAbout ? (
                  <input
                    type="text"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className={`w-full border border-emerald-500 rounded-lg px-3 py-1.5 text-xs focus:outline-none ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900 shadow-sm'
                      }`}
                    autoFocus
                  />
                ) : (
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{about}</span>
                )}

                <button
                  onClick={() => {
                    if (isEditingAbout) {
                      updateProfile({ about });
                    }
                    setIsEditingAbout(!isEditingAbout);
                  }}
                  className="p-2 text-slate-400 hover:text-emerald-500 transition cursor-pointer ml-2 shrink-0"
                >
                  {isEditingAbout ? <Check className="w-4 h-4 text-emerald-500" /> : <Edit2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Phone Section */}
            <div className={`px-6 py-4 border-y transition-colors duration-300 ${isDarkMode ? 'bg-slate-950/40 border-slate-800/60' : 'bg-slate-50/60 border-slate-200'
              }`}>
              <p className="text-[11px] font-semibold text-emerald-500 uppercase tracking-wider mb-1">Phone</p>
              <div className="flex items-center justify-between">
                {isEditingPhone ? (
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full border border-emerald-500 rounded-lg px-3 py-1.5 text-xs focus:outline-none ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900 shadow-sm'
                      }`}
                    autoFocus
                  />
                ) : (
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{phone}</span>
                )}

                <div className="flex items-center gap-2 ml-2 shrink-0">
                  <button
                    onClick={() => {
                      if (isEditingPhone) {
                        updateProfile({ phone });
                      }
                      setIsEditingPhone(!isEditingPhone);
                    }}
                    disabled={loading}
                    className="p-2 text-slate-400 hover:text-emerald-500 transition cursor-pointer"
                  >
                    {isEditingPhone ? <Check className="w-4 h-4 text-emerald-500" /> : <Edit2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Overall Update / Save Profile Button */}
            <div className="px-6 pt-2">
              <button
                onClick={() => updateProfile({ name, about, phone })}
                disabled={loading}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl transition shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Updating Profile...' : 'Save All Changes'}
              </button>
            </div>

            {/* Settings Options */}
            <div className="px-4 space-y-1 pt-2">
              <div className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition text-xs ${isDarkMode ? 'text-slate-300 hover:bg-slate-800/40' : 'text-slate-700 hover:bg-slate-100'
                }`}>
                <Bell className="w-4 h-4 text-slate-400" />
                <span>Notifications</span>
              </div>
              <div className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition text-xs ${isDarkMode ? 'text-slate-300 hover:bg-slate-800/40' : 'text-slate-700 hover:bg-slate-100'
                }`}>
                <Lock className="w-4 h-4 text-slate-400" />
                <span>Privacy & Security</span>
              </div>
              <div className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition text-xs ${isDarkMode ? 'text-slate-300 hover:bg-slate-800/40' : 'text-slate-700 hover:bg-slate-100'
                }`}>
                <HelpCircle className="w-4 h-4 text-slate-400" />
                <span>Help & Support</span>
              </div>
            </div>

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

export default ProfileModal;