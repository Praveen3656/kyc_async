import React, { useEffect, useRef, Fragment, useState } from "react";

import Webcam from "react-webcam";

const Test = () => {

  const [hasWebcam, setHasWebcam] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsMobile(/mobile/.test(userAgent));
  }, []);

  const videoConstraints = {
    facingMode: { exact: "environment" },
  };

  const checkWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setHasWebcam(true);
      stream.getTracks().forEach((track) => track.stop());
    } catch (err) {
      setHasWebcam(false);
    }
  };
  return (
    <>
      <div>
      <button onClick={checkWebcam}>Check Webcam</button>

        <Webcam videoConstraints={videoConstraints} />
      </div>

      {hasWebcam ? <p>Webcam is working!</p> : <p>Webcam is not working!</p>}

     
    </>
  );
};

export default Test;
