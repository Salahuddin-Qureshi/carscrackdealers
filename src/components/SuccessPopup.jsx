import React, { useEffect, useState } from 'react';
import '../styles/SuccessPopup.css';
import companyLogo from '../assets/images/company-logo-black.png';

const SuccessPopup = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className={`success-popup-overlay ${isVisible ? 'visible' : ''}`} onClick={handleClose}>
      <div className="success-popup" onClick={(e) => e.stopPropagation()}>
        <div className="popup-content">
          {/* Success Animation */}
          <div className="success-animation">
            <div className="checkmark-circle">
              <div className="checkmark">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Logo and Company Name */}
          <div className="popup-header">
            <div className="logo-container">
              <img src={companyLogo} alt="Cars Crack Dealer Logo" className="popup-logo" />
              <h1 className="popup-company-name">Cars Crack Dealer</h1>
            </div>
          </div>

          {/* Success Message */}
          <div className="popup-message">
            <h2 className="success-title">Registration Successful!</h2>
            <p className="success-text">
              Thank you for registering with <strong>Cars Crack Dealer</strong>! 
              Our representative will contact you soon to complete your dealer setup.
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="popup-decorations">
            <div className="floating-icon icon-1">🚗</div>
            <div className="floating-icon icon-2">🔧</div>
            <div className="floating-icon icon-3">💼</div>
            <div className="floating-icon icon-4">📞</div>
          </div>

          {/* Action Button */}
          <div className="popup-actions">
            <button className="continue-button" onClick={handleClose}>
              Continue to Login
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;
