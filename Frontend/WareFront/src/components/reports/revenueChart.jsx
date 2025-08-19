import React, { useEffect, useRef } from "react";
import "../../cssfiles/RevenueChart.css"; // Create this CSS file

export default function RevenueChart({ reports, isLoading }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const loadChart = async () => {
      if (typeof window !== "undefined" && !window.Chart) {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/chart.js";
        script.onload = () => {
          initializeChart();
        };
        document.head.appendChild(script);
      } else if (window.Chart) {
        initializeChart();
      }
    };

    const initializeChart = () => {
      if (!chartRef.current || !reports || isLoading) return;

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      if (!ctx) return;

      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const chartData = reports.map((report) => ({
        month: monthNames[report.month - 1],
        revenue: parseFloat(report.revenue),
      }));

      chartInstance.current = new window.Chart(ctx, {
        type: "line",
        data: {
          labels: chartData.map((d) => d.month),
          datasets: [
            {
              label: "Revenue ($)",
              data: chartData.map((d) => d.revenue),
              borderColor: "hsl(207, 90%, 42%)",
              backgroundColor: "hsla(207, 90%, 42%, 0.1)",
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: {
              beginAtZero: false,
              grid: { color: "#f1f5f9" },
            },
            x: {
              grid: { display: false },
            },
          },
        },
      });
    };

    loadChart();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [reports, isLoading]);

  return (
    <div className="chart-card" data-testid="revenue-chart">
      <div className="chart-header">Monthly Revenue Trend</div>
      <div className="chart-content">
        {isLoading ? (
          <div className="loading">Loading chart...</div>
        ) : (
          <canvas ref={chartRef}></canvas>
        )}
      </div>
    </div>
  );
}
