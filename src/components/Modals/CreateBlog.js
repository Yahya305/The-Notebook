import React, { useContext, useEffect, useRef,useState } from "react";
import { AuthContext } from "../../App";
import { useDispatch } from "react-redux";
import { addBlog, editBlog } from "../../store/slices/BlogsSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import "../../styles/CreateBlog.scss"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function CreateBlog(props) {
  const token = useContext(AuthContext);
  const blogProps = useSelector((state) => {
    return state.blogProps;
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [blogTag, setBlogTag] = useState();
  const [titleText, setTitleText] = useState(
    blogProps[0].editMode === true
    ? blogProps[0].edit.title
    : ""
  );
  const tagRef=useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const log = (e) => {
    e.preventDefault();
    const title= document.getElementById("blgtitle-input").value;
    console.log("title=   ",title)
    if (editorRef.current) {
      const newNote = {};
      // newNote.title = editorRef.current.getContent().split("\n")[0];
      newNote.title = title;
      newNote.description = editorRef.current.getContent();
      newNote.tags = blogTag;
      // console.log(editorRef.current.getContent());
      console.log("Reached herererereererererererer")
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
    console.log(blogProps[0].editMode,"hehhererhehreh",blogProps[0].edit._id);
  }, [blogProps[0]]); // eslint-disable-line react-hooks/exhaustive-deps

  // const date2 = () => {
  //   let yourDate = new Date();
  //   console.log(yourDate.toISOString().split("T")[0]);
  //   return yourDate.toISOString().split("T")[0];
  // };

const setTag = (event, tag) => {
  const colorScheme={
    "action": "#F94144",
    "comedy":"#F8961E",
    "education":"#01a7fb",
    "food":"#F3722C",
    "tech":"#586d8b",
    "scifi":"#43AA8B",
    "romance":"#f45af9",
    "sports":"#0019ff",
  }
  setBlogTag(tag);
  console.log(tag);
  tagRef.current.textContent = event.target.textContent;
  tagRef.current.style.backgroundColor = colorScheme[tag];
};
  return (
    <>
    <form onSubmit={log}>
      <div className="blg-header">
      <div className="row">
      <textarea id="blgtitle-input" type="text" className="text-area" placeholder="Blog Title Here..." value={titleText} onChange={(e)=>setTitleText(e.target.value)} required={true}/>
      </div>
      <div id="blg-tagmenu">
            <div ref={tagRef} id="dropbtn-tag">
              Tags <ArrowDropDownIcon />
            </div>
            <ul id="tag-dropdown">
              <li onClick={(e) => setTag(e, "action")}>
                Action
              </li>
              <li onClick={(e) => setTag(e, "comedy")}>Comedy</li>
              <li onClick={(e) => setTag(e, "education")}>Education</li>
              <li onClick={(e) => setTag(e, "food")}>Food</li>
              <li onClick={(e) => setTag(e, "tech")}>Tech</li>
              <li onClick={(e) => setTag(e, "scifi")}>Sci-fi</li>
              <li onClick={(e) => setTag(e, "romance")}>Romance</li>
              <li onClick={(e) => setTag(e, "sports")}>Sports</li>
            </ul>
          </div>
      </div>
      <Editor
        apiKey="xiwtuyxbxh24lsdf5re8k8fms6rrnrafevtelezj337pw0qi"
        onEditorChange={handleEditorChange}
        onInit={(evt, editor) => (editorRef.current = editor)}

        initialValue={
          blogProps[0].editMode === true
            ? blogProps[0].edit.description
            : ""
        }
        // `<h1 style='text-align: center;'>Blog Title</h1><p>Whats on your mind?&nbsp;</p>`
        init={{
          height: 500,
          menubar: false,
          init_instance_callback: function (editor) {
            document.getElementById('loading-gif').style.display = 'none';
          },
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
      <button type="submit" disabled={isButtonDisabled} className="button-basic" id="post/save-btn">{blogProps[0].editMode?"Save":"Post"}</button>
      <button type="reset" className="button-danger"  onClick={()=>navigate(-1)}>Close</button>
      {/* <button>Tags</button> */}
      </form>
      <div className="loading">
      <img id="loading-gif" src="6.gif" alt="Card Img" />
      </div>
    </>
  );
}

export default CreateBlog;
