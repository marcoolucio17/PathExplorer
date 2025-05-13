import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Navigate, Link, useNavigate, NavLink } from "react-router";
import "../../styles/Login.css";
import axios from "axios";

const DB_URL = "https://pathexplorer-backend.onrender.com/";

const roleMap = {
  "Manager": "manager",
  "User": "empleado",
  "TFS": "tfs"
};

/**
 * Componente que renderiza la forma dentro de login
 * @returns React Component
 */
export const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z]+\.[a-zA-Z]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    if (!validateEmail(inputEmail)) {
      setEmailError("ProviderID must be in the format 'juan.perez'");
    } else {
      setEmailError("");
    }
  };

  const handleLogin = async () => {
    setLoginError(""); // limpia error anterior
    try {
      if (email.length == 0 || password.length == 0) {
        throw new Error("Missing one or two necessary fields.");
      }

      const res = await axios.post(
        DB_URL + "api/authenticate",
        { providerid: email, password },
        { withCredentials: true }
      );
      
      let authz = res.data.authz;
      localStorage.setItem("role", roleMap[authz]);
      localStorage.setItem("token", res.data.token)
      navigate(roleMap[authz]);
    } catch (err) {
      setLoginError("Authentication failed: " + + (err.response?.data?.error || err.message));

      setTimeout(() => {
        setLoginError("");
      }, 5000);
    }
  };

  return (
    <div className="mainLoginForm">
      <img src="/images/accenturelogowhite.svg" width="170" height="170" />

      <p className="text-light" style={{ fontSize: "56px" }}>
        Sign in
      </p>

      <Form className="w-50">
        <Form.Group className="mt-5 mb-3" controlId="formBasicEmail">
          <Form.Control
            data-bs-theme="dark"
            size="lg"
            type="email"
            placeholder="Enter Employee ID"
            onChange={handleEmailChange}
            value={email}
          />
          {emailError && <small className="text-danger">{emailError}</small>}
        </Form.Group>

        <Form.Group className="mt-3 mb-5" controlId="formBasicPassword">
          <Form.Control
            data-bs-theme="dark"
            size="lg"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Group>

        <button
          type="button"
          onClick={handleLogin}
          className="customSubmitButton"
        >
          Submit
        </button>

        <div className="d-flex mt-2 h-25 align-items-center justify-content-center gap-3">
          <p className="text-light m-0">Don't have an account?</p>
          <NavLink to="register">Register</NavLink>
        </div>

        {/* Alerta de error */}
        {loginError && (
          <Alert className="mt-4" variant="danger">
            {loginError}
          </Alert>
        )}
      </Form>
    </div>
  );
};
