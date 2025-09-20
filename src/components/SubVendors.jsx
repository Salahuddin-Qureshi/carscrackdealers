import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaTrash, FaEye, FaPlus, FaSearch, FaFilter, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
import '../styles/SubVendors.css';

const SubVendors = () => {
  const [subVendors, setSubVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    const mockSubVendors = [
      {
        id: 1,
        firstName: 'Ahmed',
        lastName: 'Khan',
        email: 'ahmed.khan@example.com',
        phone: '+92-300-1234567',
        status: 'active',
        permissions: {
          canAddCars: true,
          canEditCars: true,
          canDeleteCars: false,
          canViewReports: true,
          canManageInventory: true,
          canAccessAnalytics: false
        },
        createdAt: '2024-01-15',
        lastLogin: '2024-01-20',
        totalCars: 12,
        soldCars: 8
      },
      {
        id: 2,
        firstName: 'Sara',
        lastName: 'Ahmed',
        email: 'sara.ahmed@example.com',
        phone: '+92-301-2345678',
        status: 'active',
        permissions: {
          canAddCars: true,
          canEditCars: false,
          canDeleteCars: false,
          canViewReports: true,
          canManageInventory: false,
          canAccessAnalytics: false
        },
        createdAt: '2024-01-10',
        lastLogin: '2024-01-19',
        totalCars: 6,
        soldCars: 4
      },
      {
        id: 3,
        firstName: 'Muhammad',
        lastName: 'Ali',
        email: 'muhammad.ali@example.com',
        phone: '+92-302-3456789',
        status: 'inactive',
        permissions: {
          canAddCars: true,
          canEditCars: true,
          canDeleteCars: false,
          canViewReports: false,
          canManageInventory: true,
          canAccessAnalytics: false
        },
        createdAt: '2024-01-05',
        lastLogin: '2024-01-12',
        totalCars: 15,
        soldCars: 10
      },
      {
        id: 4,
        firstName: 'Fatima',
        lastName: 'Hassan',
        email: 'fatima.hassan@example.com',
        phone: '+92-303-4567890',
        status: 'pending',
        permissions: {
          canAddCars: false,
          canEditCars: false,
          canDeleteCars: false,
          canViewReports: false,
          canManageInventory: false,
          canAccessAnalytics: false
        },
        createdAt: '2024-01-18',
        lastLogin: null,
        totalCars: 0,
        soldCars: 0
      }
    ];

    // Simulate API call
    setTimeout(() => {
      setSubVendors(mockSubVendors);
      setLoading(false);
    }, 1000);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setSubVendors(prev => 
      prev.map(subVendor => 
        subVendor.id === id 
          ? { ...subVendor, status: newStatus }
          : subVendor
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this sub-vendor?')) {
      setSubVendors(prev => prev.filter(subVendor => subVendor.id !== id));
    }
  };

  const handleEdit = (id) => {
    // Navigate to edit page or open edit modal
    console.log('Edit sub-vendor:', id);
  };

  const handleView = (id) => {
    // Navigate to view details page
    console.log('View sub-vendor:', id);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <FaCheckCircle className="status-icon active" />;
      case 'inactive':
        return <FaTimesCircle className="status-icon inactive" />;
      case 'pending':
        return <FaClock className="status-icon pending" />;
      default:
        return <FaClock className="status-icon pending" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return '#28a745';
      case 'inactive':
        return '#dc3545';
      case 'pending':
        return '#ffc107';
      default:
        return '#6c757d';
    }
  };

  const filteredSubVendors = subVendors.filter(subVendor => {
    const matchesSearch = 
      subVendor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subVendor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subVendor.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || subVendor.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: subVendors.length,
    active: subVendors.filter(sv => sv.status === 'active').length,
    inactive: subVendors.filter(sv => sv.status === 'inactive').length,
    pending: subVendors.filter(sv => sv.status === 'pending').length
  };

  if (loading) {
    return (
      <div className="subvendors-container">
        <div className="subvendors-loading">
          <div className="loading-spinner"></div>
          <p>Loading sub-vendors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="subvendors-container">
        <div className="subvendors-error">
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="subvendors-container">
      {/* Header */}
      <div className="subvendors-header">
        <div className="subvendors-title">
          <h1>Sub-Vendors</h1>
          <p>Manage your sub-vendors and their permissions</p>
        </div>
        <button 
          className="subvendors-add-btn"
          onClick={() => window.location.href = '/add-subvendor'}
        >
          <FaPlus />
          Add Sub-Vendor
        </button>
      </div>

      {/* Stats */}
      <div className="subvendors-stats">
        <div className="subvendor-stat-card">
          <div className="stat-icon">
            <FaUser />
          </div>
          <div className="stat-content">
            <h3>{stats.total}</h3>
            <p>Total Sub-Vendors</p>
          </div>
        </div>
        <div className="subvendor-stat-card">
          <div className="stat-icon active">
            <FaCheckCircle />
          </div>
          <div className="stat-content">
            <h3>{stats.active}</h3>
            <p>Active</p>
          </div>
        </div>
        <div className="subvendor-stat-card">
          <div className="stat-icon inactive">
            <FaTimesCircle />
          </div>
          <div className="stat-content">
            <h3>{stats.inactive}</h3>
            <p>Inactive</p>
          </div>
        </div>
        <div className="subvendor-stat-card">
          <div className="stat-icon pending">
            <FaClock />
          </div>
          <div className="stat-content">
            <h3>{stats.pending}</h3>
            <p>Pending</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="subvendors-controls">
        <div className="subvendors-search">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search sub-vendors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="subvendors-filters">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Sub-Vendors List */}
      <div className="subvendors-list">
        {filteredSubVendors.length === 0 ? (
          <div className="subvendors-empty">
            <FaUser className="empty-icon" />
            <h3>No sub-vendors found</h3>
            <p>No sub-vendors match your search criteria.</p>
            <button 
              className="subvendors-add-btn"
              onClick={() => window.location.href = '/add-subvendor'}
            >
              <FaPlus />
              Add First Sub-Vendor
            </button>
          </div>
        ) : (
          <div className="subvendors-grid">
            {filteredSubVendors.map(subVendor => (
              <div key={subVendor.id} className="subvendor-card">
                <div className="subvendor-header">
                  <div className="subvendor-info">
                    <h3>{subVendor.firstName} {subVendor.lastName}</h3>
                    <div className="subvendor-status">
                      {getStatusIcon(subVendor.status)}
                      <span 
                        className="status-text"
                        style={{ color: getStatusColor(subVendor.status) }}
                      >
                        {subVendor.status.charAt(0).toUpperCase() + subVendor.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="subvendor-actions">
                    <button 
                      className="action-btn view-btn"
                      onClick={() => handleView(subVendor.id)}
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    <button 
                      className="action-btn edit-btn"
                      onClick={() => handleEdit(subVendor.id)}
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(subVendor.id)}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <div className="subvendor-details">
                  <div className="subvendor-contact">
                    <div className="contact-item">
                      <FaEnvelope />
                      <span>{subVendor.email}</span>
                    </div>
                    <div className="contact-item">
                      <FaPhone />
                      <span>{subVendor.phone}</span>
                    </div>
                  </div>

                  <div className="subvendor-stats">
                    <div className="stat-item">
                      <span className="stat-label">Total Cars:</span>
                      <span className="stat-value">{subVendor.totalCars}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Sold Cars:</span>
                      <span className="stat-value">{subVendor.soldCars}</span>
                    </div>
                  </div>

                  <div className="subvendor-permissions">
                    <h4>Permissions:</h4>
                    <div className="permissions-list">
                      {Object.entries(subVendor.permissions).map(([key, value]) => (
                        <span 
                          key={key} 
                          className={`permission-badge ${value ? 'active' : 'inactive'}`}
                        >
                          {key.replace('can', '').replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="subvendor-meta">
                    <div className="meta-item">
                      <span className="meta-label">Created:</span>
                      <span className="meta-value">
                        {new Date(subVendor.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Last Login:</span>
                      <span className="meta-value">
                        {subVendor.lastLogin 
                          ? new Date(subVendor.lastLogin).toLocaleDateString()
                          : 'Never'
                        }
                      </span>
                    </div>
                  </div>
                </div>

                <div className="subvendor-footer">
                  <div className="status-actions">
                    {subVendor.status === 'pending' && (
                      <>
                        <button 
                          className="status-btn approve-btn"
                          onClick={() => handleStatusChange(subVendor.id, 'active')}
                        >
                          <FaCheckCircle />
                          Approve
                        </button>
                        <button 
                          className="status-btn reject-btn"
                          onClick={() => handleStatusChange(subVendor.id, 'inactive')}
                        >
                          <FaTimesCircle />
                          Reject
                        </button>
                      </>
                    )}
                    {subVendor.status === 'active' && (
                      <button 
                        className="status-btn deactivate-btn"
                        onClick={() => handleStatusChange(subVendor.id, 'inactive')}
                      >
                        <FaTimesCircle />
                        Deactivate
                      </button>
                    )}
                    {subVendor.status === 'inactive' && (
                      <button 
                        className="status-btn activate-btn"
                        onClick={() => handleStatusChange(subVendor.id, 'active')}
                      >
                        <FaCheckCircle />
                        Activate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubVendors;
