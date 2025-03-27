import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Importar Bootstrap
import { Navbar, Nav, Container, Badge } from "react-bootstrap";

const CustomNavbar = () => {
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#4A0072" }} className="navbar-dark px-3 sticky-top">
      <Container fluid>
        {/* Título */}
        <Navbar.Brand href="#" className="fw-bold text-white">
          PathExplorer <span>&gt;</span>
        </Navbar.Brand>

        {/* Botón para colapsar en móviles */}
        <Navbar.Toggle aria-controls="navbarNav" />

        {/* Contenido de la Navbar */}
        <Navbar.Collapse id="navbarNav" className="justify-content-end">
          <Nav>
            {/* Círculo rojo (menú) */}
            <Nav.Link href="#" className="position-relative">
              <div
                style={{
                  width: "25px",
                  height: "25px",
                  backgroundColor: "red",
                  borderRadius: "50%",
                }}
              ></div>
              <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle">
                1
              </Badge>
            </Nav.Link>

            {/* Círculo azul (notificaciones) */}
            <Nav.Link href="#" className="position-relative">
              <div
                style={{
                  width: "25px",
                  height: "25px",
                  backgroundColor: "blue",
                  borderRadius: "50%",
                }}
              ></div>
              <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle">
                1
              </Badge>
            </Nav.Link>

            {/* Círculo verde (avatar) */}
            <Nav.Link href="#">
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "green",
                  borderRadius: "50%",
                }}
              ></div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
