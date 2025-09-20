import React, { useState } from 'react';
import { FaUser, FaBuilding, FaIdCard, FaShieldAlt, FaCheck, FaUpload, FaTimes, FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe } from 'react-icons/fa';
import '../styles/AddSubVendor.css';

const AddSubVendor = () => {
  // This form is for adding sub-vendors (sub-dealers) under the main vendor
  // Sub-vendors have limited permissions and work under the main vendor's account
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    
    
    // Permissions & Access
    permissions: {
      canAddCars: true,
      canEditCars: true,
      canDeleteCars: false,
      canViewReports: true,
      canManageInventory: true,
      canAccessAnalytics: false
    }
  });

  const [documents, setDocuments] = useState({});

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('permissions.')) {
      const permissionName = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        permissions: {
          ...prev.permissions,
          [permissionName]: checked
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


  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 'password', 'confirmPassword'
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
    
    // Password validation
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    
    // Password confirmation validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
        if (key === 'permissions') {
          submitData.append(key, JSON.stringify(formData[key]));
        } else {
          submitData.append(key, formData[key]);
        }
      });
      
      
      // Here you would make the API call
      console.log('Submitting sub vendor data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Sub vendor added successfully!');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error adding sub vendor. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-subvendor-container">
      <form onSubmit={handleSubmit} className="add-subvendor-form">
        {/* Personal Information */}
        <div className="add-subvendor-section">
          <h2>
            <FaUser />
            Sub-Vendor Personal Information
          </h2>
          <p className="add-subvendor-description">
            Add a sub-vendor (sub-dealer) who will work under your dealership with limited permissions.
          </p>
          <div className="add-subvendor-form-grid">
            <div className="add-subvendor-form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter first name"
                className={errors.firstName ? 'error' : ''}
              />
              {errors.firstName && <div className="add-subvendor-error">{errors.firstName}</div>}
            </div>

            <div className="add-subvendor-form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter last name"
                className={errors.lastName ? 'error' : ''}
              />
              {errors.lastName && <div className="add-subvendor-error">{errors.lastName}</div>}
            </div>

            <div className="add-subvendor-form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <div className="add-subvendor-error">{errors.email}</div>}
            </div>

            <div className="add-subvendor-form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <div className="add-subvendor-error">{errors.phone}</div>}
            </div>

            <div className="add-subvendor-form-group">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <div className="add-subvendor-error">{errors.password}</div>}
            </div>

            <div className="add-subvendor-form-group">
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm password"
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <div className="add-subvendor-error">{errors.confirmPassword}</div>}
            </div>
          </div>
        </div>



        {/* Permissions & Access */}
        <div className="add-subvendor-section">
          <h2>
            <FaShieldAlt />
            Sub-Vendor Permissions & Access
          </h2>
          <p className="add-subvendor-description">
            Set what the sub-vendor can access and manage within your dealership system.
          </p>
          <div className="add-subvendor-permissions">
            <div className="add-subvendor-permission-group">
              <h4>Inventory Management</h4>
              <div className="add-subvendor-permission-items">
                <label className="add-subvendor-checkbox-label">
                  <input
                    type="checkbox"
                    name="permissions.canAddCars"
                    checked={formData.permissions.canAddCars}
                    onChange={handleInputChange}
                  />
                  <span className="add-subvendor-checkbox-custom">
                    <FaCheck />
                  </span>
                  Add Cars
                </label>
                <label className="add-subvendor-checkbox-label">
                  <input
                    type="checkbox"
                    name="permissions.canEditCars"
                    checked={formData.permissions.canEditCars}
                    onChange={handleInputChange}
                  />
                  <span className="add-subvendor-checkbox-custom">
                    <FaCheck />
                  </span>
                  Edit Cars
                </label>
                <label className="add-subvendor-checkbox-label">
                  <input
                    type="checkbox"
                    name="permissions.canDeleteCars"
                    checked={formData.permissions.canDeleteCars}
                    onChange={handleInputChange}
                  />
                  <span className="add-subvendor-checkbox-custom">
                    <FaCheck />
                  </span>
                  Delete Cars
                </label>
                <label className="add-subvendor-checkbox-label">
                  <input
                    type="checkbox"
                    name="permissions.canManageInventory"
                    checked={formData.permissions.canManageInventory}
                    onChange={handleInputChange}
                  />
                  <span className="add-subvendor-checkbox-custom">
                    <FaCheck />
                  </span>
                  Manage Inventory
                </label>
              </div>
            </div>

            <div className="add-subvendor-permission-group">
              <h4>Reports & Analytics</h4>
              <div className="add-subvendor-permission-items">
                <label className="add-subvendor-checkbox-label">
                  <input
                    type="checkbox"
                    name="permissions.canViewReports"
                    checked={formData.permissions.canViewReports}
                    onChange={handleInputChange}
                  />
                  <span className="add-subvendor-checkbox-custom">
                    <FaCheck />
                  </span>
                  View Reports
                </label>
                <label className="add-subvendor-checkbox-label">
                  <input
                    type="checkbox"
                    name="permissions.canAccessAnalytics"
                    checked={formData.permissions.canAccessAnalytics}
                    onChange={handleInputChange}
                  />
                  <span className="add-subvendor-checkbox-custom">
                    <FaCheck />
                  </span>
                  Access Analytics
                </label>
              </div>
            </div>

          </div>
        </div>


        {/* Submit Button */}
        <div className="add-subvendor-submit">
          <button
            type="submit"
            className="add-subvendor-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="add-subvendor-spinner"></div>
                Adding Sub Vendor...
              </>
            ) : (
              <>
                <FaCheck />
                Add Sub Vendor
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSubVendor;
