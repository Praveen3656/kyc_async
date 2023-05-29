import React, { useEffect, useState } from "react";
import "./InputId.scss";
import TextField from "@mui/material/TextField";

const InputId = ({ updateName,}) => {
  const [input, setInput] = useState("");

  const onChange = (e) => {
    updateName(e.target.value);
  };

  return (
    <>
      <div className="inputId-ctn">
        <div className="input-ti">
          Please enter your name as per the ID card
        </div>
        <TextField
          className="text-f-ctn"
          required
          id="outlined-required"
          placeholder="Enter your name"
          // style = {{width: 400}}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default InputId;
