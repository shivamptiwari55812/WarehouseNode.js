import React, { useState, useEffect } from "react";
import "../../cssfiles/CompaniesManagement.css";

const AdminCompaniesManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("accessToken");

  const fetchCompanies = async () => {
    try {
      const res = await fetch("http://localhost:5050/admin/companies", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setCompanies(data.data);
      else alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Error fetching companies");
    }
  };

  useEffect(() => { fetchCompanies(); }, []);

  const handleAddCompany = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    try {
      const res = await fetch("http://localhost:5050/admin/companies", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.success) { alert("Company added!"); setShowAddModal(false); fetchCompanies(); }
      else alert(data.message || "Error adding company");
    } catch (err) { console.error(err); alert("Something went wrong!"); }
    finally { setLoading(false); }
  };

  const filteredCompanies = companies.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="companies-management">
      <h2>Company Management</h2>
      <div className="controls">
        <input placeholder="Search..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} />
        <button onClick={()=>setShowAddModal(true)}>Add Company</button>
      </div>

      <table className="companies-table">
        <thead>
          <tr><th>Name</th><th>Contact</th><th>Type</th><th>Status</th></tr>
        </thead>
        <tbody>
          {filteredCompanies.map(c=>(
            <tr key={c._id}>
              <td>{c.name}</td><td>{c.contact}</td><td>{c.type}</td><td>{c.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddModal && (
        <div className="modal-overlay" onClick={()=>setShowAddModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>Add Company</h3>
            <form onSubmit={handleAddCompany}>
              <input name="name" placeholder="Company Name" required />
              <input name="contact" placeholder="Contact Person" required />
              <input name="email" type="email" placeholder="Email" />
              <input name="phone" placeholder="Phone" />
              <input name="GSTIN" placeholder="GSTIN" />
              <textarea name="address" placeholder="Address" required></textarea>
              <select name="type" required>
                <option value="">Select Type</option>
                <option value="Technology">Technology</option>
                <option value="Retail">Retail</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Food & Beverage">Food & Beverage</option>
                <option value="Other">Other</option>
              </select>
              <select name="status">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <input type="file" name="document" />
              <div className="modal-actions">
                <button type="button" onClick={()=>setShowAddModal(false)}>Cancel</button>
                <button type="submit">{loading ? "Adding..." : "Add"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCompaniesManagement;
