import React, { useState, useRef, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import NotificationDropdown from './NotificationDropdown';
import NotificationDetailPanel from './NotificationDetailPanel';
import '../styles/NotificationBell.css';

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      title: 'New Car Added',
      message: 'BMW X5 2023 has been added to your inventory',
      time: '2 minutes ago',
      type: 'success',
      read: false
    },
    {
      id: 2,
      title: 'Sale Completed',
      message: 'Toyota Camry 2022 has been sold for $25,000',
      time: '15 minutes ago',
      type: 'info',
      read: false
    },
    {
      id: 3,
      title: 'Maintenance Due',
      message: 'Honda Civic 2021 requires scheduled maintenance',
      time: '1 hour ago',
      type: 'warning',
      read: false
    },
    {
      id: 4,
      title: 'New Customer Inquiry',
      message: 'John Smith is interested in Mercedes C-Class',
      time: '2 hours ago',
      type: 'info',
      read: true
    },
    {
      id: 5,
      title: 'Payment Received',
      message: 'Payment of $45,000 received for BMW 3 Series',
      time: '3 hours ago',
      type: 'success',
      read: true
    }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleBellClick = () => {
    setIsOpen(!isOpen);
  };

  const handleNotificationClick = (notificationId) => {
    // Mark notification as read
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const handleNotificationDetailClick = (notification) => {
    setSelectedNotification(notification);
    setIsDetailPanelOpen(true);
    setIsOpen(false); // Close dropdown when opening detail panel
  };

  const handleCloseDetailPanel = () => {
    setIsDetailPanelOpen(false);
    setSelectedNotification(null);
  };

  const handleNotificationAction = (notificationId, action) => {
    console.log(`Action "${action.label}" clicked for notification ${notificationId}`);
    // Here you would typically handle the action (API calls, navigation, etc.)
    
    // For demo purposes, close the panel after action
    setTimeout(() => {
      handleCloseDetailPanel();
    }, 500);
  };

  const markAllAsRead = () => {
    setUnreadCount(0);
  };

  return (
    <div className="notification-bell-container" ref={dropdownRef}>
      <button 
        className={`notification-bell ${isOpen ? 'active' : ''}`}
        onClick={handleBellClick}
        aria-label="Notifications"
      >
        <FaBell className="bell-icon" />
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>
      
      {isOpen && (
        <NotificationDropdown
          notifications={notifications}
          unreadCount={unreadCount}
          onNotificationClick={handleNotificationClick}
          onMarkAllRead={markAllAsRead}
          onNotificationDetailClick={handleNotificationDetailClick}
        />
      )}
      
      {isDetailPanelOpen && (
        <NotificationDetailPanel
          notification={selectedNotification}
          onClose={handleCloseDetailPanel}
          onAction={handleNotificationAction}
        />
      )}
    </div>
  );
};

export default NotificationBell;
