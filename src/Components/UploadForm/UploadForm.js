import React, { useEffect, useState } from "react";
import "./UploadForm.scss";
import adhar from "./adhar.jpg";
import passport from "./passport.jpeg";
import india from "./ind.png";
import australia from "./aus.png";
import usa from "./usa.png";
import Webcam from "react-webcam";

const UploadForm = ({ updateDocument }) => {
  // updateDocument(event.target.files[0]);
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const fileToDataUri = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });

  const urltoFile = (url, filename, mimeType) => {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  };

  const onFileChange = (event) => {
    updateDocument(event.target.files[0]);
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    urltoFile(imageSrc, "user.txt", "text/plain").then(function (file) {
      updateDocument(file);
    });
    setImgSrc(imageSrc);
    updateDocument(imageSrc);
    console.log(imageSrc);
  }, [webcamRef, setImgSrc]);

  const gettdtype = localStorage.getItem("uploadtype");

  const getcountry = localStorage.getItem("country");
 
  return (
    <>
      <div className="uploadId-ctn">
        <div className="u-title">Capture your ID</div><br/>
        {/* <Webcam
          className="live-web-cam_two"
          height={350}
          width={600}
          audio={false}
          ref={webcamRef}
          imageSmoothing={false}
          screenshotFormat="image/jpeg"
          screenshotQuality={1}
          videoConstraints={{ video: true, facingMode: "user" }}
        />
        <center>
          <button className="capture capture_id" onClick={capture}>
            Capture ID
          </button>
        </center> */}
        <div className="input-file">
          <input
            className="input-id"
            type="file"
            accept="image/png, image/jpeg"
            onChange={onFileChange}
          />
        </div>
      </div>
    </>
  );
};
export default UploadForm;
