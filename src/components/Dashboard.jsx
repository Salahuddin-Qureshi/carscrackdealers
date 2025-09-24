import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaCar, 
  FaCheckCircle, 
  FaDollarSign, 
  FaUsers, 
  FaChartLine, 
  FaClock,
  FaTrophy,
  FaUserPlus,
  FaShoppingCart,
  FaWarehouse,
  FaTools,
  FaTruck,
  FaFileAlt
} from 'react-icons/fa';
import '../styles/Dashboard.css';
import companyLogo from '../assets/images/company-logo-black.png';
import Sidebar from './Sidebar';
import AddBoxForm from './AddBoxForm';
import SimpleChart from './SimpleChart';
import NotificationBell from './NotificationBell';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAddBoxForm, setShowAddBoxForm] = useState(false);
  const navigate = useNavigate();

  const stats = [
    { title: 'Total Documents', value: '2,456', change: '+12%', color: '#d01818', icon: <FaFileAlt /> },
    { title: 'Active Boxes', value: '89', change: '+5%', color: '#28a745', icon: <FaWarehouse /> },
    { title: 'Storage Capacity', value: '85%', change: '+8%', color: '#17a2b8', icon: <FaChartLine /> },
    { title: 'Active Users', value: '23', change: '+3%', color: '#ffc107', icon: <FaUsers /> },
    { title: 'Retrieval Rate', value: '94.2%', change: '+2%', color: '#6f42c1', icon: <FaCheckCircle /> },
    { title: 'Pending Requests', value: '7', change: '-15%', color: '#fd7e14', icon: <FaClock /> }
  ];

  const businessStats = {
    documentActivity: {
      today: 15,
      thisWeek: 89,
      thisMonth: 342,
      thisYear: 1245
    },
    storageUsage: {
      today: 1250,
      thisWeek: 8750,
      thisMonth: 35000,
      thisYear: 420000
    },
    retrievalEfficiency: {
      today: 98.5,
      thisWeek: 97.2,
      thisMonth: 95.8,
      thisYear: 94.2
    },
    topCategories: [
      { name: 'Legal Documents', count: 456, storage: 12500 },
      { name: 'Financial Records', count: 389, storage: 9800 },
      { name: 'HR Files', count: 234, storage: 7200 },
      { name: 'Technical Manuals', count: 198, storage: 5600 },
      { name: 'Contracts', count: 156, storage: 4200 }
    ],
    userStats: {
      newUsers: 5,
      activeUsers: 18,
      totalUsers: 23,
      averageDocumentsPerUser: 107
    },
    boxStatus: {
      available: 67,
      full: 22,
      inUse: 8,
      maintenance: 2
    }
  };

  // Chart Data
  const documentActivityChartData = [
    { label: 'Jan', value: 245, color: '#d01818' },
    { label: 'Feb', value: 312, color: '#d01818' },
    { label: 'Mar', value: 289, color: '#d01818' },
    { label: 'Apr', value: 356, color: '#d01818' },
    { label: 'May', value: 423, color: '#d01818' },
    { label: 'Jun', value: 387, color: '#d01818' }
  ];

  const storageUsageChartData = [
    { label: 'Q1', value: 85000, color: '#28a745' },
    { label: 'Q2', value: 92000, color: '#28a745' },
    { label: 'Q3', value: 88000, color: '#28a745' },
    { label: 'Q4', value: 105000, color: '#28a745' }
  ];

  const boxStatusChartData = [
    { label: 'Available', value: 67, color: '#28a745' },
    { label: 'Full', value: 22, color: '#dc3545' },
    { label: 'In Use', value: 8, color: '#17a2b8' },
    { label: 'Maintenance', value: 2, color: '#ffc107' }
  ];

  const retrievalEfficiencyChartData = [
    { label: 'Jan', value: 94.2, color: '#6f42c1' },
    { label: 'Feb', value: 95.8, color: '#6f42c1' },
    { label: 'Mar', value: 93.5, color: '#6f42c1' },
    { label: 'Apr', value: 96.1, color: '#6f42c1' },
    { label: 'May', value: 97.3, color: '#6f42c1' },
    { label: 'Jun', value: 95.9, color: '#6f42c1' }
  ];

  const [recentBoxes, setRecentBoxes] = useState([
    { id: 1, name: 'Box CA-001 - Legal Documents', location: 'CA Storage', status: 'Available' },
    { id: 2, name: 'Box AR-1001 - Financial Records', location: 'Aramex Storage', status: 'In Use' },
    { id: 3, name: 'Box VL-4001 - HR Files', location: 'Villa Storage', status: 'Available' }
  ]);

  // Document tracking data for boxes
  const [selectedBoxForGraph, setSelectedBoxForGraph] = useState('all');
  
  const documentTrackingData = {
    'all': [
      { label: 'Box CA-001', value: 45, color: '#d01818' },
      { label: 'Box AR-1001', value: 32, color: '#28a745' },
      { label: 'Box VL-4001', value: 28, color: '#17a2b8' },
      { label: 'Box CA-002', value: 67, color: '#ffc107' },
      { label: 'Box AR-1002', value: 23, color: '#6f42c1' },
      { label: 'Box VL-4002', value: 41, color: '#fd7e14' }
    ],
    'CA': [
      { label: 'Box CA-001', value: 45, color: '#d01818' },
      { label: 'Box CA-002', value: 67, color: '#28a745' },
      { label: 'Box CA-003', value: 34, color: '#17a2b8' },
      { label: 'Box CA-004', value: 52, color: '#ffc107' }
    ],
    'AR': [
      { label: 'Box AR-1001', value: 32, color: '#d01818' },
      { label: 'Box AR-1002', value: 23, color: '#28a745' },
      { label: 'Box AR-1003', value: 48, color: '#17a2b8' },
      { label: 'Box AR-1004', value: 39, color: '#ffc107' }
    ],
    'VL': [
      { label: 'Box VL-4001', value: 28, color: '#d01818' },
      { label: 'Box VL-4002', value: 41, color: '#28a745' },
      { label: 'Box VL-4003', value: 35, color: '#17a2b8' },
      { label: 'Box VL-4004', value: 29, color: '#ffc107' }
    ]
  };

  const handleAddBox = () => {
    setShowAddBoxForm(true);
  };

  const handleCloseAddBoxForm = () => {
    setShowAddBoxForm(false);
  };

  const handleSubmitBox = (boxData) => {
    // Add the new box to the recentBoxes array
    setRecentBoxes(prev => [boxData, ...prev]);
    console.log('New box created:', boxData);
  };


  return (
    <div className="dashboard-container">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className={`dashboard-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Header */}
        <header className="dashboard-header">
        <div className="header-left">
          <img src={companyLogo} alt="Logo" className="header-logo" />
          <h1 className="header-title">Warehouse Management</h1>
        </div>
        <div className="header-right">
          <NotificationBell />
        </div>
      </header>

      {/* Navigation */}
      <nav className="dashboard-nav">
        <button 
          className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`nav-tab ${activeTab === 'boxes' ? 'active' : ''}`}
          onClick={() => setActiveTab('boxes')}
        >
          Document Boxes
        </button>
        <button 
          className={`nav-tab ${activeTab === 'requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          Requests
        </button>
        <button 
          className={`nav-tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        {activeTab === 'overview' && (
          <div className="overview-content">
            {/* Main Stats Cards */}
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-content">
                    <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
                    <div className="stat-title">{stat.title}</div>
                    <div className={`stat-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
                      {stat.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="charts-section">
              <div className="charts-grid">
                <SimpleChart 
                  data={documentActivityChartData} 
                  type="bar" 
                  title="Monthly Document Activity" 
                  height={250}
                />
                <SimpleChart 
                  data={storageUsageChartData} 
                  type="line" 
                  title="Quarterly Storage Usage" 
                  height={250}
                />
                <SimpleChart 
                  data={boxStatusChartData} 
                  type="pie" 
                  title="Box Status Distribution" 
                  height={250}
                />
                <SimpleChart 
                  data={retrievalEfficiencyChartData} 
                  type="line" 
                  title="Monthly Retrieval Efficiency" 
                  height={250}
                />
              </div>
            </div>

            {/* Business Analytics Section */}
            <div className="analytics-section">
              <div className="analytics-grid">
                {/* Document Activity */}
                <div className="analytics-card">
                  <h3 className="analytics-title">Document Activity</h3>
                  <div className="performance-stats">
                    <div className="performance-item">
                      <span className="performance-label">Today</span>
                      <span className="performance-value">{businessStats.documentActivity.today} docs</span>
                      <span className="performance-amount">{businessStats.storageUsage.today.toLocaleString()} MB</span>
                    </div>
                    <div className="performance-item">
                      <span className="performance-label">This Week</span>
                      <span className="performance-value">{businessStats.documentActivity.thisWeek} docs</span>
                      <span className="performance-amount">{businessStats.storageUsage.thisWeek.toLocaleString()} MB</span>
                    </div>
                    <div className="performance-item">
                      <span className="performance-label">This Month</span>
                      <span className="performance-value">{businessStats.documentActivity.thisMonth} docs</span>
                      <span className="performance-amount">{businessStats.storageUsage.thisMonth.toLocaleString()} MB</span>
                    </div>
                    <div className="performance-item">
                      <span className="performance-label">This Year</span>
                      <span className="performance-value">{businessStats.documentActivity.thisYear} docs</span>
                      <span className="performance-amount">{businessStats.storageUsage.thisYear.toLocaleString()} MB</span>
                    </div>
                  </div>
                </div>

                {/* Top Document Categories */}
                <div className="analytics-card">
                  <h3 className="analytics-title">Top Document Categories</h3>
                  <div className="top-models">
                    {businessStats.topCategories.map((category, index) => (
                      <div key={index} className="model-item">
                        <div className="model-rank">#{index + 1}</div>
                        <div className="model-info">
                          <div className="model-name">{category.name}</div>
                          <div className="model-stats">
                            <span className="model-sold">{category.count} docs</span>
                            <span className="model-revenue">{category.storage.toLocaleString()} MB</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* User Analytics */}
                <div className="analytics-card">
                  <h3 className="analytics-title">User Analytics</h3>
                  <div className="customer-stats">
                    <div className="customer-item">
                      <span className="customer-label">New Users</span>
                      <span className="customer-value">{businessStats.userStats.newUsers}</span>
                    </div>
                    <div className="customer-item">
                      <span className="customer-label">Active Users</span>
                      <span className="customer-value">{businessStats.userStats.activeUsers}</span>
                    </div>
                    <div className="customer-item">
                      <span className="customer-label">Total Users</span>
                      <span className="customer-value">{businessStats.userStats.totalUsers}</span>
                    </div>
                    <div className="customer-item">
                      <span className="customer-label">Avg Docs per User</span>
                      <span className="customer-value">{businessStats.userStats.averageDocumentsPerUser}</span>
                    </div>
                  </div>
                </div>

                {/* Box Status */}
                <div className="analytics-card">
                  <h3 className="analytics-title">Box Status</h3>
                  <div className="dashboard-inventory-grid">
                    <div className="dashboard-inventory-card available">
                      <FaWarehouse className="dashboard-inventory-icon" />
                      <span className="dashboard-inventory-label">Available</span>
                      <span className="dashboard-inventory-value">{businessStats.boxStatus.available}</span>
                    </div>
                    <div className="dashboard-inventory-card sold">
                      <FaShoppingCart className="dashboard-inventory-icon" />
                      <span className="dashboard-inventory-label">Full</span>
                      <span className="dashboard-inventory-value">{businessStats.boxStatus.full}</span>
                    </div>
                    <div className="dashboard-inventory-card in-transit">
                      <FaTruck className="dashboard-inventory-icon" />
                      <span className="dashboard-inventory-label">In Use</span>
                      <span className="dashboard-inventory-value">{businessStats.boxStatus.inUse}</span>
                    </div>
                    <div className="dashboard-inventory-card maintenance">
                      <FaTools className="dashboard-inventory-icon" />
                      <span className="dashboard-inventory-label">Maintenance</span>
                      <span className="dashboard-inventory-value">{businessStats.boxStatus.maintenance}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Boxes */}
            <div className="recent-section">
              <h3 className="section-title">Recent Box Activity</h3>
              <div className="cars-list">
                {recentBoxes.map(box => (
                  <div key={box.id} className="car-item">
                    <div className="car-info">
                      <h4 className="car-name">{box.name}</h4>
                      <p className="car-price">{box.location}</p>
                    </div>
                    <span className={`car-status ${box.status.toLowerCase().replace(' ', '-')}`}>
                      {box.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <h3 className="section-title">Quick Actions</h3>
              <div className="actions-grid">
                <button 
                  className="dashboard-action-btn primary"
                  onClick={() => navigate('/inventory')}
                >
                  Manage Document Boxes
                </button>
                <button className="dashboard-action-btn secondary">View Reports</button>
                <button className="dashboard-action-btn secondary">Manage Profile</button>
                <button className="dashboard-action-btn secondary">Support</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'boxes' && (
          <div className="cars-content">
            <div className="content-header">
              <h2>Document Boxes</h2>
              <button 
                className="add-car-btn"
                onClick={handleAddBox}
              >
                + Add New Box
              </button>
            </div>
            
            {/* Box Cards Grid */}
            <div className="cars-grid">
              {recentBoxes.map(box => (
                <div key={box.id} className="box-card">
                  <div className="box-header">
                    <h3>{box.name}</h3>
                    <span className={`box-status ${box.status.toLowerCase().replace(' ', '-')}`}>
                      {box.status}
                    </span>
                  </div>
                  <div className="box-details">
                    <p><strong>Location:</strong> {box.location}</p>
                    <p><strong>Category:</strong> {box.name.split(' - ')[1]}</p>
                  </div>
                  <div className="box-actions">
                    <button className="btn-primary">View Details</button>
                    <button className="btn-secondary">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="deals-content">
            <div className="content-header">
              <h2>Document Requests</h2>
              <div className="request-filters">
                <select className="filter-select">
                  <option value="all">All Requests</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Request Statistics */}
            <div className="request-stats">
              <div className="stat-card">
                <div className="stat-icon pending">
                  <FaClock />
                </div>
                <div className="stat-content">
                  <div className="stat-number">12</div>
                  <div className="stat-label">Pending Requests</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon approved">
                  <FaCheckCircle />
                </div>
                <div className="stat-content">
                  <div className="stat-number">8</div>
                  <div className="stat-label">Approved Today</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon completed">
                  <FaFileAlt />
                </div>
                <div className="stat-content">
                  <div className="stat-number">24</div>
                  <div className="stat-label">Completed This Week</div>
                </div>
              </div>
            </div>

            {/* Document Requests List */}
            <div className="requests-list">
              <div className="request-card">
                <div className="request-header">
                  <div className="request-info">
                    <h3>Legal Contract Review</h3>
                    <span className="request-id">#REQ-001</span>
                  </div>
                  <span className="request-status pending">Pending</span>
                </div>
                <div className="request-details">
                  <div className="detail-row">
                    <span className="detail-label">Requested by:</span>
                    <span className="detail-value">John Smith</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Document Type:</span>
                    <span className="detail-value">Legal Documents</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Box Location:</span>
                    <span className="detail-value">Box CA-001 (CA Storage)</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Request Date:</span>
                    <span className="detail-value">2024-01-20</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Priority:</span>
                    <span className="detail-value priority-high">High</span>
                  </div>
                </div>
                <div className="request-actions">
                  <button className="btn-approve">Approve</button>
                  <button className="btn-reject">Reject</button>
                  <button className="btn-view">View Details</button>
                </div>
              </div>

              <div className="request-card">
                <div className="request-header">
                  <div className="request-info">
                    <h3>Financial Records Access</h3>
                    <span className="request-id">#REQ-002</span>
                  </div>
                  <span className="request-status approved">Approved</span>
                </div>
                <div className="request-details">
                  <div className="detail-row">
                    <span className="detail-label">Requested by:</span>
                    <span className="detail-value">Sarah Johnson</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Document Type:</span>
                    <span className="detail-value">Financial Records</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Box Location:</span>
                    <span className="detail-value">Box AR-1001 (Aramex Storage)</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Request Date:</span>
                    <span className="detail-value">2024-01-19</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Priority:</span>
                    <span className="detail-value priority-medium">Medium</span>
                  </div>
                </div>
                <div className="request-actions">
                  <button className="btn-complete">Mark Complete</button>
                  <button className="btn-view">View Details</button>
                </div>
              </div>

              <div className="request-card">
                <div className="request-header">
                  <div className="request-info">
                    <h3>HR File Retrieval</h3>
                    <span className="request-id">#REQ-003</span>
                  </div>
                  <span className="request-status completed">Completed</span>
                </div>
                <div className="request-details">
                  <div className="detail-row">
                    <span className="detail-label">Requested by:</span>
                    <span className="detail-value">Mike Davis</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Document Type:</span>
                    <span className="detail-value">HR Files</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Box Location:</span>
                    <span className="detail-value">Box VL-4001 (Villa Storage)</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Request Date:</span>
                    <span className="detail-value">2024-01-18</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Priority:</span>
                    <span className="detail-value priority-low">Low</span>
                  </div>
                </div>
                <div className="request-actions">
                  <button className="btn-view">View Details</button>
                  <button className="btn-archive">Archive</button>
                </div>
              </div>

              <div className="request-card">
                <div className="request-header">
                  <div className="request-info">
                    <h3>Technical Manual Access</h3>
                    <span className="request-id">#REQ-004</span>
                  </div>
                  <span className="request-status rejected">Rejected</span>
                </div>
                <div className="request-details">
                  <div className="detail-row">
                    <span className="detail-label">Requested by:</span>
                    <span className="detail-value">Lisa Wilson</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Document Type:</span>
                    <span className="detail-value">Technical Manuals</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Box Location:</span>
                    <span className="detail-value">Box CA-002 (CA Storage)</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Request Date:</span>
                    <span className="detail-value">2024-01-17</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Priority:</span>
                    <span className="detail-value priority-medium">Medium</span>
                  </div>
                </div>
                <div className="request-actions">
                  <button className="btn-view">View Details</button>
                  <button className="btn-reopen">Reopen</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="customers-content">
            <h2>User Management</h2>
            <p>User management content will go here...</p>
          </div>
        )}

        {/* Document Tracking Graph Section */}
        <div className="document-tracking-section">
          <div className="tracking-header">
            <h2>Document Count Tracking</h2>
            <div className="tracking-controls">
              <label htmlFor="box-filter">Filter by Center:</label>
              <select
                id="box-filter"
                className="tracking-dropdown"
                value={selectedBoxForGraph}
                onChange={(e) => setSelectedBoxForGraph(e.target.value)}
              >
                <option value="all">All Storage Centers</option>
                <option value="CA">CA Storage (1-1000)</option>
                <option value="AR">Aramex Storage (1001-4000)</option>
                <option value="VL">Villa Storage (4001-6000)</option>
              </select>
            </div>
          </div>
          
          <div className="tracking-chart-container">
            <div className="chart-header">
              <h3>Documents per Box</h3>
              <div className="chart-summary">
                <span className="total-docs">
                  Total Documents: {documentTrackingData[selectedBoxForGraph].reduce((sum, box) => sum + box.value, 0)}
                </span>
                <span className="total-boxes">
                  Total Boxes: {documentTrackingData[selectedBoxForGraph].length}
                </span>
              </div>
            </div>
            
            <div className="chart-wrapper">
              <SimpleChart 
                data={documentTrackingData[selectedBoxForGraph]}
                type="bar"
                title="Document Count by Box"
                height={300}
              />
            </div>
          </div>
        </div>
      </main>
      </div>

      {/* Add Box Form Modal */}
      <AddBoxForm
        isOpen={showAddBoxForm}
        onClose={handleCloseAddBoxForm}
        onSubmit={handleSubmitBox}
      />
    </div>
  );
};

export default Dashboard;
