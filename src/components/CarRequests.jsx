import React, { useState, useEffect } from 'react';
import { FaCar, FaUser, FaBuilding, FaPhone, FaEnvelope, FaCalendarAlt, FaSearch, FaFilter, FaEye, FaCheck, FaTimes, FaTag } from 'react-icons/fa';
import '../styles/CarRequests.css';

const CarRequests = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [makeFilter, setMakeFilter] = useState('all');

  // Mock data for demonstration
  useEffect(() => {
    const mockUserRequests = [
      {
        id: 1,
        type: 'user',
        name: 'Ahmed Khan',
        email: 'ahmed.khan@example.com',
        phone: '+92-300-1234567',
        carDetails: {
          make: 'Toyota',
          model: 'Corolla',
          variant: 'XLI',
          year: 2020,
          color: 'White',
          amount: 2500000
        },
        status: 'pending',
        createdAt: '2024-01-20',
        notes: 'Looking for a well-maintained car with low mileage'
      },
      {
        id: 2,
        type: 'user',
        name: 'Sara Ahmed',
        email: 'sara.ahmed@example.com',
        phone: '+92-301-2345678',
        carDetails: {
          make: 'Honda',
          model: 'City',
          variant: 'Aspire',
          year: 2019,
          color: 'Black',
          amount: 2200000
        },
        status: 'contacted',
        createdAt: '2024-01-19',
        notes: 'Prefer automatic transmission'
      },
      {
        id: 3,
        type: 'user',
        name: 'Muhammad Ali',
        email: 'muhammad.ali@example.com',
        phone: '+92-302-3456789',
        carDetails: {
          make: 'Suzuki',
          model: 'Cultus',
          variant: 'VXL',
          year: 2021,
          color: 'Red',
          amount: 1800000
        },
        status: 'pending',
        createdAt: '2024-01-18',
        notes: 'Budget is flexible for the right car'
      },
      {
        id: 4,
        type: 'user',
        name: 'Fatima Hassan',
        email: 'fatima.hassan@example.com',
        phone: '+92-303-4567890',
        carDetails: {
          make: 'Toyota',
          model: 'Camry',
          variant: 'Hybrid',
          year: 2022,
          color: 'Silver',
          amount: 4500000
        },
        status: 'completed',
        createdAt: '2024-01-15',
        notes: 'Looking for hybrid model specifically'
      }
    ];

    const mockDealerRequests = [
      {
        id: 5,
        type: 'dealer',
        name: 'AutoMax Dealership',
        email: 'info@automax.com',
        phone: '+92-304-5678901',
        carDetails: {
          make: 'BMW',
          model: '3 Series',
          variant: '320i',
          year: 2021,
          color: 'Blue',
          amount: 6500000
        },
        status: 'pending',
        createdAt: '2024-01-17',
        notes: 'Bulk purchase for our showroom'
      },
      {
        id: 6,
        type: 'dealer',
        name: 'Premium Cars Ltd',
        email: 'sales@premiumcars.com',
        phone: '+92-305-6789012',
        carDetails: {
          make: 'Mercedes',
          model: 'C-Class',
          variant: 'C200',
          year: 2020,
          color: 'Black',
          amount: 7500000
        },
        status: 'contacted',
        createdAt: '2024-01-16',
        notes: 'Looking for luxury segment cars'
      },
      {
        id: 7,
        type: 'dealer',
        name: 'City Motors',
        email: 'contact@citymotors.com',
        phone: '+92-306-7890123',
        carDetails: {
          make: 'Toyota',
          model: 'Prius',
          variant: 'Hybrid',
          year: 2022,
          color: 'White',
          amount: 4200000
        },
        status: 'pending',
        createdAt: '2024-01-14',
        notes: 'Need eco-friendly vehicles for our fleet'
      }
    ];

    // Simulate API call
    setTimeout(() => {
      setUserRequests(mockUserRequests);
      setDealerRequests(mockDealerRequests);
      setLoading(false);
    }, 1000);
  }, []);

  const [userRequests, setUserRequests] = useState([]);
  const [dealerRequests, setDealerRequests] = useState([]);

  const handleStatusChange = (id, newStatus, type) => {
    if (type === 'user') {
      setUserRequests(prev => 
        prev.map(request => 
          request.id === id 
            ? { ...request, status: newStatus }
            : request
        )
      );
    } else {
      setDealerRequests(prev => 
        prev.map(request => 
          request.id === id 
            ? { ...request, status: newStatus }
            : request
        )
      );
    }
  };

  const handleView = (id, type) => {
    console.log('View request:', id, type);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FaTag className="status-icon pending" />;
      case 'contacted':
        return <FaEye className="status-icon contacted" />;
      case 'completed':
        return <FaCheck className="status-icon completed" />;
      case 'rejected':
        return <FaTimes className="status-icon rejected" />;
      default:
        return <FaTag className="status-icon pending" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#ffc107';
      case 'contacted':
        return '#17a2b8';
      case 'completed':
        return '#28a745';
      case 'rejected':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const formatPrice = (amount) => {
    if (amount >= 10000000) {
      return `${(amount / 10000000).toFixed(1)} Cr`;
    } else if (amount >= 100000) {
      return `${(amount / 100000).toFixed(1)} L`;
    } else {
      return amount.toLocaleString();
    }
  };

  const getCurrentRequests = () => {
    return activeTab === 'users' ? userRequests : dealerRequests;
  };

  const filteredRequests = getCurrentRequests().filter(request => {
    const matchesSearch = 
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.carDetails.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.carDetails.model.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesMake = makeFilter === 'all' || request.carDetails.make.toLowerCase() === makeFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesMake;
  });

  const getStats = () => {
    const requests = getCurrentRequests();
    return {
      total: requests.length,
      pending: requests.filter(r => r.status === 'pending').length,
      contacted: requests.filter(r => r.status === 'contacted').length,
      completed: requests.filter(r => r.status === 'completed').length
    };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="car-requests-container">
        <div className="car-requests-loading">
          <div className="loading-spinner"></div>
          <p>Loading car requests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="car-requests-container">
        <div className="car-requests-error">
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="car-requests-container">
      {/* Header */}
      {/* <div className="car-requests-header">
        <div className="car-requests-title">
          <h1>Car Requests</h1>
          <p>Manage car purchase requests from users and dealers</p>
        </div>
      </div> */}

      {/* Tabs */}
      <div className="car-requests-tabs">
        <button 
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <FaUser />
          User Requests ({userRequests.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'dealers' ? 'active' : ''}`}
          onClick={() => setActiveTab('dealers')}
        >
          <FaBuilding />
          Dealer Requests ({dealerRequests.length})
        </button>
      </div>

      {/* Stats */}
      {/* <div className="car-requests-stats">
        <div className="request-stat-card">
          <div className="stat-icon">
            <FaCar />
          </div>
          <div className="stat-content">
            <h3>{stats.total}</h3>
            <p>Total Requests</p>
          </div>
        </div>
        <div className="request-stat-card">
          <div className="stat-icon pending">
            <FaTag />
          </div>
          <div className="stat-content">
            <h3>{stats.pending}</h3>
            <p>Pending</p>
          </div>
        </div>
        <div className="request-stat-card">
          <div className="stat-icon contacted">
            <FaEye />
          </div>
          <div className="stat-content">
            <h3>{stats.contacted}</h3>
            <p>Contacted</p>
          </div>
        </div>
        <div className="request-stat-card">
          <div className="stat-icon completed">
            <FaCheck />
          </div>
          <div className="stat-content">
            <h3>{stats.completed}</h3>
            <p>Completed</p>
          </div>
        </div>
      </div> */}

      {/* Search and Filters */}
      {/* <div className="car-requests-controls">
        <div className="car-requests-search">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="car-requests-filters">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
          <select
            value={makeFilter}
            onChange={(e) => setMakeFilter(e.target.value)}
          >
            <option value="all">All Makes</option>
            <option value="toyota">Toyota</option>
            <option value="honda">Honda</option>
            <option value="suzuki">Suzuki</option>
            <option value="bmw">BMW</option>
            <option value="mercedes">Mercedes</option>
          </select>
        </div>
      </div> */}

      {/* Requests List */}
      <div className="car-requests-list">
        {filteredRequests.length === 0 ? (
          <div className="car-requests-empty">
            <FaCar className="empty-icon" />
            <h3>No requests found</h3>
            <p>No {activeTab} requests match your search criteria.</p>
          </div>
        ) : (
          <div className="car-requests-grid">
            {filteredRequests.map(request => (
              <div key={request.id} className="request-card">
                <div className="request-header">
                  {/* <div className="request-type">
                    {request.type === 'user' ? (
                      <FaUser className="type-icon user" />
                    ) : (
                      <FaBuilding className="type-icon dealer" />
                    )}
                    <span className="type-text">
                      {request.type === 'user' ? 'User' : 'Dealer'}
                    </span>
                  </div> */}
                  {/* <div className="request-status">
                    {getStatusIcon(request.status)}
                    <span 
                      className="status-text"
                      style={{ color: getStatusColor(request.status) }}
                    >
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div> */}
                </div>

                <div className="request-content">
                  <div className="request-car">
                    <h4>Car Details</h4>
                    <div className="car-specs">
                      <div className="car-spec">
                        <span className="spec-label">Make:</span>
                        <span className="spec-value">{request.carDetails.make}</span>
                      </div>
                      <div className="car-spec">
                        <span className="spec-label">Model:</span>
                        <span className="spec-value">{request.carDetails.model}</span>
                      </div>
                      <div className="car-spec">
                        <span className="spec-label">Variant:</span>
                        <span className="spec-value">{request.carDetails.variant}</span>
                      </div>
                      <div className="car-spec">
                        <span className="spec-label">Year:</span>
                        <span className="spec-value">{request.carDetails.year}</span>
                      </div>
                      <div className="car-spec">
                        <span className="spec-label">Color:</span>
                        <span className="spec-value">{request.carDetails.color}</span>
                      </div>
                      <div className="car-spec price">
                        <span className="spec-label">Budget:</span>
                        <span className="spec-value">PKR {formatPrice(request.carDetails.amount)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="request-contact">
                    <h3>{request.name}</h3>
                    <div className="contact-info">
                      <div className="contact-item">
                        <FaEnvelope />
                        <span>{request.email}</span>
                      </div>
                      <div className="contact-item">
                        <FaPhone />
                        <span>{request.phone}</span>
                      </div>
                    </div>
                  </div>

                  {request.notes && (
                    <div className="request-notes">
                      <h4>Notes</h4>
                      <p>{request.notes}</p>
                    </div>
                  )}

                  <div className="request-meta">
                    <div className="meta-item">
                      <FaCalendarAlt />
                      <span>Requested: {new Date(request.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* <div className="request-footer">
                  <div className="request-actions">
                    <button 
                      className="action-btn view-btn"
                      onClick={() => handleView(request.id, request.type)}
                    >
                      <FaEye />
                      View Details
                    </button>
                    
                    {request.status === 'pending' && (
                      <>
                        <button 
                          className="action-btn contact-btn"
                          onClick={() => handleStatusChange(request.id, 'contacted', request.type)}
                        >
                          <FaPhone />
                          Mark Contacted
                        </button>
                        <button 
                          className="action-btn complete-btn"
                          onClick={() => handleStatusChange(request.id, 'completed', request.type)}
                        >
                          <FaCheck />
                          Complete
                        </button>
                      </>
                    )}
                    
                    {request.status === 'contacted' && (
                      <button 
                        className="action-btn complete-btn"
                        onClick={() => handleStatusChange(request.id, 'completed', request.type)}
                      >
                        <FaCheck />
                        Mark Complete
                      </button>
                    )}
                  </div>
                </div> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarRequests;
