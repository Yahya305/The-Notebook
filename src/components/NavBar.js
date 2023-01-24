import React, {useState,useEffect} from 'react'
import SearchBar from './SearchBar';
// import logo from './logo512.png'

export default function NavBar() {
  // usestate for setting a javascript
    // object for storing and using data
    const [data, setdata] = useState({});
    // let quote;
    // let p=fetch("http://localhost:5000/data");
    // p.then(
    //   res => res.json()
    // ).then(
    //   // data=>setdata(data)
    //   quote=data
    // )
    // console.log(quote)

  // Using useEffect for single rendering
  // http://localhost:5000/data
  useEffect(() => {
    fetch("http://127.0.0.1:5000/quotes").then(
      res => res.json()
    ).then(
      f => setdata(f)
    )
  },[]);
  
  return (
    <>
    <div className='navbar'>
      <img className='bloglogo' src='150xpic.png' alt='unavailable'></img> 
      {/* <div className='bloglogo'>Title</div>      */}
      <ul className='navbtns'>
        <li className='navitem'>
            Home
        </li><li className='navitem'>
            Subcriptions
        </li><li className='navitem' >
            About
        </li><li className='navitem'>
            Notifications
        </li>
      </ul>
    </div>
    <div className='navcontent'>
      <span className='navquote'>
        <h1 id='title'>The Notebook</h1>
        <div><h4 className='quote'>{data.quote}</h4></div>
        <div className='author'>---By {data.author}</div>
        <SearchBar></SearchBar>
      </span>
      <img className='navimg' src='navbar image2.jpg' alt='unavailable'></img>
    </div>
    </>
  )
}
