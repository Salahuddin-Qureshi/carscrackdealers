import React from 'react';
import { FaEdit, FaTrash, FaFileAlt, FaFolder, FaArchive, FaCogs } from 'react-icons/fa';
import '../styles/PartsCard.css';

const PartsCard = ({ part, onView, onEdit, onDelete }) => {
  const formatStorageSize = (size) => {
    return size; // Already formatted as "X.X GB"
  };

  const formatDocumentCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'FaFileAlt':
        return <FaFileAlt size={20} />;
      case 'FaFolder':
        return <FaFolder size={20} />;
      case 'FaArchive':
        return <FaArchive size={20} />;
      case 'FaCogs':
        return <FaCogs size={20} />;
      default:
        return <FaFileAlt size={20} />;
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
        <div className="parts-icon-container">
          {getCategoryIcon(part.icon)}
        </div>
      </div>

      <div className="parts-content">
        <div className="parts-header">
          <h3 className="parts-title">{part.name}</h3>
          <div className="parts-price">
            <span className="parts-price-amount">{formatDocumentCount(part.documentCount)} docs</span>
          </div>
        </div>

        <div className="parts-details">
          <div className="parts-detail-item">
            <span className="parts-detail-label">Category:</span>
            <span className="parts-detail-value">{part.category}</span>
          </div>
          <div className="parts-detail-item">
            <span className="parts-detail-label">Type:</span>
            <span className="parts-detail-value">{part.type}</span>
          </div>
          <div className="parts-detail-item">
            <span className="parts-detail-label">Storage:</span>
            <span className="parts-detail-value">{formatStorageSize(part.storageSize)}</span>
          </div>
          <div className="parts-detail-item">
            <span className="parts-detail-label">Status:</span>
            <span className={`parts-detail-value parts-status-${part.status}`}>
              {part.status.charAt(0).toUpperCase() + part.status.slice(1)}
            </span>
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
          <div className="parts-meta-item">
            <span className="parts-meta-label">Retention:</span>
            <span className="parts-meta-value">{part.retentionPeriod}</span>
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
