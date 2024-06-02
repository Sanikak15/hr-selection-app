// NotificationSystem.jsx
import React, { useState, useEffect } from "react";
import "./NotificationSystem.css";

let notificationId = 0;

export const notify = (message, type = "info") => {
  const event = new CustomEvent("add-notification", {
    detail: { id: ++notificationId, message, type },
  });
  window.dispatchEvent(event);
};

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const handleAddNotification = (event) => {
      const newNotification = event.detail;
      setNotifications((prev) => [...prev, newNotification]);
      setTimeout(() => {
        setNotifications((prev) =>
          prev.filter((notification) => notification.id !== newNotification.id)
        );
      }, 5000);
    };

    window.addEventListener("add-notification", handleAddNotification);

    return () => {
      window.removeEventListener("add-notification", handleAddNotification);
    };
  }, []);

  return (
    <div className="notification-system">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification ${notification.type}`}
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
};

export default NotificationSystem;
