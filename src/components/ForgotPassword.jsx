import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import '../styles/ForgotPassword.css';
import companyLogo from '../assets/images/company-logo-black.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    // Basic validation
    if (!email) {
      setError('Please enter your email address');
      setIsLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    // Simulate API call with setTimeout
    setTimeout(() => {
      console.log('Static password reset requested for:', email);
      
      // Store email for OTP verification (static flow)
      localStorage.setItem("email", email);
      
      setSuccess(true);
      setIsLoading(false);
      
      // Navigate to OTP screen after a short delay
      setTimeout(() => {
        navigate('/otp');
      }, 1500);
    }, 1000); // Simulate 1 second loading
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <div className="forgot-header">
          <div className="forgot-logo-container">
            <img src={companyLogo} alt="Cars Crack Dealer Logo" className="forgot-logo-icon" />
            <h1 className="forgot-company-name">Warehouse Management</h1>
          </div>
          <h2 className="forgot-title">Forgot Password?</h2>
          <p className="forgot-text">Enter your email address and we'll send you an email to reset your password.</p>
        </div>

        <form className="forgot-form" onSubmit={handleSubmit}>
          {error && (
            <div className="forgot-error-message">
              {error}
            </div>
          )}
          
          {success && (
            <div className="forgot-success-message">
              Reset link sent successfully! Redirecting to OTP verification...
            </div>
          )}
          
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
              disabled={isLoading || success}
            />
          </div>

          <button 
            type="submit" 
            className="forgot-reset-button"
            disabled={isLoading || success}
          >
            <FaEnvelope />
            {isLoading ? 'Sending...' : success ? 'Sent!' : 'Send Reset Link'}
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
