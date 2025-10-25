import React, { useState, useEffect } from "react";
import "../../cssfiles/CompaniesManagement.css";

const CompaniesManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const token = localStorage.getItem("accessToken");

  // Fetch all companies
  const fetchCompanies = async () => {
    try {
      const res = await fetch("http://localhost:5050/orderManagement/companies", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setCompanies(data.data);
    } catch (err) {
      console.error("Error fetching companies:", err);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Filter companies
  const filteredCompanies = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add Company
  const handleAddCompany = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    try {
      const res = await fetch("http://localhost:5050/orderManagement/companies", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        alert("Company added!");
        setShowAddModal(false);
        fetchCompanies();
      } else alert(data.message || "Error adding company");
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Update Company
  const handleUpdateCompany = async (e) => {
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
      if (data.success) {
        alert("Company updated!");
        setShowUpdateModal(false);
        fetchCompanies();
      } else alert(data.message || "Error updating company");
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Delete Company
  const handleDeleteCompany = async (id) => {
    if (!window.confirm("Are you sure you want to delete this company?")) return;
    try {
      const res = await fetch(`http://localhost:5050/orderManagement/companies/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        alert("Company deleted!");
        fetchCompanies();
      } else alert(data.message || "Error deleting company");
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="companies-management">
      <h2>Company Management</h2>
      <div className="controls">
        <input
          type="text"
          placeholder="Search companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => setShowAddModal(true)}>Add Company</button>
      </div>

      <table className="companies-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCompanies.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.contact}</td>
              <td>{c.type}</td>
              <td>{c.status}</td>
              <td>
                <button onClick={() => { setSelectedCompany(c); setShowUpdateModal(true); }}>Edit</button>
                <button onClick={() => handleDeleteCompany(c._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Add Company</h3>
            <form onSubmit={handleAddCompany}>
              <input name="name" placeholder="Company Name" required />
              <input name="contact" placeholder="Contact" required />
              <input name="email" type="email" placeholder="Email" />
              <input name="phone" placeholder="Phone" />
              <input name="GSTIN" placeholder="GSTIN" />
              <textarea name="address" placeholder="Address"></textarea>
              <select name="type" required>
                <option value="">Select Type</option>
                <option value="Technology">Technology</option>
                <option value="Retail">Retail</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Food & Beverage">Food & Beverage</option>
                <option value="Other">Other</option>
              </select>
              <select name="status" defaultValue="active">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit">{loading ? "Adding..." : "Add"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && selectedCompany && (
        <div className="modal-overlay" onClick={() => setShowUpdateModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Update Company</h3>
            <form onSubmit={handleUpdateCompany}>
              <input name="name" defaultValue={selectedCompany.name} required />
              <input name="contact" defaultValue={selectedCompany.contact} required />
              <input name="email" defaultValue={selectedCompany.email} type="email" />
              <input name="phone" defaultValue={selectedCompany.phone} />
              <input name="GSTIN" defaultValue={selectedCompany.GSTIN} />
              <textarea name="address" defaultValue={selectedCompany.address}></textarea>
              <select name="type" defaultValue={selectedCompany.type} required>
                <option value="Technology">Technology</option>
                <option value="Retail">Retail</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Food & Beverage">Food & Beverage</option>
                <option value="Other">Other</option>
              </select>
              <select name="status" defaultValue={selectedCompany.status}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowUpdateModal(false)}>Cancel</button>
                <button type="submit">{loading ? "Updating..." : "Update"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompaniesManagement;
