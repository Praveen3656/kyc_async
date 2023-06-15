import React, { useRef, useEffect, useState } from "react";
import * as Facemesh from "@mediapipe/face_mesh";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import "./LiveWebCheck.scss";
import { isMobile } from "react-device-detect";
import idselfieimage from "./Selfie_ID.png";

const Uploadselfieid = ({ updateWebImageid }) => {
  const openmblcam = () => {};

  const [filedata, setFileData] = useState("");
  const [camera, setCamera] = useState(true);
  const webcamRef = React.useRef(null);
  const webcamRefweb = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [imgSrcweb, setImgSrcweb] = React.useState(null);
  const [imagecapture, setImagecapture] = useState("NO");
  const [mobilecam, setMobilecam] = useState(true);
  const [iphonechrome, setIphonechrome] = useState(true);
  const [showidimage, setShowidimage] = useState(false);
  const urltoFile = (url, filename, mimeType) => {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  };

  const open = () => {
    setMobilecam(true);
  };

  const capture_web = React.useCallback(() => {
    const imageSrc = webcamRefweb.current.getScreenshot();

    console.log(imageSrc);
    urltoFile(imageSrc, "user.txt", "text/plain").then(function (file) {
      updateWebImageid(file);
    });
    setImgSrcweb(imageSrc);
    updateWebImageid(imageSrc);
    //console.log("imgSrcweb",imgSrcweb);
  }, [webcamRefweb, setImgSrcweb]);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    urltoFile(imageSrc, "user.txt", "text/plain").then(function (file) {
      updateWebImageid(file);
    });
    setImgSrc(imageSrc);
    updateWebImageid(imageSrc);
    console.log(imageSrc);
  }, [webcamRef, setImgSrc]);

  useEffect(() => {
    const isIPhoneChrome = () => {
      const userAgent = navigator.userAgent;
      const isIPhone = /iPhone/i.test(userAgent);
      const isChrome = /CriOS/i.test(userAgent); // Chrome on iOS

      return isIPhone && isChrome;
    };

    if (isIPhoneChrome()) {
      setIphonechrome(false);
      console.log("Accessed from iPhone Chrome");
    } else {
      console.log("non iphone chrome");
    }
  }, []);

  const guide = () => {
    setShowidimage(true);
  };
  const idclose = () => {
    setShowidimage(false);
  };
  return (
    <>
      {showidimage ? (
        <>
          <div className="guidimage">
            <img src={idselfieimage} alt="idimage"></img>
            <ul>
              <li>
                Hold your ID card below the face and bring close to camera
              </li>
              <li>
                Make sure your face and face on id card are clearly visible
              </li>
              <li>Make sure that the ID card is fully visible</li>
            </ul>
            <p>
              <span onClick={idclose}>CLOSE</span>
            </p>
          </div>
        </>
      ) : (
        ""
      )}

      <div className="idwebcam">
        <div className="live-ctn">
          <div className="live-title">
            Keep Your ID to camera and click Capture photo
          </div>

          <br />
          <div className="camera">
            <div className="idbox">
              <div className="facebox">
                <span>Keep Your face here</span>
              </div>
              <div className="idcard">
                <span>Keep Your ID here</span>
              </div>
            </div>
            <Webcam
              className="live-web-cam_two"
              audio={false}
              ref={webcamRefweb}
              imageSmoothing={false}
              screenshotFormat="image/jpeg"
              screenshotQuality={1}
            />
            <center>
              <button className="capture" onClick={capture_web}>
                Capture photo
              </button>
            </center>
            <div className="picture">
              {imgSrcweb && <img className="c-img" src={imgSrcweb} alt="" />}
            </div>
          </div>
        </div>
      </div>
      <div className="idmblcam">
        <div className="live-ctn">
          <div className="live-title">
            Keep Your ID to camera and click Capture photo
            <div className="guide" onClick={guide}>
              Guide
            </div>
          </div>

          <br />
          <div className="camera">
            {mobilecam ? (
              <>
                {/* <div className="idbox">
                  <div className={iphonechrome ? "facebox" : "faceboxiphone"}>
                    <span>Keep Your face here</span>
                  </div>
                  <div className={iphonechrome ? "idcard" : "idcardiphone"}>
                    <span>Keep Your ID here</span>
                  </div>
                </div> */}
                <Webcam
                  className="live-web-cam_two"
                  audio={false}
                  ref={webcamRef}
                  style={{ 
                    width: '100%',
                    height: 'auto',
                  }}
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
            ) : (
              <button className="capture" onClick={open}>
                Open camera
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Uploadselfieid;
