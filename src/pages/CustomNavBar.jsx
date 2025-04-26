import { useState } from "react";
import { useNavigate } from "react-router";
import Logo from "../assets/Acc_GT_Dimensional_RGB 1.png";
import { useAuth } from "../context/AuthContext";

import "./CustomNavBar.css";

function CustomNavbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const authState = useAuth();

  return (
    <nav className="navbar glass-navbar navbar-expand-lg">
      <div className="container-fluid d-flex align-items-center">
        {/* Logo only */}
        <button
          onClick={() => navigate("/")}
          className="navbar-brand btn btn-link p-0 nav-logo"
        >
          <img src={Logo} alt="Logo" className="logo-img" />
        </button>

        {/* Search bar */}
        <div className="nav-search-container">
          <i className="bi bi-search nav-search-icon"></i>
          <input
            type="text"
            placeholder="Search..."
            className="nav-search"
          />
        </div>

        {/* Icons */}
        <div className="nav-icons d-flex gap-3 align-items-center">
          <button
            onClick={() => navigate(`/${authState}/dashboard`)}
            className="icon-btn"
          >
            <i className="bi bi-list-ul"></i>
          </button>

          <div className="position-relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="icon-btn"
            >
              <i className="bi bi-bell"></i>
              <span className="badge-notif">3</span>
            </button>
            {showNotifications && (
              <div className="glass-popover">
                <h6 className="fw-bold mb-2">Notifications</h6>
                <div className="notification-item d-flex align-items-center">
                  <img
                    src={Logo}
                    alt="Avatar"
                    className="rounded avatar-sm me-2"
                  />
                  <div>
                    <p className="mb-1"><strong>Welcome!!!</strong></p>
                    <p className="small mb-0">
                      We’re excited to have you here! 🚀
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => navigate(`/${authState}/perfil`)}
            className="icon-btn"
          >
            <i className="bi bi-person-circle"></i>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default CustomNavbar;
