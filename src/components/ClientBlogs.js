import React, { useState, useEffect } from "react";

function ClientBlogs() {
  const [blogs, setBlogs] = useState();

  useEffect(() => {

    fetch("http://localhost:5000/api/notes/fetchnotes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiJ9.NjNmMjcyZDAyNTBhNDBhYjgxNzljMzFm.a6UR2SkxEco4pOZpNEKPQ7yoZ_ry5lD7Rbhv6X_p-wU",
        "User-Agent": "The-NoteBook",
        from: "0",
        to: "12",
      },
    })
      .then((res) => res.json())
      .then((f) => setBlogs(f));
  }, []);
  return (
    <>
      <h2>
        <center>Your Blogs</center>
      </h2>
      <div className="blogs">
        {blogs
          ? blogs.map((blg) => {
              return (
                <div key={blg._id} className="card">
                  <img src="blog-PH.png" alt="Card Img" />
                  <div className="card-content">
                    <h3 className="card-title">{blg.title}</h3>
                    <p className="card-author">By : {blg.author}</p>
                    <p className="card-description">{blg.description}</p>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
}

export default ClientBlogs;
