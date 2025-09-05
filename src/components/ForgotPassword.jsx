import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
          <div className="logo-container">
            <img src={companyLogo} alt="Cars Crack Dealer Logo" className="logo-icon" />
            <h1 className="company-name">Cars Crack Dealer</h1>
          </div>
          <h2 className="forgot-title">Forgot Password?</h2>
          <p className="forgot-text">Enter your email address and we'll send you an email to reset your password.</p>
        </div>

        <form className="forgot-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>

          <button type="submit" className="reset-button">
            Send Reset Link
          </button>
        </form>

        <div className="forgot-footer">
          <p className="back-text">
            Remember your password? <Link to="/login" className="back-link">Back to login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
