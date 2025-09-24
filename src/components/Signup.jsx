import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    if (!formData.dealerName || !formData.companyName || !formData.email || 
        !formData.phone || !formData.address || !formData.city || 
        !formData.age || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    // Validate age
    const age = parseInt(formData.age);
    if (age < 18 || age > 100) {
      setError('Age must be between 18 and 100');
      setIsLoading(false);
      return;
    }

    // Simulate API call with setTimeout
    setTimeout(() => {
      console.log('Static signup successful for:', formData.email);
      
      // Store email for OTP verification (static flow)
      localStorage.setItem("email", formData.email);
        
        // Navigate to OTP screen
        navigate('/otp');
      setIsLoading(false);
    }, 1500); // Simulate 1.5 second loading
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
            <h1 className="signup-company-name">Warehouse Management</h1>
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
