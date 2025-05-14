import React, { useState } from "react";
import "../../styles/Register.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

import {
  Navigate,
  Link,
  useNavigate,
  NavLink,
  useLocation,
} from "react-router";
import "bootstrap-icons/font/bootstrap-icons.css";

const DB_URL = "https://pathexplorer-backend.onrender.com/";

const roleMap = {
  Manager: "manager",
  User: "empleado",
  TFS: "tfs",
};

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [careerLevel, setCareerLevel] = useState(1);
  const [registerError, setRegisterError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = async () => {
    setIsLoading(true);
    setRegisterError(""); // limpia error anterior
    try {
      if (
        email.length == 0 ||
        password.length == 0 ||
        name.length == 0 ||
        lastName.length == 0 ||
        !role
      ) {
        throw new Error("Missing one or two necessary fields.");
      }

      const res = await axios.post(
        DB_URL + "api/register",
        {
          name,
          lastname: lastName,
          providerid: email,
          role,
          level: careerLevel,
          password,
        },
        { withCredentials: true }
      );

      const currentPath = location.pathname;
      const newPath = currentPath.replace(/\/register/g, "");

      if (res.status < 399) {
        console.log("Registration successful:", res.data);
      } else {
        throw new Error("Unexpected response status: " + res.status);
      }

      let authz = res.data.authz;

      localStorage.setItem("role", roleMap[authz]);
      localStorage.setItem("token", res.data.token);
      setIsLoading(false);

      navigate(newPath + "/" + roleMap[authz]);
    } catch (err) {
      setIsLoading(false);
      setRegisterError(
        "Registration failed: " + (err.response?.data?.error || err.message)
      );

      setTimeout(() => {
        setRegisterError("");
      }, 5000);
    }
  };

  return (
    <div className="register-form-container">
      <div>
        <img src="/images/accenturelogowhite.svg" width="120" height="120" />
      </div>

      <div id="registration-forms" className="register-input-container">
        <h2>Create an account</h2>

        <Form className="w-75">
          <Form.Group className="mt-5 mb-5" controlId="formBasicEmail">
            <div className="d-flex gap-3">
              <input
                type="first name"
                placeholder="First name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="r-transparent-input"
              />
              <input
                type="last name"
                placeholder="Last name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                className="r-transparent-input"
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-3 mb-4" controlId="formBasicPassword">
            <input
              type="email"
              placeholder="Employee ID"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="r-transparent-input"
            />
          </Form.Group>

          <Form.Group
            className="mt-3 mb-4 position-relative"
            controlId="formBasicPassword"
          >
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="r-transparent-input"
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
              ></i>
            </Button>
          </Form.Group>

          <div className="register-role-selection">
            <div className="select-role">Select a role:</div>
            <select
              className="custom-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="User">User</option>
              <option value="Manager">Manager</option>
              <option value="TFS">TFS</option>
            </select>
          </div>

          <div className="register-role-selection">
            <div className="select-role">Career level:</div>

            <select
              className="custom-select"
              value={careerLevel}
              onChange={(e) => setCareerLevel(Number(e.target.value))}
            >
              {Array.from({ length: 15 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              onClick={handleRegister}
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

          <div className="d-flex mt-4 h-25 align-items-center justify-content-center gap-3">
            <p className="text-light m-0">Already have an account?</p>
            <NavLink to="/">Sign-in</NavLink>
          </div>

          {/* Alerta de error */}
          {registerError && (
            <Alert className="mt-4" variant="danger">
              {registerError}
            </Alert>
          )}
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
