import { useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import "../../cssfiles/Dashboard.css"; 
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  PieController
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ArcElement, Tooltip, Legend, Title, PieController, ChartDataLabels);




export function Dashboard ()  {
  const [summary, setSummary] = useState({});
  const [status, setStatus] = useState({});
  const [orders, setOrders] = useState([]);
  const [loadingInvoice, setLoadingInvoice] = useState({});

  // console.log(localStorage.getItem(token))
  // Fetch data from backend
  useEffect(() => {
    fetch("http://localhost:5050/order-management/summary")
      .then(res => res.json())
      .then(data => setSummary(data))
      .catch(err => console.error("Error fetching summary:", err));

    fetch("http://localhost:5050/order-management/status")
      .then(res => res.json())
      .then(data => setStatus(data))
      .catch(err => console.error("Error fetching status:", err));

        fetch("http://localhost:5050/order-management/recent-orders")
      .then(res => res.json())
      .then(data => {
        console.log("Orders API Response:", data); 
        if (Array.isArray(data.data)) {
          setOrders(data.data);
        } else if (Array.isArray(data)) {
          setOrders(data);
        } else {
          console.error("Orders data not array:", data);
          setOrders([]);
        }
      })
      .catch(err => console.error(err));
  }, []);

 const handleDownloadInvoice = async (orderId, pdfUrl) => {
    setLoadingInvoice(prev => ({ ...prev, [orderId]: true }));
    
    try {
      if (pdfUrl) {
        // PDF already exists- download
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = `invoice-${orderId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // PDF generate & download
        const response = await fetch(`http://localhost:5050/order-management/orders/generate-invoice/${orderId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Generated PDF response:", data); 
        
        if (data.pdfUrl) {
          const link = document.createElement('a');
          link.href = data.pdfUrl;
          link.download = `invoice-${orderId}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          setOrders(prevOrders => 
            prevOrders.map(order => 
              order.orderId === orderId || order._id === orderId
                ? { ...order, pdfPath: data.pdfUrl, pdfGenerated: true }
                : order
            )
          );
        } else {
          throw new Error("PDF URL not received from server");
        }
      }
    } catch (error) {
      console.error("Invoice download error:", error);
      alert(`Error: ${error.message || 'Something went wrong. Try again!'}`);
    } finally {
      setLoadingInvoice(prev => ({ ...prev, [orderId]: false }));
    }
  };


  // Render pie chart dynamically
  useEffect(() => {
    const ctx = document.getElementById("pieChart");
    let chartInstance;

    if (ctx && status) {
      chartInstance = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Completed", "Processing", "Pending", "Cancelled"],
          datasets: [
            {
              data: [
                status.completed || 0,
                status.processing || 0,
                status.pending || 0,
                status.cancelled || 0
              ],
              backgroundColor: [
                "rgba(40, 167, 69, 0.85)",
                "rgba(23, 162, 184, 0.85)",
                "rgba(255, 193, 7, 0.85)",
                "rgba(220, 53, 69, 0.85)"
              ],
              borderWidth: 2,
              borderColor: "#fff",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "bottom" },
            datalabels: {
              color: "#fff",
              font: { weight: "bold", size: 14 },
              formatter: (value) => value + "%",
            },
          },
        },
      });
    }

    return () => { if (chartInstance) chartInstance.destroy(); };
  }, [status]);

  return (
    <div className="dashboard-container">
      <div className="main-content">
        {/* Stats */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fa fa-shopping-cart"></i>
            </div>
            <div className="stat-data">
              <h3>Total Orders</h3>
              <div className="stat-number">{summary.totalOrders || 0}</div>
              <div className="stat-trend positive">+5% <span>this week</span></div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fa fa-truck"></i>
            </div>
            <div className="stat-data">
              <h3>Stock</h3>
              <div className="stat-number">{summary.stock || 0}</div>
              <div className="stat-trend negative">-2% <span>this week</span></div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fa fa-bar-chart"></i>
            </div>
            <div className="stat-data">
              <h3>Analytics</h3>
              <div className="stat-number">{summary.analytics || 0}%</div>
              <div className="stat-trend positive">+1.2% <span>this week</span></div>
            </div>
          </div>
        </div>

        {/* Widgets */}
        <div className="dashboard-widgets">
          {/* Pie Chart */}
          <div className="widget">
            <div className="widget-header">
              <h2>Order Status Distribution</h2>
            </div>
            <div className="widget-body">
              <div className="chart-container">
                <canvas id="pieChart"></canvas>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="widget">
            <div className="widget-header">
              <h2>Recent Orders</h2>
            </div>
            <div className="widget-body table-responsive">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Download</th>
                  </tr>
                </thead>
                <tbody>
              {orders.map(order => (
                <tr key={order._id || order.id}>
                  <td>{order.orderId || order.id}</td>
                  <td>{order.companyDetails?.name || order.customer || 'N/A'}</td>
                  <td>
                    <span className={`status-pill status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{new Date(order.createdAt || order.date).toLocaleDateString()}</td>
                  <td>${order.totalAmount || order.amount}</td>
                  <td>
                    <button 
                      className="button-33"
                      onClick={() => handleDownloadInvoice(order.orderId || order._id, order.pdfPath)}
                      disabled={loadingInvoice[order.orderId || order._id]}
                    >
                      {loadingInvoice[order.orderId || order._id] 
                        ? 'Loading...' 
                        : order.pdfPath 
                          ? 'Download' 
                          : 'Generate'
                      } Invoice
                    </button>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


