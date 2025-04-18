import { useState, useContext, createContext } from "react";
import "./App.css";

// Imports para el routing
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";

// Imports sobre contexto
import { AuthProvider } from "./context/AuthContext";

// Imports de empleado
import { EmpleadoDashboard } from "./pages/empleado/EmpleadoDashboard";
import { EmpleadoPerfil } from "./pages/empleado/EmpleadoPerfil";
import { EmpleadoProyecto } from "./pages/empleado/EmpleadoProyecto";

// Imports de manager
import { ManagerDashboard } from "./pages/manager/ManagerDashboard";
import { ManagerPerfil } from "./pages/manager/ManagerPerfil";
import { ManagerProyecto } from "./pages/manager/ManagerProyecto";
import { ManagerVistaPerfil } from "./pages/manager/ManagerVistaPerfil";
import { ManagerCrearProyecto1 } from "./pages/manager/CrearProyecto/ManagerCrearProyecto1";
import { ManagerCrearProyecto2 } from "./pages/manager/CrearProyecto/ManagerCrearProyecto2";

// Imports de TFS
import { TFSDashboard } from "./pages/tfs/TFSDashboard";
import { TFSPerfil } from "./pages/tfs/TFSPerfil";
import { TFSProyecto } from "./pages/tfs/TFSProyecto";
import { TFSVistaPropuestas } from "./pages/tfs/TFSVistaPropuestas";

// Imports misc
import { Unauthorized } from "./pages/Unauthorized";
import PrivateRoutes from "./routes/PrivateRoutes";
import Login from "./pages/Login";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* rutas de manager */}
        <Route element={<PrivateRoutes allowedRoles={["manager"]} />}>
          <Route path="manager" element={<Navigate to="dashboard" />} />
          <Route path="manager/dashboard" element={<ManagerDashboard />} />
          <Route path="manager/perfil" element={<ManagerPerfil/>} />
          <Route path="manager/proyecto" element={<ManagerProyecto />} />
          <Route path="manager/vistaperfil" element={<ManagerVistaPerfil />} />
          <Route path="manager/dashboard/crearproyecto1" element={<ManagerCrearProyecto1 />} />
          <Route path="manager/dashboard/crearproyecto2" element={<ManagerCrearProyecto2 />} />
        </Route>

        {/* rutas de tfs */}
        <Route element={<PrivateRoutes allowedRoles={["tfs"]} />}>
          <Route path="tfs" element={<Navigate to = "dashboard" />} />
          <Route path="tfs/dashboard" element={<TFSDashboard />} />
          <Route path="tfs/perfil" element={<TFSPerfil/>} />
          <Route path="tfs/proyecto" element={<TFSProyecto />} />
          <Route path="tfs/vistaperfil" element={<TFSVistaPropuestas />} />
        </Route>

        {/* rutas de empleado */}
        <Route element={<PrivateRoutes allowedRoles={["empleado"]} />}>
          <Route path="empleado" element={<Navigate to = "dashboard" />} />
          <Route path="empleado/dashboard" element={<EmpleadoDashboard />} />
          <Route path="empleado/perfil" element={<EmpleadoPerfil/>} />
          <Route path="empleado/proyecto" element={<EmpleadoProyecto />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
