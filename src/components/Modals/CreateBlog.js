import React, { useContext, useEffect, useRef,useState } from "react";
import { AuthContext } from "../../App";
import { useDispatch } from "react-redux";
import { addBlog, editBlog } from "../../store/slices/BlogsSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import "../../styles/CreateBlog.scss"

function CreateBlog(props) {
  const token = useContext(AuthContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  // const [tagText, setTagText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blogProps = useSelector((state) => {
    return state.blogProps;
  });
  const editorRef = useRef(null);
  const log = () => {
    const title= document.getElementById("blgtitle-input").value;
    console.log("title=   ",title)
    if (editorRef.current) {
      const newNote = {};
      // newNote.title = editorRef.current.getContent().split("\n")[0];
      newNote.title = title;
      newNote.description = editorRef.current.getContent();
      // console.log(editorRef.current.getContent());
      if (blogProps[0].editMode === true) {
        // When Edit Mode is Enabled
        fetch(
          // `http://localhost:5000/api/notes/updatenote/${blogProps[0].edit._id}`,
          `http://192.168.18.54:5000/api/notes/updatenote/${blogProps[0].edit._id}`,
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
          // fetch("http://localhost:5000/api/notes/postnote", {
          fetch("http://192.168.18.54:5000/api/notes/postnote", {
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

  const handleEditorChange = (content) => {
    console.log("Fired!",content, isButtonDisabled)
    // console.log(`<h1 style="text-align: center;">Blog Title</h1><p>Whats on your mind?&nbsp;</p>`==='<h1 style="text-align: center;">Blog Title</h1><p>Whats on your mind?&nbsp;</p>')
    setIsButtonDisabled(content === `<h1 style="text-align: center;">Blog Title</h1>
<p>Whats on your mind?&nbsp;</p>`);
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
    <form onSubmit={log}>
      <div id="blgtitle-input" className="row">
      <textarea type="text" className="text-area" placeholder="Blog Title Here..." required={true}/>
      </div>
      <Editor
        apiKey="xiwtuyxbxh24lsdf5re8k8fms6rrnrafevtelezj337pw0qi"
        onEditorChange={handleEditorChange}
        onInit={(evt, editor) => (editorRef.current = editor)}

        // initialValue={
        //   blogProps[0].editMode === true
        //     ? blogProps[0].edit.description
        //     : `<h1 style='text-align: center;'>Blog Title</h1><p>Whats on your mind?&nbsp;</p>`
        // }
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            'emoticons',
            "image",
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
            "codesample",
            "wordcount",
          ],
          codesample_languages: [
            { text: 'HTML/XML', value: 'markup' },
            { text: 'JavaScript', value: 'javascript' },
            { text: 'CSS', value: 'css' },
            { text: 'PHP', value: 'php' },
            { text: 'Ruby', value: 'ruby' },
            { text: 'Python', value: 'python' },
            { text: 'Java', value: 'java' },
            { text: 'C', value: 'c' },
            { text: 'C#', value: 'csharp' },
            { text: 'C++', value: 'cpp' }
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "emoticons | image | codesample",
            toolbar_mode: 'floating',
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            placeholder: `Type your content here...`
        }}
      />
      <button type="submit" disabled={isButtonDisabled} className="button-basic" id="post/save-btn" onClick={(e) => {
                        e.stopPropagation();
                      }} >{blogProps[0].editMode?"Save":"Post"}</button>
      </form>
    </>
  );
}

export default CreateBlog;
