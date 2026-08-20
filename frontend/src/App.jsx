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
import SettingsView from './components/SettingsView'; // <-- SettingsView Import kiya

function App() {
  const navigate = useNavigate();

  // Global user & app states taaki sabhi components me data share ho sake
  const [user, setUser] = useState({
    name: 'Pintu Kumar',
    about: 'Full-stack MERN Developer & Tech Enthusiast 🚀',
    phone: '+91 98765 43210'
  });

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

  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />

        {/* Dashboard Route */}
        <Route
          path='/dashboard'
          element={<ChatDashboard user={user} onLogout={() => setUser(null)} />}
        />

        {/* Profile Route with proper props and centering layout */}
        <Route
          path='/profile'
          element={
            <div className="h-[100dvh] w-screen bg-[#050811] flex justify-center items-center">
              <ProfileModal
                user={user}
                onClose={() => window.history.back()}
                onUpdateProfile={(updatedData) => {
                  setUser(prev => ({ ...prev, ...updatedData }));
                }}
              />
            </div>
          }
        />

        {/* Status Route with proper props */}
        <Route
          path='/status'
          element={
            <StatusView
              currentUser={user}
              statuses={statuses}
              onAddStatus={(newStatus) => setStatuses([newStatus, ...statuses])}
              onBack={() => window.history.back()}
            />
          }
        />

        {/* Community Route */}
        <Route
          path='/communities'
          element={
            <CommunityView
              communities={communities}
              onAddCommunity={(newComm) => setCommunities([newComm, ...communities])}
              onBack={() => window.history.back()}
            />
          }
        />

        {/* Settings Route with Password Reset Support */}
        <Route
          path='/settings'
          element={
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
          }
        />
      </Routes>
    </div>
  );
}

export default App;