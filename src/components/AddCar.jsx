import React, { useState } from 'react';
import { FaUpload, FaTimes, FaCar, FaCog, FaCheck } from 'react-icons/fa';
import '../styles/AddCar.css';

const AddCar = () => {
  const [formData, setFormData] = useState({
    // Basic Information
    make: '',
    model: '',
    variant: '',
    cc: '',
    manufacturingYear: '',
    condition: '',
    mileage: '',
    transmission: '',
    color: '',
    province: '',
    city: '',
    registeredYear: '',
    assemblyType: '',
    askingPrice: '',
    fuelType: '',
    description: '',
    pricingInfo: 'negotiable',
    
    // Car Features
    features: {
      absBrakes: false,
      amfmRadio: false,
      airBags: false,
      airConditioning: false,
      alloyRims: false,
      backupCamera: false,
      cruiseControl: false,
      heatedSeats: false,
      leatherSeats: false,
      powerWindows: false,
      touchscreenDisplay: false,
      acRear: false,
      acFront: false,
      navigation: false,
      powerLocks: false,
      mp3Player: false,
      portableAudio: false,
      premiumAudio: false,
      bluetooth: false,
      handsFree: false,
      fogLights: false,
      powerWindow: false,
      windowDefroster: false,
      rearWindow: false,
      wiperTintedGlass: false,
      sunroof: false,
      twoPackages: false,
      bucketSeats: false,
      leatherInterior: false,
      memorySeats: false,
      powerSeats: false,
      thirdRowSeats: false,
      immobilizerKey: false,
      keylessEntry: false,
      powerMirrors: false
    },
    
    // Toggles
    urgent: false,
    trade: false
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('features.')) {
      const featureName = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        features: {
          ...prev.features,
          [featureName]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
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
    const newImages = files.slice(0, 20 - images.length); // Max 20 images
    
    newImages.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImages(prev => [...prev, {
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
    setImages(prev => prev.filter(img => img.id !== imageId));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    const requiredFields = [
      'make', 'model', 'variant', 'cc', 'transmission', 
      'color', 'askingPrice'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
    
    // At least 1 image required
    if (images.length === 0) {
      newErrors.images = 'At least 1 image is required';
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
        if (key === 'features') {
          submitData.append(key, JSON.stringify(formData[key]));
        } else {
          submitData.append(key, formData[key]);
        }
      });
      
      // Add images
      images.forEach((image, index) => {
        submitData.append(`images`, image.file);
      });
      
      // Here you would make the API call
      console.log('Submitting car data:', formData);
      console.log('Images:', images);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Car listing created successfully!');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error creating car listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const carFeatures = [
    { key: 'absBrakes', label: 'ABS Brakes' },
    { key: 'amfmRadio', label: 'AM/FM Radio' },
    { key: 'airBags', label: 'Air Bags' },
    { key: 'airConditioning', label: 'Air Conditioning' },
    { key: 'alloyRims', label: 'Alloy Rims' },
    { key: 'backupCamera', label: 'Backup Camera' },
    { key: 'cruiseControl', label: 'Cruise Control' },
    { key: 'heatedSeats', label: 'Heated Seats' },
    { key: 'leatherSeats', label: 'Leather Seats' },
    { key: 'powerWindows', label: 'Power Windows' },
    { key: 'touchscreenDisplay', label: 'Touchscreen Display' },
    { key: 'acRear', label: 'A/C Rear' },
    { key: 'acFront', label: 'A/C Front' },
    { key: 'navigation', label: 'Navigation' },
    { key: 'powerLocks', label: 'Power Locks' },
    { key: 'mp3Player', label: 'MP3 Player' },
    { key: 'portableAudio', label: 'Portable Audio' },
    { key: 'premiumAudio', label: 'Premium Audio' },
    { key: 'bluetooth', label: 'Bluetooth' },
    { key: 'handsFree', label: 'Hands Free' },
    { key: 'fogLights', label: 'Fog Lights' },
    { key: 'powerWindow', label: 'Power Window' },
    { key: 'windowDefroster', label: 'Window Defroster' },
    { key: 'rearWindow', label: 'Rear Window' },
    { key: 'wiperTintedGlass', label: 'Wiper Tinted Glass' },
    { key: 'sunroof', label: 'Sunroof' },
    { key: 'twoPackages', label: 'Two Packages' },
    { key: 'bucketSeats', label: 'Bucket Seats' },
    { key: 'leatherInterior', label: 'Leather Interior' },
    { key: 'memorySeats', label: 'Memory Seats' },
    { key: 'powerSeats', label: 'Power Seats' },
    { key: 'thirdRowSeats', label: 'Third Row Seats' },
    { key: 'immobilizerKey', label: 'Immobilizer Key' },
    { key: 'keylessEntry', label: 'Keyless Entry' },
    { key: 'powerMirrors', label: 'Power Mirrors' }
  ];

  return (
    <div className="add-car-container">
      <form onSubmit={handleSubmit} className="add-car-form">
        {/* Image Upload Section */}
        <div className="add-car-section">
          <h2>
            <FaCar />
            Car Images
          </h2>
          <div className="add-car-image-upload">
            <div className="add-car-image-upload-area">
              <input
                type="file"
                id="images"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="add-car-image-input"
              />
              <label htmlFor="images" className="add-car-image-label">
                <FaUpload />
                <span>Upload Images (Up to 20)</span>
                <small>At least 1 image required</small>
              </label>
            </div>
            
            {images.length > 0 && (
              <div className="add-car-image-preview">
                {images.map((image) => (
                  <div key={image.id} className="add-car-image-item">
                    <img src={image.url} alt="Car preview" />
                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      className="add-car-image-remove"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {errors.images && (
              <div className="add-car-error">{errors.images}</div>
            )}
          </div>
        </div>

        {/* Basic Information */}
        <div className="add-car-section">
          <h2>
            <FaCog />
            Basic Information
          </h2>
          <div className="add-car-form-grid">
            <div className="add-car-form-group">
              <label htmlFor="make">Make *</label>
              <select
                id="make"
                name="make"
                value={formData.make}
                onChange={handleInputChange}
                className={errors.make ? 'error' : ''}
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
              {errors.make && <div className="add-car-error">{errors.make}</div>}
            </div>

            <div className="add-car-form-group">
              <label htmlFor="model">Model *</label>
              <select
                id="model"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                className={errors.model ? 'error' : ''}
              >
                <option value="">Select Model</option>
                <option value="corolla">Corolla</option>
                <option value="camry">Camry</option>
                <option value="prius">Prius</option>
                <option value="rav4">RAV4</option>
                <option value="highlander">Highlander</option>
                <option value="civic">Civic</option>
                <option value="accord">Accord</option>
                <option value="cr-v">CR-V</option>
                <option value="pilot">Pilot</option>
                <option value="swift">Swift</option>
                <option value="cultus">Cultus</option>
                <option value="wagon-r">Wagon R</option>
                <option value="alto">Alto</option>
                <option value="mehran">Mehran</option>
                <option value="other">Other</option>
              </select>
              {errors.model && <div className="add-car-error">{errors.model}</div>}
            </div>

            <div className="add-car-form-group">
              <label htmlFor="variant">Variant *</label>
              <select
                id="variant"
                name="variant"
                value={formData.variant}
                onChange={handleInputChange}
                className={errors.variant ? 'error' : ''}
              >
                <option value="">Select Variant</option>
                <option value="base">Base</option>
                <option value="mid">Mid</option>
                <option value="top">Top</option>
                <option value="sport">Sport</option>
                <option value="luxury">Luxury</option>
                <option value="other">Other</option>
              </select>
              {errors.variant && <div className="add-car-error">{errors.variant}</div>}
            </div>

            <div className="add-car-form-group">
              <label htmlFor="cc">CC *</label>
              <input
                type="number"
                id="cc"
                name="cc"
                value={formData.cc}
                onChange={handleInputChange}
                placeholder="Enter CC"
                className={errors.cc ? 'error' : ''}
              />
              {errors.cc && <div className="add-car-error">{errors.cc}</div>}
            </div>

            <div className="add-car-form-group">
              <label htmlFor="manufacturingYear">Manufacturing Year</label>
              <select
                id="manufacturingYear"
                name="manufacturingYear"
                value={formData.manufacturingYear}
                onChange={handleInputChange}
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
            </div>

            <div className="add-car-form-group">
              <label htmlFor="condition">Condition</label>
              <select
                id="condition"
                name="condition"
                value={formData.condition}
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

            <div className="add-car-form-group">
              <label htmlFor="mileage">Mileage</label>
              <input
                type="number"
                id="mileage"
                name="mileage"
                value={formData.mileage}
                onChange={handleInputChange}
                placeholder="Enter Mileage"
              />
            </div>

            <div className="add-car-form-group">
              <label htmlFor="transmission">Transmission *</label>
              <select
                id="transmission"
                name="transmission"
                value={formData.transmission}
                onChange={handleInputChange}
                className={errors.transmission ? 'error' : ''}
              >
                <option value="">Select Transmission</option>
                <option value="manual">Manual</option>
                <option value="automatic">Automatic</option>
                <option value="cvt">CVT</option>
                <option value="semi-automatic">Semi-Automatic</option>
              </select>
              {errors.transmission && <div className="add-car-error">{errors.transmission}</div>}
            </div>

            <div className="add-car-form-group">
              <label htmlFor="color">Color *</label>
              <select
                id="color"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className={errors.color ? 'error' : ''}
              >
                <option value="">Select Color</option>
                <option value="white">White</option>
                <option value="black">Black</option>
                <option value="silver">Silver</option>
                <option value="gray">Gray</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
                <option value="brown">Brown</option>
                <option value="gold">Gold</option>
                <option value="other">Other</option>
              </select>
              {errors.color && <div className="add-car-error">{errors.color}</div>}
            </div>

            <div className="add-car-form-group">
              <label htmlFor="province">Province</label>
              <select
                id="province"
                name="province"
                value={formData.province}
                onChange={handleInputChange}
              >
                <option value="">Select Province</option>
                <option value="punjab">Punjab</option>
                <option value="sindh">Sindh</option>
                <option value="kpk">KPK</option>
                <option value="balochistan">Balochistan</option>
                <option value="gilgit-baltistan">Gilgit-Baltistan</option>
                <option value="azad-kashmir">Azad Kashmir</option>
                <option value="islamabad">Islamabad</option>
              </select>
            </div>

            <div className="add-car-form-group">
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
                <option value="sialkot">Sialkot</option>
                <option value="gujranwala">Gujranwala</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="add-car-form-group">
              <label htmlFor="registeredYear">Registered Year</label>
              <select
                id="registeredYear"
                name="registeredYear"
                value={formData.registeredYear}
                onChange={handleInputChange}
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
            </div>

            <div className="add-car-form-group">
              <label htmlFor="assemblyType">Assembly Type</label>
              <select
                id="assemblyType"
                name="assemblyType"
                value={formData.assemblyType}
                onChange={handleInputChange}
              >
                <option value="">Select Assembly Type</option>
                <option value="local">Local</option>
                <option value="imported">Imported</option>
                <option value="reconditioned">Reconditioned</option>
              </select>
            </div>

            <div className="add-car-form-group">
              <label htmlFor="askingPrice">Asking Price (PKR) *</label>
              <input
                type="number"
                id="askingPrice"
                name="askingPrice"
                value={formData.askingPrice}
                onChange={handleInputChange}
                placeholder="Enter Price"
                className={errors.askingPrice ? 'error' : ''}
              />
              {errors.askingPrice && <div className="add-car-error">{errors.askingPrice}</div>}
            </div>

            <div className="add-car-form-group">
              <label htmlFor="fuelType">Fuel Type</label>
              <select
                id="fuelType"
                name="fuelType"
                value={formData.fuelType}
                onChange={handleInputChange}
              >
                <option value="">Select Fuel Type</option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="hybrid">Hybrid</option>
                <option value="electric">Electric</option>
                <option value="cng">CNG</option>
                <option value="lpg">LPG</option>
              </select>
            </div>
          </div>

          <div className="add-car-form-group full-width">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter Description"
              rows="4"
            />
          </div>
        </div>

        {/* Pricing Information */}
        <div className="add-car-section">
          <h2>Pricing Information</h2>
          <div className="add-car-radio-group">
            <label className="add-car-radio-label">
              <input
                type="radio"
                name="pricingInfo"
                value="negotiable"
                checked={formData.pricingInfo === 'negotiable'}
                onChange={handleInputChange}
              />
              <span className="add-car-radio-custom"></span>
              Negotiable
            </label>
            <label className="add-car-radio-label">
              <input
                type="radio"
                name="pricingInfo"
                value="fixed"
                checked={formData.pricingInfo === 'fixed'}
                onChange={handleInputChange}
              />
              <span className="add-car-radio-custom"></span>
              Fixed
            </label>
          </div>
        </div>

        {/* Car Features */}
        <div className="add-car-section">
          <h2>Car Features</h2>
          <div className="add-car-features-grid">
            {carFeatures.map((feature) => (
              <label key={feature.key} className="add-car-checkbox-label">
                <input
                  type="checkbox"
                  name={`features.${feature.key}`}
                  checked={formData.features[feature.key]}
                  onChange={handleInputChange}
                />
                <span className="add-car-checkbox-custom">
                  <FaCheck />
                </span>
                {feature.label}
              </label>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className="add-car-section">
          <h2>Additional Options</h2>
          <div className="add-car-toggles-row">
            <label className="add-car-toggle-label">
              <input
                type="checkbox"
                name="urgent"
                checked={formData.urgent}
                onChange={handleInputChange}
              />
              <span className="add-car-toggle-custom"></span>
              <span className="add-car-toggle-text">
                <strong>Urgent Sale</strong>
                <small>Mark this listing as urgent</small>
              </span>
            </label>
            
            <label className="add-car-toggle-label">
              <input
                type="checkbox"
                name="trade"
                checked={formData.trade}
                onChange={handleInputChange}
              />
              <span className="add-car-toggle-custom"></span>
              <span className="add-car-toggle-text">
                <strong>Open to Trade</strong>
                <small>Accept trade-in offers</small>
              </span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="add-car-submit">
          <button
            type="submit"
            className="add-car-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="add-car-spinner"></div>
                Creating Listing...
              </>
            ) : (
              <>
                <FaCheck />
                Submit Car Listing
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;
