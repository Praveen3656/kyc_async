import React, { useRef, useEffect, useState } from "react";
import * as Facemesh from "@mediapipe/face_mesh";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import "./LiveWebCheck.scss";

const Uploadselfieid = ({ updateWebImageid }) => {
  const FACING_MODE_USER = "user";
  const FACING_MODE_ENVIRONMENT = "environment";

  const videoConstraints = {
    facingMode: FACING_MODE_ENVIRONMENT,
  };

  const [facingMode, setFacingMode] = React.useState(FACING_MODE_ENVIRONMENT);

  const handleClick = React.useCallback(() => {

    setFacingMode((prevState) =>
      prevState === FACING_MODE_USER
        ? FACING_MODE_ENVIRONMENT
        : FACING_MODE_USER
    );
  }, []);

  const [filedata, setFileData] = useState("");
  const [camera, setCamera] = useState(true);
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [imagecapture, setImagecapture] = useState("NO");

  const urltoFile = (url, filename, mimeType) => {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    //Usage example:

    urltoFile(imageSrc, "user.txt", "text/plain").then(function (file) {
      updateWebImageid(file);
    });
    setImgSrc(imageSrc);
    updateWebImageid(imageSrc);
    //console.log(imageSrc);
  }, [webcamRef, setImgSrc]);

  return (
    <>
      <div className="live-ctn">
        <div className="live-title">
          Keep Your ID to camera and click Capture photo
        </div>
        <br />
        <div className="camera">
          {camera && (
            <>
              <Webcam
                className="live-web-cam_two"
                height={1020}
                width={750}
                audio={false}
                ref={webcamRef}
                imageSmoothing={false}
                screenshotFormat="image/jpeg"
                screenshotQuality={1}
              />
              <center>
                <button className="capture" onClick={capture}>
                  Capture photo
                </button>
              </center>
              <div className="picture">
                {imgSrc && <img className="c-img" src={imgSrc} alt="" />}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mobilecam">
      <div className="live-title">
          <b>Capture ID</b>
        </div>
        {/* <button onClick={handleClick}>Switch camera</button> */}
        <Webcam
          className="live-deskto-cam_two"
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            ...videoConstraints,
            facingMode,
          }}
          ref={webcamRef}
          imageSmoothing={false}
          height={1020}
          width={750}
        />

        <button className="capture" onClick={capture}>
          Capture photo
        </button>

        <div className="picture">
          {imgSrc && <img className="c-img" src={imgSrc} alt="" />}
        </div>
      </div>
    </>
  );
};

export default Uploadselfieid;
