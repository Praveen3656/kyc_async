import { FaceMesh } from "@mediapipe/face_mesh";
import React, { useRef, useEffect, useState } from "react";
import * as Facemesh from "@mediapipe/face_mesh";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import "./LiveWebCheck.scss";

const LiveWebCheck = ({ updateWebImage, onData }) => {
  const [filedata, setFileData] = useState("");
  const [cameraoff, setCameraoff] = useState(true);
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [imgSrctwo, setImgSrctwo] = React.useState(null);
  const [imgSrcthree, setImgSrcthree] = React.useState(null);
  const [imagecapture, setImagecapture] = useState("NO");
  const [takepicture, setTakepicture] = useState(false);
  const [imageshow, setImageshow] = useState(false);
  const canvasRef = useRef(null);

  const connect = window.drawConnectors;

  const [dashboarddiv, setDashboarddiv] = useState(true);
  const [showoval, setShowoval] = useState(false);

  const [actionstate, setActionstate] = useState("OPEMMOUTH");

  const [actions, setActions] = useState();
  const [actionsmessage, setActionsmessage] = useState("");
  const [showactionmessage, setShowactionmessage] = useState(false);

  const [nextmesage, setNextmesage] = useState(false);

  const [capturebnt, setCapturebnt] = useState(false);

  const [canvasshow, setCanvasshow] = useState(true);

  const [addclass, setAddclass] = useState(false);

  const [stream, setStream] = useState(null);
  const [timeoutmesg, setTimeoutmesg] = useState(false);

  var camera = null;
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState(
    "Please approach the camera with your face in the center"
  );
  const [showovalcanvas, setShowovalcanvas] = useState(false);
  const [timeoutmessage, setTimeoutmessage] = useState(false);
  const [showbnt, setShowbnt] = useState(false);
  const [takephoto, setTakephoto] = useState(true);
  const [showmessage, setShowmessage] = useState(true);

  const [checktime, setChecktime] = useState(true);

  const [capturecheck, setCapturecheck] = useState(true);

  const [messageaction, setMessageaction] = useState(true);
  const [multiplemessage, setMultiplemessage] = useState();

  const [tag, setTag] = useState(true);

  const [facecounter, setFacecounter] = useState(false);

  const [messagetimeout, setMessagetimeout] = useState();
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
    onData(true);
    setIsActionCompleted(true);
    resetTimer(10000000);
    setMessageaction(false);
    setShowactionmessage(false);
    setMultiplemessage();
    setMessage();
    setImageshow(true);
    shouldExecuteSetTimeout = false;
    setNextmesage(true);
    setShowmessage(false);
    setActions();
    setCanvasshow(false);
    setCapturebnt(false);
    setTimeoutmessage(false);
    setShowmessage(false);
    setTag(false);
    setActions();
    setShowovalcanvas(false);
    setCameraoff(false);
    setDashboarddiv(false);
    setTimeoutmesg(false);
  });

  let capturecheck1 = true;

  const startcapture = React.useCallback(() => {
    if (capturecheck1) {
      const imageSrc = webcamRef.current.getScreenshot();
      urltoFile(imageSrc, "user.txt", "text/plain").then(function (file) {
        updateWebImage(file);
      });
      setImgSrc(imageSrc);
      updateWebImage(imageSrc);
      capturecheck1 = false;
    }
  }, [webcamRef, setImgSrc]);

  useEffect(() => {
    const faceactions = ["LOOKUP", "OPENMOUTH"];
    const randomIndex = Math.floor(Math.random() * faceactions.length);
    const randomValuen = faceactions[randomIndex];
    setActions(randomValuen);
    localStorage.setItem("state", randomValuen);
  }, [actions]);

  const faceactionstwo = ["LOOKUP", "OPENMOUTH"];
  const setstate = [];
  let shouldExecuteSetTimeout = true;

  const nofacefound = () => {
    onData(false);
    setMessage("No Faces Found");
    setMessagetimeout();
    setMessageaction(false);
    setShowmessage(true);
    setTag(false);
    setCanvasshow(false);
    setCapturebnt(true);
    setShowovalcanvas(false);
    setCameraoff(false);
    setDashboarddiv(false);
    setTimeoutmessage(false);
    setAddclass(false);
    setShowactionmessage(false);
    setTimeoutmesg(true);
  };

  const breakfunction = () => {
    onData(false);
    setMessagetimeout();
    setMessage();
    setMultiplemessage("Multiple faces Detected Please try again");
    setMessagetimeout();
    setMessageaction(false);
    setShowmessage(true);
    setTag(false);
    setCanvasshow(false);
    setCapturebnt(true);
    setShowovalcanvas(false);
    setCameraoff(false);
    setDashboarddiv(false);
    setTimeoutmessage(false);
    setAddclass(false);
    setShowactionmessage(false);
    setTimeoutmesg(true);
  };

  const settimeout = () => {
    if (shouldExecuteSetTimeout) {
      onData(false);
      setMessageaction(false);
      setShowactionmessage(false);
      setMultiplemessage();
      setMessage();
      setMessagetimeout("Time out come close and try again");
      setTag(false);
      setCanvasshow(false);
      setCapturebnt(true);
      setShowovalcanvas(false);
      setCameraoff(false);
      setDashboarddiv(false);
      setTimeoutmessage(false);
      setAddclass(false);
      setShowactionmessage(false);
      setShowmessage(true);
      setTimeoutmesg(true);
    }
  };

  window.addEventListener("beforeunload", function () {
    localStorage.removeItem("countaction");
  });

  const [isActionCompleted, setIsActionCompleted] = useState(true);

  const [timer, setTimer] = useState(0);

  const settimerfunction = (timer) => {
    let timeoutIdactions = setTimeout(() => {
      settimeout();
    }, timer);
    return timeoutIdactions;
  };

  // useEffect(() => {

  //   console.log("timecheck",isActionCompleted);
  //   let timeoutIdactions = null;
  //   if (!isActionCompleted) {
  //     timeoutIdactions = setTimeout(() => {
  //      settimeout();
  //     }, timer);
  //   }
  //   return () => {
  //     console.log("timeclear",timeoutIdactions);
  //     clearTimeout(timeoutIdactions);

  //   };
  // }, [isActionCompleted]);

  const resetTimer = (t) => {
    setTimer(t);
  };

  function onResults(results) {
    //  console.log("results",results.multiFaceLandmarks);
    //  console.log("length",results.multiFaceLandmarks.length);
    if (results.multiFaceLandmarks.length == 0 && facecounter === true) {
      nofacefound();
    }

    let getitem = localStorage.getItem("state");
    localStorage.setItem("counter", 0);
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    var i = 0;
    let tf;
    let facedetect = false;

    if (results.multiFaceLandmarks) {
      clearTimeout(tf);
      for (const landmarks of results.multiFaceLandmarks) {
        if (results.multiFaceLandmarks.length > 1) {
          breakfunction();
        }

        const facetop_y = landmarks[10].y;
        const chin_y = landmarks[152].y;

        const facedifference = chin_y - facetop_y;

        const TOP = landmarks[10].y;
        const LEFT = landmarks[234].x;
        const RIGHT = landmarks[366].x;
        const BOTTOM = landmarks[152].y;

        const TOPZ = landmarks[10].z;
        const LEFTZ = landmarks[234].z;
        const RIGHTZ = landmarks[366].z;
        const BOTTOMZ = landmarks[152].z;

        const faceArea = (LEFT - RIGHT) * (TOP - BOTTOM);

        ///console.log("LEFTZ", LEFTZ, "-----------", "RIGHTZ", RIGHTZ);

        const LOOKUP = landmarks[1].y;
        const LOOKDOWN = landmarks[1].y;
        const TURNRIGHT = landmarks[1].x;
        const TURNLEFT = landmarks[1].x;

        const PT_49 = landmarks[0].x;
        const PT_55 = landmarks[17].x;

        const PT_52 = landmarks[0].y;
        const PT_58 = landmarks[17].y;

        var Y = PT_58 - PT_52;

        var X = PT_55 - PT_49;

        getitem = localStorage.getItem("state");
        
        if (faceArea > 0.15) {
          facedetect = true;
          // setTimer(8000);
          clearTimeout(tf);
          tf = settimerfunction(8000);
          setFacecounter(true);
          setIsActionCompleted(false);
          setShowmessage(false);
          setShowactionmessage(true);
          setAddclass(true);
          setChecktime(false);
          setActionsmessage(true);
          startcapture();
        } else {
          facedetect = false;
          clearTimeout(tf);
          setAddclass(false);
          setShowactionmessage(false);
          setShowmessage(true);
        }

        let actioncount = localStorage.getItem("countaction");
        if (actioncount >= 2) {
          clearTimeout(tf);
          setIsActionCompleted(true);
          capture();
          shouldExecuteSetTimeout = false;
          setCapturebnt(false);
          setShowactionmessage(false);
        }
        if (getitem === "LOOKUP") {
          clearTimeout(tf);
          if (facedetect === true) {

            tf = settimerfunction(8000);
          }

          if (TOPZ > 0.05 && BOTTOMZ < -0.05) {
            clearTimeout(tf);
            setIsActionCompleted(true);
            console.log("Lookup action done");
            let index = faceactionstwo.indexOf(getitem);
            faceactionstwo.splice(index, 1);
            const randomIndextwo = Math.floor(
              Math.random() * faceactionstwo.length
            );
            const removevalue = faceactionstwo[randomIndextwo];
            localStorage.clear();
            localStorage.setItem("state", removevalue);
            setActions(removevalue);

            setstate.push(getitem);

            const uniqueValues = [...new Set(setstate)];

            localStorage.setItem("countaction", uniqueValues.length);
          }
        }

        getitem = localStorage.getItem("state");
        actioncount = localStorage.getItem("countaction");
        if (actioncount >= 2) {
          clearTimeout(tf);
          setIsActionCompleted(true);
          capture();
          shouldExecuteSetTimeout = false;
          setCapturebnt(false);
          setShowactionmessage(false);
        }
        if (getitem === "OPENMOUTH") {
          clearTimeout(tf);
          if (facedetect === true) {

            tf = settimerfunction(8000);
          }

          if (Y > 0.1) {
            clearTimeout(tf);
            setIsActionCompleted(true);
            let index = faceactionstwo.indexOf(getitem);
            faceactionstwo.splice(index, 1);

            const randomIndextwo = Math.floor(
              Math.random() * faceactionstwo.length
            );
            const removevalue = faceactionstwo[randomIndextwo];
            localStorage.clear();
            localStorage.setItem("state", removevalue);
            setActions(removevalue);
            setstate.push(getitem);
            const uniqueValues = [...new Set(setstate)];
            localStorage.setItem("countaction", uniqueValues.length);
          }
        }
        getitem = localStorage.getItem("state");
        actioncount = localStorage.getItem("countaction");
        if (actioncount >= 2) {
          clearTimeout(tf);
          setIsActionCompleted(true);
          capture();
          shouldExecuteSetTimeout = false;
          setCapturebnt(false);
          setShowactionmessage(false);
        }
        connect(canvasCtx, landmarks, Facemesh.FACEMESH_TESSELATION, {
          color: "#fff0",
          lineWidth: 1,
        });
      }
    }
    canvasCtx.restore();
  }
  // }

  const retake = () => {
    setFacecounter(false);
    window.location.reload();
    localStorage.removeItem("countaction");
    setCapturebnt(false);
    setCameraoff(true);
    setImageshow(false);
    setCanvasshow(true);
    setDashboarddiv(true);
    setCanvasshow(true);
  };

  useEffect(() => {
    const faceMesh = new FaceMesh({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      },
    });

    faceMesh.setOptions({
      maxNumFaces: 3,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    faceMesh.onResults(onResults);

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await faceMesh.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480,
      });

      camera.start();
    }
  }, [facecounter, isActionCompleted]);

  return (
    <>
      <center>
        <div className="App">
          <div className="webcam">
            <div className="takepicture">
              <p>
                {showmessage ? (
                  <span className="red">
                    <b>{message}</b>
                  </span>
                ) : (
                  ""
                )}
              </p>
              <p>
                <span className="red">
                  <b>{multiplemessage}</b>
                </span>
              </p>

              <p>
                <span className="red">
                  <b>{messagetimeout}</b>
                </span>
              </p>

              <p>
                {messageaction ? (
                  <>
                    {" "}
                    {showactionmessage ? (
                      <span className="green">
                        <b>
                          Please slightly {actions} with your current distance
                          to camera intact
                        </b>
                      </span>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}
              </p>

              <p className="green">
                {nextmesage ? (
                  <span>
                    <b>Actions verified click next to continue..</b>
                  </span>
                ) : (
                  ""
                )}
              </p>
            </div>
            <div className="picture"></div>
            {showoval ? <div className="oval"></div> : ""}
            {cameraoff ? (
              <Webcam
                ref={webcamRef}
                style={{
                  position: "absolute",
                  marginLeft: "auto",
                  marginRight: "auto",
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  zindex: 9,
                }}
                id={addclass ? "green" : "red"}
                className="output_canvas output_canvasweb"
              />
            ) : (
              ""
            )}
            {showovalcanvas ? (
              <div className="camera-content camera-content_mbl">
                <div className="face-area">
                  <div className="face-border"></div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="webcam">
            {/* {showovalcanvas ? <div className="ovalmbl"></div> : ""} */}

            {canvasshow ? (
              <canvas
                ref={canvasRef}
                className="output_canvas"
                style={{
                  position: "absolute",
                  marginLeft: "auto",
                  marginRight: "auto",
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  zindex: 9,
                  paddingTop: "2px",
                }}
              ></canvas>
            ) : (
              ""
            )}
          </div>
        </div>
      </center>

      {dashboarddiv ? <div className="dashboard-ctnnew"></div> : ""}

      <div className="App">
        {/* <center>
          {capturebnt ? (
            <button className="capture" onClick={capture}>
              Capture photo
            </button>
          ) : (
            ""
          )}
          <br />
        
        </center> */}
        <center>
          {capturebnt ? (
            <button className="capture" onClick={retake}>
              RETAKE
            </button>
          ) : (
            ""
          )}
          <br />
        </center>
      </div>
    </>
  );
};

export default LiveWebCheck;
