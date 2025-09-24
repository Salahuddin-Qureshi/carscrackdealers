import React, { useState } from 'react';
import { FaTimes, FaSave, FaBox } from 'react-icons/fa';
import '../styles/AddBoxForm.css';

const AddBoxForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    center: '',
    documentLimit: '',
    documentType: ''
  });
  const [errors, setErrors] = useState({});

  // Form options
  const centers = [
    { value: 'CA', label: 'CA Storage (1-1000)', min: 1, max: 1000 },
    { value: 'AR', label: 'Aramex Storage (1001-4000)', min: 1001, max: 4000 },
    { value: 'VL', label: 'Villa Storage (4001-6000)', min: 4001, max: 6000 }
  ];
  
  const getDocumentLimits = (centerValue) => {
    const center = centers.find(c => c.value === centerValue);
    if (!center) return Array.from({ length: 100 }, (_, i) => i + 1);
    return Array.from({ length: center.max - center.min + 1 }, (_, i) => center.min + i);
  };
  const documentTypes = [
    'Legal Documents',
    'Financial Records',
    'HR Files',
    'Technical Manuals',
    'Contracts',
    'Project Files',
    'Compliance Documents',
    'Archive Files'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.center) {
      newErrors.center = 'Please select a center';
    }

    if (!formData.documentLimit) {
      newErrors.documentLimit = 'Please select document limit';
    }

    if (!formData.documentType) {
      newErrors.documentType = 'Please select document type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Generate box name based on form data
      const centerName = centers.find(c => c.value === formData.center)?.label.split(' ')[0] || formData.center;
      const boxName = `Box ${formData.center}-${formData.documentLimit} - ${formData.documentType}`;
      
      const boxData = {
        id: Date.now(),
        name: boxName,
        center: formData.center,
        documentLimit: parseInt(formData.documentLimit),
        documentType: formData.documentType,
        currentDocuments: 0,
        status: 'Available',
        location: centerName,
        createdAt: new Date().toISOString().split('T')[0]
      };

      onSubmit(boxData);
      
      // Reset form
      setFormData({
        center: '',
        documentLimit: '',
        documentType: ''
      });
      setErrors({});
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      center: '',
      documentLimit: '',
      documentType: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="add-box-modal-overlay">
      <div className="add-box-modal">
        <div className="add-box-modal-header">
          <div className="add-box-modal-title">
            <FaBox className="add-box-modal-icon" />
            <h2>Add New Document Box</h2>
          </div>
          <button 
            className="add-box-modal-close"
            onClick={handleClose}
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="add-box-form">
          <div className="add-box-form-content">
            
            {/* Center Selection */}
            <div className="add-box-form-group">
              <label className="add-box-form-label">
                Center <span className="required">*</span>
              </label>
              <select
                className={`add-box-form-select ${errors.center ? 'error' : ''}`}
                value={formData.center}
                onChange={(e) => {
                  handleInputChange('center', e.target.value);
                  // Reset document limit when center changes
                  setFormData(prev => ({ ...prev, documentLimit: '' }));
                }}
              >
                <option value="">Select Storage Center</option>
                {centers.map(center => (
                  <option key={center.value} value={center.value}>
                    {center.label}
                  </option>
                ))}
              </select>
              {errors.center && (
                <span className="add-box-form-error">{errors.center}</span>
              )}
            </div>

            {/* Document Limit */}
            <div className="add-box-form-group">
              <label className="add-box-form-label">
                Document Limit <span className="required">*</span>
              </label>
              <select
                className={`add-box-form-select ${errors.documentLimit ? 'error' : ''}`}
                value={formData.documentLimit}
                onChange={(e) => handleInputChange('documentLimit', e.target.value)}
                disabled={!formData.center}
              >
                <option value="">
                  {formData.center ? 'Select Document Number' : 'Select Center First'}
                </option>
                {formData.center && getDocumentLimits(formData.center).map(limit => (
                  <option key={limit} value={limit}>
                    {limit}
                  </option>
                ))}
              </select>
              {errors.documentLimit && (
                <span className="add-box-form-error">{errors.documentLimit}</span>
              )}
            </div>

            {/* Document Type */}
            <div className="add-box-form-group">
              <label className="add-box-form-label">
                Document Type <span className="required">*</span>
              </label>
              <select
                className={`add-box-form-select ${errors.documentType ? 'error' : ''}`}
                value={formData.documentType}
                onChange={(e) => handleInputChange('documentType', e.target.value)}
              >
                <option value="">Select Document Type</option>
                {documentTypes.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.documentType && (
                <span className="add-box-form-error">{errors.documentType}</span>
              )}
            </div>

          </div>

          <div className="add-box-form-actions">
            <button 
              type="button"
              className="add-box-btn add-box-btn-cancel"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="add-box-btn add-box-btn-submit"
            >
              <FaSave />
              Create Box
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBoxForm;
