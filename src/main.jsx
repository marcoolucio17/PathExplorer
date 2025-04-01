import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { EmpleadoPerfil } from "./pages/empleado/EmpleadoPerfil.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <EmpleadoPerfil />
    </StrictMode>
  </BrowserRouter>
);
