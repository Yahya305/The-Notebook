import "../styles/Blog_cards.scss";
import React, { useState, useEffect,useContext } from "react";
import ClientBlogs from "./ClientBlogs";
import Header from "./Header";
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';
import Footer from "./Footer";


function Home(props) {
  const token = useContext(AuthContext);
  const [blogLimit, setBlogLimit] = useState(12);
  const navigate = useNavigate();


  useEffect(() => {
    if (!token.token) {
      navigate("login")
    }
    
  }, []);     // eslint-disable-line react-hooks/exhaustive-deps


  const getNext = () => {
    setBlogLimit(blogLimit + 12);
    // fetch("http://127.0.0.1:5000/blogs", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "MY_TOKEN",
    //     "User-Agent": "Your-App-Name",
    //     from: `${blogLimit}`,
    //     to: `${blogLimit + 12}`,
    //   },
    // })
      // .then((res) => res.json())
      // .then((f) => setBlogs(f));
  };

  const getPrev = () => {
    setBlogLimit(blogLimit - 12);
    // fetch("http://127.0.0.1:5000/blogs", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "MY_TOKEN",
    //     "User-Agent": "Your-App-Name",
    //     from: `${blogLimit - 24}`,
    //     to: `${blogLimit - 12}`,
    //   },
    // })
      // .then((res) => res.json())
      // .then((f) => setBlogs(f));
  };
  


  return (
    <>
      <Header/>
      {/* <CreateBlog/> */}
      <ClientBlogs/>
      {/* <center>
        <button className="button" onClick={getPrev}>
          Previous
        </button>
        <button className="button" onClick={getNext}>
          Next
        </button>
      </center> */}
    </>
  );
}

export default Home;
