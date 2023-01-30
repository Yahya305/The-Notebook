import "../styles/Image_Lab.css";
import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
// import placeholder from "./placeholder.png";

function ImageContainer() {
  const [previewImg, setPreviewImg] = useState("placeholder.png");
  const [imgResult, setImgResult] = useState("placeholder.png");
  const [inpFile, setInpFile] = useState(null);
  const [loadProgress, setLoadProgress] = useState(-1);
  const [process, setProcess] = useState();


  useEffect(()=>{
    return ()=> document.removeEventListener('click', toggleDropdown);
  })

  let toggleConfirm = async () => {
    const formData = new FormData();
    formData.append("inpFile", inpFile);
    const config = {
      onUploadProgress: (progressEvent) => {
        setLoadProgress(
          parseInt((progressEvent.loaded * 100) / progressEvent.total)
        );
      },
    };
    try {
      const res = await axios.postForm(
        "http://127.0.0.1:5000/blogs",
        formData,
        config,
        {
          method: "POST",
          headers: {
          	"Content-type": "multipart/form-data",
            "convert-to": process,
          },
        }
      );
      console.log("done");
      setImgResult("http://localhost:5000/" + res.data);
      console.log("http://localhost:5000/" + res.data);
      setLoadProgress(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleCancel = () => {
    //   setInpFile("placeholder.png");
    setPreviewImg("placeholder.png");
    setLoadProgress(-1);
  };

  function handleFileSelect(event) {
    const file = event.target.files[0];
    console.log("done");
    setInpFile(file);
    setPreviewImg(URL.createObjectURL(event.target.files[0]));
    setLoadProgress(0);
  }
  const toggleDropdown =(event)=>{
    setProcess(event.target.textContent)
    document.getElementById("dropbtn").textContent=event.target.textContent;
  }
  return (
    <>
      <div id="clientImg">
        <h1 className="container-heading">
          Unleash the full potential of your memories with our advanced editing
          tools. Currently, we support 24-bit BMP images only. More formats
          coming soon.
        </h1>
        <center>
          <input
            type="file"
            id="image-input"
            onChange={handleFileSelect}
          ></input>
          <button
            hidden={loadProgress !== -1}
            id="img-input-button"
            className="button"
            onClick={() => {
              document.getElementById("image-input").click();
            }}
          >
            Edit Now
          </button>
          <span hidden={loadProgress < 0.1}>
            <h3 hidden={loadProgress === 100}>Loading...</h3>
            <h3 hidden={loadProgress !== 100}>Done!</h3>
            <progress
              hidden={loadProgress === 100}
              id="progressBar"
              value={loadProgress}
              max="100"
              style={{ width: "250px", height: "25px" }}
            ></progress>
          </span>
          <span hidden={loadProgress !== 0}>
            <button className="button" onClick={toggleConfirm}>
              Confirm
            </button>
            <button id="cancel-btn" className="button" onClick={toggleCancel}>
              Cancel
            </button>
          </span>
        </center>

        <div className="ImageContainer">
          <span>
            <center>
              <b className="ContainerItem" style={{ fontSize: "larger" }}>
                Preview
              </b>
            </center>
            <img
              className="ContainerItem"
              id="imageSrc"
              src={previewImg}
              alt="Preview here"
            ></img>
          </span>

          <span>
            <center>
              <b className="ContainerItem" style={{ fontSize: "larger" }}>
                Result
              </b>
            </center>
            <img className="ContainerItem" src={imgResult} alt="Result"></img>
          </span>
        </div>
      </div>
      <center>
        {/* <div id="dropdown-menu-button">
        Convert To

          <ul id="dropdown-menu-list">
            <li>
              Gray Scale
            </li>
            <li>
              Negative
            </li>
          </ul>

      </div> */}
        <div id="dropdown-menu">
          <button id="dropbtn">dropdown-menu</button>
          <ul className="dropdown-list">
            <li onClick={document.addEventListener("click",toggleDropdown)}>Gray Scale</li>
            <li onClick={document.addEventListener("click",toggleDropdown)}>Negative</li>
            <li onClick={document.addEventListener("click",toggleDropdown)}>Embossing</li>
          </ul>
        </div>
      </center>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </>
  );
}

export default ImageContainer;
