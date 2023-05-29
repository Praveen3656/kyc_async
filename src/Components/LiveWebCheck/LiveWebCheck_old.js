import React, { useState } from "react";
import "./LiveWebCheck.scss";
import Webcam from "react-webcam";
import img1 from "./image1.png";
import img2 from "./image2.png";

const LiveWebCheck = ({ updateWebImage }) => {
  const [filedata, setFileData] = useState("");
  const [camera, setCamera] = useState(true);
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [imagecapture,setImagecapture] = useState("NO");

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
      updateWebImage(file);
    });
    setImgSrc(imageSrc);
    updateWebImage(imageSrc);
    console.log(imageSrc);
  }, [webcamRef, setImgSrc]);

  // const openCamera = () => {
  //   setCamera(true);
  // };

  return (
    <>
      <div className="live-ctn">
        <div className="live-title">Live Image Capture</div>
        {/* <div className="cam" onClick={openCamera}>
          Open Camera
        </div> */}

        <div className="camera">
          {camera && (
            <>
              <div className="oval"></div>
              <Webcam
                className="live-web-cam"
                height={500}
                width={500}
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
              {imgSrc && <img className="c-img" src={imgSrc} alt="" />}
            </>
          )}
          <div className="image1">
            <small>Selfi Quality Samples</small>
            <img src={img1} alt="img"></img>
            <p className="ok">NOT OK</p>
            <p className="ok">OK</p>
            <img src={img2} alt="img"></img>
            <p className="ok">NOT OK</p>
            <p className="ok">OK</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveWebCheck;
