import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
          <div className="login-logo-container">
            <img src={companyLogo} alt="Cars Crack Dealer Logo" className="login-logo-icon" />
            <h1 className="login-company-name">Cars Crack Dealer</h1>
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
