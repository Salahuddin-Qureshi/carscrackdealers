import React from 'react';
import { FaCheck, FaTimes, FaBell } from 'react-icons/fa';
import NotificationItem from './NotificationItem';
import '../styles/NotificationDropdown.css';

const NotificationDropdown = ({ 
  notifications, 
  unreadCount, 
  onNotificationClick, 
  onMarkAllRead,
  onNotificationDetailClick
}) => {
  const unreadNotifications = notifications.filter(notif => !notif.read);
  const readNotifications = notifications.filter(notif => notif.read);

  return (
    <div className="notification-dropdown">
      {/* Header */}
      <div className="notification-header">
        <div className="notification-title">
          <FaBell className="header-icon" />
          <span>Notifications</span>
          {unreadCount > 0 && (
            <span className="unread-count">{unreadCount} new</span>
          )}
        </div>
        {unreadCount > 0 && (
          <button 
            className="mark-all-read-btn"
            onClick={onMarkAllRead}
            title="Mark all as read"
          >
            <FaCheck />
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div className="no-notifications">
            <FaBell className="empty-icon" />
            <p>No notifications</p>
          </div>
        ) : (
          <>
            {/* Unread Notifications */}
            {unreadNotifications.length > 0 && (
              <div className="notification-section">
                <div className="section-header">
                  <span className="section-title">New</span>
                </div>
                {unreadNotifications.map(notification => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onClick={() => onNotificationClick(notification.id)}
                    onNotificationClick={onNotificationDetailClick}
                  />
                ))}
              </div>
            )}

            {/* Read Notifications */}
            {readNotifications.length > 0 && (
              <div className="notification-section">
                <div className="section-header">
                  <span className="section-title">Earlier</span>
                </div>
                {readNotifications.map(notification => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onClick={() => onNotificationClick(notification.id)}
                    onNotificationClick={onNotificationDetailClick}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="notification-footer">
        <button className="view-all-btn">
          View All Notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;
