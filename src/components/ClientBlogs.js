import React, { useState, useEffect, useContext } from "react";
import { BlogContexts } from "./Home";
import CreateBlog from "./Modals/CreateBlog";
import { AuthContext } from "../App";
import ViewBlog from "./ViewBlog";

function ClientBlogs() {
  const blogContext = useContext(BlogContexts);
  const [blogs, setBlogs] = useState();
  const [edit, setEdit] = useState();
  const [editMode, setEditMode] = useState(false);
  const [viewBlog, setViewBlog] = useState(false);
  const token= useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:5000/api/notes/fetchnotes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          // "eyJhbGciOiJIUzI1NiJ9.NjNmMjcyZDAyNTBhNDBhYjgxNzljMzFm.a6UR2SkxEco4pOZpNEKPQ7yoZ_ry5lD7Rbhv6X_p-wU",
          token.token,
        "User-Agent": "The-NoteBook",
        from: "0",
        to: "12",
      },
    })
      .then((res) => res.json())
      .then((f) => setBlogs(f));
  }, [blogContext.notes,token.token]);

  const deleteNote = (id) => {
    console.log("Deleting note with id :", id);
    fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        `${token.token}`,
      },
    })
      .then(((res) => res.json(), (rej) => rej.json()))
      .then((res) => {
        if (res.error) {
          console.log(res.error);
        } else {
            const newObj=blogContext.notes.filter(
              (value) => value._id !==res.deletedNote._id
            )
			blogContext.update(newObj)
        }
      });
  };

  const toggleModal = (blg) => {
    // setNotesModal(false);			// TODO
    // editBlog.current=blg;
    console.log(blg.description.length)
    setEdit(blg);
	setEditMode(true);
    // console.log(editBlog.current)
  };
  const toggleMode = (mode) => {
    // setNotesModal(false);			// TODO
    // editBlog.current=blg;
    setEditMode(mode);
    // console.log(editBlog.current)
  };

  const toggleViewBlog=(bool)=>{
    setViewBlog(bool);
  }

  return (
    <>
    {viewBlog?<><ViewBlog blog={{viewBlog,toggleViewBlog}}/></>:
    <>
      <CreateBlog mode={{editMode,toggleMode}} edit={edit} />
      <h2>
        <center>Your Blogs</center>
      </h2>
      <div className="blogs">
        {blogs
          ? blogs.map((blg) => {
              return (
                <div key={blg._id} className="card" onClick={(e)=>setViewBlog(blg)}>
                  <img src="blog-PH.png" alt="Card Img" />
                  <div className="card-content">
                    <h3 className="card-title">{blg.title}</h3>
                    <p className="card-author">By : {blg.author}</p>
                    <p className="card-description">{blg.description?blg.description.length>10?blg.description.substr(0,27)+"...":blg.description:null}</p>
                  </div>
                  <div className="card-button">
                    <button
                      className="button-basic"
                      onClick={(e) => {e.stopPropagation();toggleModal(blg)}}
                    >
                      Edit
                    </button>
                    <button className="button-danger" onClick={(e) =>{e.stopPropagation(); deleteNote(blg._id)}}>Delete</button>
                  </div>
                </div>
              );
            })
          : null}
      </div>
      </>
      }
      {/* <button onClick={()=>console.log(editBlog.current)}> check 2</button> */}
    </>
  );
}

export default ClientBlogs;
