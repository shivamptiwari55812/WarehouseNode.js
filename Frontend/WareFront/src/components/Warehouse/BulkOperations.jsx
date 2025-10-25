import React, { useRef } from "react";
import { FiUpload, FiFileText, FiDownload } from "react-icons/fi";
import { BsFileEarmarkSpreadsheet } from "react-icons/bs";
import "../../cssfiles/BulkOperations.css";

const BulkOperations = () => {
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("accessToken");

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5050/api/products/bulk-upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Upload successful! ${data.added || 0} products added.`);
      } else {
        alert(`Upload failed: ${data.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Error uploading file:", err);
      alert("Error uploading file. Check console for details.");
    }
  };

  const handleExportCSV = async () => {
    try {
      const res = await fetch("http://localhost:5050/admin/orders/export/csv", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to export CSV");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "inventory_export.csv";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export error:", err);
      alert("Error exporting CSV.");
    }
  };

  const handleExportExcel = async () => {
    try {
      const res = await fetch("http://localhost:5050/admin/orders/export/excel", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to export Excel");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "inventory_export.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export error:", err);
      alert("Error exporting Excel file.");
    }
  };

  return (
    <div className="bulk-operations-container">
      <h1 className="title">Bulk Operations</h1>
      <p className="subtitle">Upload and manage data in bulk</p>

      <div className="card-container">
        <div className="card upload-section">
          <h2 className="card-title">Upload CSV File</h2>
          <p className="card-subtitle">Import products using CSV format</p>

          <div
            className="upload-box"
            onClick={() => fileInputRef.current.click()}
          >
            <FiFileText className="upload-icon" />
            <p className="upload-text">Drop CSV file here or click to browse</p>
            <p className="upload-requirements">
              Required columns: <b>ID</b>, <b>Name</b>, <b>SKU</b>, <b>Category</b>,{" "}
              <b>Stock</b>, <b>Min Stock</b>, <b>Max Stock</b>, <b>Price</b>,{" "}
              <b>Supplier</b>, <b>Location</b>, <b>Status</b>
            </p>

            {/* File Upload Button */}
            <button
              className="upload-button"
              onClick={() => fileInputRef.current.click()}
            >
              <FiUpload className="btn-icon" /> Select File
            </button>
            <input
              type="file"
              accept=".csv"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
          </div>
        </div>

        <div className="card export-section">
          <h2 className="card-title">Export Data</h2>
          <p className="card-subtitle">Download inventory data</p>

          <div className="export-options">
            <p className="export-format-label">Export Format</p>

            <button className="export-button" onClick={handleExportCSV}>
              <FiDownload className="btn-icon" /> Export as CSV
            </button>

            <button className="export-button" onClick={handleExportExcel}>
              <BsFileEarmarkSpreadsheet className="btn-icon" /> Export as Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkOperations;
