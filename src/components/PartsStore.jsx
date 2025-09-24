import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaFilter, FaPlus, FaEye, FaEdit, FaTrash, FaCog, FaTachometerAlt, FaGasPump, FaCogs, FaMapMarkerAlt, FaFileAlt, FaFolder, FaArchive } from 'react-icons/fa';
import PartsCard from './PartsCard';
import '../styles/PartsStore.css';

const DocumentCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('dateAdded');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [totalCategories, setTotalCategories] = useState(0);
  const [archivedCategories, setArchivedCategories] = useState(0);
  const [activeCategories, setActiveCategories] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Static data initialization
  const initializeData = () => {
    setLoading(true);
    // Simulate loading
    setTimeout(() => {
      setCategories(mockCategories);
      setTotalCategories(mockCategories.length);
      setActiveCategories(mockCategories.filter(cat => cat.status === 'active').length);
      setArchivedCategories(mockCategories.filter(cat => cat.status === 'archived').length);
      setLoading(false);
    }, 500);
  };

  // Mock data for document categories
  const mockCategories = [
    {
      id: 1,
      name: 'Legal Documents',
      category: 'Legal',
      type: 'Contract',
      documentCount: 456,
      storageSize: '12.5 GB',
      description: 'Legal contracts, agreements, and compliance documents',
      icon: 'FaFileAlt',
      dateAdded: '2024-01-15',
      status: 'active',
      lastAccessed: '2024-01-20',
      retentionPeriod: '7 years'
    },
    {
      id: 2,
      name: 'Financial Records',
      category: 'Financial',
      type: 'Accounting',
      documentCount: 389,
      storageSize: '9.8 GB',
      description: 'Financial statements, invoices, and accounting records',
      icon: 'FaFileAlt',
      dateAdded: '2024-01-14',
      status: 'active',
      lastAccessed: '2024-01-19',
      retentionPeriod: '5 years'
    },
    {
      id: 3,
      name: 'HR Files',
      category: 'Human Resources',
      type: 'Personnel',
      documentCount: 234,
      storageSize: '7.2 GB',
      description: 'Employee records, policies, and HR documentation',
      icon: 'FaFolder',
      dateAdded: '2024-01-13',
      status: 'active',
      lastAccessed: '2024-01-18',
      retentionPeriod: '3 years'
    },
    {
      id: 4,
      name: 'Technical Manuals',
      category: 'Technical',
      type: 'Documentation',
      documentCount: 198,
      storageSize: '5.6 GB',
      description: 'Technical documentation, manuals, and procedures',
      icon: 'FaCogs',
      dateAdded: '2024-01-12',
      status: 'active',
      lastAccessed: '2024-01-17',
      retentionPeriod: '10 years'
    },
    {
      id: 5,
      name: 'Contracts',
      category: 'Legal',
      type: 'Agreement',
      documentCount: 156,
      storageSize: '4.2 GB',
      description: 'Business contracts and vendor agreements',
      icon: 'FaFileAlt',
      dateAdded: '2024-01-11',
      status: 'active',
      lastAccessed: '2024-01-16',
      retentionPeriod: '7 years'
    },
    {
      id: 6,
      name: 'Archived Projects',
      category: 'Projects',
      type: 'Archive',
      documentCount: 89,
      storageSize: '15.3 GB',
      description: 'Completed project documentation and archives',
      icon: 'FaArchive',
      dateAdded: '2024-01-10',
      status: 'archived',
      lastAccessed: '2024-01-05',
      retentionPeriod: 'Permanent'
    }
  ];

  useEffect(() => {
    initializeData();
  }, []);

  const categoryTypes = [
    'all',
    'Legal',
    'Financial',
    'Human Resources',
    'Technical',
    'Projects'
  ];

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || category.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedCategories = [...filteredCategories].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'documentCount':
        aValue = a.documentCount;
        bValue = b.documentCount;
        break;
      case 'dateAdded':
        aValue = new Date(a.dateAdded);
        bValue = new Date(b.dateAdded);
        break;
      case 'storageSize':
        aValue = parseFloat(a.storageSize);
        bValue = parseFloat(b.storageSize);
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
    const totalDocuments = categories.reduce((sum, cat) => sum + cat.documentCount, 0);
    const totalStorage = categories.reduce((sum, cat) => sum + parseFloat(cat.storageSize), 0);
    return {
      totalCategories: totalCategories,
      activeCategories: activeCategories,
      archivedCategories: archivedCategories,
      totalDocuments: totalDocuments,
      totalStorage: totalStorage.toFixed(1) + ' GB'
    };
  };

  const stats = getStats();

  const handleView = (category) => {
    navigate(`/category/${category.id}`);
  };

  const handleEdit = (category) => {
    navigate(`/category/${category.id}/edit`);
  };

  const handleDelete = (category) => {
    if (window.confirm(`Are you sure you want to delete ${category.name}?`)) {
      setCategories(categories.filter(c => c.id !== category.id));
    }
  };

  const handleAddCategory = () => {
    navigate('/categories/add');
  };

  if (loading) {
    return (
      <div className="parts-store">
        <div className="parts-store-header">
          <h1>Document Categories</h1>
        </div>
        <div className="parts-loading">
          <div className="loading-spinner"></div>
          <p>Loading categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="parts-store">
        <div className="parts-store-header">
          <h1>Document Categories</h1>
        </div>
        <div className="parts-error-message">
          <p>{error}</p>
          <button 
            className="parts-retry-btn"
            onClick={initializeData}
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
          <h1>Document Categories</h1>
          <button 
            className="parts-add-btn"
            onClick={handleAddCategory}
          >
            <FaPlus />
            Add Category
          </button>
        </div>
      </div>

      <div className="parts-stats">
        <div className="parts-stat-card">
          <div className="parts-stat-icon">
            <FaFolder />
          </div>
          <div className="parts-stat-content">
            <div className="parts-stat-label">Total Categories</div>
            <div className="parts-stat-value">{stats.totalCategories}</div>
          </div>
        </div>
        
        <div className="parts-stat-card">
          <div className="parts-stat-icon">
            <FaFileAlt />
          </div>
          <div className="parts-stat-content">
            <div className="parts-stat-label">Active Categories</div>
            <div className="parts-stat-value">{stats.activeCategories}</div>
          </div>
        </div>
        
        <div className="parts-stat-card">
          <div className="parts-stat-icon">
            <FaArchive />
          </div>
          <div className="parts-stat-content">
            <div className="parts-stat-label">Archived</div>
            <div className="parts-stat-value">{stats.archivedCategories}</div>
          </div>
        </div>
        
        <div className="parts-stat-card">
          <div className="parts-stat-icon">
            <FaCogs />
          </div>
          <div className="parts-stat-content">
            <div className="parts-stat-label">Total Storage</div>
            <div className="parts-stat-value">{stats.totalStorage}</div>
          </div>
        </div>
      </div>

      <div className="parts-controls">
        <div className="parts-search">
          <FaSearch className="parts-search-icon" />
          <input
            type="text"
            placeholder="Search categories..."
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
                <label>Category Type</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="parts-filter-select"
                >
                  {categoryTypes.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Types' : category}
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
                  <option value="documentCount">Document Count</option>
                  <option value="dateAdded">Date Added</option>
                  <option value="storageSize">Storage Size</option>
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
            {sortedCategories.length} categories found
          </span>
        </div>
        
        <div className="parts-container grid">
          {sortedCategories.map(category => (
            <PartsCard
              key={category.id}
              part={category}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
        
        {sortedCategories.length === 0 && (
          <div className="parts-empty">
            <div className="parts-empty-icon">
              <FaFolder />
            </div>
            <h3>No categories found</h3>
            <p>Try adjusting your search or filters</p>
            <button 
              className="parts-add-btn"
              onClick={handleAddCategory}
            >
              <FaPlus />
              Add First Category
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentCategories;
