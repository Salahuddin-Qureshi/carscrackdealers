import React, { useState } from 'react';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaCamera, 
  FaLock, 
  FaShieldAlt, 
  FaBell, 
  FaGlobe, 
  FaBuilding, 
  FaIdCard, 
  FaSave, 
  FaEdit, 
  FaEye, 
  FaEyeSlash,
  FaCheck,
  FaTimes,
  FaUpload,
  FaDownload,
  FaHistory,
  FaCog,
  FaKey,
  FaMobile,
  FaDesktop
} from 'react-icons/fa';
import '../styles/ProfileSettings.css';

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form states
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'John',
    lastName: 'Dealer',
    email: 'john.dealer@carscrack.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    profilePicture: null
  });

  const [businessInfo, setBusinessInfo] = useState({
    businessName: 'Cars Crack Dealer',
    businessType: 'Auto Dealer',
    licenseNumber: 'DL-2024-001',
    taxId: '12-3456789',
    website: 'www.carscrackdealer.com',
    description: 'Premium car dealership specializing in luxury and sports cars'
  });

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true,
    loginNotifications: true,
    emailNotifications: true,
    smsNotifications: false
  });

  const [preferences, setPreferences] = useState({
    language: 'en',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
    theme: 'light',
    dashboardLayout: 'grid',
    emailFrequency: 'daily'
  });

  // Mock login history data
  const loginHistory = [
    { id: 1, device: 'Chrome on Windows', location: 'New York, NY', ip: '192.168.1.1', date: '2024-12-20 10:30 AM', status: 'Success' },
    { id: 2, device: 'Safari on iPhone', location: 'New York, NY', ip: '192.168.1.2', date: '2024-12-19 08:15 PM', status: 'Success' },
    { id: 3, device: 'Firefox on Mac', location: 'Los Angeles, CA', ip: '192.168.1.3', date: '2024-12-18 02:45 PM', status: 'Failed' },
    { id: 4, device: 'Chrome on Android', location: 'New York, NY', ip: '192.168.1.4', date: '2024-12-17 11:20 AM', status: 'Success' }
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSaving(false);
    setIsEditing(false);
    // Show success message
    console.log('Profile updated successfully');
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPersonalInfo({ ...personalInfo, profilePicture: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: <FaUser /> },
    { id: 'business', label: 'Business Info', icon: <FaBuilding /> },
    { id: 'security', label: 'Security', icon: <FaShieldAlt /> },
    { id: 'notifications', label: 'Notifications', icon: <FaBell /> },
    { id: 'preferences', label: 'Preferences', icon: <FaCog /> },
    { id: 'activity', label: 'Activity', icon: <FaHistory /> }
  ];

  return (
    <div className="profile-settings">
      <div className="profile-settings-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              {personalInfo.profilePicture ? (
                <img src={personalInfo.profilePicture} alt="Profile" />
              ) : (
                <FaUser className="profile-avatar-icon" />
              )}
              <div className="profile-avatar-overlay">
                <FaCamera className="profile-camera-icon" />
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="profile-image-input"
              id="profile-image-upload"
            />
            <label htmlFor="profile-image-upload" className="profile-upload-btn">
              <FaUpload />
              Change Photo
            </label>
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{personalInfo.firstName} {personalInfo.lastName}</h1>
            <p className="profile-email">{personalInfo.email}</p>
            <div className="profile-badges">
              <span className="profile-badge premium">Premium Dealer</span>
              <span className="profile-badge verified">Verified</span>
            </div>
          </div>
          <div className="profile-actions">
            <button 
              className={`profile-action-btn ${isEditing ? 'cancel' : 'edit'}`}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? <FaTimes /> : <FaEdit />}
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
            {isEditing && (
              <button 
                className="profile-action-btn save"
                onClick={handleSave}
                disabled={isSaving}
              >
                <FaSave />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="profile-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`profile-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="profile-content">
          {/* Personal Information Tab */}
          {activeTab === 'personal' && (
            <div className="profile-tab-content">
              <div className="profile-section">
                <h3 className="profile-section-title">Personal Information</h3>
                <div className="profile-form-grid">
                  <div className="profile-form-group">
                    <label className="profile-form-label">First Name</label>
                    <input
                      type="text"
                      className="profile-form-input"
                      value={personalInfo.firstName}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="profile-form-group">
                    <label className="profile-form-label">Last Name</label>
                    <input
                      type="text"
                      className="profile-form-input"
                      value={personalInfo.lastName}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="profile-form-group">
                    <label className="profile-form-label">Email Address</label>
                    <div className="profile-input-with-icon">
                      <FaEnvelope className="profile-input-icon" />
                      <input
                        type="email"
                        className="profile-form-input"
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="profile-form-group">
                    <label className="profile-form-label">Phone Number</label>
                    <div className="profile-input-with-icon">
                      <FaPhone className="profile-input-icon" />
                      <input
                        type="tel"
                        className="profile-form-input"
                        value={personalInfo.phone}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="profile-form-group profile-form-group-full">
                    <label className="profile-form-label">Address</label>
                    <div className="profile-input-with-icon">
                      <FaMapMarkerAlt className="profile-input-icon" />
                      <input
                        type="text"
                        className="profile-form-input"
                        value={personalInfo.address}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="profile-form-group">
                    <label className="profile-form-label">City</label>
                    <input
                      type="text"
                      className="profile-form-input"
                      value={personalInfo.city}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, city: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="profile-form-group">
                    <label className="profile-form-label">State</label>
                    <input
                      type="text"
                      className="profile-form-input"
                      value={personalInfo.state}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, state: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="profile-form-group">
                    <label className="profile-form-label">ZIP Code</label>
                    <input
                      type="text"
                      className="profile-form-input"
                      value={personalInfo.zipCode}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, zipCode: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="profile-form-group">
                    <label className="profile-form-label">Country</label>
                    <select
                      className="profile-form-select"
                      value={personalInfo.country}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, country: e.target.value })}
                      disabled={!isEditing}
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Business Information Tab */}
          {activeTab === 'business' && (
            <div className="profile-tab-content">
              <div className="profile-section">
                <h3 className="profile-section-title">Business Information</h3>
                <div className="profile-form-grid">
                  <div className="profile-form-group">
                    <label className="profile-form-label">Business Name</label>
                    <input
                      type="text"
                      className="profile-form-input"
                      value={businessInfo.businessName}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, businessName: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="profile-form-group">
                    <label className="profile-form-label">Business Type</label>
                    <select
                      className="profile-form-select"
                      value={businessInfo.businessType}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, businessType: e.target.value })}
                      disabled={!isEditing}
                    >
                      <option value="Auto Dealer">Auto Dealer</option>
                      <option value="Car Rental">Car Rental</option>
                      <option value="Auto Repair">Auto Repair</option>
                      <option value="Car Insurance">Car Insurance</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="profile-form-group">
                    <label className="profile-form-label">License Number</label>
                    <div className="profile-input-with-icon">
                      <FaIdCard className="profile-input-icon" />
                      <input
                        type="text"
                        className="profile-form-input"
                        value={businessInfo.licenseNumber}
                        onChange={(e) => setBusinessInfo({ ...businessInfo, licenseNumber: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="profile-form-group">
                    <label className="profile-form-label">Tax ID</label>
                    <input
                      type="text"
                      className="profile-form-input"
                      value={businessInfo.taxId}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, taxId: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="profile-form-group">
                    <label className="profile-form-label">Website</label>
                    <div className="profile-input-with-icon">
                      <FaGlobe className="profile-input-icon" />
                      <input
                        type="url"
                        className="profile-form-input"
                        value={businessInfo.website}
                        onChange={(e) => setBusinessInfo({ ...businessInfo, website: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="profile-form-group profile-form-group-full">
                    <label className="profile-form-label">Business Description</label>
                    <textarea
                      className="profile-form-textarea"
                      value={businessInfo.description}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, description: e.target.value })}
                      disabled={!isEditing}
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="profile-tab-content">
              <div className="profile-section">
                <h3 className="profile-section-title">Change Password</h3>
                <div className="profile-form-grid">
                  <div className="profile-form-group">
                    <label className="profile-form-label">Current Password</label>
                    <div className="profile-input-with-icon">
                      <FaLock className="profile-input-icon" />
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        className="profile-form-input"
                        value={securitySettings.currentPassword}
                        onChange={(e) => setSecuritySettings({ ...securitySettings, currentPassword: e.target.value })}
                      />
                      <button
                        type="button"
                        className="profile-password-toggle"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  <div className="profile-form-group">
                    <label className="profile-form-label">New Password</label>
                    <div className="profile-input-with-icon">
                      <FaKey className="profile-input-icon" />
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        className="profile-form-input"
                        value={securitySettings.newPassword}
                        onChange={(e) => setSecuritySettings({ ...securitySettings, newPassword: e.target.value })}
                      />
                      <button
                        type="button"
                        className="profile-password-toggle"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                  <div className="profile-form-group">
                    <label className="profile-form-label">Confirm New Password</label>
                    <div className="profile-input-with-icon">
                      <FaKey className="profile-input-icon" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        className="profile-form-input"
                        value={securitySettings.confirmPassword}
                        onChange={(e) => setSecuritySettings({ ...securitySettings, confirmPassword: e.target.value })}
                      />
                      <button
                        type="button"
                        className="profile-password-toggle"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h3 className="profile-section-title">Two-Factor Authentication</h3>
                <div className="profile-security-item">
                  <div className="profile-security-info">
                    <FaShieldAlt className="profile-security-icon" />
                    <div>
                      <h4>Two-Factor Authentication</h4>
                      <p>Add an extra layer of security to your account</p>
                    </div>
                  </div>
                  <div className="profile-toggle">
                    <input
                      type="checkbox"
                      id="two-factor"
                      checked={securitySettings.twoFactorEnabled}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, twoFactorEnabled: e.target.checked })}
                    />
                    <label htmlFor="two-factor" className="profile-toggle-label">
                      <span className="profile-toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="profile-tab-content">
              <div className="profile-section">
                <h3 className="profile-section-title">Notification Preferences</h3>
                <div className="profile-notification-settings">
                  <div className="profile-notification-item">
                    <div className="profile-notification-info">
                      <FaBell className="profile-notification-icon" />
                      <div>
                        <h4>Login Notifications</h4>
                        <p>Get notified when someone logs into your account</p>
                      </div>
                    </div>
                    <div className="profile-toggle">
                      <input
                        type="checkbox"
                        id="login-notifications"
                        checked={securitySettings.loginNotifications}
                        onChange={(e) => setSecuritySettings({ ...securitySettings, loginNotifications: e.target.checked })}
                      />
                      <label htmlFor="login-notifications" className="profile-toggle-label">
                        <span className="profile-toggle-slider"></span>
                      </label>
                    </div>
                  </div>

                  <div className="profile-notification-item">
                    <div className="profile-notification-info">
                      <FaEnvelope className="profile-notification-icon" />
                      <div>
                        <h4>Email Notifications</h4>
                        <p>Receive important updates via email</p>
                      </div>
                    </div>
                    <div className="profile-toggle">
                      <input
                        type="checkbox"
                        id="email-notifications"
                        checked={securitySettings.emailNotifications}
                        onChange={(e) => setSecuritySettings({ ...securitySettings, emailNotifications: e.target.checked })}
                      />
                      <label htmlFor="email-notifications" className="profile-toggle-label">
                        <span className="profile-toggle-slider"></span>
                      </label>
                    </div>
                  </div>

                  <div className="profile-notification-item">
                    <div className="profile-notification-info">
                      <FaMobile className="profile-notification-icon" />
                      <div>
                        <h4>SMS Notifications</h4>
                        <p>Receive urgent notifications via SMS</p>
                      </div>
                    </div>
                    <div className="profile-toggle">
                      <input
                        type="checkbox"
                        id="sms-notifications"
                        checked={securitySettings.smsNotifications}
                        onChange={(e) => setSecuritySettings({ ...securitySettings, smsNotifications: e.target.checked })}
                      />
                      <label htmlFor="sms-notifications" className="profile-toggle-label">
                        <span className="profile-toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="profile-tab-content">
              <div className="profile-section">
                <h3 className="profile-section-title">General Preferences</h3>
                <div className="profile-form-grid">
                  <div className="profile-form-group">
                    <label className="profile-form-label">Language</label>
                    <select
                      className="profile-form-select"
                      value={preferences.language}
                      onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                  <div className="profile-form-group">
                    <label className="profile-form-label">Timezone</label>
                    <select
                      className="profile-form-select"
                      value={preferences.timezone}
                      onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                    >
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                    </select>
                  </div>
                  <div className="profile-form-group">
                    <label className="profile-form-label">Date Format</label>
                    <select
                      className="profile-form-select"
                      value={preferences.dateFormat}
                      onChange={(e) => setPreferences({ ...preferences, dateFormat: e.target.value })}
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div className="profile-form-group">
                    <label className="profile-form-label">Currency</label>
                    <select
                      className="profile-form-select"
                      value={preferences.currency}
                      onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="CAD">CAD (C$)</option>
                    </select>
                  </div>
                  <div className="profile-form-group">
                    <label className="profile-form-label">Theme</label>
                    <select
                      className="profile-form-select"
                      value={preferences.theme}
                      onChange={(e) => setPreferences({ ...preferences, theme: e.target.value })}
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>
                  <div className="profile-form-group">
                    <label className="profile-form-label">Dashboard Layout</label>
                    <select
                      className="profile-form-select"
                      value={preferences.dashboardLayout}
                      onChange={(e) => setPreferences({ ...preferences, dashboardLayout: e.target.value })}
                    >
                      <option value="grid">Grid View</option>
                      <option value="list">List View</option>
                      <option value="compact">Compact View</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="profile-tab-content">
              <div className="profile-section">
                <h3 className="profile-section-title">Login History</h3>
                <div className="profile-activity-header">
                  <p>Recent login activity on your account</p>
                  <button className="profile-download-btn">
                    <FaDownload />
                    Download Report
                  </button>
                </div>
                <div className="profile-activity-list">
                  {loginHistory.map(activity => (
                    <div key={activity.id} className="profile-activity-item">
                      <div className="profile-activity-icon">
                        {activity.status === 'Success' ? (
                          <FaCheck className="profile-activity-success" />
                        ) : (
                          <FaTimes className="profile-activity-failed" />
                        )}
                      </div>
                      <div className="profile-activity-info">
                        <div className="profile-activity-device">{activity.device}</div>
                        <div className="profile-activity-details">
                          <span className="profile-activity-location">{activity.location}</span>
                          <span className="profile-activity-ip">IP: {activity.ip}</span>
                        </div>
                      </div>
                      <div className="profile-activity-meta">
                        <div className="profile-activity-date">{activity.date}</div>
                        <div className={`profile-activity-status ${activity.status.toLowerCase()}`}>
                          {activity.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
