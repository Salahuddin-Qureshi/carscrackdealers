import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { 
  FaUser, 
  FaUsers, 
  FaCommentDots, 
  FaShoppingCart, 
  FaUserPlus, 
  FaCog, 
  FaSignOutAlt, 
  FaChevronDown,
  FaBars,
  FaHome,
  FaTh,
  FaCar,
  FaCheckCircle,
  FaHeart,
  FaExchangeAlt,
  FaFileAlt,
  FaShoppingBag,
  FaUserCog,
  FaCrown,
  FaCogs
} from 'react-icons/fa';
import '../styles/Sidebar.css';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showUserDropdown, setShowUserDropdown] = useState(false);

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
  
  const menuItems = [
    { 
      path: '/', 
      icon: <FaHome size={18} />, 
      label: 'Home' 
    },
    { 
      path: '/dashboard', 
      icon: <FaTh size={18} />, 
      label: 'Dashboard' 
    },
    { 
      path: '/sell-car', 
      icon: <FaCar size={18} />, 
      label: 'Sell Your Car' 
    },
    { 
      path: '/inventory', 
      icon: <FaCheckCircle size={18} />, 
      label: 'My Inventory' 
    },
    { 
      path: '/parts-store', 
      icon: <FaCogs size={18} />, 
      label: 'Parts Store' 
    },
    { 
      path: '/favorites', 
      icon: <FaHeart size={18} />, 
      label: 'My Favorites' 
    },
    { 
      path: '/trade-cars', 
      icon: <FaExchangeAlt size={18} />, 
      label: 'Trade Cars' 
    },
    { 
      path: '/requested-cars', 
      icon: <FaFileAlt size={18} />, 
      label: 'Requested Cars' 
    },
    { 
      path: '/add-vendor', 
      icon: <FaUserPlus size={18} />, 
      label: 'Add Sub-Vendor' 
    },
    { 
      path: '/messages', 
      icon: <FaCommentDots size={18} />, 
      label: 'Messages' 
    },
    { 
      path: '/buy-cars', 
      icon: <FaShoppingBag size={18} />, 
      label: 'Buy Cars' 
    },
    { 
      path: '/subscription', 
      icon: <FaCrown size={18} />, 
      label: 'Subscription' 
    },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-toggle" onClick={toggleSidebar}>
          <FaBars size={20} />
        </div>
        {!isCollapsed && (
          <div className="sidebar-title">
            <span>Menu</span>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item, index) => (
            <li key={index} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                title={isCollapsed ? item.label : ''}
              >
                <span className="nav-icon">{item.icon}</span>
                {!isCollapsed && <span className="nav-label">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        {/* User Profile Section - Only show when expanded */}
        {!isCollapsed && (
          <div className="user-profile-section">
          <div 
            className="user-profile-trigger"
            onClick={() => setShowUserDropdown(!showUserDropdown)}
          >
            <div className="user-avatar">
              <FaUser size={20} />
            </div>
            <div className="user-info">
              <span className="user-name">John Dealer</span>
              <span className="user-role">Premium Dealer</span>
            </div>
            <FaChevronDown 
              size={14} 
              className={`dropdown-arrow ${showUserDropdown ? 'rotated' : ''}`}
            />
          </div>

          {/* User Dropdown */}
          {showUserDropdown && (
            <div className="user-dropdown" onMouseEnter={() => setShowUserDropdown(true)} onMouseLeave={() => setShowUserDropdown(false)}>
              <Link to="/profile-settings" className="dropdown-item" onClick={() => setShowUserDropdown(false)}>
                <FaUser size={14} />
                <span>Profile Settings</span>
              </Link>
              <Link to="/user-management" className="dropdown-item" onClick={() => setShowUserDropdown(false)}>
                <FaUserCog size={14} />
                <span>User Management</span>
              </Link>
              <button className="dropdown-item logout-item" onClick={handleLogout}>
                <FaSignOutAlt size={14} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
        )}

      </div>
    </div>
  );
};

export default Sidebar;
