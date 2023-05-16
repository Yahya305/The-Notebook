import React, { useEffect, useContext } from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import "../styles/ViewBlog.scss";

function ViewBlog(props) {
  const appContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {}, [props.blog]);
  const toggleClose = () => {
    // appContext.setReadBlog();
    //       const dateString = appContext.readBlog.date;
    //       const dateObj = new Date(dateString);

    //       const day = dateObj.getDate();
    //       const monthIndex = dateObj.getMonth();
    //       const year = dateObj.getFullYear();

    // const monthNames = [
    //   "January", "February", "March", "April", "May", "June",
    //   "July", "August", "September", "October", "November", "December"
    // ];

    // const formattedDate = `${day}/${monthNames[monthIndex]}/${year}`;
    // console.log(formattedDate);
    navigate(-1);
  };
  const convertDate = (dateString) => {
    // const dateString = appContext.readBlog.date;
    const dateObj = new Date(dateString);

    const day = dateObj.getDate();
    const monthIndex = dateObj.getMonth();
    const year = dateObj.getFullYear();

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formattedDate = `${day}/${monthNames[monthIndex]}/${year}`;
    console.log(formattedDate);
    return formattedDate
  };
  return (
    <div className="blog-container">
      <div style={{marginBottom:"10px",marginTop:"10px",}}>
        <div className="blog-author">
          <span style={{fontFamily:"Open Sans",fontSize:"13px"}}>Posted By:&nbsp;</span>
          <h5>{appContext.readBlog.author}</h5>
        </div>
        <div className="blog-date">
          <span>On:&nbsp;</span>
          <span>{convertDate(appContext.readBlog.date)}</span>
        </div>
      </div>
      <span className="blog-content"

      
        dangerouslySetInnerHTML={{ __html: `<h1 style='text-align: center;'><span style='color: rgb(52, 73, 94);'>${appContext.readBlog.title}</span></h1><p>&nbsp;</p>` }}
      />
      <span className="blog-content"
        dangerouslySetInnerHTML={{ __html: appContext.readBlog.description }}
      />
      <br/>
      <button className="button-basic" onClick={toggleClose}>
        Close
      </button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default ViewBlog;