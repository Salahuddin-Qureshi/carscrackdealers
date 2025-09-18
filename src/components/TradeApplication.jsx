import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaCar, FaExchangeAlt, FaDollarSign, FaCheck, FaUpload, FaTimes } from 'react-icons/fa';
import '../styles/TradeApplication.css';

const TradeApplication = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // User Details
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    
    // User Car Details
    userCarMake: '',
    userCarModel: '',
    userCarYear: '',
    userCarMileage: '',
    userCarCondition: '',
    userCarValue: '',
    
    // Dealer Car Selection
    selectedDealerCar: '',
    
    // Trade Details
    extraAmount: '',
    tradeType: 'upgrade', // upgrade or downgrade
    additionalNotes: ''
  });

  const [dealerCars, setDealerCars] = useState([]);
  const [userCarImages, setUserCarImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch dealer cars for selection
  useEffect(() => {
    const fetchDealerCars = async () => {
      try {
        // Simulate API call - replace with actual API
        const mockCars = [
          { id: 1, make: 'Toyota', model: 'Corolla', year: 2022, price: 4500000, image: '/api/placeholder/300/200' },
          { id: 2, make: 'Honda', model: 'Civic', year: 2021, price: 4200000, image: '/api/placeholder/300/200' },
          { id: 3, make: 'Suzuki', model: 'Swift', year: 2023, price: 2800000, image: '/api/placeholder/300/200' },
          { id: 4, make: 'Nissan', model: 'Sentra', year: 2020, price: 3800000, image: '/api/placeholder/300/200' },
          { id: 5, make: 'Hyundai', model: 'Elantra', year: 2022, price: 4000000, image: '/api/placeholder/300/200' }
        ];
        setDealerCars(mockCars);
      } catch (error) {
        console.error('Error fetching dealer cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDealerCars();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.slice(0, 5 - userCarImages.length); // Max 5 images
    
    newImages.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUserCarImages(prev => [...prev, {
            id: Date.now() + Math.random(),
            file,
            url: e.target.result
          }]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (imageId) => {
    setUserCarImages(prev => prev.filter(img => img.id !== imageId));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    const requiredFields = [
      'fullName', 'email', 'phone', 'userCarMake', 'userCarModel', 
      'userCarYear', 'userCarValue', 'selectedDealerCar'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (formData.phone && !/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    // At least 1 image required
    if (userCarImages.length === 0) {
      newErrors.images = 'At least 1 image of your car is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create FormData for file upload
      const submitData = new FormData();
      
      // Add form data
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });
      
      // Add images
      userCarImages.forEach((image, index) => {
        submitData.append(`userCarImages`, image.file);
      });
      
      // Here you would make the API call
      console.log('Submitting trade application:', formData);
      console.log('User car images:', userCarImages);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Trade application submitted successfully! We will contact you soon.');
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Error submitting trade application:', error);
      alert('Error submitting trade application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCar = dealerCars.find(car => car.id.toString() === formData.selectedDealerCar);

  return (
    <div className="trade-application-container">
      <form onSubmit={handleSubmit} className="trade-application-form">
        {/* User Details Section */}
        <div className="trade-section">
          <h2>
            <FaUser />
            Personal Information
          </h2>
          <div className="trade-form-grid">
            <div className="trade-form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className={errors.fullName ? 'error' : ''}
              />
              {errors.fullName && <div className="trade-error">{errors.fullName}</div>}
            </div>

            <div className="trade-form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <div className="trade-error">{errors.email}</div>}
            </div>

            <div className="trade-form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <div className="trade-error">{errors.phone}</div>}
            </div>

            <div className="trade-form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
              />
            </div>

            <div className="trade-form-group">
              <label htmlFor="city">City</label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              >
                <option value="">Select City</option>
                <option value="karachi">Karachi</option>
                <option value="lahore">Lahore</option>
                <option value="islamabad">Islamabad</option>
                <option value="rawalpindi">Rawalpindi</option>
                <option value="faisalabad">Faisalabad</option>
                <option value="multan">Multan</option>
                <option value="peshawar">Peshawar</option>
                <option value="quetta">Quetta</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* User Car Details Section */}
        <div className="trade-section">
          <h2>
            <FaCar />
            Your Car Details
          </h2>
          
          {/* Car Images */}
          <div className="trade-image-upload">
            <div className="trade-image-upload-area">
              <input
                type="file"
                id="userCarImages"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="trade-image-input"
              />
              <label htmlFor="userCarImages" className="trade-image-label">
                <FaUpload />
                <span>Upload Your Car Images (Up to 5)</span>
                <small>At least 1 image required</small>
              </label>
            </div>
            
            {userCarImages.length > 0 && (
              <div className="trade-image-preview">
                {userCarImages.map((image) => (
                  <div key={image.id} className="trade-image-item">
                    <img src={image.url} alt="Car preview" />
                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      className="trade-image-remove"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {errors.images && (
              <div className="trade-error">{errors.images}</div>
            )}
          </div>

          <div className="trade-form-grid">
            <div className="trade-form-group">
              <label htmlFor="userCarMake">Make *</label>
              <select
                id="userCarMake"
                name="userCarMake"
                value={formData.userCarMake}
                onChange={handleInputChange}
                className={errors.userCarMake ? 'error' : ''}
              >
                <option value="">Select Make</option>
                <option value="toyota">Toyota</option>
                <option value="honda">Honda</option>
                <option value="suzuki">Suzuki</option>
                <option value="nissan">Nissan</option>
                <option value="mitsubishi">Mitsubishi</option>
                <option value="hyundai">Hyundai</option>
                <option value="kia">Kia</option>
                <option value="mazda">Mazda</option>
                <option value="ford">Ford</option>
                <option value="chevrolet">Chevrolet</option>
                <option value="bmw">BMW</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
                <option value="volkswagen">Volkswagen</option>
                <option value="other">Other</option>
              </select>
              {errors.userCarMake && <div className="trade-error">{errors.userCarMake}</div>}
            </div>

            <div className="trade-form-group">
              <label htmlFor="userCarModel">Model *</label>
              <input
                type="text"
                id="userCarModel"
                name="userCarModel"
                value={formData.userCarModel}
                onChange={handleInputChange}
                placeholder="Enter car model"
                className={errors.userCarModel ? 'error' : ''}
              />
              {errors.userCarModel && <div className="trade-error">{errors.userCarModel}</div>}
            </div>

            <div className="trade-form-group">
              <label htmlFor="userCarYear">Year *</label>
              <select
                id="userCarYear"
                name="userCarYear"
                value={formData.userCarYear}
                onChange={handleInputChange}
                className={errors.userCarYear ? 'error' : ''}
              >
                <option value="">Select Year</option>
                {Array.from({ length: 25 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
              {errors.userCarYear && <div className="trade-error">{errors.userCarYear}</div>}
            </div>

            <div className="trade-form-group">
              <label htmlFor="userCarMileage">Mileage (km)</label>
              <input
                type="number"
                id="userCarMileage"
                name="userCarMileage"
                value={formData.userCarMileage}
                onChange={handleInputChange}
                placeholder="Enter mileage"
              />
            </div>

            <div className="trade-form-group">
              <label htmlFor="userCarCondition">Condition</label>
              <select
                id="userCarCondition"
                name="userCarCondition"
                value={formData.userCarCondition}
                onChange={handleInputChange}
              >
                <option value="">Select Condition</option>
                <option value="excellent">Excellent</option>
                <option value="very-good">Very Good</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>

            <div className="trade-form-group">
              <label htmlFor="userCarValue">Your Car Value (PKR) *</label>
              <input
                type="number"
                id="userCarValue"
                name="userCarValue"
                value={formData.userCarValue}
                onChange={handleInputChange}
                placeholder="Enter estimated value"
                className={errors.userCarValue ? 'error' : ''}
              />
              {errors.userCarValue && <div className="trade-error">{errors.userCarValue}</div>}
            </div>
          </div>
        </div>

        {/* Dealer Car Selection */}
        <div className="trade-section">
          <h2>
            <FaExchangeAlt />
            Select Car to Trade With
          </h2>
          
          {loading ? (
            <div className="trade-loading">Loading available cars...</div>
          ) : (
            <div className="trade-dealer-cars">
              <div className="trade-form-group">
                <label htmlFor="selectedDealerCar">Choose Dealer Car *</label>
                <select
                  id="selectedDealerCar"
                  name="selectedDealerCar"
                  value={formData.selectedDealerCar}
                  onChange={handleInputChange}
                  className={errors.selectedDealerCar ? 'error' : ''}
                >
                  <option value="">Select a car to trade with</option>
                  {dealerCars.map(car => (
                    <option key={car.id} value={car.id}>
                      {car.year} {car.make} {car.model} - PKR {car.price.toLocaleString()}
                    </option>
                  ))}
                </select>
                {errors.selectedDealerCar && <div className="trade-error">{errors.selectedDealerCar}</div>}
              </div>

              {selectedCar && (
                <div className="trade-selected-car">
                  <h3>Selected Car Details:</h3>
                  <div className="trade-car-preview">
                    <div className="trade-car-info">
                      <h4>{selectedCar.year} {selectedCar.make} {selectedCar.model}</h4>
                      <p className="trade-car-price">PKR {selectedCar.price.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Trade Details */}
        <div className="trade-section">
          <h2>
            <FaDollarSign />
            Trade Details
          </h2>
          
          <div className="trade-form-grid">
            <div className="trade-form-group">
              <label htmlFor="extraAmount">Extra Amount (PKR)</label>
              <input
                type="number"
                id="extraAmount"
                name="extraAmount"
                value={formData.extraAmount}
                onChange={handleInputChange}
                placeholder="Enter additional amount"
              />
              <small>Leave empty if no additional payment needed</small>
            </div>

            <div className="trade-form-group">
              <label htmlFor="tradeType">Trade Type</label>
              <select
                id="tradeType"
                name="tradeType"
                value={formData.tradeType}
                onChange={handleInputChange}
              >
                <option value="upgrade">Upgrade (Pay Extra)</option>
                <option value="downgrade">Downgrade (Receive Cash)</option>
                <option value="even">Even Trade</option>
              </select>
            </div>
          </div>

          <div className="trade-form-group full-width">
            <label htmlFor="additionalNotes">Additional Notes</label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleInputChange}
              placeholder="Any additional information about your trade request..."
              rows="4"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="trade-submit">
          <button
            type="submit"
            className="trade-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="trade-spinner"></div>
                Submitting Application...
              </>
            ) : (
              <>
                <FaCheck />
                Submit Trade Application
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TradeApplication;
