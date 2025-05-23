import { useState } from "react";
import { useNavigate } from "react-router";
import Logo from "../assets/Acc_GT_Dimensional_RGB 1.png";

import "./CustomNavBar.css";

function CustomNavbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const authState = localStorage.getItem("role");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <div
        className={`sidebar 
          ${isSidebarVisible ? "sidebar-visible" : ""} 
          ${isSidebarOpen ? "open" : ""}`}
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => {
          setIsSidebarOpen(false);
          setIsSidebarVisible(false);
        }}
      >
        <ul className="sidebar-menu">
          <li onClick={() => navigate("/")}>
            <i className="bi bi-house"></i>
            {isSidebarOpen && <span>Home</span>}
          </li>
          <li onClick={() => navigate("/projects")}>
            <i className="bi bi-clipboard"></i>
            {isSidebarOpen && <span>Projects</span>}
          </li>
          <li onClick={() => navigate("/certificates")}>
            <i className="bi bi-award"></i>
            {isSidebarOpen && <span>Certificates</span>}
          </li>
          <li onClick={() => navigate("/settings")}>
            <i className="bi bi-gear"></i>
            {isSidebarOpen && <span>Settings</span>}
          </li>
          <li onClick={() => navigate("/about")}>
            <i className="bi bi-info-circle"></i>
            {isSidebarOpen && <span>About</span>}
          </li>
        </ul>
      </div>

      {/* Navbar */}
      <nav className="navbar glass-navbar navbar-expand-lg">
        <div className="container-fluid d-flex align-items-center">
          {/* Logo only */}
          <button
            onMouseEnter={() => setIsSidebarVisible(true)}
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
                <span className="badge-notif">1</span>
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
    </>
  );
}

export default CustomNavbar;
