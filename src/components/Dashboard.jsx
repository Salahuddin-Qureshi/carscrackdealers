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
  FaFileAlt,
  FaTimes,
  FaSave
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
  const [showBoxLimitForm, setShowBoxLimitForm] = useState(false);
  const navigate = useNavigate();

  // Frontend variable objects for box limits and functionality
  const [boxLimits, setBoxLimits] = useState({
    CA: { maxBoxes: 1000, description: 'CA Storage Center - Legal and Financial Documents', currentBoxes: 4 },
    AR: { maxBoxes: 3000, description: 'Aramex Storage Center - HR and Technical Documents', currentBoxes: 2 },
    VL: { maxBoxes: 2000, description: 'Villa Storage Center - Archive and Compliance Documents', currentBoxes: 1 }
  });

  const [boxLimitForm, setBoxLimitForm] = useState({
    center: '',
    maxBoxes: '',
    description: ''
  });

  // Frontend JSON variables for box management
  const [boxManagementData, setBoxManagementData] = useState({
    boxes: [
      {
        id: 1,
        name: 'Small Box',
        size: 'Small',
        description: 'Compact storage for small documents',
        location: 'CA Storage',
        capacity: 50,
        currentDocuments: 0,
        status: 'Available',
        createdAt: '2024-01-15',
        lastAccessed: '2024-01-20',
        accessCount: 5,
        currentLocation: 'CA Storage',
        destinationLocation: 'Archive Storage',
        locationHistory: [
          { date: '2024-01-15', location: 'CA Storage', action: 'Initial Placement', user: 'Admin' },
          { date: '2024-01-16', location: 'CA Storage', action: 'Documents Added', user: 'John Doe' },
          { date: '2024-01-18', location: 'CA Storage', action: 'Documents Retrieved', user: 'Jane Smith' },
          { date: '2024-01-20', location: 'CA Storage', action: 'Status Updated', user: 'Admin' }
        ],
        documents: [
          { id: 1, name: 'Contract_2024_001.pdf', type: 'Legal', addedDate: '2024-01-16', addedBy: 'John Doe' },
          { id: 2, name: 'Invoice_2024_002.pdf', type: 'Financial', addedDate: '2024-01-16', addedBy: 'John Doe' },
          { id: 3, name: 'Report_2024_003.pdf', type: 'Report', addedDate: '2024-01-17', addedBy: 'Jane Smith' }
        ],
        trackingHistory: [
          { date: '2024-01-15', action: 'Created', user: 'Admin', details: 'Box created' },
          { date: '2024-01-16', action: 'Accessed', user: 'John Doe', details: 'Documents added' },
          { date: '2024-01-18', action: 'Accessed', user: 'Jane Smith', details: 'Documents retrieved' },
          { date: '2024-01-20', action: 'Updated', user: 'Admin', details: 'Status changed to Available' }
        ]
      },
      {
        id: 2,
        name: 'Medium Box',
        size: 'Medium',
        description: 'Standard storage for regular documents',
        location: 'AR Storage',
        capacity: 100,
        currentDocuments: 0,
        status: 'Available',
        createdAt: '2024-01-16',
        lastAccessed: '2024-01-19',
        accessCount: 3,
        currentLocation: 'AR Storage',
        destinationLocation: 'CA Storage',
        locationHistory: [
          { date: '2024-01-16', location: 'AR Storage', action: 'Initial Placement', user: 'Admin' },
          { date: '2024-01-17', location: 'AR Storage', action: 'Documents Added', user: 'Mike Davis' },
          { date: '2024-01-19', location: 'AR Storage', action: 'Documents Retrieved', user: 'Sarah Johnson' }
        ],
        documents: [
          { id: 4, name: 'HR_File_001.pdf', type: 'HR', addedDate: '2024-01-17', addedBy: 'Mike Davis' },
          { id: 5, name: 'Employee_Record_002.pdf', type: 'HR', addedDate: '2024-01-17', addedBy: 'Mike Davis' }
        ],
        trackingHistory: [
          { date: '2024-01-16', action: 'Created', user: 'Admin', details: 'Box created' },
          { date: '2024-01-17', action: 'Accessed', user: 'Mike Davis', details: 'Documents added' },
          { date: '2024-01-19', action: 'Accessed', user: 'Sarah Johnson', details: 'Documents retrieved' }
        ]
      },
      {
        id: 3,
        name: 'Large Box',
        size: 'Large',
        description: 'Spacious storage for large documents',
        location: 'VL Storage',
        capacity: 200,
        currentDocuments: 0,
        status: 'Available',
        createdAt: '2024-01-17',
        lastAccessed: '2024-01-18',
        accessCount: 2,
        currentLocation: 'VL Storage',
        destinationLocation: 'Archive Storage',
        locationHistory: [
          { date: '2024-01-17', location: 'VL Storage', action: 'Initial Placement', user: 'Admin' },
          { date: '2024-01-18', location: 'VL Storage', action: 'Documents Added', user: 'Lisa Wilson' }
        ],
        documents: [
          { id: 6, name: 'Technical_Manual_001.pdf', type: 'Technical', addedDate: '2024-01-18', addedBy: 'Lisa Wilson' }
        ],
        trackingHistory: [
          { date: '2024-01-17', action: 'Created', user: 'Admin', details: 'Box created' },
          { date: '2024-01-18', action: 'Accessed', user: 'Lisa Wilson', details: 'Documents added' }
        ]
      }
    ],
    boxSizes: ['Small', 'Medium', 'Large', 'Extra Large'],
    locations: ['CA Storage', 'AR Storage', 'VL Storage', 'Archive Storage'],
    nextId: 4
  });

  const [boxForm, setBoxForm] = useState({
    name: '',
    size: '',
    description: '',
    location: '',
    capacity: ''
  });

  const [editingBox, setEditingBox] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    size: '',
    description: '',
    location: '',
    capacity: ''
  });

  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [selectedBoxForTracking, setSelectedBoxForTracking] = useState(null);

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
    
    // Update box limits count
    setBoxLimits(prev => ({
      ...prev,
      [boxData.center]: {
        ...prev[boxData.center],
        currentBoxes: prev[boxData.center].currentBoxes + 1
      }
    }));
    
    console.log('New box created:', boxData);
  };

  // Box Limit Management Functions
  const handleOpenBoxLimitForm = () => {
    setShowBoxLimitForm(true);
  };

  const handleCloseBoxLimitForm = () => {
    setShowBoxLimitForm(false);
    setBoxLimitForm({ center: '', maxBoxes: '', description: '' });
  };

  const handleBoxLimitInputChange = (field, value) => {
    setBoxLimitForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitBoxLimit = (e) => {
    e.preventDefault();
    
    if (boxLimitForm.center && boxLimitForm.maxBoxes && boxLimitForm.description) {
      setBoxLimits(prev => ({
        ...prev,
        [boxLimitForm.center]: {
          maxBoxes: parseInt(boxLimitForm.maxBoxes),
          description: boxLimitForm.description,
          currentBoxes: prev[boxLimitForm.center]?.currentBoxes || 0
        }
      }));
      
      console.log('Box limit updated:', boxLimitForm);
      handleCloseBoxLimitForm();
    }
  };

  const getAvailableBoxNumbers = (center) => {
    const limit = boxLimits[center];
    if (!limit) return [];
    
    const usedNumbers = recentBoxes
      .filter(box => box.center === center)
      .map(box => parseInt(box.documentLimit));
    
    const availableNumbers = [];
    for (let i = 1; i <= limit.maxBoxes; i++) {
      if (!usedNumbers.includes(i)) {
        availableNumbers.push(i);
      }
    }
    return availableNumbers;
  };

  // Box Management Functions
  const handleBoxInputChange = (field, value) => {
    setBoxForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitNewBox = (e) => {
    e.preventDefault();
    
    if (boxForm.name && boxForm.size && boxForm.description && boxForm.location && boxForm.capacity) {
      const newBox = {
        id: boxManagementData.nextId,
        name: boxForm.name,
        size: boxForm.size,
        description: boxForm.description,
        location: boxForm.location,
        capacity: parseInt(boxForm.capacity),
        currentDocuments: 0,
        status: 'Available',
        createdAt: new Date().toISOString().split('T')[0]
      };

      setBoxManagementData(prev => ({
        ...prev,
        boxes: [...prev.boxes, newBox],
        nextId: prev.nextId + 1
      }));

      console.log('New box created:', newBox);
      
      // Reset form
      setBoxForm({
        name: '',
        size: '',
        description: '',
        location: '',
        capacity: ''
      });
    }
  };

  const handleDeleteBox = (boxId) => {
    setBoxManagementData(prev => ({
      ...prev,
      boxes: prev.boxes.filter(box => box.id !== boxId)
    }));
  };

  const handleUpdateBoxStatus = (boxId, newStatus) => {
    const currentDate = new Date().toISOString().split('T')[0];
    
    setBoxManagementData(prev => ({
      ...prev,
      boxes: prev.boxes.map(box => 
        box.id === boxId ? { 
          ...box, 
          status: newStatus,
          lastAccessed: currentDate,
          accessCount: box.accessCount + 1,
          trackingHistory: [
            ...box.trackingHistory,
            { 
              date: currentDate, 
              action: 'Status Updated', 
              user: 'Current User', 
              details: `Status changed to ${newStatus}` 
            }
          ]
        } : box
      )
    }));
  };

  // Edit Functions
  const handleEditBox = (box) => {
    setEditingBox(box.id);
    setEditForm({
      name: box.name,
      size: box.size,
      description: box.description,
      location: box.location,
      capacity: box.capacity.toString()
    });
  };

  const handleEditInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    
    if (editForm.name && editForm.size && editForm.description && editForm.location && editForm.capacity) {
      const currentDate = new Date().toISOString().split('T')[0];
      
      setBoxManagementData(prev => ({
        ...prev,
        boxes: prev.boxes.map(box => 
          box.id === editingBox ? {
            ...box,
            name: editForm.name,
            size: editForm.size,
            description: editForm.description,
            location: editForm.location,
            capacity: parseInt(editForm.capacity),
            lastAccessed: currentDate,
            accessCount: box.accessCount + 1,
            trackingHistory: [
              ...box.trackingHistory,
              { 
                date: currentDate, 
                action: 'Edited', 
                user: 'Current User', 
                details: 'Box details updated' 
              }
            ]
          } : box
        )
      }));

      setEditingBox(null);
      setEditForm({ name: '', size: '', description: '', location: '', capacity: '' });
    }
  };

  const handleCancelEdit = () => {
    setEditingBox(null);
    setEditForm({ name: '', size: '', description: '', location: '', capacity: '' });
  };

  const handleAddDocument = (boxId) => {
    const currentDate = new Date().toISOString().split('T')[0];
    
    setBoxManagementData(prev => ({
      ...prev,
      boxes: prev.boxes.map(box => 
        box.id === boxId ? {
          ...box,
          currentDocuments: Math.min(box.currentDocuments + 1, box.capacity),
          lastAccessed: currentDate,
          accessCount: box.accessCount + 1,
          status: box.currentDocuments + 1 >= box.capacity ? 'Full' : box.status,
          trackingHistory: [
            ...box.trackingHistory,
            { 
              date: currentDate, 
              action: 'Document Added', 
              user: 'Current User', 
              details: 'Document added to box' 
            }
          ]
        } : box
      )
    }));
  };

  const handleRemoveDocument = (boxId) => {
    const currentDate = new Date().toISOString().split('T')[0];
    
    setBoxManagementData(prev => ({
      ...prev,
      boxes: prev.boxes.map(box => 
        box.id === boxId ? {
          ...box,
          currentDocuments: Math.max(box.currentDocuments - 1, 0),
          lastAccessed: currentDate,
          accessCount: box.accessCount + 1,
          status: box.currentDocuments - 1 <= 0 ? 'Available' : box.status,
          trackingHistory: [
            ...box.trackingHistory,
            { 
              date: currentDate, 
              action: 'Document Removed', 
              user: 'Current User', 
              details: 'Document removed from box' 
            }
          ]
        } : box
      )
    }));
  };

  // Tracking Functions
  const handleTrackBox = (box) => {
    setSelectedBoxForTracking(box);
    setShowTrackingModal(true);
  };

  const handleCloseTrackingModal = () => {
    setShowTrackingModal(false);
    setSelectedBoxForTracking(null);
  };

  const handleUpdateDestination = (boxId, newDestination) => {
    const currentDate = new Date().toISOString().split('T')[0];
    
    setBoxManagementData(prev => ({
      ...prev,
      boxes: prev.boxes.map(box => 
        box.id === boxId ? {
          ...box,
          destinationLocation: newDestination,
          lastAccessed: currentDate,
          accessCount: box.accessCount + 1,
          trackingHistory: [
            ...box.trackingHistory,
            { 
              date: currentDate, 
              action: 'Destination Updated', 
              user: 'Current User', 
              details: `Destination changed to ${newDestination}` 
            }
          ]
        } : box
      )
    }));
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
        <button 
          className={`nav-tab ${activeTab === 'box-management' ? 'active' : ''}`}
          onClick={() => setActiveTab('box-management')}
        >
          Box Management
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

            {/* Box Limits Management */}
            <div className="box-limits-section">
              <div className="section-header">
                <h3 className="section-title">Storage Center Limits</h3>
                <button 
                  className="dashboard-action-btn primary"
                  onClick={handleOpenBoxLimitForm}
                >
                  Configure Box Limits
                </button>
              </div>
              <div className="box-limits-grid">
                {Object.entries(boxLimits).map(([center, limit]) => (
                  <div key={center} className="box-limit-card">
                    <div className="box-limit-header">
                      <h4>{center} Storage Center</h4>
                      <span className={`box-limit-status ${limit.currentBoxes >= limit.maxBoxes ? 'full' : 'available'}`}>
                        {limit.currentBoxes >= limit.maxBoxes ? 'Full' : 'Available'}
                      </span>
                    </div>
                    <div className="box-limit-details">
                      <p className="box-limit-description">{limit.description}</p>
                      <div className="box-limit-stats">
                        <div className="box-limit-stat">
                          <span className="stat-label">Current Boxes:</span>
                          <span className="stat-value">{limit.currentBoxes}</span>
                        </div>
                        <div className="box-limit-stat">
                          <span className="stat-label">Max Boxes:</span>
                          <span className="stat-value">{limit.maxBoxes}</span>
                        </div>
                        <div className="box-limit-stat">
                          <span className="stat-label">Available:</span>
                          <span className="stat-value">{limit.maxBoxes - limit.currentBoxes}</span>
                        </div>
                      </div>
                      <div className="box-limit-progress">
                        <div 
                          className="box-limit-progress-bar"
                          style={{ 
                            width: `${(limit.currentBoxes / limit.maxBoxes) * 100}%`,
                            backgroundColor: limit.currentBoxes >= limit.maxBoxes ? '#dc3545' : '#28a745'
                          }}
                        ></div>
                      </div>
                    </div>
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

        {activeTab === 'box-management' && (
          <div className="box-management-content">
            <div className="content-header">
              <h2>Box Management</h2>
              <button 
                className="add-car-btn"
                onClick={() => setShowAddBoxForm(true)}
              >
                + Add New Box
              </button>
            </div>

            {/* Add Box Form */}
            <div className="box-management-form">
              <h3>Create New Box</h3>
              <form onSubmit={handleSubmitNewBox} className="box-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Box Name</label>
                    <input
                      type="text"
                      value={boxForm.name}
                      onChange={(e) => handleBoxInputChange('name', e.target.value)}
                      placeholder="Enter box name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Box Size</label>
                    <select
                      value={boxForm.size}
                      onChange={(e) => handleBoxInputChange('size', e.target.value)}
                      required
                    >
                      <option value="">Select Size</option>
                      {boxManagementData.boxSizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Location</label>
                    <select
                      value={boxForm.location}
                      onChange={(e) => handleBoxInputChange('location', e.target.value)}
                      required
                    >
                      <option value="">Select Location</option>
                      {boxManagementData.locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Capacity (Documents)</label>
                    <input
                      type="number"
                      value={boxForm.capacity}
                      onChange={(e) => handleBoxInputChange('capacity', e.target.value)}
                      placeholder="Enter capacity"
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={boxForm.description}
                    onChange={(e) => handleBoxInputChange('description', e.target.value)}
                    placeholder="Enter box description"
                    rows="3"
                    required
                  />
                </div>

                <button type="submit" className="btn-primary">Create Box</button>
              </form>
            </div>

            {/* Boxes List */}
            <div className="boxes-list">
              <h3>Existing Boxes</h3>
              <div className="boxes-grid">
                {boxManagementData.boxes.map(box => (
                  <div key={box.id} className="box-card">
                    {editingBox === box.id ? (
                      // Edit Form
                      <form onSubmit={handleSaveEdit} className="edit-form">
                        <div className="edit-form-row">
                          <div className="edit-form-group">
                            <label>Box Name</label>
                            <input
                              type="text"
                              value={editForm.name}
                              onChange={(e) => handleEditInputChange('name', e.target.value)}
                              required
                            />
                          </div>
                          <div className="edit-form-group">
                            <label>Size</label>
                            <select
                              value={editForm.size}
                              onChange={(e) => handleEditInputChange('size', e.target.value)}
                              required
                            >
                              {boxManagementData.boxSizes.map(size => (
                                <option key={size} value={size}>{size}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="edit-form-row">
                          <div className="edit-form-group">
                            <label>Location</label>
                            <select
                              value={editForm.location}
                              onChange={(e) => handleEditInputChange('location', e.target.value)}
                              required
                            >
                              {boxManagementData.locations.map(location => (
                                <option key={location} value={location}>{location}</option>
                              ))}
                            </select>
                          </div>
                          <div className="edit-form-group">
                            <label>Capacity</label>
                            <input
                              type="number"
                              value={editForm.capacity}
                              onChange={(e) => handleEditInputChange('capacity', e.target.value)}
                              min="1"
                              required
                            />
                          </div>
                        </div>
                        <div className="edit-form-group">
                          <label>Description</label>
                          <textarea
                            value={editForm.description}
                            onChange={(e) => handleEditInputChange('description', e.target.value)}
                            rows="2"
                            required
                          />
                        </div>
                        <div className="edit-actions">
                          <button type="submit" className="btn-save">Save</button>
                          <button type="button" className="btn-cancel" onClick={handleCancelEdit}>Cancel</button>
                        </div>
                      </form>
                    ) : (
                      // Display Mode
                      <>
                        <div className="box-header">
                          <h4>{box.name}</h4>
                          <span className={`box-status ${box.status.toLowerCase().replace(' ', '-')}`}>
                            {box.status}
                          </span>
                        </div>
                        <div className="box-details">
                          <p><strong>Size:</strong> {box.size}</p>
                          <p><strong>Location:</strong> {box.location}</p>
                          <p><strong>Capacity:</strong> {box.capacity} documents</p>
                          <p><strong>Current:</strong> {box.currentDocuments} documents</p>
                          <p><strong>Description:</strong> {box.description}</p>
                          <div className="box-tracking">
                            <p><strong>Created:</strong> {box.createdAt}</p>
                            <p><strong>Last Accessed:</strong> {box.lastAccessed}</p>
                            <p><strong>Access Count:</strong> {box.accessCount}</p>
                          </div>
                        </div>
                        <div className="box-actions">
                          <div className="document-controls">
                            <button 
                              className="btn-add-doc"
                              onClick={() => handleAddDocument(box.id)}
                              disabled={box.currentDocuments >= box.capacity}
                            >
                              + Add Doc
                            </button>
                            <button 
                              className="btn-remove-doc"
                              onClick={() => handleRemoveDocument(box.id)}
                              disabled={box.currentDocuments <= 0}
                            >
                              - Remove Doc
                            </button>
                          </div>
                          <select
                            value={box.status}
                            onChange={(e) => handleUpdateBoxStatus(box.id, e.target.value)}
                            className="status-select"
                          >
                            <option value="Available">Available</option>
                            <option value="In Use">In Use</option>
                            <option value="Full">Full</option>
                            <option value="Maintenance">Maintenance</option>
                          </select>
                          <button 
                            className="btn-track"
                            onClick={() => handleTrackBox(box)}
                          >
                            Track
                          </button>
                          <button 
                            className="btn-edit"
                            onClick={() => handleEditBox(box)}
                          >
                            Edit
                          </button>
                          <button 
                            className="btn-delete"
                            onClick={() => handleDeleteBox(box.id)}
                          >
                            Delete
                          </button>
                        </div>
                        <div className="box-history">
                          <h5>Recent Activity</h5>
                          <div className="history-list">
                            {box.trackingHistory.slice(-3).map((entry, index) => (
                              <div key={index} className="history-item">
                                <span className="history-date">{entry.date}</span>
                                <span className="history-action">{entry.action}</span>
                                <span className="history-user">{entry.user}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
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

      {/* Box Limit Configuration Modal */}
      {showBoxLimitForm && (
        <div className="box-limit-modal-overlay">
          <div className="box-limit-modal">
            <div className="box-limit-modal-header">
              <div className="box-limit-modal-title">
                <FaWarehouse className="box-limit-modal-icon" />
                <h2>Configure Box Limits</h2>
              </div>
              <button 
                className="box-limit-modal-close"
                onClick={handleCloseBoxLimitForm}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmitBoxLimit} className="box-limit-form">
              <div className="box-limit-form-content">
                
                {/* Center Selection */}
                <div className="box-limit-form-group">
                  <label className="box-limit-form-label">
                    Storage Center <span className="required">*</span>
                  </label>
                  <select
                    className="box-limit-form-select"
                    value={boxLimitForm.center}
                    onChange={(e) => handleBoxLimitInputChange('center', e.target.value)}
                  >
                    <option value="">Select Storage Center</option>
                    <option value="CA">CA Storage Center</option>
                    <option value="AR">Aramex Storage Center</option>
                    <option value="VL">Villa Storage Center</option>
                  </select>
                </div>

                {/* Max Boxes */}
                <div className="box-limit-form-group">
                  <label className="box-limit-form-label">
                    Maximum Box Number <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    className="box-limit-form-input"
                    value={boxLimitForm.maxBoxes}
                    onChange={(e) => handleBoxLimitInputChange('maxBoxes', e.target.value)}
                    placeholder="Enter maximum box number (e.g., 1000)"
                    min="1"
                    max="10000"
                  />
                </div>

                {/* Description */}
                <div className="box-limit-form-group">
                  <label className="box-limit-form-label">
                    Description <span className="required">*</span>
                  </label>
                  <textarea
                    className="box-limit-form-textarea"
                    value={boxLimitForm.description}
                    onChange={(e) => handleBoxLimitInputChange('description', e.target.value)}
                    placeholder="Enter description for this storage center..."
                    rows="3"
                  />
                </div>

              </div>

              <div className="box-limit-form-actions">
                <button 
                  type="button"
                  className="box-limit-btn box-limit-btn-cancel"
                  onClick={handleCloseBoxLimitForm}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="box-limit-btn box-limit-btn-submit"
                >
                  <FaSave />
                  Save Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Box Tracking Modal */}
      {showTrackingModal && selectedBoxForTracking && (
        <div className="tracking-modal-overlay">
          <div className="tracking-modal">
            <div className="tracking-modal-header">
              <div className="tracking-modal-title">
                <FaTruck className="tracking-modal-icon" />
                <h2>Box Tracking: {selectedBoxForTracking.name}</h2>
              </div>
              <button 
                className="tracking-modal-close"
                onClick={handleCloseTrackingModal}
              >
                <FaTimes />
              </button>
            </div>

            <div className="tracking-modal-content">
              {/* Box Overview */}
              <div className="tracking-section">
                <h3>Box Overview</h3>
                <div className="tracking-overview">
                  <div className="overview-item">
                    <span className="overview-label">Box ID:</span>
                    <span className="overview-value">#{selectedBoxForTracking.id}</span>
                  </div>
                  <div className="overview-item">
                    <span className="overview-label">Size:</span>
                    <span className="overview-value">{selectedBoxForTracking.size}</span>
                  </div>
                  <div className="overview-item">
                    <span className="overview-label">Status:</span>
                    <span className={`overview-value status-${selectedBoxForTracking.status.toLowerCase().replace(' ', '-')}`}>
                      {selectedBoxForTracking.status}
                    </span>
                  </div>
                  <div className="overview-item">
                    <span className="overview-label">Capacity:</span>
                    <span className="overview-value">{selectedBoxForTracking.currentDocuments}/{selectedBoxForTracking.capacity} documents</span>
                  </div>
                </div>
              </div>

              {/* Location Tracking */}
              <div className="tracking-section">
                <h3>Location Tracking</h3>
                <div className="location-tracking">
                  <div className="location-current">
                    <h4>Current Location</h4>
                    <div className="location-info">
                      <FaWarehouse className="location-icon" />
                      <span className="location-name">{selectedBoxForTracking.currentLocation}</span>
                    </div>
                  </div>
                  
                  <div className="location-destination">
                    <h4>Destination</h4>
                    <div className="destination-controls">
                      <select
                        value={selectedBoxForTracking.destinationLocation}
                        onChange={(e) => handleUpdateDestination(selectedBoxForTracking.id, e.target.value)}
                        className="destination-select"
                      >
                        {boxManagementData.locations.map(location => (
                          <option key={location} value={location}>{location}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="tracking-section">
                <h3>Documents ({selectedBoxForTracking.documents?.length || 0})</h3>
                <div className="documents-list">
                  {selectedBoxForTracking.documents && selectedBoxForTracking.documents.length > 0 ? (
                    selectedBoxForTracking.documents.map(doc => (
                      <div key={doc.id} className="document-item">
                        <div className="document-info">
                          <FaFileAlt className="document-icon" />
                          <div className="document-details">
                            <span className="document-name">{doc.name}</span>
                            <span className="document-type">{doc.type}</span>
                          </div>
                        </div>
                        <div className="document-meta">
                          <span className="document-date">Added: {doc.addedDate}</span>
                          <span className="document-user">By: {doc.addedBy}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-documents">No documents in this box</p>
                  )}
                </div>
              </div>

              {/* Location History */}
              <div className="tracking-section">
                <h3>Location History</h3>
                <div className="location-history">
                  {selectedBoxForTracking.locationHistory && selectedBoxForTracking.locationHistory.length > 0 ? (
                    selectedBoxForTracking.locationHistory.map((entry, index) => (
                      <div key={index} className="location-history-item">
                        <div className="history-timeline">
                          <div className="timeline-dot"></div>
                          {index < selectedBoxForTracking.locationHistory.length - 1 && <div className="timeline-line"></div>}
                        </div>
                        <div className="history-content">
                          <div className="history-location">{entry.location}</div>
                          <div className="history-action">{entry.action}</div>
                          <div className="history-meta">
                            <span className="history-date">{entry.date}</span>
                            <span className="history-user">{entry.user}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-history">No location history available</p>
                  )}
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="tracking-section">
                <h3>Activity Timeline</h3>
                <div className="activity-timeline">
                  {selectedBoxForTracking.trackingHistory && selectedBoxForTracking.trackingHistory.length > 0 ? (
                    selectedBoxForTracking.trackingHistory.map((entry, index) => (
                      <div key={index} className="activity-item">
                        <div className="activity-timeline">
                          <div className="timeline-dot activity"></div>
                          {index < selectedBoxForTracking.trackingHistory.length - 1 && <div className="timeline-line"></div>}
                        </div>
                        <div className="activity-content">
                          <div className="activity-action">{entry.action}</div>
                          <div className="activity-details">{entry.details}</div>
                          <div className="activity-meta">
                            <span className="activity-date">{entry.date}</span>
                            <span className="activity-user">{entry.user}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-activity">No activity history available</p>
                  )}
                </div>
              </div>
            </div>

            <div className="tracking-modal-footer">
              <button 
                className="tracking-btn tracking-btn-close"
                onClick={handleCloseTrackingModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
