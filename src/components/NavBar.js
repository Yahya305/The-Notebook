import React from 'react';
import { NavLink } from "react-router-dom";


export default function NavBar() {
  
  return (
    <>
    <div className='navbar'>
      <img className='bloglogo' src='150xpic.png' alt='unavailable'></img> 
      {/* <div className='bloglogo'>Title</div>*/}
      <ul className='navbtns'>
        <NavLink to={"/"} aria-current="page" href="/" className='navitem'>
            Home
        </NavLink><NavLink to={"/notifications"} aria-current="page" href="/" className='navitem'>
            Notifications
        </NavLink><NavLink to={"/about"} aria-current="page" href="/" className='navitem' >
            About
        </NavLink><NavLink to={"/notifications"} aria-current="page" href="/" className='navitem'>
            Image Lab
        </NavLink>
      </ul>
    </div>
    </>
  )
}
