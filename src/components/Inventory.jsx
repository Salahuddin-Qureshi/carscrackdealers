import React, { useState } from 'react';
import { 
  FaPlus, 
  FaSearch, 
  FaFilter, 
  FaDownload, 
  FaUpload, 
  FaEye, 
  FaEdit, 
  FaCar, 
  FaCheckCircle, 
  FaTimesCircle,
  FaClock,
  FaStar,
  FaSort,
  FaTh,
  FaList
} from 'react-icons/fa';
import InventoryCarCard from './InventoryCarCard';
import '../styles/Inventory.css';

const Inventory = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('dateAdded');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Sample inventory data
  const [cars, setCars] = useState([
    {
      id: 1,
      make: 'BMW',
      model: 'X5',
      variant: 'xDrive40i',
      year: 2023,
      price: 65000,
      mileage: 15000,
      fuel: 'Petrol',
      transmission: 'Automatic',
      location: 'New York',
      status: 'available',
      featured: true,
      tag: 'Premium',
      dateAdded: '2024-12-15',
      images: [
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
        'https://images.unsplash.com/photo-1549317336-206569e8475c?w=400',
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400'
      ],
      views: 245,
      inquiries: 12,
      daysListed: 15
    },
    {
      id: 2,
      make: 'Mercedes',
      model: 'C-Class',
      variant: 'AMG C43',
      year: 2022,
      price: 55000,
      mileage: 12000,
      fuel: 'Petrol',
      transmission: 'Automatic',
      location: 'Los Angeles',
      status: 'available',
      featured: false,
      tag: 'Sport',
      dateAdded: '2024-12-10',
      images: [
        'https://images.unsplash.com/photo-1549317336-206569e8475c?w=400',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400'
      ],
      views: 189,
      inquiries: 8,
      daysListed: 20
    },
    {
      id: 3,
      make: 'Audi',
      model: 'A4',
      variant: 'Quattro',
      year: 2021,
      price: 42000,
      mileage: 25000,
      fuel: 'Petrol',
      transmission: 'Automatic',
      location: 'Chicago',
      status: 'sold',
      featured: false,
      tag: 'Luxury',
      dateAdded: '2024-11-20',
      soldDate: '2024-12-18',
      images: [
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400'
      ],
      views: 156,
      inquiries: 15,
      daysListed: 28,
      customer: {
        name: 'John Smith',
        phone: '+1 (555) 123-4567',
        email: 'john.smith@email.com'
      }
    },
    {
      id: 4,
      make: 'Toyota',
      model: 'Camry',
      variant: 'XLE',
      year: 2022,
      price: 28000,
      mileage: 18000,
      fuel: 'Petrol',
      transmission: 'Automatic',
      location: 'Miami',
      status: 'reserved',
      featured: false,
      tag: 'Reliable',
      dateAdded: '2024-12-05',
      images: [
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
        'https://images.unsplash.com/photo-1549317336-206569e8475c?w=400',
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400'
      ],
      views: 98,
      inquiries: 6,
      daysListed: 25
    },
    {
      id: 5,
      make: 'Honda',
      model: 'Civic',
      variant: 'Sport',
      year: 2023,
      price: 25000,
      mileage: 8000,
      fuel: 'Petrol',
      transmission: 'Manual',
      location: 'Seattle',
      status: 'available',
      featured: true,
      tag: 'Economy',
      dateAdded: '2024-12-12',
      images: [
        'https://images.unsplash.com/photo-1549317336-206569e8475c?w=400',
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400'
      ],
      views: 167,
      inquiries: 9,
      daysListed: 18
    },
    {
      id: 6,
      make: 'Ford',
      model: 'Mustang',
      variant: 'GT',
      year: 2021,
      price: 45000,
      mileage: 22000,
      fuel: 'Petrol',
      transmission: 'Manual',
      location: 'Detroit',
      status: 'sold',
      featured: false,
      tag: 'Muscle',
      dateAdded: '2024-11-15',
      soldDate: '2024-12-10',
      images: [
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400'
      ],
      views: 203,
      inquiries: 18,
      daysListed: 25,
      customer: {
        name: 'Sarah Johnson',
        phone: '+1 (555) 987-6543',
        email: 'sarah.johnson@email.com'
      }
    }
  ]);

  // Filter cars based on active tab and search
  const filteredCars = cars.filter(car => {
    const matchesTab = activeTab === 'active' 
      ? ['available', 'reserved', 'pending'].includes(car.status)
      : car.status === 'sold';
    
    const matchesSearch = searchTerm === '' || 
      `${car.year} ${car.make} ${car.model}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.variant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || car.status === selectedStatus;
    
    return matchesTab && matchesSearch && matchesStatus;
  });

  // Sort cars
  const sortedCars = [...filteredCars].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'price':
        aValue = a.price;
        bValue = b.price;
        break;
      case 'year':
        aValue = a.year;
        bValue = b.year;
        break;
      case 'mileage':
        aValue = a.mileage;
        bValue = b.mileage;
        break;
      case 'dateAdded':
        aValue = new Date(a.dateAdded);
        bValue = new Date(b.dateAdded);
        break;
      default:
        aValue = a.make;
        bValue = b.make;
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Get statistics
  const getStats = () => {
    const activeCars = cars.filter(car => ['available', 'reserved', 'pending'].includes(car.status));
    const soldCars = cars.filter(car => car.status === 'sold');
    const totalValue = activeCars.reduce((sum, car) => sum + car.price, 0);
    const totalViews = cars.reduce((sum, car) => sum + (car.views || 0), 0);
    
    return {
      total: cars.length,
      active: activeCars.length,
      sold: soldCars.length,
      totalValue,
      totalViews
    };
  };

  const stats = getStats();

  const handleEdit = (car) => {
    console.log('Edit car:', car);
    // Handle edit functionality
  };

  const handleDelete = (car) => {
    if (window.confirm(`Are you sure you want to delete ${car.year} ${car.make} ${car.model}?`)) {
      setCars(cars.filter(c => c.id !== car.id));
    }
  };

  const handleView = (car) => {
    console.log('View car:', car);
    // Handle view functionality
  };

  const handleStatusChange = (car, newStatus) => {
    setCars(cars.map(c => 
      c.id === car.id ? { ...c, status: newStatus } : c
    ));
  };

  const tabs = [
    { id: 'active', label: 'Active Cars', icon: <FaCar />, count: stats.active },
    { id: 'sold', label: 'Sold Cars', icon: <FaCheckCircle />, count: stats.sold }
  ];

  return (
    <div className="inventory-page">
      <div className="inventory-container">

        {/* Statistics Cards */}
        <div className="inventory-stats">
          <div className="inventory-stat-card">
            <div className="inventory-stat-icon">
              <FaCar />
            </div>
            <div className="inventory-stat-content">
              <div className="inventory-stat-value">{stats.total}</div>
              <div className="inventory-stat-label">Total Cars</div>
            </div>
          </div>
          <div className="inventory-stat-card">
            <div className="inventory-stat-icon">
              <FaCheckCircle />
            </div>
            <div className="inventory-stat-content">
              <div className="inventory-stat-value">{stats.active}</div>
              <div className="inventory-stat-label">Active Listings</div>
            </div>
          </div>
          <div className="inventory-stat-card">
            <div className="inventory-stat-icon">
              <FaTimesCircle />
            </div>
            <div className="inventory-stat-content">
              <div className="inventory-stat-value">{stats.sold}</div>
              <div className="inventory-stat-label">Sold Cars</div>
            </div>
          </div>
          <div className="inventory-stat-card">
            <div className="inventory-stat-icon">
              <FaStar />
            </div>
            <div className="inventory-stat-content">
              <div className="inventory-stat-value">${(stats.totalValue / 1000).toFixed(0)}K</div>
              <div className="inventory-stat-label">Total Value</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="inventory-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`inventory-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
              <span className="inventory-tab-count">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="inventory-controls">
          <div className="inventory-search-section">
            <div className="inventory-search-box">
              <FaSearch className="inventory-search-icon" />
              <input
                type="text"
                placeholder="Search cars by make, model, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="inventory-search-input"
              />
            </div>
            <button 
              className="inventory-filter-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter />
              Filters
            </button>
          </div>

          <div className="inventory-view-controls">
            <div className="inventory-sort-controls">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="inventory-sort-select"
              >
                <option value="dateAdded">Date Added</option>
                <option value="price">Price</option>
                <option value="year">Year</option>
                <option value="mileage">Mileage</option>
                <option value="make">Make</option>
              </select>
              <button
                className="inventory-sort-order-btn"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                <FaSort className={sortOrder === 'asc' ? 'asc' : 'desc'} />
              </button>
            </div>

            <div className="inventory-view-mode">
              <button
                className={`inventory-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <FaTh />
              </button>
              <button
                className={`inventory-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <FaList />
              </button>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        {/* {showFilters && (
          <div className="inventory-advanced-filters">
            <div className="inventory-filter-group">
              <label>Status:</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="inventory-filter-select"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="pending">Pending</option>
                <option value="sold">Sold</option>
              </select>
            </div>
            <div className="inventory-filter-group">
              <label>Price Range:</label>
              <input type="range" className="inventory-price-range" />
            </div>
            <div className="inventory-filter-group">
              <label>Year Range:</label>
              <input type="range" className="inventory-year-range" />
            </div>
          </div>
        )} */}

        {/* Cars Grid/List */}
        <div className={`inventory-cars-container ${viewMode}`}>
          {sortedCars.length > 0 ? (
            sortedCars.map(car => (
              <InventoryCarCard
                key={car.id}
                car={car}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <div className="inventory-empty-state">
              <FaCar className="inventory-empty-icon" />
              <h3>No cars found</h3>
              <p>Try adjusting your search criteria or add a new car to your inventory.</p>
              <button className="inventory-action-btn inventory-add-btn">
                <FaPlus />
                Add New Car
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {sortedCars.length > 0 && (
          <div className="inventory-pagination">
            <button className="inventory-pagination-btn" disabled>
              Previous
            </button>
            <div className="inventory-pagination-info">
              Showing 1-{sortedCars.length} of {sortedCars.length} cars
            </div>
            <button className="inventory-pagination-btn">
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
