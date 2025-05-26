import { useEffect, useState } from "react";
import axios from "axios";
import Logo from "../assets/Acc_GT_Dimensional_RGB 1.png";

export function Notifications({ userId, visible }) {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = () => {
    if (!userId) return;
    axios
      .get(`/notifications/${userId}`)
      .then((res) => {
        setNotifications(res.data);
      })
      .catch((err) => {
        console.error("Error fetching notifications", err);
      });
  };

  const handleDelete = (idnotificacion) => {
    axios
      .delete(`/notifications/${idnotificacion}`)
      .then(() => {
        setNotifications((prev) =>
          prev.filter((n) => n.idnotificacion !== idnotificacion)
        );
      })
      .catch((err) => {
        console.error("Error deleting notification", err);
      });
  };

  useEffect(() => {
    fetchNotifications();
  }, [userId]);

  if (!visible) return null;

  return (
    <div className="glass-popover">
      <h6 className="fw-bold mb-2">Notifications</h6>
      {notifications.length === 0 ? (
        <p className="small mb-0">No notifications available</p>
      ) : (
        notifications.map((notif) => (
          <div
            key={notif.idnotificacion}
            className="notification-item d-flex align-items-start justify-content-between"
          >
            <div className="d-flex">
              <img
                src={Logo}
                alt="Avatar"
                className="rounded avatar-sm me-2"
              />
              <div>
                <p className="mb-1 fw-bold">{notif.titulo}</p>
                <p className="small mb-1">{notif.mensaje}</p>
                <p className="small text-muted mb-0">{notif.fecha}</p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(notif.idnotificacion)}
              className="btn btn-sm btn-link text-danger ms-2 p-0"
              title="Eliminar notificación"
              style={{ fontSize: "1.25rem" }}
            >
              &times;
            </button>
          </div>
        ))
      )}
    </div>
  );
}
