import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';
import '../styles/Login.css';
import companyLogo from '../assets/images/company-logo-black.png';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Simulate API call with setTimeout
    setTimeout(() => {
      // For demo purposes, accept any email/password combination
      // In a real app, you would validate against your backend
      
      // Save login status
      Cookies.set('isLoggedIn', 'true', { expires: 7 }); // 7 days
      
      // Save mock access token for demo
      Cookies.set('accessToken', 'mock-access-token-' + Date.now(), { expires: 7 });
      
      // Save mock refresh token for demo
      Cookies.set('refreshToken', 'mock-refresh-token-' + Date.now(), { expires: 30 });
      
      console.log('Static login successful for:', formData.email);
      
      // Navigate to dashboard
      navigate('/dashboard');
      setIsLoading(false);
    }, 1000); // Simulate 1 second loading
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo-container">
            <img src={companyLogo} alt="Cars Crack Dealer Logo" className="login-logo-icon" />
            <h1 className="login-company-name">Warehouse Management</h1>
          </div>
          <p className="login-welcome-text">Welcome back! Please sign in to your account.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="login-error-message">
              {error}
            </div>
          )}
          
          <div className="login-form-group">
            <label htmlFor="email" className="login-form-label">
              <FaEnvelope className="login-input-icon" />
              Email Address
            </label>
            <div className="login-input-container">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="login-form-input"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="login-form-group">
            <label htmlFor="password" className="login-form-label">
              <FaLock className="login-input-icon" />
              Password
            </label>
            <div className="login-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="login-form-input"
                placeholder="Enter your password"
                required
              />
              
              <button
                type="button"
                className="login-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="login-form-options">
            <label className="login-checkbox-container">
              <input type="checkbox" className="login-checkbox" />
              {/* <span className="login-checkmark"></span> */}
              Remember me
            </label>
            <Link to="/forgot-password" className="login-forgot-password">Forgot password?</Link>
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p className="login-signup-text">
            Don't have an account? <Link to="/signup" className="login-signup-link">Sign up</Link>
          </p>
        </div>
      </div>

      <div className="login-background-decoration">
        <div className="login-floating-shape login-shape-1"></div>
        <div className="login-floating-shape login-shape-2"></div>
        <div className="login-floating-shape login-shape-3"></div>
      </div>
    </div>
  );
};

export default Login;
