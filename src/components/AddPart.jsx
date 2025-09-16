import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaUpload, FaSave, FaTimes } from 'react-icons/fa';
import '../styles/AddPart.css';

const AddPart = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    condition: 'New',
    price: '',
    stock: '',
    make: '',
    model: '',
    year: '',
    description: '',
    images: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Engine',
    'Body',
    'Interior',
    'Electrical',
    'Transmission',
    'Tires',
    'Accessories'
  ];

  const conditions = ['New', 'Used', 'Refurbished'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const maxImages = 5;
    const currentImages = formData.images.length;
    const availableSlots = maxImages - currentImages;
    
    if (availableSlots <= 0) {
      alert(`You can only upload up to ${maxImages} images.`);
      return;
    }
    
    const filesToAdd = files.slice(0, availableSlots);
    
    if (files.length > availableSlots) {
      alert(`Only ${availableSlots} more image(s) can be added. ${files.length - availableSlots} image(s) were ignored.`);
    }
    
    const newImages = filesToAdd.map(file => ({
      file: file,
      preview: URL.createObjectURL(file),
      id: Date.now() + Math.random()
    }));
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
    
    // Reset the input
    e.target.value = '';
  };

  const handleRemoveImage = (imageId) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => {
        if (img.id === imageId) {
          URL.revokeObjectURL(img.preview);
        }
        return img.id !== imageId;
      })
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Part name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.stock || formData.stock <= 0) newErrors.stock = 'Stock quantity is required';
    if (!formData.make.trim()) newErrors.make = 'Make is required';
    if (!formData.model.trim()) newErrors.model = 'Model is required';
    if (!formData.year || formData.year < 1990 || formData.year > new Date().getFullYear() + 1) {
      newErrors.year = 'Valid year is required';
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would make the actual API call
      console.log('Form submitted:', formData);
      
      // Show success message and redirect
      alert('Part added successfully!');
      navigate('/parts-store');
      
    } catch (error) {
      console.error('Error adding part:', error);
      alert('Failed to add part. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate('/parts-store');
  };

  // Cleanup image URLs when component unmounts
  useEffect(() => {
    return () => {
      formData.images.forEach(image => {
        URL.revokeObjectURL(image.preview);
      });
    };
  }, []);

  return (
    <div className="parts-add-part">
      <div className="parts-add-header">
      </div>

      <div className="parts-add-content">
        <form className="parts-add-form" onSubmit={handleSubmit}>
          <div className="parts-form-section">
            <h3>Basic Information</h3>
            
            <div className="parts-form-row">
              <div className="parts-form-group">
                <label htmlFor="name">Part Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Toyota Camry Engine Block"
                  className={errors.name ? 'parts-error' : ''}
                />
                {errors.name && <span className="parts-error-message">{errors.name}</span>}
              </div>

              <div className="parts-form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={errors.category ? 'parts-error' : ''}
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <span className="parts-error-message">{errors.category}</span>}
              </div>
            </div>

            <div className="parts-form-row">
              <div className="parts-form-group">
                <label htmlFor="condition">Condition</label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                >
                  {conditions.map(cond => (
                    <option key={cond} value={cond}>{cond}</option>
                  ))}
                </select>
              </div>

              <div className="parts-form-group">
                <label htmlFor="stock">Stock Quantity *</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="e.g., 5"
                  min="1"
                  className={errors.stock ? 'parts-error' : ''}
                />
                {errors.stock && <span className="parts-error-message">{errors.stock}</span>}
              </div>
            </div>
          </div>

          <div className="parts-form-section">
            <h3>Vehicle Details</h3>
            
            <div className="parts-form-row">
              <div className="parts-form-group">
                <label htmlFor="make">Make *</label>
                <input
                  type="text"
                  id="make"
                  name="make"
                  value={formData.make}
                  onChange={handleInputChange}
                  placeholder="e.g., Toyota"
                  className={errors.make ? 'parts-error' : ''}
                />
                {errors.make && <span className="parts-error-message">{errors.make}</span>}
              </div>

              <div className="parts-form-group">
                <label htmlFor="model">Model *</label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder="e.g., Camry"
                  className={errors.model ? 'parts-error' : ''}
                />
                {errors.model && <span className="parts-error-message">{errors.model}</span>}
              </div>
            </div>

            <div className="parts-form-row">
              <div className="parts-form-group">
                <label htmlFor="year">Year *</label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  placeholder="e.g., 2020"
                  min="1990"
                  max={new Date().getFullYear() + 1}
                  className={errors.year ? 'parts-error' : ''}
                />
                {errors.year && <span className="parts-error-message">{errors.year}</span>}
              </div>

              <div className="parts-form-group">
                <label htmlFor="price">Price (PKR) *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g., 420000"
                  min="0"
                  step="1"
                  className={errors.price ? 'parts-error' : ''}
                />
                {errors.price && <span className="parts-error-message">{errors.price}</span>}
              </div>
            </div>
          </div>

          <div className="parts-form-section">
            <h3>Additional Details</h3>
            
            <div className="parts-form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Brief description of the part..."
                rows="3"
              />
            </div>

            <div className="parts-form-group">
              <label htmlFor="images">Part Images (Max 5)</label>
              <div className="parts-image-upload">
                <input
                  type="file"
                  id="images"
                  name="images"
                  onChange={handleImageChange}
                  accept="image/*"
                  multiple
                  className="parts-file-input"
                  disabled={formData.images.length >= 5}
                />
                <label htmlFor="images" className={`parts-file-label ${formData.images.length >= 5 ? 'disabled' : ''}`}>
                  <FaUpload />
                  {formData.images.length >= 5 ? 'Max Images Reached' : 'Choose Images'}
                </label>
                
                {formData.images.length > 0 && (
                  <div className="parts-image-preview-container">
                    <div className="parts-image-preview-grid">
                      {formData.images.map((image) => (
                        <div key={image.id} className="parts-image-preview-item">
                          <img 
                            src={image.preview} 
                            alt="Preview" 
                            className="parts-image-preview"
                          />
                          <button
                            type="button"
                            className="parts-image-remove-btn"
                            onClick={() => handleRemoveImage(image.id)}
                            title="Remove image"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="parts-image-count">
                      {formData.images.length}/5 images selected
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="parts-form-actions">
            <button
              type="button"
              className="parts-cancel-btn"
              onClick={handleBack}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="parts-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="parts-loading-spinner"></div>
                  Adding...
                </>
              ) : (
                <>
                  <FaSave />
                  Add Part
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPart;
