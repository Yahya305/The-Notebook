import React,{useEffect,useContext} from 'react';
import { NavLink } from "react-router-dom";
import { AuthContext } from '../App';



export default function NavBar() {

  const token = useContext(AuthContext);
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

  const handleLogout = () =>{
    localStorage.removeItem("token");
    token.updateToken();
  }
  
  return (
    <>
    <div id='navbar' className='navbar'>
      {/* <img className='bloglogo' src='150xpic.png' alt='unavailable'></img>  */}
      <img className='bloglogo' src='NBicn.ico' alt='unavailable'></img> 
      {/* <div className='bloglogo'>Title</div>*/}
      <ul className='navbtns'>
        {token.token?<>
        <NavLink to={"/"} style={({isActive})=>isActive? {color:"rgb(43,237,37)"}:null} aria-current="page" href="/" className='navitem'>
            Home
        </NavLink><NavLink to={"/notifications"} style={({isActive})=>isActive? {color:"rgb(43,237,37)"}:null} aria-current="page" href="/" className='navitem'>
            Notifications
        </NavLink><NavLink to={"/about"} style={({isActive})=>isActive? {color:"rgb(43,237,37)"}:null} aria-current="page" href="/" className='navitem' >
            About
        </NavLink>
        <NavLink to={"/imagelab"} style={({isActive})=>isActive? {color:"rgb(43,237,37)"}:null} aria-current="page" href="/" className='navitem'>
            Image Lab
        </NavLink>
          <NavLink onClick={handleLogout} to={"/login"} style={({isActive})=>isActive? {color:"rgb(43,237,37)"}:null} aria-current="page" href="/" className='navitem'>Logout</NavLink>
        </>
        :
        <><NavLink to={"/login"} style={({isActive})=>isActive? {color:"rgb(43,237,37)"}:null} aria-current="page" href="/" className='navitem'>Login</NavLink>
        <NavLink to={"/signup"} style={({isActive})=>isActive? {color:"rgb(43,237,37)"}:null} aria-current="page" href="/" className='navitem'>Signup</NavLink></>
        }
      </ul>
    </div>
    </>
  )
}
