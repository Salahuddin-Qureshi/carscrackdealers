import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/OTPScreen.css';
import companyLogo from '../assets/images/company-logo-black.png';
import SuccessPopup from './SuccessPopup';

const OTPScreen = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // Get email from localStorage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // If no email found, redirect to signup
      navigate('/signup');
    }
  }, [navigate]);

  useEffect(() => {
    if (inputRefs.current[activeIndex]) {
      inputRefs.current[activeIndex].focus();
    }
  }, [activeIndex]);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      setActiveIndex(index + 1);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      setActiveIndex(index - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      setIsLoading(false);
      return;
    }

    // Simulate API call with setTimeout
    setTimeout(() => {
      // For demo purposes, accept any 6-digit OTP
      // In a real app, you would validate against your backend
      
      console.log('Static OTP verification successful for:', email);
      console.log('OTP entered:', otpString);
      
      // Clear email from localStorage
      localStorage.removeItem('email');
      
      // Show success popup
      setShowSuccessPopup(true);
      setIsLoading(false);
    }, 1000); // Simulate 1 second loading
  };

  const resendOTP = () => {
    console.log('Resending OTP...');
  };

  const handlePopupClose = () => {
    setShowSuccessPopup(false);
    // Navigate to login page after popup closes
    navigate('/login');
  };

  return (
    <div className="otp-container">
      <div className="otp-card">
        <div className="otp-header">
          <div className="logo-container">
            <img src={companyLogo} alt="Cars Crack Dealer Logo" className="logo-icon" />
            <h1 className="company-name">Warehouse Management</h1>
          </div>
          <h2 className="otp-title">Verify OTP</h2>
          <p className="otp-text">We've sent a 6-digit code to your email</p>
          {/* {email && <p className="email-display">Email: {email}</p>} */}
        </div>

        <form className="otp-form" onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onFocus={() => setActiveIndex(index)}
                className={`otp-input ${activeIndex === index ? 'active' : ''}`}
                inputMode="numeric"
                pattern="[0-9]*"
              />
            ))}
          </div>

          <button type="submit" className="verify-button" disabled={otp.some(digit => !digit) || isLoading}>
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <div className="otp-footer">
          <p className="resend-text">
            Didn't receive the code? <button onClick={resendOTP} className="resend-link">Resend</button>
          </p>
          <p className="back-text">
            <Link to="/forgot-password" className="back-link">Back to forgot password</Link>
          </p>
        </div>
      </div>

      {/* Success Popup */}
      <SuccessPopup 
        isOpen={showSuccessPopup} 
        onClose={handlePopupClose} 
      />
    </div>
  );
};

export default OTPScreen;
