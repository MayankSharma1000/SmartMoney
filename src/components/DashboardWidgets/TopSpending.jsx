import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function TopSpending({ categoryChart = [] }) {
  const total = categoryChart.reduce((sum, item) => sum + item.amount, 0);

  const data = {
    labels: categoryChart.map((item) => item.category),
    datasets: [
      {
        data: categoryChart.map((item) => item.amount),
        borderWidth: 0,
        cutout: "72%"
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: getComputedStyle(document.documentElement)
            .getPropertyValue("--text-secondary"),
          usePointStyle: true,
          padding: 18
        }
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.label}: ₹${context.raw.toLocaleString("en-IN")}`
        }
      }
    }
  };

  return (
    <div className="chart-card top-spending-card">
      <div className="chart-title">
        <div>
          <h3>Top Spending</h3>
          <p>Category-wise live expense split</p>
        </div>
      </div>

      <div className="donut-wrapper">
        {categoryChart.length ? (
          <>
            <Doughnut data={data} options={options} />

            <div className="donut-center">
              <span>Total</span>
              <strong>₹{total.toLocaleString("en-IN")}</strong>
            </div>
          </>
        ) : (
          <p className="progress-text">Add expenses to generate chart.</p>
        )}
      </div>
    </div>
  );
}

export default TopSpending;