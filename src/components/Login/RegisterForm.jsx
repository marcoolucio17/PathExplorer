import React, { useState } from "react";
import "../../styles/Register.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useAuth } from "../../context/AuthContext";
import { Navigate, Link, useNavigate, NavLink } from "react-router";
import "bootstrap-icons/font/bootstrap-icons.css";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

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
              />
              <Form.Control
                data-bs-theme="dark"
                size="lg"
                type="last name"
                placeholder="Last name"
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-3 mb-4" controlId="formBasicPassword">
            <Form.Control
              data-bs-theme="dark"
              size="lg"
              type="email"
              placeholder="Employee ID"
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
              style = {{width: "30%"}}
              data-bs-theme="dark"
              aria-label="Default select example"
            >
              <option value="User">User</option>
              <option value="Manager">Manager</option>
              <option value="TFS">TFS</option>
            </Form.Select>
          </div>

          <div className="register-role-selection">
            <div className="select-role">Career level:</div>
            <Form.Select
              style = {{width: "30%"}}
              data-bs-theme="dark"
              aria-label="Default select example"
            >
              <option value="1">1</option>
              <option value="2">2</option>
            </Form.Select>
          </div>

          <button type = "button" className = "register-confirm-button" size="lg">Submit</button>

          <div className="d-flex mt-4 h-25 align-items-center justify-content-center gap-3">
            <p className="text-light m-0">Already have an account?</p>
            <NavLink to="/" >Sign-in</NavLink>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
