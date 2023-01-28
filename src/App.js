import "./App.css";
import React from "react";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Notifications from "./components/Notifications";
import About from "./components/About";
import Errorpage from "./components/Errorpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Imagelab from "./components/Imagelab";


// import {useState} from 'react';
// used rfce
function App() {
  // const [mode, setMode] = useState('light');
  // const toggleButton= ()=>{
  //   // console.log(mode);
  //   if (mode==='light') {
  //     setMode('dark')
  //   } else {
  //     setMode('light')
  //   }
  // }
  
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notifications" element={<Notifications />} strict={true} sensitive={true} >
          <Route path="/notifications/friends" element={<div>Sup! boii</div>} />
          <Route path="/notifications/fam" element={<div>we are fam</div>} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/imagelab" element={<Imagelab />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
