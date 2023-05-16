import "../styles/Image_Lab.scss";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Slider } from "@mui/material";
// import placeholder from "./placeholder.png";

function ImageContainer() {
  const [imageUrl, setImageUrl] = useState("placeholder.png");
  const [imgResult, setImgResult] = useState("placeholder.png");
  const [inpFile, setInpFile] = useState(null);
  const [loadProgress, setLoadProgress] = useState(-1);
  const [process, setProcess] = useState();
  const [tempBlob, setTempBlob] = useState();
  const [sliderValue, setSliderValue] = useState(undefined);
  const [cancelConfirm, setCancelConfirm] = useState(true);
  const [hideSlider, setHideSlider] = useState(true);
  const [blbUrl, setBlbUrl] = useState("");

  useEffect(() => {
    return () => document.removeEventListener("click", toggleProcess);
  });

  let toggleConfirm = async () => {
    setCancelConfirm(true);
    const formData = new FormData();
    formData.append("name", "textimage");
    formData.append("testImage", inpFile);
    const config = {
      onUploadProgress: (progressEvent) => {
        setLoadProgress(
          parseInt((progressEvent.loaded * 100) / progressEvent.total - 10)
        );
      },
    };
    try {
      const res = await axios.postForm(
        `http://192.168.18.54:5000/api/imagelab/edit?${process}=${
          sliderValue ? sliderValue / 100 : undefined
        }`,
        // `http://localhost:5000/api/imagelab/edit?quality=0`,
        formData,
        config,
        {
          method: "POST",
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      console.log("done");
      URL.revokeObjectURL(blbUrl)
      const bytes = new Uint8Array(res.data.imageData.data);
      const blob = new Blob([bytes], { type: inpFile.type });
      const url = URL.createObjectURL(blob);
      setBlbUrl(url)
      setSliderValue(undefined);
      setTempBlob(blob);
      setImgResult(url);
      setLoadProgress(100);
      setLoadProgress(-1);
      setHideSlider(true)
      document.getElementById("dropbtn").textContent = "Filters";
      // document.getElementById("dropbtn").addEventListener("hover",()=>document.getElementsByClassName("dropdown-list")[0].style.display="block");
    } catch (error) {
      setLoadProgress(100);
      setLoadProgress(-1);
      setHideSlider(true)
      document.getElementById("dropbtn").textContent = "Filters";
      console.log(error);
    }
  };

  const toggleCancel = () => {
    //   setInpFile("placeholder.png");
    setImageUrl("placeholder.png");
    setLoadProgress(-1);
    setHideSlider(true);
    setCancelConfirm(true);
  };

  function handleFileSelect(event) {
    const file = event.target.files[0];
    console.log("done");
    setInpFile(file);
    setImageUrl(URL.createObjectURL(file));
    if (process === "contrast" || process === "brightness") {
      setCancelConfirm(false);
      setHideSlider(false);
    }
    else{
      setCancelConfirm(false);
      setHideSlider(true);
      
    }
    setLoadProgress(0);
  }

  const saveImg = async () => {
    const file = new File([tempBlob], "edited_image.jpg", {
      type: "image/jpeg",
    });
    const formData = new FormData();
    formData.append("name", "textimage");
    formData.append("testImage", file);
    try {
      const res = await axios.postForm(
        "http://192.168.18.54:5000/api/imagelab/save",
        formData,
        {
          method: "POST",
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        console.log("done");
        console.log(res.data.message);
      } else {
        console.log("idk bruv");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleProcess = (event, process) => {
    // setProcess(event.target.textContent);
    setProcess(process);
    console.log(process);
    document.getElementById("dropbtn").textContent = event.target.textContent;
    document.getElementById("image-input").click();
  };

  const toggleSlider = (e) => {
    console.log(e.target.value);
    setSliderValue(e.target.value);
  };
  return (
    <>
      <div id="clientImg">
        <h1 className="container-heading">
          Unleash the full potential of your memories with our advanced editing
          tools.
          {/* Currently, we support BMP, JPEG, PNG, images only. More formats
          coming soon. */}
        </h1>
        <center>
          <div id="dropdown-menu">
            {/* <button id="dropbtn">Convert To <ArrowDropDownIcon/></button> */}
            <div hidden={loadProgress!==-1} id="dropbtn">
              Filters <ArrowDropDownIcon />
            </div>
            <ul className="dropdown-list">
              {/* <li onClick={event=>event.target.addEventListener("click",toggleProcess)}>Gray Scale</li>
            <li onClick={event=>event.target.addEventListener("click",toggleProcess)}>Negative</li>
            <li onClick={event=>event.target.addEventListener("click",toggleProcess)}>Edge Detection</li> */}
              <li onClick={(e) => toggleProcess(e, "greyscale")}>Gray Scale</li>
              <li onClick={(e) => toggleProcess(e, "invert")}>Negative</li>
              <li onClick={(e) => toggleProcess(e, "sepia")}>Sepia</li>
              <li onClick={(e) => toggleProcess(e, "brightness")}>
                Brightness
              </li>
              <li onClick={(e) => toggleProcess(e, "contrast")}>Contrast</li>
              {/* <li onClick={()=>toggleProcess()}>Embossing</li> */}

              {/* <li onClick={event=>event.target.addEventListener("click",toggleProcess)}>Negative</li>
            <li onClick={event=>event.target.addEventListener("click",toggleProcess)}>Edge Detection</li> */}
            </ul>
          </div>

          <div hidden={cancelConfirm} id="slider" style={{display:"flex",justifyContent:"space-between",flexDirection:"column"}}>
            <div style={{width:"300px",display:hideSlider && "none"}}>
              <Slider
                value={sliderValue === undefined ? 0 : sliderValue}
                onChange={toggleSlider}
              />
              <span>{sliderValue}</span>
            </div>
            <div hidden={loadProgress !== 0}>
            <button id="cancel-btn" className="button-danger" onClick={toggleCancel}>
                Cancel
              </button>
              <button className="button-basic" onClick={toggleConfirm}>
                Confirm
              </button>
            </div>
          </div>
          <input
            type="file"
            id="image-input"
            onChange={handleFileSelect}
          ></input>
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
        </center>

        <div className="ImageContainer">
          <span>
            <center>
              <h3>
                Preview
              </h3>
            </center>
            <img
              className="ContainerItem"
              id="imageSrc"
              src={imageUrl}
              alt="Preview here"
            ></img>
          </span>

          <span>
            <center>
              <h3>
                Result
              </h3>
            </center>
            <img className="ContainerItem" src={imgResult} alt="Result"></img>
          </span>
        </div>
        <button onClick={saveImg} style={{fontSize:"1rem"}} className="button-basic">
          Save Image
        </button>
      </div>
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
    </>
  );
}

export default ImageContainer;
