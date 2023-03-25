import React,{useEffect} from 'react'

function ViewBlog(props) {

    useEffect(()=>{
        
    },[props.blog])
  return (
    <>
      <h1>Title</h1>
      <span>{props.blog.viewBlog.title}</span>
      <h1>Description</h1>
      <span>{props.blog.viewBlog.description}</span>
      <h1>Author</h1>
      <span>{props.blog.viewBlog.author}</span>
      <h1>Tag</h1>
      <span>{props.blog.viewBlog.tag}</span>
      <button onClick={()=>props.blog.toggleViewBlog(false)}>Close</button>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </>
  )
}

export default ViewBlog
