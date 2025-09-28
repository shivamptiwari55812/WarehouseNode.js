import React, { useState, useRef, useEffect } from "react";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import "../..cssfiles/QRGenerator.css";

const ProductList = () => {
  const [product, setProducts] = useState([]);
  const [selectedQR, setSelectedQR] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const qrRef = useRef(null);

  const handleGenerateQR = (prod) => {
    setSelectedQR(`${prod._id} - ${prod.name}`);
  };

  const handleDownload = async () => {
    if (!qrRef.current || !selectedQR) return;

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(qrRef.current, { scale: 2 });
      const link = document.createElement("a");
      link.download = `qr-code-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error("Error downloading QR code:", error);
      alert("Failed to download QR code. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  // ✅ Fetch products on mount
useEffect(() => {
  const getProductDetails = async () => {
    try {
      console.log("Fetching products...");
      const response = await fetch(
        "http://localhost:5050/orderManagement/products"
      );
      if (!response.ok) throw new Error("Failed to fetch products");

      const resData = await response.json();
      console.log("Data received:", resData);

      // Extract the product array
      setProducts(Array.isArray(resData.data) ? resData.data : []);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };
  getProductDetails();
}, []);


  return (
    <div style={{ padding: "20px" }}>
      <h1>Product List</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>QR Code</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(product) &&
            product.map((prod) => (
              <tr key={prod._id}>
                <td>{prod._id}</td>
                <td>{prod.name}</td>
                <td>
                  <button onClick={() => handleGenerateQR(prod)}>
                    Generate QR
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {selectedQR && (
        <div ref={qrRef} className="qr-container" style={{ marginTop: "20px" }}>
          <h2>Generated QR Code:</h2>
          <QRCode value={selectedQR} />
          <p>{selectedQR}</p>
        </div>
      )}

      {selectedQR && (
        <div style={{ marginTop: "20px" }}>
          <button onClick={handleDownload} disabled={isDownloading}>
            {isDownloading ? "Downloading..." : "Download"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
