import React, { useContext, useEffect, useState } from "react";
import { BlogContexts } from "../Home";
import { AuthContext } from "../../App";

function CreateBlog(props) {
  const blogContext = useContext(BlogContexts);
  const token = useContext(AuthContext);
  const [titleText, setTitleText] = useState("");
  const [descText, setDescText] = useState("");
  const [authorText, setAuthorText] = useState("");
  const [tagText, setTagText] = useState("");

  useEffect(() => {
    console.log(
      props.edit !== undefined ? props.edit._id : null,
      "These props"
    );
    setTitleText(props.edit !== undefined ? props.edit.title : titleText);
    setDescText(props.edit !== undefined ? props.edit.description?props.edit.description:"" : descText);
    setAuthorText(props.edit !== undefined ? props.edit.author?props.edit.author:"" : authorText);
    setTagText(props.edit !== undefined ? props.edit.tags : tagText);
  }, [props.edit]); // eslint-disable-line react-hooks/exhaustive-deps

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
    if (document.getElementById("author-input").value) {
      newNote.author = document.getElementById("author-input").value;
    }
    if (document.getElementById("tags-input").value) {
      newNote.tags = document.getElementById("tags-input").value;
    }
    if (props.mode.editMode === true) {				// When Edit Mode is Enabled
		fetch(`http://localhost:5000/api/notes/updatenote/${props.edit._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token":
              `${token.token}`,
            },
            body: JSON.stringify(newNote),
          }).then(((res) => res.json(), (rej) => rej.json()))
          .then((res) => {
            if (res.error) {
              console.log(res.error);
            //   props.modal.updateModal(true);
            } else {
                console.log(res)
				props.mode.toggleMode(false);
                // props.modal.updateModal(true);
            }})
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
              console.log(blogContext.notes.concat([res]));
              blogContext.update(blogContext.notes.concat([res]));
              console.log("Added");
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
        <label>Author</label>
        <input
          value={authorText}
          onChange={(e) => setAuthorText(e.target.value)}
          type="text"
          id="author-input"
        ></input>
        <label>Tag</label>
        <input
          value={tagText}
          onChange={(e) => setTagText(e.target.value)}
          type="text"
          id="tags-input"
        ></input>
        <button type="submit">{props.mode.editMode === true?"Save":"Post"}</button>
      </form>
      <button onClick={() => console.log(props.edit, "_______--")}>
        check
      </button>
    </>
  );
}

export default CreateBlog;
