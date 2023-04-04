import React,{useEffect,useContext} from 'react'
import { AuthContext } from "../App";
import { useNavigate } from 'react-router-dom';
import "../styles/ViewBlog.scss"


function ViewBlog(props) {
  const appContext = useContext(AuthContext);
  const navigate = useNavigate();


    useEffect(()=>{
        
    },[props.blog])
    const toggleClose =()=>{
      // appContext.setReadBlog();
      navigate(-1);
    }
  return (
    <div className='blog-container'>
      {/* <span>{appContext.readBlog.description}</span> */}
      <span dangerouslySetInnerHTML={{ __html: appContext.readBlog.description }} />
      <h1>Author</h1>
      <span>{appContext.readBlog.author}</span>
      <h1>Tag</h1>
      <span>{appContext.readBlog.tag}</span>
      <button className='button' onClick={toggleClose}>Close</button>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      </div>
  )
}

export default ViewBlog;
