import React from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Landing from './components/Landing'
import Signup from './auth/Signup'
import Login from './auth/Login'
import ChatDashboard from './components/ChatDashboard'
import ProfileModal from './components/ProfileModal'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing />}/>

        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}/>
        <Route path='/dashboard' element={<ChatDashboard />}/>
        <Route path='/profile' element={<ProfileModal />}/>
      </Routes>
    </div>
  )
}

export default App
