import React, { useState } from "react";
import "../../styles/Register.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

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
  "Manager": "manager",
  "User": "empleado",
  "TFS": "tfs"
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

  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = async () => {  
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
      const newPath = currentPath.replace("/register", "");

      if (res.status === 201) {
        console.log("Registration successful:", res.data);
      } else {
        throw new Error("Unexpected response status: " + res.status);
      }

      let authz = res.data.authz;

      // we update the authstate
      localStorage.setItem("role", roleMap[authz]);
      localStorage.setItem("token", res.data.token)
      navigate(newPath + roleMap[authz]);
    } catch (err) {
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
              <Form.Control
                data-bs-theme="dark"
                size="lg"
                type="first name"
                placeholder="First name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <Form.Control
                data-bs-theme="dark"
                size="lg"
                type="last name"
                placeholder="Last name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-3 mb-4" controlId="formBasicPassword">
            <Form.Control
              data-bs-theme="dark"
              size="lg"
              type="email"
              placeholder="Employee ID"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Form.Group>

          <Form.Group
            className="mt-3 mb-4 position-relative"
            controlId="formBasicPassword"
          >
            <Form.Control
              data-bs-theme="dark"
              size="lg"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
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
                } fs-3`}
              ></i>
            </Button>
          </Form.Group>

          <div className="register-role-selection">
            <div className="select-role">Select a role:</div>
            <Form.Select
              style={{ width: "30%" }}
              data-bs-theme="dark"
              aria-label="Default select example"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="User">User</option>
              <option value="Manager">Manager</option>
              <option value="TFS">TFS</option>
            </Form.Select>
          </div>

          <div className="register-role-selection">
            <div className="select-role">Career level:</div>
            <Form.Select
              style={{ width: "30%" }}
              data-bs-theme="dark"
              aria-label="Default select example"
              value={careerLevel}
              onChange={(e) => setCareerLevel(Number(e.target.value))}
            >
              <option value="1">1</option>
              <option value="2">2</option>
            </Form.Select>
          </div>

          <button
            type="button"
            onClick={handleRegister}
            className="customSubmitButton"
          >
            Submit
          </button>

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
