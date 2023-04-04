import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../App";
import { useDispatch } from "react-redux";
import { addBlog, editBlog } from "../../store/slices/BlogsSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

function CreateBlog(props) {
  const token = useContext(AuthContext);
  // const [tagText, setTagText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blogProps = useSelector((state) => {
    return state.blogProps;
  });
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      const newNote = {};
      newNote.title = editorRef.current.getContent().split("\n")[0];
      newNote.description = editorRef.current.getContent();
      // console.log(editorRef.current.getContent());
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
    }
  };

  useEffect(() => {
    console.log(blogProps[0].edit);
  }, [blogProps[0]]); // eslint-disable-line react-hooks/exhaustive-deps

  // const date2 = () => {
  //   let yourDate = new Date();
  //   console.log(yourDate.toISOString().split("T")[0]);
  //   return yourDate.toISOString().split("T")[0];
  // };

  return (
    <>
      <Editor
        apiKey="xiwtuyxbxh24lsdf5re8k8fms6rrnrafevtelezj337pw0qi"
        onInit={(evt, editor) => (editorRef.current = editor)}
        // initialValue={`<h1 style='text-align: center;'>${titleText}</h1>
        // <p>&nbsp;</p>`}
        initialValue={
          blogProps[0].editMode === true
            ? blogProps[0].edit.description
            : `<h1 style='text-align: center;'>Blog Title</h1><p>Whats on your mind?&nbsp;</p>`
        }
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
}

export default CreateBlog;
