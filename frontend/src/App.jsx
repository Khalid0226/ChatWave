import React, { useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Landing from './components/Landing';
import Signup from './auth/Signup';
import Login from './auth/Login';
import ChatDashboard from './components/ChatDashboard';
import ProfileModal from './components/ProfileModal';
import StatusView from './components/StatusView';

function App() {
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
      </Routes>
    </div>
  );
}

export default App;