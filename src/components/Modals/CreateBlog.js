import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App";
import { useDispatch } from "react-redux";
import { addBlog, editBlog } from "../../store/slices/BlogsSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateBlog(props) {
  const token = useContext(AuthContext);
  const [titleText, setTitleText] = useState("");
  const [descText, setDescText] = useState("");
  const [tagText, setTagText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blogProps = useSelector((state) => {
    return state.blogProps;
  });

  useEffect(() => {
    console.log(blogProps[0].edit);
    setTitleText(
      blogProps[0].edit.title !== undefined
        ? blogProps[0].edit.title
        : titleText
    );
    setDescText(
      blogProps[0].edit.description !== undefined
        ? blogProps[0].edit.description
          ? blogProps[0].edit.description
          : ""
        : descText
    );
    setTagText(
      blogProps[0].edit.tags !== undefined ? blogProps[0].edit.tags : tagText
    );
  }, [blogProps[0]]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleFormKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  const date2 = () => {
    let yourDate = new Date();
    console.log(yourDate.toISOString().split("T")[0]);
    return yourDate.toISOString().split("T")[0];
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newNote = {};
    newNote.title = document.getElementById("title-input").value;
    newNote.date = date2();
    if (document.getElementById("desc-input").value) {
      newNote.description = document.getElementById("desc-input").value;
    }
    if (document.getElementById("tags-input").value) {
      newNote.tags = document.getElementById("tags-input").value;
    }
    if (blogProps[0].editMode === true) {
      // When Edit Mode is Enabled
      fetch(
        `http://localhost:5000/api/notes/updatenote/${blogProps[0].edit._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": `${token.token}`,
          },
          body: JSON.stringify(newNote),
        }
      )
        .then(((res) => res.json(), (rej) => rej.json()))
        .then((res) => {
          if (res.error) {
            console.log(res.error);
          } else {
            dispatch(editBlog(res));
            navigate(-1);
          }
        });
    } else {
      try {
        fetch("http://localhost:5000/api/notes/postnote", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": `${token.token}`,
          },
          body: JSON.stringify(newNote),
        })
          .then(
            ((res) => {
              res.json();
            },
            (rej) => rej.json())
          )
          .then((res) => {
            if (res.errors) {
              console.log(res.errors);
            } else {
              dispatch(addBlog(res));
              console.log("Added");
              navigate(-1);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} onKeyDown={handleFormKeyDown}>
        <label>Title</label>
        <input
          value={titleText}
          onChange={(e) => setTitleText(e.target.value)}
          type="text"
          id="title-input"
          required
        ></input>
        <label>Description</label>
        <input
          value={descText}
          onChange={(e) => setDescText(e.target.value)}
          type="text"
          id="desc-input"
        ></input>
        <label>Tag</label>
        <input
          value={tagText}
          onChange={(e) => setTagText(e.target.value)}
          type="text"
          id="tags-input"
        ></input>
        <button type="submit">
          {blogProps[0].editMode === true ? "Save" : "Post"}
        </button>
        <button type="reset" onClick={() => navigate(-1)}>
          Back
        </button>
      </form>
    </>
  );
}

export default CreateBlog;
