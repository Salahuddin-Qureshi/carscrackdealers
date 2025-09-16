import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSearch, FaFilter, FaPlus, FaEye, FaEdit, FaTrash, FaCog, FaTachometerAlt, FaGasPump, FaCogs, FaMapMarkerAlt } from 'react-icons/fa';
import PartsCard from './PartsCard';
import '../styles/PartsStore.css';

const PartsStore = () => {
  const navigate = useNavigate();
  const [parts, setParts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('dateAdded');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [totalParts, setTotalParts] = useState(0);
  const [soldParts, setSoldParts] = useState(0);
  const [activeParts, setActiveParts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Get base URL from environment variables
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL_CERTIFIED;

  // Function to decode JWT token and extract formatted_id
  const decodeJWT = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  };

  // Fetch total parts from API
  const fetchTotalParts = async () => {
    try {
      setLoading(true);
      setError('');

      const accessToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1];

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      // Decode JWT token to get formatted_id and user status
      const decodedToken = decodeJWT(accessToken);
      if (!decodedToken) {
        throw new Error('Failed to decode access token');
      }

      const formattedId = decodedToken.formatted_id;
      const isCertified = decodedToken.certified || false;
      const isAuthorized = decodedToken.authorized || false;

      if (!formattedId) {
        throw new Error('Formatted ID not found in token');
      }

      if (!baseUrl) {
        throw new Error('Base URL is not configured');
      }

      console.log('Making API request to:', `${baseUrl}/certified/parts/total/`);
      console.log('Request body:', { formatted_id: formattedId });

      const response = await axios.post(
        `${baseUrl}/certified/parts/total/`,
        {
          formatted_id: formattedId
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.status === 200) {
        console.log('API Response:', response.data);
        console.log('User Status:', { certified: isCertified, authorized: isAuthorized });

        // Handle different response structures based on user status
        if (isCertified && isAuthorized) {
          // Both certified and authorized - use certified data
          setTotalParts(response.data.certified_total_parts || 0);
          setSoldParts(response.data.certified_sold_parts || 0);
          setActiveParts(response.data.certified_active_parts || 0);
        } else if (isAuthorized) {
          // Only authorized - use authorized data
          setTotalParts(response.data.authorized_total_parts || 0);
          setSoldParts(response.data.authorized_sold_parts || 0);
          setActiveParts(response.data.authorized_active_parts || 0);
        } else {
          // Fallback to certified data if available
          setTotalParts(response.data.certified_total_parts || 0);
          setSoldParts(response.data.certified_sold_parts || 0);
          setActiveParts(response.data.certified_active_parts || 0);
        }
      }
    } catch (err) {
      console.error('Error fetching total parts:', err);
      setError(err.message || 'Failed to fetch total parts');
    } finally {
      setLoading(false);
    }
  };

  // Mock data for parts (replace with actual API call)
  const mockParts = [
    {
      id: 1,
      name: 'Toyota Camry Engine Block',
      category: 'Engine',
      condition: 'Used',
      price: 15000,
      stock: 2,
      make: 'Toyota',
      model: 'Camry',
      year: '2020',
      description: 'Complete engine block in good condition',
      images: ['/api/placeholder/300/200'],
      dateAdded: '2024-01-15',
      status: 'available'
    },
    {
      id: 2,
      name: 'Honda Civic Headlights',
      category: 'Electrical',
      condition: 'New',
      price: 2500,
      stock: 5,
      make: 'Honda',
      model: 'Civic',
      year: '2021',
      description: 'OEM headlights with LED technology',
      images: ['/api/placeholder/300/200'],
      dateAdded: '2024-01-14',
      status: 'available'
    },
    {
      id: 3,
      name: 'BMW X5 Dashboard',
      category: 'Interior',
      condition: 'Used',
      price: 8000,
      stock: 1,
      make: 'BMW',
      model: 'X5',
      year: '2019',
      description: 'Complete dashboard assembly',
      images: ['/api/placeholder/300/200'],
      dateAdded: '2024-01-13',
      status: 'available'
    },
    {
      id: 4,
      name: 'Mercedes C-Class Bumper',
      category: 'Body',
      condition: 'Used',
      price: 3500,
      stock: 3,
      make: 'Mercedes',
      model: 'C-Class',
      year: '2020',
      description: 'Front bumper with minor scratches',
      images: ['/api/placeholder/300/200'],
      dateAdded: '2024-01-12',
      status: 'available'
    },
    {
      id: 5,
      name: 'Audi A4 Transmission',
      category: 'Transmission',
      condition: 'Used',
      price: 12000,
      stock: 1,
      make: 'Audi',
      model: 'A4',
      year: '2018',
      description: 'Automatic transmission in working condition',
      images: ['/api/placeholder/300/200'],
      dateAdded: '2024-01-11',
      status: 'available'
    }
  ];

  useEffect(() => {
    // Set mock data for now
    setParts(mockParts);
    setTotalParts(mockParts.length);
    setActiveParts(mockParts.filter(part => part.status === 'available').length);
    setSoldParts(mockParts.filter(part => part.status === 'sold').length);
    setLoading(false);
  }, []);

  const categories = [
    'all',
    'Engine',
    'Body',
    'Interior',
    'Electrical',
    'Transmission',
    'Tires',
    'Accessories'
  ];

  const filteredParts = parts.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         part.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         part.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || part.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedParts = [...filteredParts].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'price':
        aValue = a.price;
        bValue = b.price;
        break;
      case 'dateAdded':
        aValue = new Date(a.dateAdded);
        bValue = new Date(b.dateAdded);
        break;
      case 'stock':
        aValue = a.stock;
        bValue = b.stock;
        break;
      default:
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStats = () => {
    const totalValue = parts.reduce((sum, part) => sum + (part.price * part.stock), 0);
    return {
      totalParts: totalParts,
      activeParts: activeParts,
      soldParts: soldParts,
      totalValue: totalValue
    };
  };

  const stats = getStats();

  const handleView = (part) => {
    navigate(`/part/${part.id}`);
  };

  const handleEdit = (part) => {
    navigate(`/part/${part.id}/edit`);
  };

  const handleDelete = (part) => {
    if (window.confirm(`Are you sure you want to delete ${part.name}?`)) {
      setParts(parts.filter(p => p.id !== part.id));
    }
  };

  const handleAddPart = () => {
    navigate('/parts/add');
  };

  if (loading) {
    return (
      <div className="parts-store">
        <div className="parts-store-header">
          <h1>Parts Store</h1>
        </div>
        <div className="parts-loading">
          <div className="loading-spinner"></div>
          <p>Loading parts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="parts-store">
        <div className="parts-store-header">
          <h1>Parts Store</h1>
        </div>
        <div className="parts-error-message">
          <p>{error}</p>
          <button 
            className="parts-retry-btn"
            onClick={fetchTotalParts}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="parts-store">
      <div className="parts-store-header">
        <div className="parts-header-content">
          <h1>Parts Store</h1>
          <button 
            className="parts-add-btn"
            onClick={handleAddPart}
          >
            <FaPlus />
            Add Part
          </button>
        </div>
      </div>

      <div className="parts-stats">
        <div className="parts-stat-card">
          <div className="parts-stat-icon">
            <FaCogs />
          </div>
          <div className="parts-stat-content">
            <div className="parts-stat-label">Total Parts</div>
            <div className="parts-stat-value">{stats.totalParts}</div>
          </div>
        </div>
        
        <div className="parts-stat-card">
          <div className="parts-stat-icon">
            <FaTachometerAlt />
          </div>
          <div className="parts-stat-content">
            <div className="parts-stat-label">Available</div>
            <div className="parts-stat-value">{stats.activeParts}</div>
          </div>
        </div>
        
        <div className="parts-stat-card">
          <div className="parts-stat-icon">
            <FaGasPump />
          </div>
          <div className="parts-stat-content">
            <div className="parts-stat-label">Sold</div>
            <div className="parts-stat-value">{stats.soldParts}</div>
          </div>
        </div>
        
        <div className="parts-stat-card">
          <div className="parts-stat-icon">
            <FaMapMarkerAlt />
          </div>
          <div className="parts-stat-content">
            <div className="parts-stat-label">Total Value</div>
            <div className="parts-stat-value">
              {(() => {
                const pkrValue = stats.totalValue * 280; // Assuming 1 USD = 280 PKR
                if (pkrValue >= 10000000) {
                  const crores = pkrValue / 10000000;
                  return `${crores.toFixed(1)} Cr`;
                } else if (pkrValue >= 100000) {
                  const lacs = pkrValue / 100000;
                  return `${lacs.toFixed(1)} Lac`;
                } else {
                  return `${new Intl.NumberFormat('en-US').format(pkrValue)}`;
                }
              })()}
            </div>
          </div>
        </div>
      </div>

      <div className="parts-controls">
        <div className="parts-search">
          <FaSearch className="parts-search-icon" />
          <input
            type="text"
            placeholder="Search parts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="parts-search-input"
          />
        </div>
        
        <div className="parts-filters">
          <button
            className={`parts-filter-btn ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter />
            Filters
          </button>
          
          {showFilters && (
            <div className="parts-filter-dropdown">
              <div className="parts-filter-group">
                <label>Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="parts-filter-select"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="parts-filter-group">
                <label>Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="parts-filter-select"
                >
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="dateAdded">Date Added</option>
                  <option value="stock">Stock</option>
                </select>
              </div>
              
              <div className="parts-filter-group">
                <label>Order</label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="parts-filter-select"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="parts-results">
        <div className="parts-results-header">
          <span className="parts-results-count">
            {sortedParts.length} parts found
          </span>
        </div>
        
        <div className="parts-container grid">
          {sortedParts.map(part => (
            <PartsCard
              key={part.id}
              part={part}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
        
        {sortedParts.length === 0 && (
          <div className="parts-empty">
            <div className="parts-empty-icon">
              <FaCogs />
            </div>
            <h3>No parts found</h3>
            <p>Try adjusting your search or filters</p>
            <button 
              className="parts-add-btn"
              onClick={handleAddPart}
            >
              <FaPlus />
              Add First Part
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartsStore;
