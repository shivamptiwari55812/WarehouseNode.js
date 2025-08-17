import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export function Dashboard(){
    console.log(localStorage.getItem('token'))
    
    return(
        <>
        <h1>Dashboard Page</h1>
        </>
    )
}
import React, { useEffect, useState } from "react";
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

const Dashboard = () => {
  const [summary, setSummary] = useState({});
  const [status, setStatus] = useState({});
  const [orders, setOrders] = useState([]);

  // Fetch data from backend
  useEffect(() => {
    fetch("http://localhost:5050/api/dashboard/summary")
      .then(res => res.json())
      .then(data => setSummary(data))
      .catch(err => console.error("Error fetching summary:", err));

    fetch("http://localhost:5050/api/dashboard/status")
      .then(res => res.json())
      .then(data => setStatus(data))
      .catch(err => console.error("Error fetching status:", err));

    fetch("http://localhost:5050/api/dashboard/recent-orders")
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error("Error fetching orders:", err));
  }, []);

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
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>
                        <span className={`status-pill status-${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{order.date}</td>
                      <td>${order.amount}</td>
                      <td><button className="button-33">Invoice</button></td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center" }}>No orders found</td>
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

export default Dashboard;
