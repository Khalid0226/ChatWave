import React, { useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Landing from './components/Landing';
import Signup from './auth/Signup';
import Login from './auth/Login';
import ChatDashboard from './components/ChatDashboard';
import ProfileModal from './components/ProfileModal';
import StatusView from './components/StatusView';
import CommunityView from './components/CommunityView';
import SettingsView from './components/SettingsView';
import { useTheme } from './context/ThemeContext'; // <-- Theme hook import kiya
import ProtectedRoute from './components/ProtectedRoute';
import API from './services/Axios';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); // <-- yahan se isDarkMode state nikal li

  // Global user & app states taaki sabhi components me data share ho sake
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)


  const [statuses, setStatuses] = useState([
    { id: 1, name: 'Rahul Sharma', time: 'Today at 9:15 AM', avatar: 'RS' },
    { id: 2, name: 'Priya Verma', time: 'Yesterday at 8:45 PM', avatar: 'PV' }
  ]);

  // Communities initial state
  const [communities, setCommunities] = useState([
    {
      id: 1,
      name: 'Full-Stack Developers India',
      description: 'Discuss React, Next.js, Django & modern web stack.',
      members: '1.2k members',
      unread: 3,
      announcements: 'Welcome everyone! Please share your project updates here.'
    },
    {
      id: 2,
      name: 'Gully Cricket Hub',
      description: 'Weekend match updates, scores, and team planning.',
      members: '45 members',
      unread: 0,
      announcements: 'Match scheduled for this Sunday at 7 AM sharp!'
    }
  ]);

  const getAuthUser = async () => {
    try {
      const response = await API.get('/auth/me')

      setUser(response.data.user)
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    getAuthUser()
  }, [])

  if (loading) {
    return (
      <div className={`h-screen w-screen flex items-center justify-center ${isDarkMode ? 'bg-[#050811] text-emerald-400' : 'bg-slate-100 text-slate-800'} font-bold`}>
        Loading...
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-screen transition-colors duration-200 ${isDarkMode ? 'bg-[#050811] text-white' : 'bg-slate-100 text-slate-900'}`}>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login onSuccess={(userData) => setUser(userData)} />} />

        {/* Dashboard Route */}
        <Route
          path='/dashboard'
          element={<ProtectedRoute user={user}><ChatDashboard user={user} onLogout={() => setUser(null)} /></ProtectedRoute>}
        />

        {/* Profile Route with proper props and centering layout */}
        <Route
          path='/profile'
          element={
            <ProtectedRoute user={user}>
              <div className={`h-[100dvh] w-screen ${isDarkMode ? 'bg-[#050811]' : 'bg-slate-100'} flex justify-center items-center`}>
                <ProfileModal
                  user={user}
                  onClose={() => window.history.back()}
                  onUpdateProfile={(updatedData) => {
                    setUser(prev => ({ ...prev, ...updatedData }));
                  }}
                />
              </div>
            </ProtectedRoute>
          }
        />

        {/* Status Route with proper props */}
        <Route
          path='/status'
          element={
            <ProtectedRoute user={user}>
              <StatusView
                currentUser={user}
                statuses={statuses}
                onAddStatus={(newStatus) => setStatuses([newStatus, ...statuses])}
                onBack={() => window.history.back()}
              />
            </ProtectedRoute>
          }
        />

        {/* Community Route */}
        <Route
          path='/communities'
          element={
            <ProtectedRoute user={user}>
              <CommunityView
                communities={communities}
                onAddCommunity={(newComm) => setCommunities([newComm, ...communities])}
                onBack={() => window.history.back()}
              />
            </ProtectedRoute>
          }
        />

        {/* Settings Route with Password Reset Support */}
        <Route
          path='/settings'
          element={
            <ProtectedRoute user={user}>
              <SettingsView
                user={user}
                onUpdateUser={(updatedData) => {
                  setUser(prev => ({ ...prev, ...updatedData }));
                }}
                onLogout={() => {
                  setUser(null);
                  navigate('/login');
                }}
                onBack={() => window.history.back()}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;