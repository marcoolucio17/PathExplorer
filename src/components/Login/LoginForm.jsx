import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Navigate, Link, useNavigate, NavLink } from "react-router";
import Spinner from "react-bootstrap/Spinner";
import "../../styles/Login.css";
import axios from "axios";

const DB_URL = "https://pathexplorer-backend.onrender.com/";

const roleMap = {
  Manager: "manager",
  User: "empleado",
  TFS: "tfs",
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
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
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
      localStorage.setItem("token", res.data.token);
      setIsLoading(false);
      navigate(roleMap[authz]);
    } catch (err) {
      setIsLoading(false);
      setLoginError(
        "Authentication failed: " + (err.response?.data?.error || err.message)
      );

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
          <input
            className="transparent-input"
            type="email"
            placeholder="Enter Employee ID"
            onChange={handleEmailChange}
            value={email}
          />
          {emailError && <small className="text-danger">{emailError}</small>}
        </Form.Group>

        <Form.Group
          className="mt-3 mb-5 position-relative"
          controlId="formBasicPassword"
        >
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="transparent-input"
          />
          <Button
            variant="link"
            className="position-absolute top-50 end-0 translate-middle-y me-4 p-0"
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Toggle password visibility"
          >
            <i
              className={`bi ${
                showPassword ? "bi-eye-slash" : "bi-eye"
              } fs-3 text-white`}
            />
          </Button>
        </Form.Group>

        <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
          <button
            type="button"
            onClick={handleLogin}
            className="customSubmitButton"
            disabled={isLoading}
          >
            Submit
            {isLoading && (
              <Spinner
                animation="border"
                role="status"
                size="sm"
                className="ms-3"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </button>
        </div>

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
