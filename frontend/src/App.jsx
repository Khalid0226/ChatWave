import React from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Landing from './components/Landing'
import Signup from './auth/Signup'
import Login from './auth/Login'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing />}/>

        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </div>
  )
}

export default App
