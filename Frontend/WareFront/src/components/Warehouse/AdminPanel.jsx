import { useState } from 'react';
import { Users, Settings, BarChart3, Shield, Menu, X, Search, Plus, Edit, Trash2, Eye } from 'lucide-react';
import '../../cssfiles/AdminPanel.css';

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const users = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Manager', status: 'active', lastLogin: '2024-01-15' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Inbound Staff', status: 'active', lastLogin: '2024-01-14' },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'Outbound Staff', status: 'inactive', lastLogin: '2024-01-10' },
    { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Data Operator', status: 'active', lastLogin: '2024-01-13' },
  ];

  const roles = [
    { id: '1', name: 'Manager', permissions: ['read', 'write', 'delete', 'manage_users'], userCount: 3 },
    { id: '2', name: 'Inbound Staff', permissions: ['read', 'write'], userCount: 8 },
    { id: '3', name: 'Outbound Staff', permissions: ['read', 'write'], userCount: 12 },
    { id: '4', name: 'Data Operator', permissions: ['read', 'write', 'data_entry'], userCount: 5 },
  ];

  const stats = [
    { title: 'Total Users', value: '28', change: '+12%', icon: Users },
    { title: 'Active Sessions', value: '18', change: '+5%', icon: Eye },
    { title: 'Total Roles', value: '4', change: '0%', icon: Shield },
    { title: 'System Health', value: '98%', change: '+2%', icon: BarChart3 },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderDashboard = () => (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back! Here's what's happening with your system.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">
              <stat.icon size={24} />
            </div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
              <span className="stat-change">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">
              <Users size={16} />
            </div>
            <div className="activity-content">
              <p><strong>New user registered:</strong> John Doe</p>
              <span>2 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">
              <Shield size={16} />
            </div>
            <div className="activity-content">
              <p><strong>Role updated:</strong> Manager permissions modified</p>
              <span>4 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">
              <Settings size={16} />
            </div>
            <div className="activity-content">
              <p><strong>System maintenance:</strong> Database backup completed</p>
              <span>1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="users-content">
      <div className="content-header">
        <h1>User Management</h1>
        <div className="header-actions">
          <div className="search-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-primary">
            <Plus size={16} />
            Add User
          </button>
        </div>
      </div>

      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-info">
                    <div className="user-avatar">{user.name.charAt(0)}</div>
                    <span>{user.name}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className="role-badge">{user.role}</span>
                </td>
                <td>
                  <span className={`status-badge ${user.status}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.lastLogin}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" title="View">
                      <Eye size={14} />
                    </button>
                    <button className="btn-icon" title="Edit">
                      <Edit size={14} />
                    </button>
                    <button className="btn-icon delete" title="Delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderRoles = () => (
    <div className="roles-content">
      <div className="content-header">
        <h1>Role Management</h1>
        <button className="btn-primary">
          <Plus size={16} />
          Create Role
        </button>
      </div>

      <div className="roles-grid">
        {roles.map((role) => (
          <div key={role.id} className="role-card">
            <div className="role-header">
              <h3>{role.name}</h3>
              <div className="role-actions">
                <button className="btn-icon">
                  <Edit size={14} />
                </button>
                <button className="btn-icon delete">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div className="role-stats">
              <span>{role.userCount} users</span>
              <span>{role.permissions.length} permissions</span>
            </div>
            <div className="role-permissions">
              <h4>Permissions:</h4>
              <div className="permission-tags">
                {role.permissions.map((permission, index) => (
                  <span key={index} className="permission-tag">
                    {permission.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="settings-content">
      <div className="content-header">
        <h1>System Settings</h1>
      </div>

      <div className="settings-sections">
        <div className="setting-section">
          <h3>Security Settings</h3>
          <div className="setting-item">
            <label>
              <input type="checkbox" defaultChecked />
              Require two-factor authentication
            </label>
          </div>
          <div className="setting-item">
            <label>
              <input type="checkbox" defaultChecked />
              Force password reset every 90 days
            </label>
          </div>
          <div className="setting-item">
            <label>
              Minimum password length:
              <input type="number" defaultValue="8" min="6" max="20" />
            </label>
          </div>
        </div>

        <div className="setting-section">
          <h3>System Configuration</h3>
          <div className="setting-item">
            <label>
              System timezone:
              <select defaultValue="UTC">
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time</option>
                <option value="PST">Pacific Time</option>
              </select>
            </label>
          </div>
          <div className="setting-item">
            <label>
              <input type="checkbox" defaultChecked />
              Enable system maintenance mode
            </label>
          </div>
        </div>

        <div className="setting-section">
          <h3>Backup & Recovery</h3>
          <div className="setting-item">
            <label>
              Backup frequency:
              <select defaultValue="daily">
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </label>
          </div>
          <button className="btn-primary">Create Manual Backup</button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'users':
        return renderUsers();
      case 'roles':
        return renderRoles();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="admin-panel">
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo">TG</div>           {/* Logo box */}
              <div className="logo-text">Admin Panel</div> {/* Text next to logo */}
              <button 
                className="sidebar-toggle"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <BarChart3 size={20} />
            {sidebarOpen && <span>Dashboard</span>}
          </button>
          <button
            className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <Users size={20} />
            {sidebarOpen && <span>Users</span>}
          </button>
          <button
            className={`nav-item ${activeTab === 'roles' ? 'active' : ''}`}
            onClick={() => setActiveTab('roles')}
          >
            <Shield size={20} />
            {sidebarOpen && <span>Roles</span>}
          </button>
          <button
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={20} />
            {sidebarOpen && <span>Settings</span>}
          </button>
        </nav>
      </div>

      <div className="main-content">
        <div className="content-wrapper">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
