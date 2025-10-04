import React, { useState ,useEffect ,useRef} from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Camera, CameraOff, CheckCircle, RemoveFormatting } from "lucide-react";
// import "../../cssfiles/Scanner.css";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import "../../cssfiles/QRGenerator.css";

interface BarcodeScannerProps {
  onBack: () => void;
}
interface Product {
  _id: string;
  name: string;
  [key: string]: any; // allow other fields
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onBack }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState("");
  const [error, setError] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [ScannerQR,setScannerQR] = useState(false)
  const [productDetails, setProductDetails] = useState<any>(null);
const handleScan = (result: any | null) => {
  if (result && result.length > 0) {
    const code = result[0].rawValue;
    console.log("Scanned result:", code);

    setScannedResult(code);
    setIsScanning(false);

    fetchDetailsOfData(code);

    const action = isAdding ? "increment" : "decrement";
    updateInventory(code, action);
  }
};

const updateInventory = async (code: string, action: "increment" | "decrement") => {
  try {
    const response = await fetch(
      `http://localhost:5050/api/${code}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action })
      }
    );

    const result = await response.json();
    console.log("Update response:", result);
  } catch (error) {
    console.error("Update failed:", error);
  }
};

  const handleButton = () => {};
  const fetchDetailsOfData = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:5050/orderManagement/products/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (response.ok) {
        console.log("Raw fetch result:", result);
        setProductDetails(result.data);
      } else {
        console.log("Error:", response.status, result);
        setProductDetails(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleError = (err: any) => {
    console.error("Scanner error:", err);
    setError(
      "Failed to access camera. Please ensure camera permissions are granted."
    );
    setIsScanning(false);
  };

  const startScanning = () => {
    setError("");
    setScannedResult("");
    setIsScanning(true);
  };

  const AddProduct = () => {
    setIsAdding(true);
    setIsScanning(true);
    setError("");
    setScannedResult("");
  };

  const deleteProduct = () =>{ setIsAdding(false) ; setIsScanning(true);}

  const stopScanning = () => setIsScanning(false);

  const clearResult = () => {
    setScannedResult("");
    setError("");
  };

  // #QRGENERATOR
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedQR, setSelectedQR] = useState<string>("");
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const qrRef = useRef<HTMLDivElement | null>(null);

  const handleGenerateQR = (prod: Product) => {
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

        setProducts(Array.isArray(resData.data) ? resData.data : []);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    getProductDetails();
  }, []);

  return (

    <div className="selectOperation "  >
      <button onClick={()=>setScannerQR(true)}>Scanner</button>
      <button onClick={()=>setScannerQR(false)}>Qr Generator</button>
    
    {ScannerQR === true &&(
    <div className="barcode-app">
      <div className="container-small">
        <div className="card">
          <div className="card-header">
            <h1 className="title-medium">QR Scanner</h1>
          </div>

          <div className="card-addorDelete" style={{ display: "flex" }}>
            <div
              className="card-header"
              style={{ display: "flex", gap: "4vw" }}
            >
              <button onClick={AddProduct}>Add Product</button>
              <button onClick={deleteProduct}>Remove Product</button>
            </div>
          </div>

          <div className="card-content">
            <div className="space-y-4">
              <div className="scanner-controls">
                <button
                  onClick={startScanning}
                  disabled={isScanning}
                  className="btn btn-success flex-1 btn-flex "
                >
                  <Camera className="icon" />
                  {isScanning ? "Scanning..." : "Start Scanner"}
                </button>

                <button
                  onClick={stopScanning}
                  disabled={!isScanning}
                  className="btn btn-outline flex-1 btn-flex"
                >
                  <CameraOff className="icon" />
                  Stop Scanner
                </button>
              </div>

              <div className="scanner-container">
                <h3 className="title-medium mb-4">Camera Scanner</h3>
                <div className="scanner-preview">
                  {isScanning ? (
                    <Scanner
                      onScan={handleScan}
                      onError={handleError}
                      scanDelay={500}
                      constraints={{ facingMode: "environment" }}
                      styles={{
                        container: { width: "100%", height: "100%" },
                        video: {
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        },
                      }}
                    />
                  ) : (
                    <div className="scanner-placeholder">
                      <div className="scanner-placeholder-content">
                        <Camera className="icon-large" />
                        <p>Click "Start Scanner" to begin</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {error && (
              <div className="error-message">
                <p>{error}</p>
              </div>
            )}

            {scannedResult && (
              <div className="space-y-4">
                <div className="result-success">
                  <div className="result-header">
                    <CheckCircle className="icon" />
                    <h3 className="result-title">QR Code Detected!</h3>
                  </div>
                  <div className="result-content">
                    <p className="result-label">Scanned Code:</p>
                    <p className="result-code">{scannedResult}</p>
                    <p className="result-label">Product Details:</p>
                    {productDetails && (
                      <ul>
                        {Object.entries(productDetails).map(([key, value]) => (
                          <li key={key}>
                            <b>{key}:</b>{" "}
                            {value?.toString?.() || JSON.stringify(value)}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <button
                  onClick={clearResult}
                  className="btn btn-outline btn-full"
                >
                  Clear Result
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>)}

            { ScannerQR === false && (
                <div style={{ padding: "20px" }}>
      <h1>Product List</h1>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>QR Code</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod._id}>
              <td>{prod._id}</td>
              <td>{prod.name}</td>
              <td>
                <button onClick={() => handleGenerateQR(prod)}>Generate QR</button>
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
            )}
    </div>
  );
};

export default BarcodeScanner;
