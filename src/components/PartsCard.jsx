import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../styles/PartsCard.css';

const PartsCard = ({ part, onView, onEdit, onDelete }) => {
  const formatPrice = (price) => {
    const pkrPrice = price * 280; // Assuming 1 USD = 280 PKR
    if (pkrPrice >= 10000000) {
      const crores = pkrPrice / 10000000;
      return `${crores.toFixed(1)} Cr`;
    } else if (pkrPrice >= 100000) {
      const lacs = pkrPrice / 100000;
      return `${lacs.toFixed(1)} Lac`;
    } else {
      return `${new Intl.NumberFormat('en-US').format(pkrPrice)}`;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };


  return (
    <div 
      className="parts-card parts-card-compact"
      onClick={() => onView(part)}
      style={{ cursor: 'pointer' }}
    >
      <div className="parts-image-section">
        <img 
          src={part.images[0] || '/api/placeholder/300/200'} 
          alt={part.name}
          className="parts-image"
        />
      </div>

      <div className="parts-content">
        <div className="parts-header">
          <h3 className="parts-title">{part.name}</h3>
          <div className="parts-price">
            <span className="parts-price-amount">{formatPrice(part.price)}</span>
          </div>
        </div>

        <div className="parts-details">
          <div className="parts-detail-item">
            <span className="parts-detail-label">Make:</span>
            <span className="parts-detail-value">{part.make}</span>
          </div>
          <div className="parts-detail-item">
            <span className="parts-detail-label">Model:</span>
            <span className="parts-detail-value">{part.model}</span>
          </div>
          <div className="parts-detail-item">
            <span className="parts-detail-label">Year:</span>
            <span className="parts-detail-value">{part.year}</span>
          </div>
          <div className="parts-detail-item">
            <span className="parts-detail-label">Stock:</span>
            <span className="parts-detail-value">{part.stock} units</span>
          </div>
        </div>

        <div className="parts-description">
          <p className="parts-description-text">{part.description}</p>
        </div>

        <div className="parts-meta">
          <div className="parts-meta-item">
            <span className="parts-meta-label">Added:</span>
            <span className="parts-meta-value">{formatDate(part.dateAdded)}</span>
          </div>
        </div>

        <div className="parts-actions">
          <button 
            className="parts-btn parts-btn-primary"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(part);
            }}
          >
            <FaEdit />
            Edit
          </button>
          <button 
            className="parts-btn parts-btn-danger"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(part);
            }}
          >
            <FaTrash />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartsCard;
