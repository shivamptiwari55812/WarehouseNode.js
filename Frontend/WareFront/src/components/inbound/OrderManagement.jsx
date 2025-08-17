import React, { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Package,
  Truck,
  Building,
  FileText,
  Download,
} from "lucide-react";
import "../../cssfiles/OrderManagement.css";

const OrderManagement = () => {
  const [orderType, setOrderType] = useState("outbound"); // outbound or inbound
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [orderProducts, setOrderProducts] = useState([]);
  const [generatePDF, setGeneratePDF] = useState(false);

  const companies = [
    {
      id: "C001",
      name: "TechCorp Solutions",
      email: "orders@techcorp.com",
      phone: "+1-555-0123",
      address: "123 Tech Street, Silicon Valley, CA 94000",
      contact: "John Smith",
      type: "Technology",
      status: "Inactive",
    },
    {
      id: "C002",
      name: "Global Retail Inc",
      email: "procurement@globalretail.com",
      phone: "+1-555-0456",
      address: "456 Commerce Ave, New York, NY 10001",
      contact: "Sarah Johnson",
      type: "Retail",
      status: "Inactive",
      GSTIN: "fwrfovebfgo",
    },
    {
      id: "C003",
      name: "Manufacturing Plus",
      email: "supply@mfgplus.com",
      phone: "+1-555-0789",
      address: "789 Industrial Blvd, Detroit, MI 48201",
      contact: "Mike Wilson",
      type: "Manufacturing",
      status: "Inactive",
    },
    {
      id: "C004",
      name: "Healthcare Systems",
      email: "orders@healthsys.com",
      phone: "+1-555-0321",
      address: "321 Medical Center Dr, Boston, MA 02101",
      contact: "Dr. Lisa Brown",
      type: "Healthcare",
      status: "active",
    },
    {
      id: "C005",
      name: "Food Distribution Co",
      email: "logistics@fooddist.com",
      phone: "+1-555-0654",
      address: "654 Food Park Way, Chicago, IL 60601",
      contact: "Robert Davis",
      type: "Food & Beverage",
      status: "active",
    },
  ];

  const products = [
    {
      id: "P001",
      name: "iPhone 15 Pro",
      category: "Electronics",
      price: 999.99,
      stock: 245,
    },
    {
      id: "P002",
      name: "Samsung Galaxy S24",
      category: "Electronics",
      price: 899.99,
      stock: 156,
    },
    {
      id: "P003",
      name: 'MacBook Pro 16"',
      category: "Electronics",
      price: 2499.99,
      stock: 89,
    },
    {
      id: "P004",
      name: "Dell XPS 13",
      category: "Electronics",
      price: 1299.99,
      stock: 134,
    },
    {
      id: "P005",
      name: 'iPad Pro 12.9"',
      category: "Electronics",
      price: 1099.99,
      stock: 78,
    },
  ];

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOrderClick = (company) => {
    setSelectedCompany(company);
    setOrderProducts([{ productId: "", quantity: 1, notes: "" }]);
    setShowOrderModal(true);
  };

  const handleUpdateClick = (company) => {
    setSelectedCompany(company);
    setShowUpdateModal(true);
  };

  const addProductRow = () => {
    setOrderProducts([
      ...orderProducts,
      { productId: "", quantity: 1, notes: "" },
    ]);
  };

  const removeProductRow = (index) => {
    const newProducts = orderProducts.filter((_, i) => i !== index);
    setOrderProducts(newProducts);
  };

  const updateProductRow = (index, field, value) => {
    const newProducts = [...orderProducts];
    newProducts[index][field] = value;
    setOrderProducts(newProducts);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    // Process order submission
    console.log("Order submitted:", {
      type: orderType,
      company: selectedCompany,
      products: orderProducts,
      generatePDF,
    });

    if (generatePDF) {
      generateOrderPDF();
    }

    setShowOrderModal(false);
    setOrderProducts([]);
    setGeneratePDF(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target); 

    try {
      const response = await fetch("http://localhost:5000/api/UpdateCompany", {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update company");
      }

      const result = await response.json();
      console.log("Update success:", result);

      alert("Company updated successfully!");
      setShowUpdateModal(false);
    } catch (error) {
      console.error("Error updating company:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const generateOrderPDF = () => {
    const orderData = `
ORDER ${orderType.toUpperCase()} - ${new Date().toLocaleDateString()}

Company: ${selectedCompany.name}
Contact: ${selectedCompany.contact}
Email: ${selectedCompany.email}
Phone: ${selectedCompany.phone}
Address: ${selectedCompany.address}
GSTIN:${selectedCompany.GSTIN}
Document: ${selectedCompany.document}

PRODUCTS:
${orderProducts
  .map((product, index) => {
    const productInfo = products.find((p) => p.id === product.productId);
    return `${index + 1}. ${
      productInfo?.name || "Unknown Product"
    } - Quantity: ${product.quantity}${
      product.notes ? ` - Notes: ${product.notes}` : ""
    }`;
  })
  .join("\n")}

Order Type: ${orderType.toUpperCase()}
Generated on: ${new Date().toLocaleString()}
    `;

    const blob = new Blob([orderData], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${orderType}-order-${selectedCompany.name.replace(
      /\s+/g,
      "-"
    )}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="order-management">
      <div className="order-header">
        <h1
          style={{
            color: "orangered",
            fontSize: "40px",
            textDecoration: "none",
          }}
        >
          Order Management
        </h1>
        <p>Manage inbound and outbound orders with company partners</p>
      </div>

      <div className="order-type-selector">
        <button
          className={`type-btn ${orderType === "outbound" ? "active" : ""}`}
          onClick={() => setOrderType("outbound")}
        >
          <Truck size={20} />
          Outbound Orders
        </button>
        <button
          className={`type-btn ${orderType === "inbound" ? "active" : ""}`}
          onClick={() => setOrderType("inbound")}
        >
          <Package size={20} />
          Inbound Orders
        </button>
      </div>

      <div className="order-content">
        <div className="content-header">
          <h2>
            {orderType === "outbound" ? "Outbound" : "Inbound"} Order Management
          </h2>
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search companies by name, contact, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="companies-grid">
          {filteredCompanies.map((company) => (
            <div key={company.id} className="company-card">
              <div className="company-header">
                <div className="company-info">
                  <div className="company-icon">
                    <Building size={24} />
                  </div>
                  <div>
                    <h3>{company.name}</h3>
                    <p className="company-type">{company.type}</p>
                  </div>
                </div>
                <div className={`status-badge ${company.status}`}>
                  {company.status}
                </div>
              </div>

              <div className="company-details">
                <div className="detail-row">
                  <strong>Contact:</strong>
                  <span>{company.contact}</span>
                </div>
                <div className="detail-row">
                  <strong>Email:</strong>
                  <span>{company.email}</span>
                </div>
                <div className="detail-row">
                  <strong>Phone:</strong>
                  <span>{company.phone}</span>
                </div>
                <div className="detail-row">
                  <strong>Address:</strong>
                  <span>{company.address}</span>
                </div>
                
              </div>

              <div className="company-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => handleOrderClick(company)}
                >
                  <FileText size={16} />
                  Create Order
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleUpdateClick(company)}
                >
                  <Edit size={16} />
                  Update Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Modal */}
      {showOrderModal && (
        <div className="modal-overlay" onClick={() => setShowOrderModal(false)}>
          <div className="modal large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                Create {orderType === "outbound" ? "Outbound" : "Inbound"} Order
              </h2>
              <div className="company-summary">
                <strong>{selectedCompany?.name}</strong>
                <span>{selectedCompany?.contact}</span>
              </div>
            </div>

            <form onSubmit={handleSubmitOrder} className="order-form">
              <div className="form-section">
                <h3>Products</h3>
                {orderProducts.map((product, index) => (
                  <div key={index} className="product-row">
                    <div className="form-group">
                      <label>Product</label>
                      <select
                        value={product.productId}
                        onChange={(e) =>
                          updateProductRow(index, "productId", e.target.value)
                        }
                        required
                      >
                        <option value="">Select Product</option>
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} - ${p.price} (Stock: {p.stock})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Quantity</label>
                      <input
                        type="number"
                        min="1"
                        value={product.quantity}
                        onChange={(e) =>
                          updateProductRow(
                            index,
                            "quantity",
                            parseInt(e.target.value)
                          )
                        }
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Notes</label>
                      <input
                        type="text"
                        placeholder="Optional notes"
                        value={product.notes}
                        onChange={(e) =>
                          updateProductRow(index, "notes", e.target.value)
                        }
                      />
                    </div>
                    {orderProducts.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-danger remove-btn"
                        onClick={() => removeProductRow(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-secondary add-product-btn"
                  onClick={addProductRow}
                >
                  <Plus size={16} />
                  Add Product
                </button>
              </div>

              <div className="form-section">
                <div className="pdf-option">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={generatePDF}
                      onChange={(e) => setGeneratePDF(e.target.checked)}
                    />
                    <span>Generate PDF Order Document</span>
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowOrderModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Download size={16} />
                  Create Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Company Modal */}
      {showUpdateModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowUpdateModal(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Update Company Details</h2>
            </div>

            <form className="update-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  defaultValue={selectedCompany?.name}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Contact Person</label>
                <input
                  type="text"
                  defaultValue={selectedCompany?.contact}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  defaultValue={selectedCompany?.email}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  defaultValue={selectedCompany?.phone}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>GSTIN</label>
                <input
                  type="Text"
                  defaultValue={selectedCompany?.GSTIN}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Document</label>
                <input
                  type="File"
                  Value={selectedCompany?.document}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea
                  defaultValue={selectedCompany?.address}
                  className="form-input"
                  rows="3"
                ></textarea>
              </div>
              <div className="form-group">
                <label>Company Type</label>
                <select
                  defaultValue={selectedCompany?.type}
                  className="form-input"
                >
                  <option value="Technology">Technology</option>
                  <option value="Retail">Retail</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Food & Beverage">Food & Beverage</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  defaultValue={selectedCompany?.status}
                  className="form-input"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowUpdateModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Updating..." : "Update Details"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
