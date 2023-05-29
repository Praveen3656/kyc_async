import { FaceMesh } from "@mediapipe/face_mesh";
import React, { useRef, useEffect, useState } from "react";
import * as Facemesh from "@mediapipe/face_mesh";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import "./LiveWebCheck.scss";

const LiveWebCheck = ({
  updateWebImage,
  updateWebImagetwo,
  updateWebImagethree,
}) => {
  //console.log(Livecamera);
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

  const [capturebnt, setCapturebnt] = useState(false);

  const [canvasshow, setCanvasshow] = useState(true);

  const [addclass, setAddclass] = useState(false);

  const [stream, setStream] = useState(null);

  var camera = null;
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState("Come close to camera");
  const [showovalcanvas, setShowovalcanvas] = useState(false);
  const [timeoutmessage, setTimeoutmessage] = useState(false);
  const [showbnt, setShowbnt] = useState(false);
  const [takephoto, setTakephoto] = useState(true);
  const [showmessage, setShowmessage] = useState(true);

  const [tag, setTag] = useState(true);
  const urltoFile = (url, filename, mimeType) => {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  };

  // const capture_two = React.useCallback(() => {
  //   const imageSrctwo = webcamRef.current.getScreenshot();
  //   urltoFile(imageSrctwo, "user.txt", "text/plain").then(function (file) {
  //     updateWebImagetwo(file);
  //   });
  //   setImgSrctwo(imageSrctwo);
  //   updateWebImagetwo(imageSrctwo);
  // }, [webcamRef, setImgSrc]);

  // const capture_three = React.useCallback(() => {
  //   const imageSrcthree = webcamRef.current.getScreenshot();
  //   urltoFile(imageSrcthree, "user.txt", "text/plain").then(function (file) {
  //     updateWebImagethree(file);
  //   });
  //   setImgSrcthree(imageSrcthree);
  //   updateWebImagethree(imageSrcthree);
  // }, [webcamRef, setImgSrc]);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    urltoFile(imageSrc, "user.txt", "text/plain").then(function (file) {
      updateWebImage(file);
    });
    setImgSrc(imageSrc);
    setShowmessage(false);
    setMessage("come close to camera");
    setActions("");
    setCanvasshow(false);
    setCapturebnt(true);
    setTimeoutmessage(false);
    setShowmessage(false);
    setTag(false);
    setActions();
    setShowovalcanvas(false);
    setCameraoff(false);
    setDashboarddiv(false);
    setImageshow(true);
    updateWebImage(imageSrc);
  }, [webcamRef, setImgSrc]);

  // useEffect(() => {
  //   setActions(randomValuen);
  // }, [actions]);

  useEffect(() => {
    const faceactions = [
      "LOOKUP",
      "LOOKDOWN",
      "TURNRIGHT",
      "TURNLEFT",
      "OPENMOUTH",
    ];
    const randomIndex = Math.floor(Math.random() * faceactions.length);
    const randomValuen = faceactions[randomIndex];
    setActions(randomValuen);
    localStorage.setItem("state", randomValuen);
  }, [actions]);

  const timeout = () => {
    setTimeoutmessage(true);
    setCapturebnt(true);
  };
  const faceactionstwo = [
    "LOOKUP",
    "LOOKDOWN",
    "TURNRIGHT",
    "TURNLEFT",
    "OPENMOUTH",
  ];
  const setstate = [];
  const settimeout = () => {
    setMessage("Time out try again");
    setTag(false);
    setCanvasshow(false);
    setCapturebnt(true);
    setShowovalcanvas(false);
    setCameraoff(false);
    setDashboarddiv(false);
    setTimeoutmessage(false);
    setAddclass(false);
  };
  function onResults(results) {
    let getitem = localStorage.getItem("state");
    localStorage.setItem("counter", 0);

    const videoWidth = webcamRef.current.video.videoWidth;

    const videoHeight = webcamRef.current.video.videoHeight;
    // Set canvas width
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

    if (results.multiFaceLandmarks) {
      for (const landmarks of results.multiFaceLandmarks) {
        var facetop_y = landmarks[10].y;
        var chin_y = landmarks[152].y;

        var facedifference = chin_y - facetop_y;
        var TOP = landmarks[10].y;
        var LEFT = landmarks[234].x;
        var RIGHT = landmarks[366].x;
        var BOTTOM = landmarks[152].y;

        var LOOKUP = landmarks[1].y;
        var LOOKDOWN = landmarks[1].y;
        var TURNRIGHT = landmarks[1].x;
        var TURNLEFT = landmarks[1].x;

        const PT_49 = landmarks[0].x; //49 Left lip
        const PT_55 = landmarks[17].x; // 55 Right lip
        const PT_52 = landmarks[0].y; // 52 Upper lip
        const PT_58 = landmarks[17].y; // 58 Lower Lip
        var Y = PT_58 - PT_52;
        var X = PT_55 - PT_49;

       /// console.log("LOOKUP", LOOKUP);

        ///console.log("BOTTOM",'---',BOTTOM,"TOP",TOP);
        //console.log("RIGHT", RIGHT, "--------", "LEFT", LEFT);

        getitem = localStorage.getItem("state");
        if (
          facedifference >= 0.6 &&
          TOP > 0 &&
          BOTTOM < 0.99 &&
          LEFT > -0 &&
          RIGHT < 0.99
        ) {
          setMessage("Now");
          setAddclass(true);
          if (getitem === "LOOKUP") {
            //setTimeout(capture_three, 500);
            if (LOOKUP < 0.5) {
              let index = faceactionstwo.indexOf(getitem);
              faceactionstwo.splice(index, 1);
              console.log(faceactionstwo);

              const randomIndextwo = Math.floor(
                Math.random() * faceactionstwo.length
              );
              const removevalue = faceactionstwo[randomIndextwo];
              localStorage.clear();
              localStorage.setItem("state", removevalue);
              setActions(removevalue);
              setstate.push(getitem);
              const uniqueValues = [...new Set(setstate)];

              if (uniqueValues.length >= 3) {
                if (
                  facedifference >= 0.6 &&
                  TOP > 0 &&
                  BOTTOM < 0.99 &&
                  LEFT > -0 &&
                  RIGHT < 0.99
                ) {
                  setTimeout(capture, 1000);
                } else {
                  setstate = [];
                  setTimeout(timeout, 5000);
                }
              }
            }
            setTimeout(settimeout, 8000);
          }

          getitem = localStorage.getItem("state");
          if (getitem === "LOOKDOWN") {
            //// setTimeout(capture_three, 500);
            if (LOOKDOWN >= 0.6) {
              let index = faceactionstwo.indexOf(getitem);
              faceactionstwo.splice(index, 1);
              console.log(faceactionstwo);
              const randomIndextwo = Math.floor(
                Math.random() * faceactionstwo.length
              );
              const removevalue = faceactionstwo[randomIndextwo];
              localStorage.clear();
              localStorage.setItem("state", removevalue);
              setActions(removevalue);
              setstate.push(getitem);
              const uniqueValues = [...new Set(setstate)];
              if (uniqueValues.length >= 3) {
                if (
                  facedifference >= 0.6 &&
                  TOP > 0 &&
                  BOTTOM < 0.99 &&
                  LEFT > -0 &&
                  RIGHT < 0.99
                ) {
             
                  setTimeout(capture, 1000);
                } else {
                  setstate = [];
                  setTimeout(timeout, 5000);
                }
              }
            }

            setTimeout(settimeout, 8000);
          }

          getitem = localStorage.getItem("state");
          if (getitem === "TURNRIGHT") {
            // setTimeout(capture_two, 500);
            if (TURNRIGHT < 0.35) {
              let index = faceactionstwo.indexOf(getitem);
              faceactionstwo.splice(index, 1);
              console.log(faceactionstwo);
              const randomIndextwo = Math.floor(
                Math.random() * faceactionstwo.length
              );
              const removevalue = faceactionstwo[randomIndextwo];
              localStorage.clear();
              localStorage.setItem("state", removevalue);
              setActions(removevalue);
              setstate.push(getitem);
              setstate.push(getitem);
              const uniqueValues = [...new Set(setstate)];

              if (uniqueValues.length >= 3) {
                if (
                  facedifference >= 0.6 &&
                  TOP > 0 &&
                  BOTTOM < 0.99 &&
                  LEFT > -0 &&
                  RIGHT < 0.99
                ) {
              
                  setTimeout(capture, 1000);
                } else {
                  setstate = [];
                  setTimeout(timeout, 5000);
                }
              }
            }

            setTimeout(settimeout, 8000);
          }

          // //console.log("setaction", localStorage.getItem("state"));
          getitem = localStorage.getItem("state");
          if (getitem === "TURNLEFT") {
            // setTimeout(capture_two, 500);
            if (TURNLEFT >= 0.6) {
              console.log(TURNLEFT);
              let index = faceactionstwo.indexOf(getitem);
              faceactionstwo.splice(index, 1);
              console.log(faceactionstwo);
              const randomIndextwo = Math.floor(
                Math.random() * faceactionstwo.length
              );
              const removevalue = faceactionstwo[randomIndextwo];

              localStorage.clear();
              localStorage.setItem("state", removevalue);
              setActions(removevalue);
              setstate.push(getitem);
              setstate.push(getitem);
              const uniqueValues = [...new Set(setstate)];

              if (uniqueValues.length >= 3) {
                if (
                  facedifference >= 0.6 &&
                  TOP > 0 &&
                  BOTTOM < 0.99 &&
                  LEFT > -0 &&
                  RIGHT < 0.99
                ) {
                
                  setTimeout(capture, 1000);
                } else {
                  setstate = [];
                  setTimeout(timeout, 5000);
                }
              }
            }

            setTimeout(settimeout, 8000);
          }

          getitem = localStorage.getItem("state");
          if (getitem === "OPENMOUTH") {
            //setTimeout(capture_three, 500);
            if (Y > 0.2) {
              console.log(Y);
              let index = faceactionstwo.indexOf(getitem);
              faceactionstwo.splice(index, 1);
              console.log(faceactionstwo);
              const randomIndextwo = Math.floor(
                Math.random() * faceactionstwo.length
              );
              const removevalue = faceactionstwo[randomIndextwo];
              localStorage.clear();
              localStorage.setItem("state", removevalue);
              setActions(removevalue);
              setstate.push(getitem);
              setstate.push(getitem);
              const uniqueValues = [...new Set(setstate)];
              if (uniqueValues.length >= 3) {
                if (
                  facedifference >= 0.6 &&
                  TOP > 0 &&
                  BOTTOM < 0.99 &&
                  LEFT > -0 &&
                  RIGHT < 0.99
                ) {
                  
                  setTimeout(capture, 1000);
                } else {
                  setTimeout(timeout, 5000);
                }
              }
              console.log("state", setstate);
            }
            setTimeout(timeout, 8000);
          }
        } else {
          setAddclass(false);
          setMessage("Come close to camera");
        }

        // if (actionstatenew === "OPENMOUTH") {
        //   if (Y > 0.2) {
        //     console.log(actionstatenew);
        //     console.log(Y);
        //     let index = faceactionstwo.indexOf(actionstatenew);
        //     faceactionstwo.splice(index, 1);

        //     const randomIndextwo = Math.floor(
        //       Math.random() * faceactionstwo.length
        //     );
        //     const removevalue = faceactionstwo[randomIndextwo];
        //     actionstatenew = removevalue;
        //     setActions(actionstatenew)
        //   }
        // }

        //   // if (TURNRIGHT < 0.2) {
        //   //   setMessage("Turn Left");
        //   // }
        //   // if (TURNLEFT > 0.8) {
        //   //   setMessage("Open Mouth");
        //   // }
        //   const PT_49 = landmarks[0].x; //49 Left lip
        //   const PT_55 = landmarks[17].x; // 55 Right lip
        //   const PT_52 = landmarks[0].y; // 52 Upper lip
        //   const PT_58 = landmarks[17].y; // 58 Lower Lip

        //   var Y = PT_58 - PT_52;
        //   var X = PT_55 - PT_49;
        // } else {
        //   setMessage("Come closer to camera");
        //   setTimeoutmessage(false);
        //   setTimeoutmessage("");
        // }

        // setTimeoutmessage(false);
        // setCapturebnt(false);
        // setTimeout(capture, 700);
        // setMessage("keep your face in frame & click Capture");
        // setCanvasshow(false);
        // setShowovalcanvas(false);
        // setShowoval(false);
        // setShowbnt(true);
        // setCapturebnt(true);
        // setImageshow(true);
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
    window.location.reload();
    setCapturebnt(false);
    setCameraoff(true);
    setImageshow(false);
    setCanvasshow(true);
    setDashboarddiv(true);
    setCanvasshow(true);
  };
  // setInterval(())
  useEffect(() => {
    const faceMesh = new FaceMesh({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      },
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
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
  }, []);


  return (
    <>
      <center>
        <div className="App">
          <div className="webcam">
            <div className="takepicture">
              <p className={addclass ? "green" : "red"}>
                <b>
                  <span></span>
                  {showmessage ? (
                    <>{message}</>
                  ) : (
                    <span className="clicknext">Click next to continue</span>
                  )}
                  {tag ? <> {`${actions} with in 5 Seconds`}</> : ""}
                </b>
                <br />

                {/* {showcount ? <b>{count} seconds left</b> : ""} */}
              </p>
            </div>
            <div className="picture">
              {/* <p onClick={stop}>stop</p> */}
              {/* {imageshow ? <img className="c-img" src={imgSrc} alt="" /> : ""} */}
            </div>
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
                className="output_canvas output_canvasweb"
                id={addclass ? "green" : "red"}
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
