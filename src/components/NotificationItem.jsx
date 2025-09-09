import React from 'react';
import { FaCheckCircle, FaInfoCircle, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import '../styles/NotificationItem.css';

const NotificationItem = ({ notification, onClick, onNotificationClick }) => {
  const getIconByType = (type) => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="notification-icon success" />;
      case 'warning':
        return <FaExclamationTriangle className="notification-icon warning" />;
      case 'error':
        return <FaTimes className="notification-icon error" />;
      default:
        return <FaInfoCircle className="notification-icon info" />;
    }
  };

  const handleClick = () => {
    onClick(notification.id);
  };

  const handleNotificationClick = () => {
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
  };

  return (
    <div 
      className={`notification-item ${!notification.read ? 'unread' : 'read'}`}
      onClick={handleNotificationClick}
    >
      <div className="notification-content">
        <div className="notification-icon-container">
          {getIconByType(notification.type)}
        </div>
        <div className="notification-text">
          <h4 className="notification-title">{notification.title}</h4>
          <p className="notification-message">{notification.message}</p>
          <span className="notification-time">{notification.time}</span>
        </div>
      </div>
      {!notification.read && <div className="unread-indicator"></div>}
    </div>
  );
};

export default NotificationItem;
