import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Package, AlertTriangle, Download, Upload } from 'lucide-react';
import '../../cssfiles/InventoryManagement.css';

const InventoryManagement = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form state for adding/editing products
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    stock: 0,
    minStock: 0,
    maxStock: 0,
    price: 0,
    supplier: '',
    location: '',
    description: ''
  });

  const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Food & Beverage', 'Automotive'];

  // Frontend API functions for backend integration
  const API_BASE_URL = 'http://localhost:5050/api'; // Replace with your backend URL

  // Fetch all products from backend
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      // setError('Failed to load products');
      console.error('Error fetching products:', err);
      // Fallback to mock data for demo
      setProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  // Add new product to backend
  const addProduct = async (productData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
      });
      
      if (!response.ok) throw new Error('Failed to add product');
      const newProduct = await response.json();
      console.log(newProduct)
      setProducts(prev => [...prev, newProduct]);
      setShowAddModal(false);
      resetForm();
    } catch (err) {
      // setError('Failed to add product');
      console.error('Error adding product:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update product in backend
  const updateProduct = async (productId, productData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
      });
      
      if (!response.ok) throw new Error('Failed to update product');
      const updatedProduct = await response.json();
      setProducts(prev => prev.map(p => p.id === productId ? updatedProduct : p));
      setShowEditModal(false);
      setSelectedProduct(null);
      resetForm();
    } catch (err) {
      // setError('Failed to update product');
      console.error('Error updating product:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete product from backend
  const deleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete product');
      setProducts(prev => prev.filter(p => p.id !== productId));
    } catch (err) {
      // setError('Failed to delete product');
      console.error('Error deleting product:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update stock quantity
  const updateStock = async (productId, newStock) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}/stock`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stock: newStock })
      });
      
      if (!response.ok) throw new Error('Failed to update stock');
      const updatedProduct = await response.json();
      setProducts(prev => prev.map(p => p.id === productId ? updatedProduct : p));
    } catch (err) {
      // setError('Failed to update stock');
      console.error('Error updating stock:', err);
    }
  };

  // Mock data for demo purposes
  const mockProducts = [
    {
      id: 'P001',
      name: 'iPhone 15 Pro',
      category: 'Electronics',
      stock: 245,
      minStock: 50,
      maxStock: 500,
      price: 999.99,
      supplier: 'Apple Inc.',
      location: 'A1-B2-C3',
      description: 'Latest iPhone model with advanced features',
      status: 'in-stock',
      lastUpdated: '2024-01-15'
    },
    {
      id: 'P002',
      name: 'Samsung Galaxy S24',
      category: 'Electronics',
      stock: 12,
      minStock: 20,
      maxStock: 300,
      price: 899.99,
      supplier: 'Samsung Electronics',
      location: 'A1-B2-C4',
      description: 'Premium Android smartphone',
      status: 'low-stock',
      lastUpdated: '2024-01-14'
    },
    {
      id: 'P003',
      name: 'Nike Air Max 270',
      category: 'Sports',
      stock: 0,
      minStock: 30,
      maxStock: 400,
      price: 150.00,
      supplier: 'Nike Inc.',
      location: 'B2-C1-D2',
      description: 'Comfortable running shoes',
      status: 'out-of-stock',
      lastUpdated: '2024-01-10'
    },
    {
      id: 'P004',
      name: 'Levi\'s 501 Jeans',
      category: 'Clothing',
      stock: 89,
      minStock: 25,
      maxStock: 200,
      price: 79.99,
      supplier: 'Levi Strauss & Co.',
      location: 'C1-D2-E1',
      description: 'Classic straight-fit jeans',
      status: 'in-stock',
      lastUpdated: '2024-01-12'
    }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      stock: 0,
      minStock: 0,
      maxStock: 0,
      price: 0,
      supplier: '',
      location: '',
      description: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedProduct) {
      updateProduct(selectedProduct.id, formData);
    } else {
      addProduct({
        ...formData,
        id: `P${Date.now()}`,
        status: formData.stock > formData.minStock ? 'in-stock' : 
                formData.stock > 0 ? 'low-stock' : 'out-of-stock',
        lastUpdated: new Date().toISOString().split('T')[0]
      });
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      stock: product.stock,
      minStock: product.minStock,
      maxStock: product.maxStock,
      price: product.price,
      supplier: product.supplier,
      location: product.location,
      description: product.description || ''
    });
    setShowEditModal(true);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'in-stock':
        return <Package className="status-icon in-stock" />;
      case 'low-stock':
        return <AlertTriangle className="status-icon low-stock" />;
      case 'out-of-stock':
        return <AlertTriangle className="status-icon out-of-stock" />;
      default:
        return <Package className="status-icon" />;
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const stockStats = {
    total: products.length,
    inStock: products.filter(p => p.status === 'in-stock').length,
    lowStock: products.filter(p => p.status === 'low-stock').length,
    outOfStock: products.filter(p => p.status === 'out-of-stock').length,
    totalValue: products.reduce((sum, product) => sum + (product.stock * product.price), 0)
  };

  const exportInventory = () => {
    const csvContent = [
      'ID,Name,Category,Stock,Min Stock,Max Stock,Price,Supplier,Location,Status,Last Updated',
      ...products.map(product => 
        `${product.id},"${product.name}","${product.category}",${product.stock},${product.minStock},${product.maxStock},${product.price},"${product.supplier}","${product.location}","${product.status}",${product.lastUpdated}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="inventory-management">
      <div className="inventory-header">
        <div>
          <h1>Inventory Management</h1>
          <p>Manage products, stock levels, and inventory operations</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={exportInventory}>
            <Download size={20} />
            Export Inventory
          </button>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={20} />
            Add Product
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <AlertTriangle size={16} />
          {error}
          <button onClick={() => setError('')}>×</button>
        </div>
      )}

      <div className="inventory-stats">
        <div className="stat-card">
          <Package size={24} />
          <div>
            <h3>{stockStats.total}</h3>
            <p>Total Products</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="value-indicator">$</div>
          <div>
            <h3>${stockStats.totalValue.toLocaleString()}</h3>
            <p>Total Value</p>
          </div>
        </div>
        <div className="stat-card in-stock">
          <Package size={24} />
          <div>
            <h3>{stockStats.inStock}</h3>
            <p>In Stock</p>
          </div>
        </div>
        <div className="stat-card low-stock">
          <AlertTriangle size={24} />
          <div>
            <h3>{stockStats.lowStock}</h3>
            <p>Low Stock</p>
          </div>
        </div>
        <div className="stat-card out-of-stock">
          <AlertTriangle size={24} />
          <div>
            <h3>{stockStats.outOfStock}</h3>
            <p>Out of Stock</p>
          </div>
        </div>
      </div>

      <div className="inventory-content">
        <div className="content-header">
          <h2>Product Inventory</h2>
          <div className="filters">
            <div className="search-container">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search products by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading products...</div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-header">
                  <div className="product-info">
                    {getStatusIcon(product.status)}
                    <div>
                      <h3>{product.name}</h3>
                      <p className="product-id">{product.id}</p>
                    </div>
                  </div>
                  <div className={`status-badge status-${product.status}`}>
                    {product.status.replace('-', ' ')}
                  </div>
                </div>

                <div className="product-details">
                  <div className="detail-row">
                    <strong>Category:</strong>
                    <span>{product.category}</span>
                  </div>
                  <div className="detail-row">
                    <strong>Price:</strong>
                    <span>${product.price.toFixed(2)}</span>
                  </div>
                  <div className="detail-row">
                    <strong>Supplier:</strong>
                    <span>{product.supplier}</span>
                  </div>
                  <div className="detail-row">
                    <strong>Location:</strong>
                    <span>{product.location}</span>
                  </div>
                </div>

                <div className="stock-section">
                  <div className="stock-header">
                    <strong>Stock Level</strong>
                    <span className="stock-count">{product.stock} / {product.maxStock}</span>
                  </div>
                  <div className="stock-bar">
                    <div 
                      className="stock-fill"
                      style={{ 
                        width: `${(product.stock / product.maxStock) * 100}%`,
                        backgroundColor: product.status === 'in-stock' ? '#10b981' : 
                                       product.status === 'low-stock' ? '#f59e0b' : '#ef4444'
                      }}
                    ></div>
                  </div>
                  <div className="stock-info">
                    <span>Min: {product.minStock}</span>
                    <span>Max: {product.maxStock}</span>
                  </div>
                  
                  <div className="stock-controls">
                    <button 
                      className="stock-btn decrease"
                      onClick={() => updateStock(product.id, Math.max(0, product.stock - 1))}
                      disabled={product.stock <= 0}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={product.stock}
                      onChange={(e) => updateStock(product.id, parseInt(e.target.value) || 0)}
                      className="stock-input"
                      min="0"
                      max={product.maxStock}
                    />
                    <button 
                      className="stock-btn increase"
                      onClick={() => updateStock(product.id, Math.min(product.maxStock, product.stock + 1))}
                      disabled={product.stock >= product.maxStock}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="product-actions">
                  <button 
                    className="btn btn-secondary"
                    onClick={() => openEditModal(product)}
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => deleteProduct(product.id)}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Product</h2>
            </div>

            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-section">
                <h3>Basic Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Product Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter product name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Price ($)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      required
                      placeholder="0.00"
                    />
                  </div>
                  <div className="form-group">
                    <label>Supplier</label>
                    <input
                      type="text"
                      name="supplier"
                      value={formData.supplier}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter supplier name"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., A1-B2-C3"
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Product description (optional)"
                  ></textarea>
                </div>
              </div>

              <div className="form-section">
                <h3>Stock Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Initial Stock</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      min="0"
                      required
                      placeholder="0"
                    />
                  </div>
                  <div className="form-group">
                    <label>Minimum Stock</label>
                    <input
                      type="number"
                      name="minStock"
                      value={formData.minStock}
                      onChange={handleInputChange}
                      min="0"
                      required
                      placeholder="0"
                    />
                  </div>
                  <div className="form-group">
                    <label>Maximum Stock</label>
                    <input
                      type="number"
                      name="maxStock"
                      value={formData.maxStock}
                      onChange={handleInputChange}
                      min="1"
                      required
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Adding...' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Product</h2>
              <div className="product-summary">
                <strong>{selectedProduct?.name}</strong>
                <span>{selectedProduct?.id}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-section">
                <h3>Basic Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Product Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Price ($)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Supplier</label>
                    <input
                      type="text"
                      name="supplier"
                      value={formData.supplier}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                  ></textarea>
                </div>
              </div>

              <div className="form-section">
                <h3>Stock Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Current Stock</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      min="0"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Minimum Stock</label>
                    <input
                      type="number"
                      name="minStock"
                      value={formData.minStock}
                      onChange={handleInputChange}
                      min="0"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Maximum Stock</label>
                    <input
                      type="number"
                      name="maxStock"
                      value={formData.maxStock}
                      onChange={handleInputChange}
                      min="1"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedProduct(null);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Updating...' : 'Update Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;