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
          <button onClick={() => navigate("/dashboard")} className="btn p-0 text-decoration-none">
            <div className="bg-white rounded-circle p-2 d-flex justify-content-center align-items-center" style={{ width: "50px", height: "50px" }}>
              <i className="bi bi-layout-text-window text-dark fs-3"></i>
            </div>
          </button>

          {/* Notificaciones */}
          <div className="position-relative">
            <button
              className="btn p-0 text-decoration-none"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <div className="bg-white rounded-circle p-2 d-flex justify-content-center align-items-center position-relative" style={{ width: "50px", height: "50px" }}>
                <i className="bi bi-bell text-dark fs-2"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.75rem" }}>
                  3
                </span>
              </div>
            </button>

            {/* Popover de Notificaciones */}
            {showNotifications && (
              <div
                className="position-absolute bg-white text-dark rounded shadow-sm p-3"
                style={{ top: "60px", right: 0, minWidth: "320px", zIndex: 1000, borderRadius: "15px" }}
              >
                <h5 className="fw-bold mb-3">Notifications</h5>

                {/* Notificación 1 */}
                <div className="d-flex align-items-center bg-light rounded p-2 shadow-lg">
                  <img
                    src={Logo}
                    alt="Bytebase"
                    className="rounded"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                  <div className="ms-3">
                    <h6 className="fw-bold mb-1">Welcome!!!</h6>
                    <p className="mb-0 small">We're excited to have you here! 🚀 Explore your dashboard and discover new opportunities.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Avatar del usuario */}
          <button onClick={() => navigate("/perfil")} className="btn btn-link p-0 text-decoration-none">
            <div className="bg-white rounded-circle p-2 d-flex justify-content-center align-items-center" style={{ width: "50px", height: "50px" }}>
              <i className="bi bi-person-circle text-dark fs-1"></i>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default CustomNavbar;
