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


  const gettdtype = localStorage.getItem("uploadtype");

  const getcountry = localStorage.getItem("country");
 
  return (
    <>
      <div className="uploadId-ctn">
        <div className="u-title">Upload your ID</div><br/>

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
