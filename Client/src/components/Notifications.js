import React from "react";
import { Outlet } from "react-router-dom";

function Notifications() {

  // xiwtuyxbxh24lsdf5re8k8fms6rrnrafevtelezj337pw0qi
  return (
    <>
      <Outlet></Outlet>
    </>
  );
}

export default Notifications;
// const log = () => {
//   if (editorRef.current) {
//     console.log(editorRef.current.getContent());
//   }
// };
{/* <Editor
        apiKey='xiwtuyxbxh24lsdf5re8k8fms6rrnrafevtelezj337pw0qi'
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />*/}