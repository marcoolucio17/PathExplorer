import React from "react";
import "./../styles/Login.css"

import { LoginForm } from "../components/Login/LoginForm";

const Login = () => {
  return (
    <div id="login-main-div" className="loginMainDiv">
      <div id="image-background" className="imageBackground">

        <div id = "image-header-main-div" className = "imageHeaderMainDiv">
          <div id="image-header-div">
            <h1 className='text-light' style = {{"width": "30%", fontSize: "72px"}}>Path Explorer</h1>
          </div>

          <div id="image-subheader-div">
            <p className='text-light' style = {{"textAlign": "start", fontSize: "28px"}}>Explore your new career path within Accenture.</p>
          </div>
        </div>

      </div>

      <div id="login-form" className="loginForm">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
