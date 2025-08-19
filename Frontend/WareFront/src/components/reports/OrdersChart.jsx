import React, { useEffect, useRef } from "react";
import "../../cssfiles/OrdersChart.css"; // Create this CSS file

export default function OrdersChart({ reports, isLoading }) {
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

      const categories = ["Electronics", "Clothing", "Home & Garden", "Sports", "Books", "Other"];
      const data = [35, 25, 15, 12, 8, 5];
      const colors = [
        "hsl(207, 90%, 42%)",
        "hsl(186, 100%, 38%)",
        "hsl(122, 40%, 49%)",
        "hsl(35, 92%, 50%)",
        "hsl(4, 90%, 58%)",
        "hsl(300, 60%, 50%)",
      ];

      chartInstance.current = new window.Chart(ctx, {
        type: "doughnut",
        data: {
          labels: categories,
          datasets: [
            {
              data: data,
              backgroundColor: colors,
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
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
    <div className="chart-card" data-testid="orders-chart">
      <div className="chart-header">Orders by Category</div>
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
