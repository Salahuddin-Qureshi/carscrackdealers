import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import '../styles/ForgotPassword.css';
import companyLogo from '../assets/images/company-logo-black.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Password reset requested for:', email);
    navigate('/otp');
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <div className="forgot-header">
          <div className="forgot-logo-container">
            <img src={companyLogo} alt="Cars Crack Dealer Logo" className="forgot-logo-icon" />
            <h1 className="forgot-company-name">Cars Crack Dealer</h1>
          </div>
          <h2 className="forgot-title">Forgot Password?</h2>
          <p className="forgot-text">Enter your email address and we'll send you an email to reset your password.</p>
        </div>

        <form className="forgot-form" onSubmit={handleSubmit}>
          <div className="forgot-form-group">
            <label htmlFor="email" className="forgot-form-label">
              <FaEnvelope className="forgot-input-icon" />
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="forgot-form-input"
              placeholder="Enter your email"
              required
            />
          </div>

          <button type="submit" className="forgot-reset-button">
            <FaEnvelope />
            Send Reset Link
          </button>
        </form>

        <div className="forgot-footer">
          <p className="forgot-back-text">
            <FaArrowLeft className="forgot-back-icon" />
            Remember your password? <Link to="/login" className="forgot-back-link">Back to login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
