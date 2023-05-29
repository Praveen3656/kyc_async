import React, { useEffect, useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const selectUsername = (e) => {
    setUserName(e.target.value);
    sessionStorage.setItem("userId", e.target.value);
  }

  const selectPassword = (e) => {
    setPassword(e.target.value);
    sessionStorage.setItem("password", e.target.value);
  }

  const openDashboard = () => {
    navigate('/dashboard');
  }

  return (
    <>
      <form>
        <div className="login-title">Login Here</div>
        <label for="username">Username</label>
        <input className="input-l" type="text" placeholder="Email or Phone" id="username" 
            value={userName} onChange={selectUsername}/>

        <label for="password">Password</label>
        <input className="input-l" type="password" placeholder="Password" id="password"
            value={password} onChange={selectPassword}/>

        <button onClick={openDashboard}>Log In</button>
      </form>
    </>
  );
}

export default Login;
