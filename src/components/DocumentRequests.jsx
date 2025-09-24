import React, { useState } from 'react';
import { FaClock, FaCheckCircle, FaFileAlt, FaFilter, FaSearch, FaPlus } from 'react-icons/fa';
import Layout from './Layout';
import '../styles/DocumentRequests.css';

const DocumentRequests = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for document requests
  const documentRequests = [
    {
      id: 'REQ-001',
      title: 'Legal Contract Review',
      status: 'pending',
      requestedBy: 'John Smith',
      documentType: 'Legal Documents',
      boxLocation: 'Box CA-001 (CA Storage)',
      requestDate: '2024-01-20',
      priority: 'high',
      description: 'Need to review the contract terms for the new partnership agreement.'
    },
    {
      id: 'REQ-002',
      title: 'Financial Records Access',
      status: 'approved',
      requestedBy: 'Sarah Johnson',
      documentType: 'Financial Records',
      boxLocation: 'Box AR-1001 (Aramex Storage)',
      requestDate: '2024-01-19',
      priority: 'medium',
      description: 'Access to Q4 financial statements for audit preparation.'
    },
    {
      id: 'REQ-003',
      title: 'HR File Retrieval',
      status: 'completed',
      requestedBy: 'Mike Davis',
      documentType: 'HR Files',
      boxLocation: 'Box VL-4001 (Villa Storage)',
      requestDate: '2024-01-18',
      priority: 'low',
      description: 'Retrieve employee records for performance review process.'
    },
    {
      id: 'REQ-004',
      title: 'Technical Manual Access',
      status: 'rejected',
      requestedBy: 'Lisa Wilson',
      documentType: 'Technical Manuals',
      boxLocation: 'Box CA-002 (CA Storage)',
      requestDate: '2024-01-17',
      priority: 'medium',
      description: 'Access to equipment maintenance manuals for training purposes.'
    },
    {
      id: 'REQ-005',
      title: 'Compliance Documents',
      status: 'pending',
      requestedBy: 'Robert Brown',
      documentType: 'Compliance Documents',
      boxLocation: 'Box AR-1002 (Aramex Storage)',
      requestDate: '2024-01-21',
      priority: 'high',
      description: 'Review compliance documents for regulatory audit.'
    },
    {
      id: 'REQ-006',
      title: 'Project Archive Access',
      status: 'approved',
      requestedBy: 'Emily Chen',
      documentType: 'Project Files',
      boxLocation: 'Box VL-4002 (Villa Storage)',
      requestDate: '2024-01-20',
      priority: 'low',
      description: 'Access to completed project documentation for reference.'
    }
  ];

  // Filter requests based on selected filter and search term
  const filteredRequests = documentRequests.filter(request => {
    const matchesFilter = selectedFilter === 'all' || request.status === selectedFilter;
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.requestedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.documentType.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Calculate statistics
  const stats = {
    pending: documentRequests.filter(r => r.status === 'pending').length,
    approved: documentRequests.filter(r => r.status === 'approved').length,
    completed: documentRequests.filter(r => r.status === 'completed').length,
    rejected: documentRequests.filter(r => r.status === 'rejected').length
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ffc107';
      case 'approved': return '#28a745';
      case 'completed': return '#17a2b8';
      case 'rejected': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#dc2626';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6c757d';
    }
  };

  const handleStatusChange = (requestId, newStatus) => {
    console.log(`Request ${requestId} status changed to ${newStatus}`);
    // Here you would typically update the state or make an API call
  };

  return (
    <Layout>
      <div className="document-requests-page">
        <div className="page-header">
          <div className="header-content">
            <h1>Document Requests</h1>
            <p>Manage and track document access requests</p>
          </div>
          <button className="new-request-btn">
            <FaPlus />
            New Request
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon pending">
              <FaClock />
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.pending}</div>
              <div className="stat-label">Pending Requests</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon approved">
              <FaCheckCircle />
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.approved}</div>
              <div className="stat-label">Approved Requests</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon completed">
              <FaFileAlt />
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.completed}</div>
              <div className="stat-label">Completed Requests</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon rejected">
              <FaFileAlt />
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.rejected}</div>
              <div className="stat-label">Rejected Requests</div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="filters-section">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-dropdown">
            <FaFilter className="filter-icon" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Requests</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Requests List */}
        <div className="requests-container">
          <div className="requests-header">
            <h2>Document Requests ({filteredRequests.length})</h2>
          </div>
          
          <div className="requests-list">
            {filteredRequests.map(request => (
              <div key={request.id} className="request-card">
                <div className="request-header">
                  <div className="request-info">
                    <h3>{request.title}</h3>
                    <span className="request-id">#{request.id}</span>
                  </div>
                  <div className="request-meta">
                    <span 
                      className="request-status"
                      style={{ backgroundColor: getStatusColor(request.status) }}
                    >
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                    <span 
                      className="request-priority"
                      style={{ color: getPriorityColor(request.priority) }}
                    >
                      {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)} Priority
                    </span>
                  </div>
                </div>

                <div className="request-details">
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Requested by:</span>
                      <span className="detail-value">{request.requestedBy}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Document Type:</span>
                      <span className="detail-value">{request.documentType}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Box Location:</span>
                      <span className="detail-value">{request.boxLocation}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Request Date:</span>
                      <span className="detail-value">{request.requestDate}</span>
                    </div>
                  </div>
                  
                  <div className="request-description">
                    <span className="detail-label">Description:</span>
                    <p>{request.description}</p>
                  </div>
                </div>

                <div className="request-actions">
                  {request.status === 'pending' && (
                    <>
                      <button 
                        className="btn-approve"
                        onClick={() => handleStatusChange(request.id, 'approved')}
                      >
                        Approve
                      </button>
                      <button 
                        className="btn-reject"
                        onClick={() => handleStatusChange(request.id, 'rejected')}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {request.status === 'approved' && (
                    <button 
                      className="btn-complete"
                      onClick={() => handleStatusChange(request.id, 'completed')}
                    >
                      Mark Complete
                    </button>
                  )}
                  {request.status === 'rejected' && (
                    <button 
                      className="btn-reopen"
                      onClick={() => handleStatusChange(request.id, 'pending')}
                    >
                      Reopen
                    </button>
                  )}
                  <button className="btn-view">View Details</button>
                  {request.status === 'completed' && (
                    <button className="btn-archive">Archive</button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredRequests.length === 0 && (
            <div className="no-requests">
              <FaFileAlt className="no-requests-icon" />
              <h3>No requests found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DocumentRequests;
