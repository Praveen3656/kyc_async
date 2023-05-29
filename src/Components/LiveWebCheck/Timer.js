import React, { useEffect, useState } from "react";
import "./timer.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import UploadForm from "../UploadForm/UploadForm";

const Timer = () => {
  let navigate = useNavigate();
  const { uid } = useParams();
  const [counter, setCounter] = useState(15);
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
    }
    return () => clearInterval(timer);
  }, [counter]);
  return (
    <>
      <p className="counter">{counter}</p>
    </>
  );
};

export default Timer;
