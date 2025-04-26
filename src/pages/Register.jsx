import React from "react";
import "../styles/Register.css"

import RegisterForm from "../components/Login/RegisterForm";

const Register = () => {
  return (
    <div id="register-main-div" className="register-main-div">
      <div id="register-image-background" className="register-image-background">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
