import React from 'react';
import { 
  FaTimes, 
  FaCheckCircle, 
  FaInfoCircle, 
  FaExclamationTriangle, 
  FaCar,
  FaUser,
  FaCalendar,
  FaDollarSign,
  FaPhone,
  FaEnvelope,
  FaEye,
  FaEdit,
  FaCheck,
  FaBell,
  FaTimes as FaClose
} from 'react-icons/fa';
import '../styles/NotificationDetailPanel.css';

const NotificationDetailPanel = ({ notification, onClose, onAction }) => {
  if (!notification) return null;

  const getIconByType = (type) => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="detail-icon success" />;
      case 'warning':
        return <FaExclamationTriangle className="detail-icon warning" />;
      case 'error':
        return <FaClose className="detail-icon error" />;
      default:
        return <FaInfoCircle className="detail-icon info" />;
    }
  };

  const getNotificationDetails = (notification) => {
    // Handle specific notification titles first
    if (notification.title.includes('Sale Completed')) {
      return {
        icon: <FaCar className="detail-icon success" />,
        subtitle: 'Transaction Completed',
        details: [
          { icon: <FaDollarSign />, label: 'Sale Price', value: '$25,000' },
          { icon: <FaUser />, label: 'Customer', value: 'John Smith' },
          { icon: <FaCalendar />, label: 'Date', value: 'Today, 2:30 PM' },
          { icon: <FaPhone />, label: 'Contact', value: '+1 (555) 123-4567' }
        ],
        actions: [
          { label: 'View Car Details', type: 'primary', icon: <FaEye /> },
          { label: 'Contact Customer', type: 'secondary', icon: <FaPhone /> },
          { label: 'Mark as Done', type: 'success', icon: <FaCheck /> }
        ]
      };
    }
    
    if (notification.title.includes('Payment Received')) {
      return {
        icon: <FaDollarSign className="detail-icon success" />,
        subtitle: 'Payment Received',
        details: [
          { icon: <FaDollarSign />, label: 'Amount', value: '$45,000' },
          { icon: <FaUser />, label: 'From', value: 'Sarah Johnson' },
          { icon: <FaCalendar />, label: 'Date', value: 'Today, 1:15 PM' },
          { icon: <FaCar />, label: 'Vehicle', value: 'BMW 3 Series 2023' }
        ],
        actions: [
          { label: 'View Transaction', type: 'primary', icon: <FaEye /> },
          { label: 'Send Receipt', type: 'secondary', icon: <FaEnvelope /> },
          { label: 'Mark as Done', type: 'success', icon: <FaCheck /> }
        ]
      };
    }
    
    if (notification.title.includes('New Customer Inquiry')) {
      return {
        icon: <FaUser className="detail-icon info" />,
        subtitle: 'New Customer Inquiry',
        details: [
          { icon: <FaUser />, label: 'Customer', value: 'John Smith' },
          { icon: <FaCar />, label: 'Interested In', value: 'Mercedes C-Class' },
          { icon: <FaPhone />, label: 'Phone', value: '+1 (555) 987-6543' },
          { icon: <FaEnvelope />, label: 'Email', value: 'john.smith@email.com' }
        ],
        actions: [
          { label: 'View Customer Profile', type: 'primary', icon: <FaEye /> },
          { label: 'Contact Customer', type: 'secondary', icon: <FaPhone /> },
          { label: 'Mark as Done', type: 'success', icon: <FaCheck /> }
        ]
      };
    }
    
    if (notification.title.includes('Maintenance Due')) {
      return {
        icon: <FaExclamationTriangle className="detail-icon warning" />,
        subtitle: 'Maintenance Required',
        details: [
          { icon: <FaCar />, label: 'Vehicle', value: 'Honda Civic 2021' },
          { icon: <FaCalendar />, label: 'Due Date', value: 'Tomorrow, 9:00 AM' },
          { icon: <FaUser />, label: 'Customer', value: 'Mike Wilson' },
          { icon: <FaPhone />, label: 'Contact', value: '+1 (555) 456-7890' }
        ],
        actions: [
          { label: 'Schedule Maintenance', type: 'primary', icon: <FaCalendar /> },
          { label: 'View Car Details', type: 'secondary', icon: <FaEye /> },
          { label: 'Contact Customer', type: 'secondary', icon: <FaPhone /> },
          { label: 'Mark as Done', type: 'success', icon: <FaCheck /> }
        ]
      };
    }
    
    if (notification.title.includes('New Car Added')) {
      return {
        icon: <FaCar className="detail-icon success" />,
        subtitle: 'New Vehicle Added',
        details: [
          { icon: <FaCar />, label: 'Vehicle', value: 'BMW X5 2023' },
          { icon: <FaCalendar />, label: 'Added', value: '2 minutes ago' },
          { icon: <FaDollarSign />, label: 'Price', value: '$65,000' },
          { icon: <FaUser />, label: 'Added By', value: 'John Dealer' }
        ],
        actions: [
          { label: 'View Car Details', type: 'primary', icon: <FaEye /> },
          { label: 'Edit Listing', type: 'secondary', icon: <FaEdit /> },
          { label: 'Mark as Done', type: 'success', icon: <FaCheck /> }
        ]
      };
    }
    
    // Default fallback for any notification type
    return {
      icon: getIconByType(notification.type),
      subtitle: 'Notification Details',
      details: [
        { icon: <FaCalendar />, label: 'Time', value: notification.time },
        { icon: <FaInfoCircle />, label: 'Type', value: notification.type },
        { icon: <FaBell />, label: 'Status', value: notification.read ? 'Read' : 'Unread' }
      ],
      actions: [
        { label: 'Mark as Done', type: 'success', icon: <FaCheck /> }
      ]
    };
  };

  const notificationDetails = getNotificationDetails(notification);

  const handleAction = (action) => {
    onAction(notification.id, action);
  };

  return (
    <>
      {/* Backdrop */}
      <div className="notification-backdrop" onClick={onClose}></div>
      
      {/* Side Panel */}
      <div className="notification-detail-panel">
        {/* Header */}
        <div className="panel-header">
          <div className="panel-title">
            {notificationDetails.icon}
            <div className="title-content">
              <h3>{notification.title}</h3>
              <p className="subtitle">{notificationDetails.subtitle}</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="panel-content">
          <div className="notification-message">
            <p>{notification.message}</p>
          </div>

          {/* Details */}
          <div className="details-section">
            <h4>Details</h4>
            <div className="details-list">
              {notificationDetails.details.map((detail, index) => (
                <div key={index} className="detail-item">
                  <div className="detail-icon">{detail.icon}</div>
                  <div className="detail-content">
                    <span className="detail-label">{detail.label}</span>
                    <span className="detail-value">{detail.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="panel-actions">
          {notificationDetails.actions.map((action, index) => (
            <button
              key={index}
              className={`action-btn ${action.type}`}
              onClick={() => handleAction(action)}
            >
              {action.icon}
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default NotificationDetailPanel;
