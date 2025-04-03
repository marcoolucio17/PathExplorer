import { useState } from "react";
import { useNavigate } from "react-router";
import Logo from "../assets/Acc_GT_Dimensional_RGB 1.png";  // Ruta relativa al archivo actual

function CustomNavbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate(); // Inicializar el hook

  return (
    <nav 
      className="navbar navbar-expand-lg fixed-top" 
      style={{ 
        backgroundColor: "#4A0072", 
        padding: "15px 20px",
        minHeight: "80px" 
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo */}
        <button onClick={() => navigate("/")} className="navbar-brand text-white btn btn-link p-0 text-decoration-none fs-4">
          <span className="fs-2">PathExplorer</span>
          <img 
            src={Logo} 
            style={{ height: "25px", marginLeft: "10px", marginBottom: "7px" }}
          />
        </button>

        {/* Iconos del Navbar (Dashboard, Notificaciones, Perfil) */}
        <div className="d-flex gap-4 align-items-center">
          {/* Dashboard */}
          <button onClick={() => navigate("/empleado/dashboard")} className="btn btn-link p-0 text-decoration-none">
            <i className="bi bi-layout-text-window text-white fs-2"></i>
          </button>

          {/* Notificaciones */}
          <div className="position-relative">
            <button
              className="btn btn-link text-white position-relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <i className="bi bi-bell fs-2"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                3
              </span>
            </button>

            {/* Popover de Notificaciones */}
            {showNotifications && (
              <div className="position-absolute bg-white text-dark p-3 rounded shadow"
                style={{ top: "40px", right: 0, minWidth: "250px", zIndex: 1000 }}>
                <h6>Notificaciones</h6>
                <ul className="list-unstyled mb-0">
                  <li className="border-bottom py-2">🔔 Nueva tarea asignada</li>
                  <li className="border-bottom py-2">📢 Reunión mañana a las 10 AM</li>
                  <li className="py-2">✅ Proyecto completado</li>
                </ul>
              </div>
            )}
          </div>

          {/* Avatar del usuario */}
          <button onClick={() => navigate("/empleado/perfil")} className="btn btn-link p-0 text-decoration-none">
            <i className="bi bi-person-circle text-white fs-2"></i>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default CustomNavbar;
