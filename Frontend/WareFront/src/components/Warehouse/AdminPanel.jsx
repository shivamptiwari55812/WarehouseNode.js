import { useState, useEffect, useMemo } from 'react';
import { Package, Upload, Download, Search, Plus, Edit, Trash2, Menu, X, ShoppingCart, Users, Building2 } from 'lucide-react';
import InventoryManagement from "./InventoryManagement";
import OrderManagement from '../inbound/OrderManagement';
import CompaniesManagement from "./CompaniesManagement";
import BulkUploadModal from "./BulkUploadModal";
import '../../cssfiles/AdminPanel.css';

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState('inventory');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);

  const [selectedProducts, setSelectedProducts] = useState(new Set());
   const handleLogout = () => {
    localStorage.removeItem('accessToken'); 
    window.location.href = '/adminPanel-login'; 
  };

  const toggleProductSelection = (id) => {
    const newSelection = new Set(selectedProducts);
    newSelection.has(id) ? newSelection.delete(id) : newSelection.add(id);
    setSelectedProducts(newSelection);
  };

  const toggleAllProducts = () => {
    if (selectedProducts.size === products.length) setSelectedProducts(new Set());
    else setSelectedProducts(new Set(products.map(p => p.id)));
  };

  const [products, setProducts] = useState([]);

  const filteredProducts = useMemo(() =>
    products.filter(p =>
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
    ), [products, searchTerm]
  );

  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState(new Set());
  const token = localStorage.getItem('accessToken');

  const toggleOrderSelection = (id) => {
    const newSelection = new Set(selectedOrders);
    newSelection.has(id) ? newSelection.delete(id) : newSelection.add(id);
    setSelectedOrders(newSelection);
  };

  const toggleAllOrders = () => {
    if (selectedOrders.size === orders.length) setSelectedOrders(new Set());
    else setSelectedOrders(new Set(orders.map(o => o._id)));
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch('http://localhost:5050/orderManagement/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setOrders(data || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => { if (activeTab === 'orders') fetchOrders(); }, [activeTab]);

  const handleAdminAction = async (action) => {
    if (selectedOrders.size === 0) return alert("Select at least one order");
    try {
      for (let orderId of selectedOrders) {
        const res = await fetch(
          `http://localhost:5050/api/admin/orders/${orderId}/${action}`,
          { method: 'POST', headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        if (!res.ok) console.error(data.message);
      }
      alert(`${action.charAt(0).toUpperCase() + action.slice(1)} action applied!`);
      setSelectedOrders(new Set());
      fetchOrders(); 
    } catch (err) {
      console.error(err);
      alert("Error performing action!");
    }
  };

  const handleDeleteOrders = async () => {
    if (selectedOrders.size === 0) return alert("Select at least one order");
    try {
      for (let orderId of selectedOrders) {
        await fetch(`http://localhost:5050/api/admin/orders/${orderId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      alert("Selected orders deleted!");
      setSelectedOrders(new Set());
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Error deleting orders!");
    }
  };

   const handleExport = async () => {
    try {
      const res = await fetch('http://localhost:5050/admin/orders/export/csv', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'orders.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error exporting CSV:', err);
    }
  };

  const [users, setUsers] = useState([]); 

const fetchUsers = async () => {
  try {
    const res = await fetch("http://localhost:5050/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setUsers(data || []);
  } catch (err) {
    console.error("Error fetching users:", err);
  }
};

useEffect(() => {
  if (activeTab === "users") fetchUsers();
}, [activeTab]);


  return (
    <div className="admin-panel">
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo">
            <Package /> 
            {sidebarOpen && <span className="logo-text">Admin Panel</span>}
          </div>
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X /> : <Menu />}
          </button>
        </div>


        <nav className="sidebar-nav">
          <button className={`nav-item ${activeTab === 'inventory' ? 'active' : ''}`} onClick={() => setActiveTab('inventory')}>
            <Package /> {sidebarOpen && <span>Inventory</span>}
          </button>
          <button className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
            <ShoppingCart /> {sidebarOpen && <span>Orders</span>}
          </button>
          
          <button className={`nav-item ${activeTab === 'companies' ? 'active' : ''}`} onClick={() => setActiveTab('companies')}>
            <Building2 /> {sidebarOpen && <span>Companies</span>}
          </button>
          <button className={`nav-item ${activeTab === 'users' ? 'active' : ''}`} 
            onClick={() => setActiveTab('users')}>
            <Users /> {sidebarOpen && <span>Users</span>}
          </button>

          <button className="nav-item logout-button" onClick={handleLogout}>
          <X /> {sidebarOpen && <span>Logout</span>}
        </button>

        </nav>
      </div>

      <main className={`admin-main ${!sidebarOpen ? 'full' : ''}`}>
        {activeTab === 'inventory' && (
          <div className="warehouse-content">
<div className="floating-top-right">
  <input
    type="file"
    id="bulk-upload-input"
    accept=".csv"
    style={{ display: 'none' }}
    onChange={async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('http://localhost:5050/api/products/bulk-upload', {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          alert(`Upload successful! ${data.added} products added.`);
        } else {
          alert(`Upload failed: ${data.message}`);
        }
      } catch (err) {
        alert(`Error: ${err.message}`);
      }
    }}
  />
  <button
    className="btn-primary"
    onClick={() => setShowBulkUploadModal(true)}
  >
    <Upload /> Bulk Upload
  </button>
</div>


            <InventoryManagement
              products={filteredProducts}
              selectedProducts={selectedProducts}
              toggleProductSelection={toggleProductSelection}
              toggleAllProducts={toggleAllProducts}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            {showBulkUploadModal && (
              <BulkUploadModal onClose={() => setShowBulkUploadModal(false)} />
            )}
          </div>
        )}

        {activeTab === 'orders' && (
  <div className="warehouse-content">
    <div className="admin-order-controls">
      <button className="btn-primary" onClick={() => handleAdminAction('approve')}>Approve</button>
      <button className="btn-primary" onClick={() => handleAdminAction('reject')}>Reject</button>
      <button className="btn-primary" onClick={handleDeleteOrders}>Delete</button>
      <button className="btn-primary" onClick={handleExport}>Export CSV / PDF</button>
    </div>

   <OrderManagement
  orders={orders}
  selectedOrders={selectedOrders}
  toggleOrderSelection={toggleOrderSelection}
  toggleAllOrders={toggleAllOrders}
/>
  </div>
)}

        {activeTab === 'companies' && (
        <div className="warehouse-content">
          <CompaniesManagement />
        </div>
)}

{activeTab === 'users' && (
  <div className="warehouse-content">
    <h2>Registered Users</h2>
    <table className="admin-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Verified</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.isVerified ? "Yes" : "No"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

    </main>
    </div>
  );
}

export default AdminPanel;
