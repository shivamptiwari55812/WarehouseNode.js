import React from "react";
import { Upload, Download, X } from "lucide-react";
import "../../cssfiles/BulkUploadModal.css";

export default function BulkUploadModal({ onClose }) {
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
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        alert(`Upload successful! ${data.added} products added.`);
        onClose();
      } else {
        alert(`Upload failed: ${data.message}`);
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleDownloadTemplate = () => {
    const csvHeader =
      "ID,Name,SKU,Category,Stock,Min Stock,Max Stock,Price,Supplier,Location,Status\n";
    const sampleRow =
      "1,Sample Product,SKU001,Category A,100,10,500,99.99,ABC Supplier,A1,In Stock\n";

    const blob = new Blob([csvHeader + sampleRow], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bulk_upload_template.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <h2>Bulk Upload Products</h2>
        <p className="subtitle">
          Upload a CSV file to import multiple products at once
        </p>

        <div className="upload-box">
          <Upload size={40} className="upload-icon" />
          <h3>Upload CSV File</h3>
          <p>
            Required columns:{" "}
            <strong>
              ID, Name, SKU, Category, Stock, Min Stock, Max Stock, Price,
              Supplier, Location, Status
            </strong>
          </p>

          <input
            type="file"
            id="csvFileInput"
            accept=".csv"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />

          <button
            className="select-file-btn"
            onClick={() => document.getElementById("csvFileInput").click()}
          >
            <Upload size={16} /> Select CSV File
          </button>
        </div>

        <div className="template-download">
          <p>Not sure about the format? Download our CSV template</p>
          <button
            className="download-template-btn"
            onClick={handleDownloadTemplate} 
          >
            <Download size={16} /> Download Template
          </button>
        </div>
      </div>
    </div>
  );
}
