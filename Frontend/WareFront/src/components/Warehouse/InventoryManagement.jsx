import React, { useState,useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Package, AlertTriangle, Download } from 'lucide-react';
import '../../cssfiles/InventoryManagement.css';

const InventoryManagement = () => {
  // Simple state management - no complex hooks
  const [products, setProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form data for adding/editing products
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    stock: '',
    minStock: '',
    maxStock: '',
    price: '',
    supplier: '',
    location: ''
  });

  const categories = ['Electronics', 'Clothing', 'Footwear', 'Home & Garden', 'Sports'];

  // Simple function to generate product status
  function getProductStatus(stock, minStock) {
    if (stock === 0) return 'out-of-stock';
    if (stock <= minStock) return 'low-stock';
    return 'in-stock';
  }

  // Simple function to generate new product ID
  function generateProductId() {
    const lastId = products.length > 0 ? 
      Math.max(...products.map(p => parseInt(p.id.replace('P', '')))) : 0;
    return 'P' + String(lastId + 1).padStart(3, '0');
  }

  // Handle form input changes
  function handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  // Add new product
  const handleAddProduct = async(event)=> {
    event.preventDefault();
    
    const stock = parseInt(formData.stock) || 0;
    const minStock = parseInt(formData.minStock) || 0;
    
    const newProduct = {
      id: generateProductId(),
      name: formData.name,
      category: formData.category,
      stock: stock,
      minStock: minStock,
      maxStock: parseInt(formData.maxStock) || 0,
      price: parseFloat(formData.price) || 0,
      supplier: formData.supplier,
      location: formData.location,
      status: getProductStatus(stock, minStock)
    };
    console.log(newProduct)
try{
    const response = await fetch("http://localhost:5050/api/products",{
      method:"POST",
      headers:{
         "Content-Type": "application/json"
      },
      body:JSON.stringify(newProduct)
    })

    const result = await response.json()

    if(response.ok){
      console.log(result)

      alert("Product added Succesfully")
    }
    else{
      alert("Error while adding",result.message)
    }
  }
  catch(err){
    console.log(err.message)
  }

    setProducts([...products, newProduct]);
    setShowAddModal(false);
    resetForm();
  }

   useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5050/api/productDetails");
      const result = await response.json();
      console.log("API result:", result);

      if (response.ok) {
        setProducts(result.productData || []);  // 👈 grab the array
      } else {
        console.error("Error fetching products:", result.message);
        setProducts([]); // fallback
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]); // fallback
    }
  };

  fetchProducts();
}, []);

  // Edit product
  function handleEditProduct(event) {
    event.preventDefault();
    
    const stock = parseInt(formData.stock) || 0;
    const minStock = parseInt(formData.minStock) || 0;
    
    const updatedProducts = products.map(product => {
      if (product.id === editingProduct.id) {
        return {
          ...product,
          name: formData.name,
          category: formData.category,
          stock: stock,
          minStock: minStock,
          maxStock: parseInt(formData.maxStock) || 0,
          price: parseFloat(formData.price) || 0,
          supplier: formData.supplier,
          location: formData.location,
          status: getProductStatus(stock, minStock)
        };
      }
      return product;
    });

    setProducts(updatedProducts);
    setShowEditModal(false);
    setEditingProduct(null);
    resetForm();
  }

  // Delete product
  async function handleDeleteProduct(productId) {
   console.log(productId)
    try{
    const response = await fetch(`http://localhost:5050/api/deleteProduct/${productId}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      }
    });
    if(response.ok){
 if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(product => product._id !== productId);
      setProducts(updatedProducts);}
    }}
    catch(err){
      console.log(err)
    }

  }

  // Update stock quantity
  function updateStock(productId, newStock) {
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        const stock = Math.max(0, Math.min(newStock, product.maxStock));
        return {
          ...product,
          stock: stock,
          status: getProductStatus(stock, product.minStock)
        };
      }
      return product;
    });
    setProducts(updatedProducts);
  }

  // Open edit modal
  function openEditModal(product) {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      stock: product.stock.toString(),
      minStock: product.minStock.toString(),
      maxStock: product.maxStock.toString(),
      price: product.price.toString(),
      supplier: product.supplier,
      location: product.location
    });
    setShowEditModal(true);
  }

  // Reset form
  function resetForm() {
    setFormData({
      name: '',
      category: '',
      stock: '',
      minStock: '',
      maxStock: '',
      price: '',
      supplier: '',
      location: ''
    });
  }

  // Filter products
  function getFilteredProducts() {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }

  // Calculate stats
  function getStats() {
    const total = products.length;
    const inStock = products.filter(p => p.status === 'in-stock').length;
    const lowStock = products.filter(p => p.status === 'low-stock').length;
    const outOfStock = products.filter(p => p.status === 'out-of-stock').length;
    const totalValue = products.reduce((sum, product) => sum + (product.stock * product.price), 0);
    
    return { total, inStock, lowStock, outOfStock, totalValue };
  }

  // Export inventory
  function exportInventory() {
    const csvContent = [
      'ID,Name,Category,Stock,Min Stock,Max Stock,Price,Supplier,Location,Status',
      ...products.map(product => 
        `${product.id},"${product.name}","${product.category}",${product.stock},${product.minStock},${product.maxStock},${product.price},"${product.supplier}","${product.location}","${product.status}"`
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
  }

  const filteredProducts = getFilteredProducts();
  const stats = getStats();

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

      <div className="inventory-stats">
        <div className="stat-card">
          <Package size={24} />
          <div>
            <h3>{stats.total}</h3>
            <p>Total Products</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="value-indicator">$</div>
          <div>
            <h3>${stats.totalValue.toLocaleString()}</h3>
            <p>Total Value</p>
          </div>
        </div>
        <div className="stat-card in-stock">
          <Package size={24} />
          <div>
            <h3>{stats.inStock}</h3>
            <p>In Stock</p>
          </div>
        </div>
        <div className="stat-card low-stock">
          <AlertTriangle size={24} />
          <div>
            <h3>{stats.lowStock}</h3>
            <p>Low Stock</p>
          </div>
        </div>
        <div className="stat-card out-of-stock">
          <AlertTriangle size={24} />
          <div>
            <h3>{stats.outOfStock}</h3>
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

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-header">
                <div className="product-info">
                  <div className={`status-icon ${product.status}`}>
                    {product.status === 'in-stock' ? 
                      <Package size={16} /> : 
                      <AlertTriangle size={16} />
                    }
                  </div>
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
                    onClick={() => updateStock(product.id, product.stock - 1)}
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
                    onClick={() => updateStock(product.id, product.stock + 1)}
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
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Product</h2>
            </div>

            <form onSubmit={handleAddProduct} className="product-form">
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
                <button type="submit" className="btn btn-primary">
                  Add Product
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
                <strong>{editingProduct?.name}</strong>
                <span>{editingProduct?.id}</span>
              </div>
            </div>

            <form onSubmit={handleEditProduct} className="product-form">
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
                    setEditingProduct(null);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update Product
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