import React, {useState,useEffect} from 'react'
import ImageContainer from './ImageContainer'
import SearchBar from './SearchBar'

function Home(props) {
  const [data, setdata] = useState({});

  useEffect(() => {
    fetch("http://127.0.0.1:5000/quotes").then(
      res => res.json()
    ).then(
      f => setdata(f)
    )
  },[]);

  // usestate for setting a javascript
    // object for storing and using data
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
  
  return (
    <>
    <div className='navcontent'>
      <span className='navquote'>
        <h1 id='title'>The Notebook</h1>
        <div><h4 className='quote'>{data.quote}</h4></div>
        <div className='author'>---By {data.author}</div>
        <SearchBar></SearchBar>
      </span>
      <img className='navimg' src='navbar image2.jpg' alt='unavailable'></img>
    </div>
      <ImageContainer/>
      
    </>
  )
}

export default Home
