import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
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

  // Get base URL from environment variables
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Debug: Log the full API URL
    const apiUrl = `${baseUrl}/vendor/login/`;

    try {
      const response = await axios.post(
        apiUrl,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        const responseData = response.data;
        
        // Save login status
        Cookies.set('isLoggedIn', 'true', { expires: 7 }); // 7 days
        
        // Save access token
        const accessToken = responseData.token?.access;
        if (accessToken) {
          Cookies.set('accessToken', accessToken, { expires: 7 });
        }
        
        // Save refresh token
        const refreshToken = responseData.token?.refresh;
        if (refreshToken) {
          Cookies.set('refreshToken', refreshToken, { expires: 30 }); // 30 days
        }

        
        // Navigate to dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      
      if (error.response) {
        // Server responded with error status
        const responseData = error.response.data;
        
        // Handle specific error formats from your backend
        if (responseData?.errors) {
          // Handle multiple field errors
          const errorMessages = [];
          
          if (responseData.errors.email) {
            errorMessages.push(`Email: ${responseData.errors.email}`);
          }
          if (responseData.errors.password) {
            errorMessages.push(`Password: ${responseData.errors.password}`);
          }
          
          setError(errorMessages.join('. '));
        } else if (responseData?.message) {
          // Handle single message error
          setError(responseData.message);
        } else if (responseData?.detail) {
          // Handle detail error
          setError(responseData.detail);
        } else {
          // Fallback error message
          setError('Login failed. Please try again.');
        }
      } else if (error.request) {
        // Network error
        setError('Network error. Please check your connection.');
      } else {
        // Other error
        setError('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-container">
            <img src={companyLogo} alt="Cars Crack Dealer Logo" className="logo-icon" />
            <h1 className="company-name">Cars Crack Dealer</h1>
          </div>
          <p className="welcome-text">Welcome back! Please sign in to your account.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <div className="input-container">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your email"
                required
              />
              
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your password"
                required
              />
              
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 12S5 4 12 4S23 12 23 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 5C14.12 5 16 6.88 16 9C16 11.12 14.12 13 12 13C9.88 13 8 11.12 8 9C8 6.88 9.88 5 12 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20C7 20 2 17 2 12C2 7 7 4 12 4C17 4 22 7 22 12C22 17 17.94 17.94 17.94 17.94Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 3L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" className="checkbox" />
              <span className="checkmark"></span>
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p className="signup-text">
            Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link>
          </p>
        </div>
      </div>

      <div className="background-decoration">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>
    </div>
  );
};

export default Login;
