// aquí configuraré la protección de rutas
// al momento dejen este archivo solo
import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router";

import { useAuth } from "../context/AuthContext";

import CustomNavBar from "../pages/CustomNavBar";

const PrivateRoutes = ({ allowedRoles }) => {
  const role = useAuth();

  if (!role) return <p>Loading...</p>;
  if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" />;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <CustomNavBar />
      <Outlet />
    </div>
  );
};

export default PrivateRoutes;
