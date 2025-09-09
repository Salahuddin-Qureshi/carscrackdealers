import React, { useState } from 'react';
import { 
  FaUserPlus, 
  FaSearch, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaFilter,
  FaDownload,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendar,
  FaShieldAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaClock
} from 'react-icons/fa';
import '../styles/UserManagement.css';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);

  // Sample users data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      role: 'Admin',
      status: 'Active',
      joinDate: '2024-01-15',
      lastLogin: '2024-12-20',
      avatar: null
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 234-5678',
      role: 'Dealer',
      status: 'Active',
      joinDate: '2024-02-20',
      lastLogin: '2024-12-19',
      avatar: null
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.wilson@email.com',
      phone: '+1 (555) 345-6789',
      role: 'Customer',
      status: 'Inactive',
      joinDate: '2024-03-10',
      lastLogin: '2024-11-15',
      avatar: null
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 456-7890',
      role: 'Dealer',
      status: 'Pending',
      joinDate: '2024-12-18',
      lastLogin: 'Never',
      avatar: null
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@email.com',
      phone: '+1 (555) 567-8901',
      role: 'Customer',
      status: 'Active',
      joinDate: '2024-04-05',
      lastLogin: '2024-12-20',
      avatar: null
    }
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Customer',
    status: 'Pending'
  });

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const user = {
        ...newUser,
        id: users.length + 1,
        joinDate: new Date().toISOString().split('T')[0],
        lastLogin: 'Never',
        avatar: null
      };
      setUsers([...users, user]);
      setNewUser({ name: '', email: '', phone: '', role: 'Customer', status: 'Pending' });
      setShowAddUserModal(false);
    }
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active':
        return <FaCheckCircle className="status-icon active" />;
      case 'Inactive':
        return <FaTimesCircle className="status-icon inactive" />;
      case 'Pending':
        return <FaClock className="status-icon pending" />;
      default:
        return <FaClock className="status-icon pending" />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin':
        return '#dc3545';
      case 'Dealer':
        return '#d01818';
      case 'Customer':
        return '#28a745';
      default:
        return '#6c757d';
    }
  };

  return (
    <div className="user-management">
      <div className="page-actions">
        <div className="page-description">
          <p className="page-subtitle">Manage users, roles, and permissions</p>
        </div>
        <button 
          className="add-user-btn"
          onClick={() => setShowAddUserModal(true)}
        >
          <FaUserPlus />
          Add New User
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FaUser />
          </div>
          <div className="stat-content">
            <div className="stat-value">{users.length}</div>
            <div className="stat-label">Total Users</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaCheckCircle />
          </div>
          <div className="stat-content">
            <div className="stat-value">{users.filter(u => u.status === 'Active').length}</div>
            <div className="stat-label">Active Users</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaShieldAlt />
          </div>
          <div className="stat-content">
            <div className="stat-value">{users.filter(u => u.role === 'Admin').length}</div>
            <div className="stat-label">Admins</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaClock />
          </div>
          <div className="stat-content">
            <div className="stat-value">{users.filter(u => u.status === 'Pending').length}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="filters-section">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-controls">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Dealer">Dealer</option>
            <option value="Customer">Customer</option>
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </select>
          
          <button className="export-btn">
            <FaDownload />
            Export
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="user-info">
                    <div className="user-avatar">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} />
                      ) : (
                        <FaUser />
                      )}
                    </div>
                    <div className="user-details">
                      <div className="user-name">{user.name}</div>
                      <div className="user-email">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span 
                    className="role-badge"
                    style={{ backgroundColor: getRoleColor(user.role) }}
                  >
                    {user.role}
                  </span>
                </td>
                <td>
                  <div className="status-cell">
                    {getStatusIcon(user.status)}
                    <span className="status-text">{user.status}</span>
                  </div>
                </td>
                <td>{user.joinDate}</td>
                <td>{user.lastLogin}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="action-btn view-btn"
                      onClick={() => handleEditUser(user)}
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    <button 
                      className="action-btn edit-btn"
                      onClick={() => handleEditUser(user)}
                      title="Edit User"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => handleDeleteUser(user.id)}
                      title="Delete User"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New User</h3>
              <button 
                className="close-btn"
                onClick={() => setShowAddUserModal(false)}
              >
                <FaTimesCircle />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  placeholder="Enter full name"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  placeholder="Enter email address"
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                >
                  <option value="Customer">Customer</option>
                  <option value="Dealer">Dealer</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  value={newUser.status}
                  onChange={(e) => setNewUser({...newUser, status: e.target.value})}
                >
                  <option value="Pending">Pending</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setShowAddUserModal(false)}
              >
                Cancel
              </button>
              <button 
                className="save-btn"
                onClick={handleAddUser}
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {showUserDetails && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content user-details-modal">
            <div className="modal-header">
              <h3>User Details</h3>
              <button 
                className="close-btn"
                onClick={() => setShowUserDetails(false)}
              >
                <FaTimesCircle />
              </button>
            </div>
            <div className="modal-body">
              <div className="user-profile">
                <div className="profile-avatar">
                  {selectedUser.avatar ? (
                    <img src={selectedUser.avatar} alt={selectedUser.name} />
                  ) : (
                    <FaUser />
                  )}
                </div>
                <div className="profile-info">
                  <h4>{selectedUser.name}</h4>
                  <p>{selectedUser.email}</p>
                  <span 
                    className="role-badge"
                    style={{ backgroundColor: getRoleColor(selectedUser.role) }}
                  >
                    {selectedUser.role}
                  </span>
                </div>
              </div>
              
              <div className="user-details-grid">
                <div className="detail-item">
                  <FaEnvelope />
                  <div>
                    <label>Email</label>
                    <span>{selectedUser.email}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <FaPhone />
                  <div>
                    <label>Phone</label>
                    <span>{selectedUser.phone}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <FaCalendar />
                  <div>
                    <label>Join Date</label>
                    <span>{selectedUser.joinDate}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <FaClock />
                  <div>
                    <label>Last Login</label>
                    <span>{selectedUser.lastLogin}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setShowUserDetails(false)}
              >
                Close
              </button>
              <button 
                className="edit-btn"
                onClick={() => {
                  setShowUserDetails(false);
                  // Handle edit functionality
                }}
              >
                Edit User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
