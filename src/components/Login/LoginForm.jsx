import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useAuth } from "../../context/AuthContext";
import { Navigate, Link } from "react-router";
import "../../styles/Login.css";

/**
 * Componente que renderiza la forma dentro de login
 * todo: actualizar status de AuthContext para asignar el rol indicado por supabase auth
 * @returns React Component
 */
export const LoginForm = () => {
  const authState = useAuth();

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
          />
        </Form.Group>

        <Form.Group className="mt-3 mb-5" controlId="formBasicPassword">
          <Form.Control
            data-bs-theme="dark"
            size="lg"
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Link className="customSubmitButton" to={authState + "/dashboard"}>
          {/* Esta funcionalidad es para simplemente atravesar la página hacia dashboard. */}
          {/* Más adelante, se incorporará la lógica para autentificar el usuario y verificar su rol antes de proceder. */}
          Submit
        </Link>

        <div className="d-flex mt-2 h-25 align-items-center justify-content-center">
          <p className="text-light m-0">Don't have an account?</p>
          <Button variant="link">Register</Button>
        </div>
      </Form>
    </div>
  );
};
