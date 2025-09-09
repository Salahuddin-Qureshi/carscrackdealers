import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser, FaBuilding, FaPhone, FaMapMarkerAlt, FaCity, FaCalendarAlt } from 'react-icons/fa';
import '../styles/Signup.css';
import companyLogo from '../assets/images/company-logo-black.png';

const Signup = () => {
  const [formData, setFormData] = useState({
    dealerName: '',
    companyName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    age: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const apiUrl = `${baseUrl}/vendor/register/`;
      const payload = {
        phone_number: formData.phone, // Assuming no country code for now
        name: formData.dealerName,
        company_name: formData.companyName,
        address: formData.address,
        email: formData.email,
        city: formData.city,
        age: parseInt(formData.age),
        password: formData.password,
        confirm_password: formData.confirmPassword,
      };

      console.log("Sending vendor registration request to:", apiUrl);
      console.log("Vendor payload:", payload);

      const response = await axios.post(apiUrl, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Vendor registration response status:", response.status);
      console.log("Vendor registration response data:", response.data);

      if (response.status === 200 || response.status === 201) {
        const email = response.data.email || formData.email;
        console.log("OTP sent successfully to email:", email);
        
        // Store email for OTP verification
        localStorage.setItem("email", email);
        
        // Navigate to OTP screen
        navigate('/otp');
      }
    } catch (error) {
      console.error('Signup error:', error);
      
      if (error.response) {
        // Server responded with error status
        const responseData = error.response.data;
        
        // Handle specific error formats from your backend
        if (responseData?.errors) {
          // Handle multiple field errors
          const errorMessages = [];
          
          Object.keys(responseData.errors).forEach(field => {
            if (responseData.errors[field]) {
              errorMessages.push(`${field}: ${responseData.errors[field]}`);
            }
          });
          
          setError(errorMessages.join('. '));
        } else if (responseData?.message) {
          // Handle single message error
          setError(responseData.message);
        } else if (responseData?.detail) {
          // Handle detail error
          setError(responseData.detail);
        } else {
          // Fallback error message
          setError('Registration failed. Please try again.');
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
    <div className="signup-container">
      {/* Background Decoration */}
      <div className="signup-background-decoration">
        <div className="signup-floating-shape signup-shape-1"></div>
        <div className="signup-floating-shape signup-shape-2"></div>
        <div className="signup-floating-shape signup-shape-3"></div>
      </div>
      
      <div className="signup-card">
        <div className="signup-header">
          <div className="signup-logo-container">
            <img src={companyLogo} alt="Cars Crack Dealer Logo" className="signup-logo-icon" />
            <h1 className="signup-company-name">Cars Crack Dealer</h1>
          </div>
          <p className="signup-welcome-text">Create your dealer account</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          {error && (
            <div className="signup-error-message">
              {error}
            </div>
          )}
          
          <div className="signup-form-row">
            <div className="signup-form-group">
              <label htmlFor="dealerName" className="signup-form-label">
                <FaUser className="signup-input-icon" />
                Dealer Name
              </label>
              <input
                type="text"
                id="dealerName"
                name="dealerName"
                value={formData.dealerName}
                onChange={handleChange}
                className="signup-form-input"
                placeholder="Enter dealer name"
                required
              />
            </div>
            <div className="signup-form-group">
              <label htmlFor="companyName" className="signup-form-label">
                <FaBuilding className="signup-input-icon" />
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="signup-form-input"
                placeholder="Enter company name"
                required
              />
            </div>
          </div>

          <div className="signup-form-row">
            <div className="signup-form-group">
              <label htmlFor="email" className="signup-form-label">
                <FaEnvelope className="signup-input-icon" />
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="signup-form-input"
                placeholder="Enter email"
                required
              />
            </div>
            <div className="signup-form-group">
              <label htmlFor="phone" className="signup-form-label">
                <FaPhone className="signup-input-icon" />
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="signup-form-input"
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          <div className="signup-form-group">
            <label htmlFor="address" className="signup-form-label">
              <FaMapMarkerAlt className="signup-input-icon" />
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="signup-form-input"
              placeholder="Enter address"
              required
            />
          </div>

          <div className="signup-form-row">
            <div className="signup-form-group">
              <label htmlFor="city" className="signup-form-label">
                <FaCity className="signup-input-icon" />
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="signup-form-input"
                placeholder="Enter city"
                required
              />
            </div>
            <div className="signup-form-group">
              <label htmlFor="age" className="signup-form-label">
                <FaCalendarAlt className="signup-input-icon" />
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="signup-form-input"
                placeholder="Enter age"
                min="18"
                max="100"
                required
              />
            </div>
          </div>

          <div className="signup-form-row">
            <div className="signup-form-group">
              <label htmlFor="password" className="signup-form-label">
                <FaLock className="signup-input-icon" />
                Password
              </label>
              <div className="signup-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="signup-form-input"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  className="signup-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="signup-form-group">
              <label htmlFor="confirmPassword" className="signup-form-label">
                <FaLock className="signup-input-icon" />
                Confirm Password
              </label>
              <div className="signup-input-container">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="signup-form-input"
                  placeholder="Confirm password"
                  required
                />
                <button
                  type="button"
                  className="signup-password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>

          <button type="submit" className="signup-button" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="signup-footer">
          <p className="signup-login-text">
            Already have an account? <Link to="/login" className="signup-login-link">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
