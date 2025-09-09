import React, { useState } from 'react';
import { 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaHeart, 
  FaShare, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaCog, 
  FaCheckCircle, 
  FaTimesCircle,
  FaClock,
  FaStar,
  FaTag,
  FaDollarSign,
  FaCar,
  FaGasPump,
  FaTachometerAlt,
  FaCogs,
  FaUser,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';
import '../styles/InventoryCarCard.css';

const InventoryCarCard = ({ car, onEdit, onDelete, onView, onStatusChange }) => {
  const [showActions, setShowActions] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return <FaCheckCircle className="inventory-status-icon available" />;
      case 'sold':
        return <FaTimesCircle className="inventory-status-icon sold" />;
      case 'reserved':
        return <FaClock className="inventory-status-icon reserved" />;
      case 'pending':
        return <FaClock className="inventory-status-icon pending" />;
      default:
        return <FaClock className="inventory-status-icon default" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return '#28a745';
      case 'sold':
        return '#dc3545';
      case 'reserved':
        return '#ffc107';
      case 'pending':
        return '#17a2b8';
      default:
        return '#6c757d';
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage) => {
    return new Intl.NumberFormat('en-US').format(mileage);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === car.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? car.images.length - 1 : prev - 1
    );
  };

  return (
    <div 
      className="inventory-car-card inventory-car-card-compact"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Image Section */}
      <div className="inventory-car-image-section">
        <div className="inventory-car-image-container">
          <img 
            src={car.images[currentImageIndex]} 
            alt={`${car.make} ${car.model}`}
            className="inventory-car-image"
          />
          
          {/* Status Badge */}
          <div 
            className="inventory-status-badge"
            style={{ backgroundColor: getStatusColor(car.status) }}
          >
            {getStatusIcon(car.status)}
            <span className="inventory-status-text">{car.status}</span>
          </div>

          {/* Featured Badge */}
          {car.featured && (
            <div className="inventory-featured-badge">
              <FaStar />
            </div>
          )}

          {/* Tag Badge */}
          {car.tag && (
            <div className="inventory-tag-badge">
              <FaTag />
              <span>{car.tag}</span>
            </div>
          )}
        </div>

        {/* Quick Actions Overlay */}
        {showActions && (
          <div className="inventory-quick-actions">
            <button 
              className="inventory-action-btn inventory-view-btn"
              onClick={() => onView(car)}
              title="View Details"
            >
              <FaEye />
            </button>
            <button 
              className="inventory-action-btn inventory-edit-btn"
              onClick={() => onEdit(car)}
              title="Edit Car"
            >
              <FaEdit />
            </button>
            <button 
              className="inventory-action-btn inventory-delete-btn"
              onClick={() => onDelete(car)}
              title="Delete Car"
            >
              <FaTrash />
            </button>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="inventory-car-content">
        {/* Header */}
        <div className="inventory-car-header">
          <h3 className="inventory-car-title">
            {car.year} {car.make} {car.model}
          </h3>
          <p className="inventory-car-variant">{car.variant}</p>
        </div>

        {/* Price */}
        <div className="inventory-car-price">
          <FaDollarSign className="inventory-price-icon" />
          <span className="inventory-price-amount">{formatPrice(car.price)}</span>
        </div>

        {/* Key Details Row */}
        <div className="inventory-car-details-row">
          <div className="inventory-detail-item">
            <FaTachometerAlt className="inventory-detail-icon" />
            <span className="inventory-detail-text">{formatMileage(car.mileage)} miles</span>
          </div>
          <div className="inventory-detail-item">
            <FaGasPump className="inventory-detail-icon" />
            <span className="inventory-detail-text">{car.fuel}</span>
          </div>
          <div className="inventory-detail-item">
            <FaCogs className="inventory-detail-icon" />
            <span className="inventory-detail-text">{car.transmission}</span>
          </div>
        </div>

        {/* Location and Date Row */}
        <div className="inventory-car-meta-row">
          <div className="inventory-car-location">
            <FaMapMarkerAlt className="inventory-location-icon" />
            <span className="inventory-location-text">{car.location}</span>
          </div>
          <div className="inventory-car-date">
            <FaCalendarAlt className="inventory-date-icon" />
            <span className="inventory-date-text">Added: {car.dateAdded}</span>
          </div>
        </div>

        {/* Customer Info (for sold cars) */}
        {car.status === 'sold' && car.customer && (
          <div className="inventory-customer-info">
            <div className="inventory-customer-header">
              <FaUser className="inventory-customer-icon" />
              <span className="inventory-customer-label">Sold to:</span>
            </div>
            <div className="inventory-customer-details">
              <p className="inventory-customer-name">{car.customer.name}</p>
              <div className="inventory-customer-contact">
                <FaPhone className="inventory-contact-icon" />
                <span>{car.customer.phone}</span>
              </div>
              <div className="inventory-customer-contact">
                <FaEnvelope className="inventory-contact-icon" />
                <span>{car.customer.email}</span>
              </div>
            </div>
          </div>
        )}

        {/* Performance Metrics */}
        <div className="inventory-performance-metrics">
          <div className="inventory-metric">
            <span className="inventory-metric-label">Views</span>
            <span className="inventory-metric-value">{car.views || 0}</span>
          </div>
          <div className="inventory-metric">
            <span className="inventory-metric-label">Inquiries</span>
            <span className="inventory-metric-value">{car.inquiries || 0}</span>
          </div>
          <div className="inventory-metric">
            <span className="inventory-metric-label">Days</span>
            <span className="inventory-metric-value">{car.daysListed || 0}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="inventory-car-actions">
          <button 
            className="inventory-btn inventory-btn-primary"
            onClick={() => onView(car)}
          >
            <FaEye />
            View
          </button>
          <button 
            className="inventory-btn inventory-btn-secondary"
            onClick={() => onEdit(car)}
          >
            <FaEdit />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryCarCard;
