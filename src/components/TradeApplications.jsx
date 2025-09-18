import React, { useState, useEffect } from 'react';
import { FaUser, FaCar, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaEye, FaCheck, FaTimes } from 'react-icons/fa';
import '../styles/TradeApplications.css';

const TradeApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // Simulate API call
        const mockApplications = [
          {
            id: 1,
            status: 'pending',
            submittedDate: '2024-01-15',
            userDetails: {
              fullName: 'Ahmed Ali',
              email: 'ahmed.ali@email.com',
              phone: '+92 300 1234567',
              address: '123 Main Street, Block A',
              city: 'Karachi'
            },
            userCar: {
              make: 'Toyota',
              model: 'Corolla',
              year: 2019,
              mileage: '85000',
              condition: 'Good',
              value: 2500000,
              images: ['https://images.unsplash.com/photo-1549317336-206569e8475c?w=300&h=200&fit=crop', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300&h=200&fit=crop']
            },
            dealerCar: {
              id: 1,
              make: 'Honda',
              model: 'Civic',
              year: 2022,
              price: 4200000,
              image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300&h=200&fit=crop'
            },
            tradeDetails: {
              extraAmount: 500000,
              tradeType: 'upgrade',
              additionalNotes: 'Looking for a reliable car for daily commute. My current car is well maintained.'
            }
          },
          {
            id: 2,
            status: 'pending',
            submittedDate: '2024-01-14',
            userDetails: {
              fullName: 'Sara Khan',
              email: 'sara.khan@email.com',
              phone: '+92 301 2345678',
              address: '456 Park Avenue, Block B',
              city: 'Lahore'
            },
            userCar: {
              make: 'Suzuki',
              model: 'Swift',
              year: 2020,
              mileage: '45000',
              condition: 'Excellent',
              value: 1800000,
              images: ['https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=200&fit=crop']
            },
            dealerCar: {
              id: 2,
              make: 'Toyota',
              model: 'Corolla',
              year: 2022,
              price: 4500000,
              image: 'https://images.unsplash.com/photo-1549317336-206569e8475c?w=300&h=200&fit=crop'
            },
            tradeDetails: {
              extraAmount: 0,
              tradeType: 'even',
              additionalNotes: 'Interested in an even trade if possible.'
            }
          },
          {
            id: 3,
            status: 'approved',
            submittedDate: '2024-01-13',
            userDetails: {
              fullName: 'Muhammad Hassan',
              email: 'm.hassan@email.com',
              phone: '+92 302 3456789',
              address: '789 Garden Road, Block C',
              city: 'Islamabad'
            },
            userCar: {
              make: 'Honda',
              model: 'City',
              year: 2018,
              mileage: '120000',
              condition: 'Fair',
              value: 2200000,
              images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300&h=200&fit=crop', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300&h=200&fit=crop', 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=200&fit=crop']
            },
            dealerCar: {
              id: 3,
              make: 'Suzuki',
              model: 'Swift',
              year: 2023,
              price: 2800000,
              image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=200&fit=crop'
            },
            tradeDetails: {
              extraAmount: 200000,
              tradeType: 'upgrade',
              additionalNotes: 'Ready to proceed with the trade.'
            }
          }
        ];
        
        setApplications(mockApplications);
      } catch (error) {
        console.error('Error fetching trade applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      // Here you would make an API call to update the status
      console.log(`Updating application ${applicationId} to ${newStatus}`);
      
      setApplications(prev => prev.map(app => 
        app.id === applicationId 
          ? { ...app, status: newStatus }
          : app
      ));
      
      alert(`Application ${newStatus} successfully!`);
    } catch (error) {
      console.error('Error updating application status:', error);
      alert('Error updating application status. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'approved': return '#10b981';
      case 'rejected': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <FaCalendarAlt />;
      case 'approved': return <FaCheck />;
      case 'rejected': return <FaTimes />;
      default: return <FaCalendarAlt />;
    }
  };

  if (loading) {
    return (
      <div className="trade-applications-container">
        <div className="trade-loading">
          <div className="trade-spinner"></div>
          Loading trade applications...
        </div>
      </div>
    );
  }

  return (
    <div className="trade-applications-container">
      {/* Filter Tabs */}
      <div className="trade-filter-tabs">
        <button 
          className={`trade-filter-tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({applications.length})
        </button>
        <button 
          className={`trade-filter-tab ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending ({applications.filter(app => app.status === 'pending').length})
        </button>
        <button 
          className={`trade-filter-tab ${filter === 'approved' ? 'active' : ''}`}
          onClick={() => setFilter('approved')}
        >
          Approved ({applications.filter(app => app.status === 'approved').length})
        </button>
        <button 
          className={`trade-filter-tab ${filter === 'rejected' ? 'active' : ''}`}
          onClick={() => setFilter('rejected')}
        >
          Rejected ({applications.filter(app => app.status === 'rejected').length})
        </button>
      </div>

      {/* Applications List */}
      <div className="trade-applications-list">
        {filteredApplications.length === 0 ? (
          <div className="trade-empty-state">
            <FaCar className="trade-empty-icon" />
            <h3>No applications found</h3>
            <p>No trade applications match your current filter.</p>
          </div>
        ) : (
          filteredApplications.map(application => (
            <div key={application.id} className="trade-application-card">
              <div className="trade-application-header">
                <div className="trade-application-info">
                  <h3>{application.userDetails.fullName}</h3>
                  <p className="trade-application-date">
                    <FaCalendarAlt />
                    Submitted: {new Date(application.submittedDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="trade-application-header-right">
                  <div className="trade-application-status">
                    <span 
                      className="trade-status-badge"
                      style={{ backgroundColor: getStatusColor(application.status) }}
                    >
                      {getStatusIcon(application.status)}
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                  </div>
                  
                  {application.status === 'pending' && (
                    <div className="trade-application-actions">
                      <button 
                        className="trade-action-btn trade-approve-btn"
                        onClick={() => handleStatusChange(application.id, 'approved')}
                      >
                        <FaCheck />
                        Approve
                      </button>
                      <button 
                        className="trade-action-btn trade-reject-btn"
                        onClick={() => handleStatusChange(application.id, 'rejected')}
                      >
                        <FaTimes />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="trade-application-content">
                <div className="trade-dealer-car">
                  <div className="trade-dealer-car-image">
                    <img src={application.dealerCar.image || '/api/placeholder/200/150'} alt="Dealer Car" />
                  </div>
                  <div className="trade-dealer-car-info">
                    <h4>{application.dealerCar.year} {application.dealerCar.make} {application.dealerCar.model}</h4>
                    <p className="trade-dealer-price">PKR {application.dealerCar.price.toLocaleString()}</p>
                  </div>
                </div>

                <div className="trade-user-section">
                  <div className="trade-user-row">
                    <div className="trade-user-details">
                      <h4>
                        <FaUser />
                        {application.userDetails.fullName}
                      </h4>
                      <div className="trade-contact-info">
                        <div className="trade-contact-item">
                          <FaEnvelope />
                          <span>{application.userDetails.email}</span>
                        </div>
                        <div className="trade-contact-item">
                          <FaPhone />
                          <span>{application.userDetails.phone}</span>
                        </div>
                        <div className="trade-contact-item">
                          <FaMapMarkerAlt />
                          <span>{application.userDetails.city}</span>
                        </div>
                      </div>
                    </div>

                    <div className="trade-user-car">
                      <h4>
                        <FaCar />
                        User's Car
                      </h4>
                      <div className="trade-user-car-details">
                        <p className="trade-car-spec">{application.userCar.year} {application.userCar.make} {application.userCar.model}</p>
                        <p className="trade-car-meta">{application.userCar.mileage} km • {application.userCar.condition}</p>
                        <p className="trade-car-value">PKR {application.userCar.value.toLocaleString()}</p>
                        
                        <div className="trade-car-trade-info">
                          <div className="trade-trade-type">
                            <span className="trade-trade-label">Trade Type:</span>
                            <span className="trade-trade-value">
                              {application.tradeDetails.tradeType.charAt(0).toUpperCase() + application.tradeDetails.tradeType.slice(1)}
                            </span>
                          </div>
                          {application.tradeDetails.extraAmount > 0 && (
                            <div className="trade-extra-amount">
                              <span className="trade-trade-label">Extra Amount:</span>
                              <span className="trade-trade-value">
                                PKR {application.tradeDetails.extraAmount.toLocaleString()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>


                  {application.tradeDetails.additionalNotes && (
                    <div className="trade-description">
                      <p>{application.tradeDetails.additionalNotes}</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TradeApplications;
