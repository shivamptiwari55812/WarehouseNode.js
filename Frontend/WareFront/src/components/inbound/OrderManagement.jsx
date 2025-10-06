import React, { useState, useEffect } from "react";
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
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [orderProducts, setOrderProducts] = useState([]);
  const [generatePDF, setGeneratePDF] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch(
          "http://localhost:5050/orderManagement/companies",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "Application/json",
            },
          }
        );
        const data = await res.json();
        if (data.success) setCompanies(data.data);
      } catch (err) {
        console.error("Error fetching companies:", err);
      }
    };
    fetchCompanies();
  }, []);

  // Fetch products from backend
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch(
        "http://localhost:5050/api/inventory/products/getdetails",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const productsArray = await res.json(); // <-- this is already the array
      setProducts(productsArray); // <-- set state directly
      console.log("Products loaded:", productsArray);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };
  fetchProducts();
}, []);


  const handleProductDetails = async (e) => {
    e.preventDefault();
    setLoading(true);
  };

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

  const handleAddCompanyClick = () => {
    setShowAddCompanyModal(true);
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

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      orderType,
      companyId: selectedCompany._id,
      products: orderProducts.map((p) => ({
        productId: p.productId,
        quantity: p.quantity,
        notes: p.notes,
      })),
      generatePDF,
    };
    try {
      const res = await fetch("http://localhost:5050/orderManagement/orders", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        alert("Order created successfully!");
        setShowOrderModal(false);
        setOrderProducts([]);
        setGeneratePDF(false);
      } else {
        alert(data.message || "Error creating order");
      }
    } catch (err) {
      console.error("Error submitting order:", err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitUpdate = async (e) => {
  e.preventDefault();
  setLoading(true);

  const formData = new FormData(e.target);

  try {
    const res = await fetch(
      `http://localhost:5050/orderManagement/companies/${selectedCompany._id}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }
    );
    const data = await res.json();
    console.log("Update response:", data);

    if (data.success) {
      alert("Company updated successfully!");

      // ✅ Refresh companies list to reflect the latest data
      const companiesRes = await fetch(
        "http://localhost:5050/orderManagement/companies",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const companiesData = await companiesRes.json();
      if (companiesData.success) {
        setCompanies(companiesData.data);
      }

      // ✅ Close modal
      setShowUpdateModal(false);
    } else {
      alert(data.message || "Error updating company");
    }
  } catch (err) {
    console.error("Error updating company:", err);
    alert("Something went wrong!");
  } finally {
    setLoading(false);
  }
};


  const handleSubmitAddCompany = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    try {
      const res = await fetch(
        "http://localhost:5050/orderManagement/companies",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const data = await res.json();
      if (data.success) {
        alert("Company added successfully!");
        setShowAddCompanyModal(false);
        // Refresh companies list
        const companiesRes = await fetch(
          "http://localhost:5050/orderManagement/companies",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "Application/json",
            },
          }
        );
        const companiesData = await companiesRes.json();
        if (companiesData.success) setCompanies(companiesData.data);
      } else {
        alert(data.message || "Error adding company");
      }
    } catch (err) {
      console.error("Error adding company:", err);
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
    const productInfo = products.find((p) => p._id === product.productId);
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
          <button
            className="btn btn-primary add-company-btn"
            onClick={handleAddCompanyClick}
          >
            <Plus size={16} />
            Add Company
          </button>
        </div>

        <div className="companies-grid">
          {filteredCompanies.map((company) => (
            <div key={company._id} className="company-card">
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

      {/* Add Company Modal */}
      {showAddCompanyModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowAddCompanyModal(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Company</h2>
            </div>

            <form className="update-form" onSubmit={handleSubmitAddCompany}>
              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter company name"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>Contact Person</label>
                <input
                  type="text"
                  name="contact"
                  placeholder="Enter contact person name"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>GSTIN</label>
                <input
                  type="text"
                  name="GSTIN"
                  placeholder="Enter GSTIN number"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Document</label>
                <input
                  type="file"
                  name="document"
                  className="form-input"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea
                  name="address"
                  placeholder="Enter company address"
                  className="form-input"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>Company Type</label>
                <select
                  name="type"
                  className="form-input"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select company type
                  </option>
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
                  name="status"
                  className="form-input"
                  defaultValue="active"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAddCompanyModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Company"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
  onChange={(e) => updateProductRow(index, "productId", e.target.value)}
  required
>
  <option value="">Select Product</option>
  {products.length === 0 ? (
    <option disabled>Loading products...</option>
  ) : (
    products.map((p) => (
      <option key={p._id} value={p._id}>
        {p.name} - ${p.price} (Stock: {p.stock})
      </option>
    ))
  )}
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

            <form className="update-form" onSubmit={handleSubmitUpdate}>
              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={selectedCompany?.name}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Contact Person</label>
                <input
                  type="text"
                  name="contact"
                  defaultValue={selectedCompany?.contact}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={selectedCompany?.email}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  defaultValue={selectedCompany?.phone}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>GSTIN</label>
                <input
                  type="text"
                  name="GSTIN"
                  defaultValue={selectedCompany?.GSTIN}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Document</label>
                <input type="file" name="document" className="form-input" />
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea
                  name="address"
                  defaultValue={selectedCompany?.address}
                  className="form-input"
                  rows="3"
                ></textarea>
              </div>
              <div className="form-group">
                <label>Company Type</label>
                <select
                  name="type"
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
                  name="status"
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
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
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
