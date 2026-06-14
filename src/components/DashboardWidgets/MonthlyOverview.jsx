import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

function MonthlyOverview({ monthlyChart = [] }) {
  const data = {
    labels: monthlyChart.map((item) => item.month),
    datasets: [
      {
        label: "Expenses",
        data: monthlyChart.map((item) => item.expenses),
        tension: 0.45,
        fill: true,
        borderWidth: 3
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: getComputedStyle(document.documentElement)
            .getPropertyValue("--text-secondary")
        }
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `Expenses: ₹${context.raw.toLocaleString("en-IN")}`
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: getComputedStyle(document.documentElement)
            .getPropertyValue("--text-muted")
        },
        grid: {
          color: "rgba(148, 163, 184, 0.12)"
        }
      },
      y: {
        ticks: {
          color: getComputedStyle(document.documentElement)
            .getPropertyValue("--text-muted"),
          callback: (value) => `₹${value / 1000}k`
        },
        grid: {
          color: "rgba(148, 163, 184, 0.12)"
        }
      }
    }
  };

  return (
    <div className="chart-card">
      <div className="chart-title">
        <div>
          <h3>Monthly Overview</h3>
          <p>Real expense trend from MongoDB</p>
        </div>

        <span>Live Data</span>
      </div>

      <div className="chart-height">
        {monthlyChart.length ? (
          <Line data={data} options={options} />
        ) : (
          <p className="progress-text">Add expenses to generate chart.</p>
        )}
      </div>
    </div>
  );
}

export default MonthlyOverview;