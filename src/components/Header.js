import React, { useState, useEffect } from 'react';
import SearchBar from "./SearchBar";


function Header() {
    const [data, setdata] = useState({});

    useEffect(()=>{
        fetch("http://localhost:5000/api/randomquote")
      .then((res) => res.json())
      .then((f) => setdata(f));
    },[])

  return (
    <div className="navcontent">
        <span className="navquote">
          <h1 id="title">The Notebook</h1>
          <div>
            <h4 className="quote">{data.quote}</h4>
          </div>
          <div className="navcontent__author">---By {data.author}</div>
          <SearchBar></SearchBar>
        </span>
        <img className="navcontent__img" src="navbar image2.jpg" alt="unavailable"></img>
      </div>
  )
}

export default Header
