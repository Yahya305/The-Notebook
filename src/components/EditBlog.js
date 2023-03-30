import React, { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../../App";

function EditBlog(props) {
  const token = useContext(AuthContext);
  // let context =useContext(NoteContexts);
  const title = useRef(null);
  const description = useRef(null);
  const author = useRef(null);
  const tags = useRef(null);

  useEffect(() => {
    console.log("Comp rend");
    title.current.value = props.edit.title;
    description.current.value = props.edit.description;
    author.current.value = props.edit.author;
    tags.current.value = props.edit.tags;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const handleSubmit = () => {
    const updatedNote = {
      title: title.current.value,
      description: description.current.value,
      author: author.current.value,
      tags: tags.current.value,
      date: getDate(),
    };
    fetch(`http://localhost:5000/api/notes/updatenote/${props.edit._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${token.token}`,
      },
      body: JSON.stringify(updatedNote),
    })
      .then(((res) => res.json(), (rej) => rej.json()))
      .then((res) => {
        if (res.error) {
          console.log(res.error);
          props.modal.updateModal(true);
        } else {
          console.log(res);
          props.modal.updateModal(true);
        }
      });
  };

  const getDate = () => {
    let yourDate = new Date();
    console.log(yourDate.toISOString().split("T")[0]);
    return yourDate.toISOString().split("T")[0];
  };

  return (
    <div hidden={props.modal.notesModal}>
      <label>Title</label>
      <input ref={title} type="text" id="edit-title"></input>
      <label>Description</label>
      <input ref={description} type="text" id="edit-desc"></input>
      <label>Author</label>
      <input ref={author} type="text" id="edit-author"></input>
      <label>Tag</label>
      <input ref={tags} type="text" id="edit-tags"></input>
      <button onClick={handleSubmit}>Save</button>
      {/* <button onClick={closeModal}>Close</button> */}
    </div>
  );
}

export default EditBlog;
