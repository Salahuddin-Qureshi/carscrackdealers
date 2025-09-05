import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
      <div className="background-decoration">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>
      
      <div className="signup-card">
        <div className="signup-header">
          <div className="logo-container">
            <img src={companyLogo} alt="Cars Crack Dealer Logo" className="logo-icon" />
            <h1 className="company-name">Cars Crack Dealer</h1>
          </div>
          <p className="welcome-text">Create your dealer account</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dealerName" className="form-label">Dealer Name</label>
              <input
                type="text"
                id="dealerName"
                name="dealerName"
                value={formData.dealerName}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter dealer name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="companyName" className="form-label">Company Name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter company name"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter address"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city" className="form-label">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter city"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="age" className="form-label">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter age"
                min="18"
                max="100"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter password"
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
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <div className="input-container">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Confirm password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
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
          </div>

          <button type="submit" className="signup-button" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="signup-footer">
          <p className="login-text">
            Already have an account? <Link to="/login" className="login-link">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
