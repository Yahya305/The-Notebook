import React,{useEffect} from 'react';
import { NavLink } from "react-router-dom";


export default function NavBar() {

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function handleScroll() {
    const navbar=document.getElementById("navbar")
    if (window.pageYOffset > 40) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
  }
  
  return (
    <>
    <div id='navbar' className='navbar'>
      {/* <img className='bloglogo' src='150xpic.png' alt='unavailable'></img>  */}
      <img className='bloglogo' src='NBicn.ico' alt='unavailable'></img> 
      {/* <div className='bloglogo'>Title</div>*/}
      <ul className='navbtns'>
        <NavLink to={"/"} style={({isActive})=>isActive? {color:"rgb(43,237,37)"}:null} aria-current="page" href="/" className='navitem'>
            Home
        </NavLink><NavLink to={"/notifications"} style={({isActive})=>isActive? {color:"rgb(43,237,37)"}:null} aria-current="page" href="/" className='navitem'>
            Notifications
        </NavLink><NavLink to={"/about"} style={({isActive})=>isActive? {color:"rgb(43,237,37)"}:null} aria-current="page" href="/" className='navitem' >
            About
        </NavLink><NavLink to={"/imagelab"} style={({isActive})=>isActive? {color:"rgb(43,237,37)"}:null} aria-current="page" href="/" className='navitem'>
            Image Lab
        </NavLink>
      </ul>
    </div>
    </>
  )
}
