import React, { useState } from 'react';
import { Package, Scan, Plus, Minus, CheckCircle, AlertCircle } from 'lucide-react';
import '../../cssfiles/Scanner.css';

function Scanner() {
  const [mode, setMode] = useState('add');
  const [scannedBarcode, setScannedBarcode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [product, setProduct] = useState({
    barcode: '',
    name: '',
    category: '',
    quantity: 1,
    price: 0,
    description: '',
    locationRow: '',
    locationShelf: '',
    locationColumn: ''
  });
  const [notification, setNotification] = useState(null);

  const handleBarcodeInput = (barcode) => {
    setScannedBarcode(barcode);
    setProduct(prev => ({ ...prev, barcode }));
    
    // Simulate barcode lookup (in real app, this would query a database)
    if (barcode === '123456789012') {
      setProduct(prev => ({
        ...prev,
        name: 'Sample Product',
        category: 'Electronics',
        price: 29.99,
        description: 'High-quality electronic device',
        locationRow: 'A',
        locationShelf: '1',
        locationColumn: '1'
      }));
    }
  };

  const handleLocationChange = (field, value) => {
    const updatedProduct = { ...product, [field]: value };
    setProduct(updatedProduct);
  };

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const mockBarcode = Math.random().toString().slice(2, 14);
      handleBarcodeInput(mockBarcode);
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!product.barcode || !product.name) {
      setNotification({
        message: 'Please fill in required fields (barcode and product name)',
        type: 'error'
      });
      return;
    }

    if (mode === 'add' && (!product.locationRow || !product.locationShelf || !product.locationColumn)) {
      setNotification({
        message: 'Please specify complete location (Row, Shelf, Column)',
        type: 'error'
      });
      return;
    }

    if (mode === 'release' && (!product.locationRow || !product.locationShelf || !product.locationColumn)) {
      setNotification({
        message: 'Please specify location to release from',
        type: 'error'
      });
      return;
    }

    const action = mode === 'add' ? 'added to' : 'released from';
    const location = `${product.locationRow}-${product.locationShelf}-${product.locationColumn}`;
    setNotification({
      message: `${product.name} successfully ${action} inventory at location ${location}`,
      type: 'success'
    });

    setProduct({
      barcode: '',
      name: '',
      category: '',
      quantity: 1,
      price: 0,
      description: '',
      locationRow: '',
      locationShelf: '',
      locationColumn: ''
    });
    setScannedBarcode('');
    
    setTimeout(() => setNotification(null), 3000);
  };

  const handleInputChange = (field, value) => {
    setProduct(prev => ({ ...prev, [field]: value }));
  };

  const generateRowOptions = () => {
    return Array.from({ length: 10 }, (_, i) => String.fromCharCode(65 + i)); // A-J
  };

  const generateShelfOptions = () => {
    return Array.from({ length: 10 }, (_, i) => (i + 1).toString()); // 1-10
  };

  const generateColumnOptions = () => {
    return Array.from({ length: 20 }, (_, i) => (i + 1).toString()); // 1-20
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <Package className="logo-icon" />
            
          </div>
          
          <div className="mode-toggle">
            <button 
              className={`mode-btn ${mode === 'add' ? 'active' : ''}`}
              onClick={() => setMode('add')}
            >
              <Plus className="mode-icon" />
              Add to Inventory
            </button>
            <button 
              className={`mode-btn ${mode === 'release' ? 'active' : ''}`}
              onClick={() => setMode('release')}
            >
              <Minus className="mode-icon" />
              Release from Inventory
            </button>
          </div>
        </div>
      </header>

      <main className="scanner-main-content">
        <div className="scanner-section">
          <div className="scanner-card">
            <h2>Barcode Scanner</h2>
            
            <div className="scanner-area">
              <div className={`scanner-viewfinder ${isScanning ? 'scanning' : ''}`}>
                <div className="scanner-line"></div>
                <Scan className="scanner-icon" />
              </div>
              
              <div className="scanner-controls">
                <button 
                  className="scan-btn"
                  onClick={handleScan}
                  disabled={isScanning}
                >
                  {isScanning ? 'Scanning...' : 'Start Scan'}
                </button>
                
                <div className="manual-input">
                  <input
                    type="text"
                    placeholder="Or enter barcode manually"
                    value={scannedBarcode}
                    onChange={(e) => handleBarcodeInput(e.target.value)}
                    className="barcode-input"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="product-section">
          <div className="product-card">
            <h2>{mode === 'add' ? 'Add Product Details' : 'Release Product'}</h2>
            
            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="barcode">Barcode *</label>
                  <input
                    type="text"
                    id="barcode"
                    value={product.barcode}
                    onChange={(e) => handleInputChange('barcode', e.target.value)}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="name">Product Name *</label>
                  <input
                    type="text"
                    id="name"
                    value={product.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <select
                    id="category"
                    value={product.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="form-input"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Home & Garden">Home & Garden</option>
                    <option value="Sports">Sports</option>
                    <option value="Books">Books</option>
                    <option value="Food & Beverages">Food & Beverages</option>
                    <option value="Tools & Hardware">Tools & Hardware</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Location Section */}
                <div className="form-group location-section full-width">
                  <label>Location *</label>
                  <div className="location-grid">
                    <div className="location-field">
                      <label htmlFor="locationRow">Row (A-J)</label>
                      <select
                        id="locationRow"
                        value={product.locationRow}
                        onChange={(e) => handleLocationChange('locationRow', e.target.value)}
                        className="form-input"
                        required
                      >
                        <option value="">Row</option>
                        {generateRowOptions().map(row => (
                          <option key={row} value={row}>{row}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="location-field">
                      <label htmlFor="locationShelf">Shelf (1-10)</label>
                      <select
                        id="locationShelf"
                        value={product.locationShelf}
                        onChange={(e) => handleLocationChange('locationShelf', e.target.value)}
                        className="form-input"
                        required
                      >
                        <option value="">Shelf</option>
                        {generateShelfOptions().map(shelf => (
                          <option key={shelf} value={shelf}>{shelf}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="location-field">
                      <label htmlFor="locationColumn">Column (1-20)</label>
                      <select
                        id="locationColumn"
                        value={product.locationColumn}
                        onChange={(e) => handleLocationChange('locationColumn', e.target.value)}
                        className="form-input"
                        required
                      >
                        <option value="">Column</option>
                        {generateColumnOptions().map(column => (
                          <option key={column} value={column}>{column}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {mode === 'add' && (
                  <>
                    <div className="form-group">
                      <label htmlFor="quantity">Quantity</label>
                      <input
                        type="number"
                        id="quantity"
                        min="1"
                        value={product.quantity}
                        onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 1)}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="price">Price ($)</label>
                      <input
                        type="number"
                        id="price"
                        min="0"
                        step="0.01"
                        value={product.price}
                        onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="description">Description</label>
                      <textarea
                        id="description"
                        rows={3}
                        value={product.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className="form-input"
                        placeholder="Product description..."
                      />
                    </div>
                  </>
                )}
              </div>

              <button type="submit" className={`submit-btn ${mode}`}>
                {mode === 'add' ? (
                  <>
                    <Plus className="btn-icon" />
                    Add to Inventory
                  </>
                ) : (
                  <>
                    <Minus className="btn-icon" />
                    Release from Inventory
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.type === 'success' ? (
            <CheckCircle className="notification-icon" />
          ) : (
            <AlertCircle className="notification-icon" />
          )}
          <span>{notification.message}</span>
        </div>
      )}
    </div>
  );
}

export default Scanner;
