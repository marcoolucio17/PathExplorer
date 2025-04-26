import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useAuth } from "../../context/AuthContext";
import { Navigate, Link, useNavigate, NavLink } from "react-router";
import "../../styles/Login.css";
import axios from "axios";

/**
 * Componente que renderiza la forma dentro de login
 * @returns React Component
 */
export const LoginForm = () => {
  const authState = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(""); 

  const handleLogin = async () => {
    setLoginError(""); // limpia error anterior
    try {

      if (email.length == 0 || password.length == 0) {
        throw new Error("Missing one or two necessary fields.")
      }

      const res = await axios.post(
        "http://localhost:8080/api/authenticate",
        { username: email, password },
        { withCredentials: true }
      );

      navigate(authState + "/dashboard");
    } catch (err) {
      setLoginError("Authentication failed: " + err.response.data.error);

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
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
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

        <button type = "button" onClick={handleLogin} className="customSubmitButton">
          Submit
        </button>

        <div className="d-flex mt-2 h-25 align-items-center justify-content-center gap-3">
          <p className="text-light m-0">Don't have an account?</p>
          <NavLink to="register" >Register</NavLink>
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
