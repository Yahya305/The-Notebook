import "../styles/Blog_cards.css";
import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

function Home(props) {
  const [data, setdata] = useState({});
  const [blogs, setBlogs] = useState();
  const [blogLimit, setBlogLimit] = useState(12);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/quotes")
      .then((res) => res.json())
      .then((f) => setdata(f));

    fetch("http://127.0.0.1:5000/blogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "MY_TOKEN",
        "User-Agent": "The-NoteBook",
        from: "0",
        to: "12",
      },
    })
      .then((res) => res.json())
      .then((f) => setBlogs(f));
  }, []);

  const getNext = () => {
    setBlogLimit(blogLimit + 12);
    fetch("http://127.0.0.1:5000/blogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "MY_TOKEN",
        "User-Agent": "Your-App-Name",
        from: `${blogLimit}`,
        to: `${blogLimit + 12}`,
      },
    })
      .then((res) => res.json())
      .then((f) => setBlogs(f));
  };

  const getPrev = () => {
    setBlogLimit(blogLimit - 12);
    fetch("http://127.0.0.1:5000/blogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "MY_TOKEN",
        "User-Agent": "Your-App-Name",
        from: `${blogLimit - 24}`,
        to: `${blogLimit - 12}`,
      },
    })
      .then((res) => res.json())
      .then((f) => setBlogs(f));
  };
  // console.log(blogs)
  // const arr=[1,2,5,7,3,9,4]
  // console.log(typeof arr)
  // console.log(arr.map((i)=>{return i*2}))

  // console.log(Array.from(blogs))
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
      <div className="navcontent">
        <span className="navquote">
          <h1 id="title">The Notebook</h1>
          <div>
            <h4 className="quote">{data.quote}</h4>
          </div>
          <div className="author">---By {data.author}</div>
          <SearchBar></SearchBar>
        </span>
        <img className="navimg" src="navbar image2.jpg" alt="unavailable"></img>
      </div>
      <h2>
        <center>Popular Blogs</center>
      </h2>
      <div className="blogs">
        {blogs
          ? blogs.map((blg) => {
              return (
                <div key={blg.id} className="card">
                  <img src="blog-PH.png" alt="Card Img" />
                  <div className="card-content">
                    <h3 className="card-title">{blg.title}</h3>
                    <p className="card-author">By : {blg.author}</p>
                    <p className="card-description">{blg.desc}</p>
                  </div>
                </div>
              );
            })
          : null}
      </div>
      <center>
        <button className="button" onClick={getPrev}>
          Previous
        </button>
        <button className="button" onClick={getNext}>
          Next
        </button>
      </center>
    </>
  );
}

export default Home;
