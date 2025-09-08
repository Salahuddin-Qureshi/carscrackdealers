import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
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
  FaTruck
} from 'react-icons/fa';
import '../styles/Dashboard.css';
import companyLogo from '../assets/images/company-logo-black.png';
import Sidebar from './Sidebar';
import CarCard from './CarCard';
import SimpleChart from './SimpleChart';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    // Clear all authentication cookies
    Cookies.remove('isLoggedIn');
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    
    // Show logout message
    console.log('User logged out successfully');
    
    // Redirect to login page
    navigate('/login');
  };

  const stats = [
    { title: 'Total Inventory', value: '156', change: '+12%', color: '#d01818', icon: <FaCar /> },
    { title: 'Sold This Month', value: '23', change: '+5%', color: '#28a745', icon: <FaCheckCircle /> },
    { title: 'Total Revenue', value: 'PKR 2.45M', change: '+18%', color: '#17a2b8', icon: <FaChartLine /> },
    { title: 'Active Customers', value: '89', change: '+8%', color: '#ffc107', icon: <FaUsers /> },
    { title: 'Profit Margin', value: '24.5%', change: '+3%', color: '#6f42c1', icon: <FaChartLine /> },
    { title: 'Unsold Cars', value: '12', change: '-15%', color: '#fd7e14', icon: <FaClock /> }
  ];

  const businessStats = {
    totalSales: {
      today: 3,
      thisWeek: 18,
      thisMonth: 67,
      thisYear: 234
    },
    revenue: {
      today: 125000,
      thisWeek: 750000,
      thisMonth: 2800000,
      thisYear: 12450000
    },
    profit: {
      today: 31250,
      thisWeek: 187500,
      thisMonth: 700000,
      thisYear: 3112500
    },
    topModels: [
      { name: 'Toyota Camry', sold: 45, revenue: 1125000 },
      { name: 'Honda Civic', sold: 38, revenue: 836000 },
      { name: 'BMW 3 Series', sold: 32, revenue: 1440000 },
      { name: 'Mercedes C-Class', sold: 28, revenue: 1540000 },
      { name: 'Audi A4', sold: 25, revenue: 1050000 }
    ],
    customerStats: {
      newCustomers: 23,
      returningCustomers: 44,
      totalCustomers: 89,
      averagePurchaseValue: 53200
    },
    inventoryStatus: {
      available: 144,
      sold: 12,
      inTransit: 8,
      underMaintenance: 3
    }
  };

  // Chart Data
  const salesChartData = [
    { label: 'Jan', value: 45, color: '#d01818' },
    { label: 'Feb', value: 52, color: '#d01818' },
    { label: 'Mar', value: 38, color: '#d01818' },
    { label: 'Apr', value: 61, color: '#d01818' },
    { label: 'May', value: 67, color: '#d01818' },
    { label: 'Jun', value: 55, color: '#d01818' }
  ];

  const revenueChartData = [
    { label: 'Q1', value: 2800000, color: '#28a745' },
    { label: 'Q2', value: 3200000, color: '#28a745' },
    { label: 'Q3', value: 2900000, color: '#28a745' },
    { label: 'Q4', value: 3500000, color: '#28a745' }
  ];

  const inventoryChartData = [
    { label: 'Available', value: 144, color: '#28a745' },
    { label: 'Sold', value: 12, color: '#dc3545' },
    { label: 'In Transit', value: 8, color: '#17a2b8' },
    { label: 'Maintenance', value: 3, color: '#ffc107' }
  ];

  const profitChartData = [
    { label: 'Jan', value: 700000, color: '#6f42c1' },
    { label: 'Feb', value: 780000, color: '#6f42c1' },
    { label: 'Mar', value: 650000, color: '#6f42c1' },
    { label: 'Apr', value: 920000, color: '#6f42c1' },
    { label: 'May', value: 1050000, color: '#6f42c1' },
    { label: 'Jun', value: 880000, color: '#6f42c1' }
  ];

  const recentCars = [
    { id: 1, name: 'BMW X5 2023', price: 'PKR 65,000', status: 'Available' },
    { id: 2, name: 'Mercedes C-Class', price: 'PKR 48,500', status: 'Sold' },
    { id: 3, name: 'Audi A4 2024', price: 'PKR 52,000', status: 'Available' }
  ];

  const myCars = [
    {
      id: 1,
      images: [
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
        'https://images.unsplash.com/photo-1549317336-206569e8475c?w=400',
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400'
      ],
      make: 'Toyota',
      model: 'Camry',
      variant: 'XLE',
      year: 2022,
      price: 25000,
      fuel: 'Petrol',
      mileage: 15000,
      location: 'New York',
      transmission: 'Automatic',
      tag: 'Featured'
    },
    {
      id: 2,
      images: [
        'https://images.unsplash.com/photo-1549317336-206569e8475c?w=400',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400'
      ],
      make: 'Honda',
      model: 'Civic',
      variant: 'Sport',
      year: 2021,
      price: 22000,
      fuel: 'Petrol',
      mileage: 25000,
      location: 'Los Angeles',
      transmission: 'Manual',
      tag: 'Trade'
    },
    {
      id: 3,
      images: [
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400'
      ],
      make: 'BMW',
      model: '3 Series',
      variant: 'M Sport',
      year: 2023,
      price: 45000,
      fuel: 'Petrol',
      mileage: 8000,
      location: 'Chicago',
      transmission: 'Automatic',
      tag: 'Normal'
    },
    {
      id: 4,
      images: [
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
        'https://images.unsplash.com/photo-1549317336-206569e8475c?w=400'
      ],
      make: 'Mercedes',
      model: 'C-Class',
      variant: 'AMG',
      year: 2022,
      price: 55000,
      fuel: 'Petrol',
      mileage: 12000,
      location: 'Miami',
      transmission: 'Automatic',
      tag: 'Featured'
    },
    {
      id: 5,
      images: [
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400'
      ],
      make: 'Audi',
      model: 'A4',
      variant: 'Quattro',
      year: 2023,
      price: 42000,
      fuel: 'Petrol',
      mileage: 5000,
      location: 'Seattle',
      transmission: 'Automatic',
      tag: 'Normal'
    },
    {
      id: 6,
      images: [
        'https://images.unsplash.com/photo-1549317336-206569e8475c?w=400',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400'
      ],
      make: 'Ford',
      model: 'Mustang',
      variant: 'GT',
      year: 2021,
      price: 38000,
      fuel: 'Petrol',
      mileage: 18000,
      location: 'Detroit',
      transmission: 'Manual',
      tag: 'Trade'
    }
  ];

  return (
    <div className="dashboard-container">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        onLogout={handleLogout}
      />
      
      <div className={`dashboard-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Header */}
        <header className="dashboard-header">
        <div className="header-left">
          <img src={companyLogo} alt="Logo" className="header-logo" />
          <h1 className="header-title">Cars Crack Dealer</h1>
        </div>
        <div className="header-right">
          <div className="user-info">
            <span className="user-name">John Dealer</span>
            <span className="user-role">Premium Dealer</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
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
          className={`nav-tab ${activeTab === 'cars' ? 'active' : ''}`}
          onClick={() => setActiveTab('cars')}
        >
          My Cars
        </button>
        <button 
          className={`nav-tab ${activeTab === 'deals' ? 'active' : ''}`}
          onClick={() => setActiveTab('deals')}
        >
          Deals
        </button>
        <button 
          className={`nav-tab ${activeTab === 'customers' ? 'active' : ''}`}
          onClick={() => setActiveTab('customers')}
        >
          Customers
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
                  data={salesChartData} 
                  type="bar" 
                  title="Monthly Sales Performance" 
                  height={250}
                />
                <SimpleChart 
                  data={revenueChartData} 
                  type="line" 
                  title="Quarterly Revenue Trend" 
                  height={250}
                />
                <SimpleChart 
                  data={inventoryChartData} 
                  type="pie" 
                  title="Inventory Distribution" 
                  height={250}
                />
                <SimpleChart 
                  data={profitChartData} 
                  type="line" 
                  title="Monthly Profit Analysis" 
                  height={250}
                />
              </div>
            </div>

            {/* Business Analytics Section */}
            <div className="analytics-section">
              <div className="analytics-grid">
                {/* Sales Performance */}
                <div className="analytics-card">
                  <h3 className="analytics-title">Sales Performance</h3>
                  <div className="performance-stats">
                    <div className="performance-item">
                      <span className="performance-label">Today</span>
                      <span className="performance-value">{businessStats.totalSales.today} cars</span>
                      <span className="performance-amount">PKR {businessStats.revenue.today.toLocaleString()}</span>
                    </div>
                    <div className="performance-item">
                      <span className="performance-label">This Week</span>
                      <span className="performance-value">{businessStats.totalSales.thisWeek} cars</span>
                      <span className="performance-amount">PKR {businessStats.revenue.thisWeek.toLocaleString()}</span>
                    </div>
                    <div className="performance-item">
                      <span className="performance-label">This Month</span>
                      <span className="performance-value">{businessStats.totalSales.thisMonth} cars</span>
                      <span className="performance-amount">PKR {businessStats.revenue.thisMonth.toLocaleString()}</span>
                    </div>
                    <div className="performance-item">
                      <span className="performance-label">This Year</span>
                      <span className="performance-value">{businessStats.totalSales.thisYear} cars</span>
                      <span className="performance-amount">PKR {businessStats.revenue.thisYear.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Top Selling Models */}
                <div className="analytics-card">
                  <h3 className="analytics-title">Top Selling Models</h3>
                  <div className="top-models">
                    {businessStats.topModels.map((model, index) => (
                      <div key={index} className="model-item">
                        <div className="model-rank">#{index + 1}</div>
                        <div className="model-info">
                          <div className="model-name">{model.name}</div>
                          <div className="model-stats">
                            <span className="model-sold">{model.sold} sold</span>
                            <span className="model-revenue">PKR {model.revenue.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer Analytics */}
                <div className="analytics-card">
                  <h3 className="analytics-title">Customer Analytics</h3>
                  <div className="customer-stats">
                    <div className="customer-item">
                      <span className="customer-label">New Customers</span>
                      <span className="customer-value">{businessStats.customerStats.newCustomers}</span>
                    </div>
                    <div className="customer-item">
                      <span className="customer-label">Returning Customers</span>
                      <span className="customer-value">{businessStats.customerStats.returningCustomers}</span>
                    </div>
                    <div className="customer-item">
                      <span className="customer-label">Total Customers</span>
                      <span className="customer-value">{businessStats.customerStats.totalCustomers}</span>
                    </div>
                    <div className="customer-item">
                      <span className="customer-label">Avg Purchase Value</span>
                      <span className="customer-value">PKR {businessStats.customerStats.averagePurchaseValue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Inventory Status */}
                <div className="analytics-card">
                  <h3 className="analytics-title">Inventory Status</h3>
                  <div className="inventory-stats">
                    <div className="inventory-item available">
                      <FaWarehouse className="inventory-icon" />
                      <span className="inventory-label">Available</span>
                      <span className="inventory-value">{businessStats.inventoryStatus.available}</span>
                    </div>
                    <div className="inventory-item sold">
                      <FaShoppingCart className="inventory-icon" />
                      <span className="inventory-label">Sold</span>
                      <span className="inventory-value">{businessStats.inventoryStatus.sold}</span>
                    </div>
                    <div className="inventory-item in-transit">
                      <FaTruck className="inventory-icon" />
                      <span className="inventory-label">In Transit</span>
                      <span className="inventory-value">{businessStats.inventoryStatus.inTransit}</span>
                    </div>
                    <div className="inventory-item maintenance">
                      <FaTools className="inventory-icon" />
                      <span className="inventory-label">Under Maintenance</span>
                      <span className="inventory-value">{businessStats.inventoryStatus.underMaintenance}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Cars */}
            <div className="recent-section">
              <h3 className="section-title">Recent Sales</h3>
              <div className="cars-list">
                {recentCars.map(car => (
                  <div key={car.id} className="car-item">
                    <div className="car-info">
                      <h4 className="car-name">{car.name}</h4>
                      <p className="car-price">{car.price}</p>
                    </div>
                    <span className={`car-status ${car.status.toLowerCase()}`}>
                      {car.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <h3 className="section-title">Quick Actions</h3>
              <div className="actions-grid">
                <button className="action-btn primary">Add New Car</button>
                <button className="action-btn secondary">View Reports</button>
                <button className="action-btn secondary">Manage Profile</button>
                <button className="action-btn secondary">Support</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cars' && (
          <div className="cars-content">
            <div className="content-header">
              <h2>My Cars</h2>
              <button className="add-car-btn">+ Add New Car</button>
            </div>
            
            {/* Car Cards Grid */}
            <div className="cars-grid">
              {myCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'deals' && (
          <div className="deals-content">
            <h2>Deals</h2>
            <p>Deals management content will go here...</p>
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="customers-content">
            <h2>Customers</h2>
            <p>Customer management content will go here...</p>
          </div>
        )}
      </main>
      </div>
    </div>
  );
};

export default Dashboard;
