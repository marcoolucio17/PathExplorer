import React, { useState, useRef, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { LoginForm } from "../components/Login/LoginForm";
import "./../styles/Login.css";

const Login = () => {
  return (
    <div id="login-main-div" className="loginMainDiv">
      <div id="image-background" className="imageBackground">
        <div id="image-header-main-div" className="imageHeaderMainDiv">
          <div id="image-header-div">
            <h1
              className="text-light"
              style={{ width: "30%", fontSize: "72px" }}
            >
              Path Explorer
            </h1>
          </div>

          <div id="image-subheader-div">
            <div
              style={{ width: "100%", minHeight: "10vh", marginTop: "1rem" }}
            >
              <TypeAnimation
                sequence={[
                  "Welcome to your next opportunity.",
                  2000,
                  "Discover where your skills can take you.",
                  2000,
                  "Start your journey with Accenture.",
                  2000,
                ]}
                wrapper="p"
                cursor={true}
                repeat={Infinity}
                className="text-light"
                style={{ textAlign: "start", fontSize: "28px" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div id="login-form" style={{ display: "flex", alignItems: "center" }}>
        <div className="loginForm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
