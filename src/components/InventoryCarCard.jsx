import React, { useState } from 'react';
import { 
  FaEye,
  FaEdit,
  FaShare, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaCog, 
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatPrice = (price) => {
    // Convert USD to PKR (assuming 1 USD = 280 PKR)
    const pkrPrice = price * 280;
    
    if (pkrPrice >= 10000000) { // 1 crore or more
      const crores = pkrPrice / 10000000;
      return `PKR ${crores.toFixed(1)} Cr`;
    } else if (pkrPrice >= 100000) { // 1 lakh or more
      const lacs = pkrPrice / 100000;
      return `PKR ${lacs.toFixed(1)} Lac`;
    } else {
      return `PKR ${new Intl.NumberFormat('en-US').format(pkrPrice)}`;
    }
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
      onClick={() => onView(car)}
      style={{ cursor: 'pointer' }}
    >
      {/* Image Section */}
      <div className="inventory-car-image-section">
        <div className="inventory-car-image-container">
          <img 
            src={car.images[currentImageIndex]} 
            alt={`${car.make} ${car.model}`}
            className="inventory-car-image"
          />
          
        </div>
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
          <span className="inventory-price-icon">₨</span>
          <span className="inventory-price-amount">{formatPrice(car.price)}</span>
        </div>

        {/* Key Details Grid - 2x2 Layout */}
        <div className="inventory-car-details-grid">
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
          <div className="inventory-detail-item">
            <FaMapMarkerAlt className="inventory-detail-icon" />
            <span className="inventory-detail-text">{car.location}</span>
          </div>
        </div>

        {/* Date Row */}
        <div className="inventory-car-date-row">
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
            onClick={(e) => {
              e.stopPropagation();
              onEdit(car);
            }}
          >
            <FaEdit />
            Edit
          </button>
          <button 
            className="inventory-btn inventory-btn-danger"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(car);
            }}
          >
            <FaEdit />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryCarCard;
