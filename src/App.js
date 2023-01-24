import logo from './logo.svg';
import './App.css';

import PropTypes from 'prop-types'
import React from 'react'
import NavBar from './components/NavBar';
import Home from './components/Home'
import Notifications from './components/Notifications'
import Profile from './components/SearchBox'
import Contact from './components/Contact'
import About from './components/About'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {useState} from 'react';

// used rfce
function App() {
  const [mode, setMode] = useState('light');

  const toggleButton= ()=>{
    // console.log(mode);
    if (mode==='light') {
      setMode('dark')
    } else {
      setMode('light')      
    }
  }
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<Home mode={mode}/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/notifications' element={<Notifications/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App


