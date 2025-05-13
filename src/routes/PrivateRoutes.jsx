// aquí configuraré la protección de rutas
// al momento dejen este archivo solo
import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router";

import CustomNavBar from "../pages/CustomNavBar";

const PrivateRoutes = ({ allowedRoles }) => {
  let authRole = localStorage.getItem("role");

  if (!authRole) return <p>Loading...</p>;
  if (!allowedRoles.includes(authRole)) return <Navigate to="/unauthorized" />;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <CustomNavBar />
      <Outlet />
    </div>
  );
};

export default PrivateRoutes;
