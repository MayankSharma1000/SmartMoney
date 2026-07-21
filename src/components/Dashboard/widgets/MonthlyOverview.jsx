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
  const totalExpenses = monthlyChart.reduce(
    (sum, item) => sum + Number(item.expenses || 0),
    0
  );

  const highestWeek =
    monthlyChart.length > 0
      ? monthlyChart.reduce((prev, current) =>
          prev.expenses > current.expenses
            ? prev
            : current
        )
      : null;

  const data = {
    labels: monthlyChart.map(
      (item) => item.month
    ),

    datasets: [
      {
        label: "Weekly Spending",

        data: monthlyChart.map(
          (item) => item.expenses
        ),

        tension: 0.45,

        fill: true,

        borderWidth: 3,

        pointRadius: 5,

        pointHoverRadius: 8,

        backgroundColor:
          "rgba(59,130,246,0.15)",

        borderColor:
          "rgb(59,130,246)"
      }
    ]
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false
      },

      tooltip: {
        callbacks: {
          label: (context) =>
            `₹${context.raw.toLocaleString(
              "en-IN"
            )}`
        }
      }
    },

    scales: {
      x: {
        grid: {
          color:
            "rgba(148,163,184,0.08)"
        },

        ticks: {
          color:
            getComputedStyle(
              document.documentElement
            ).getPropertyValue(
              "--text-muted"
            )
        }
      },

      y: {
        grid: {
          color:
            "rgba(148,163,184,0.08)"
        },

        ticks: {
          color:
            getComputedStyle(
              document.documentElement
            ).getPropertyValue(
              "--text-muted"
            ),

          callback: (value) =>
            `₹${value.toLocaleString(
              "en-IN"
            )}`
        }
      }
    }
  };

  return (
    <div className="chart-card">
      <div className="chart-title">
        <div>
          <h3>
            Monthly Spending Trend
          </h3>

          <p>
            Track how your expenses changed throughout the month.
          </p>
        </div>

        <span>
          {monthlyChart.length
            ? "Updated Today"
            : "No Data"}
        </span>
      </div>

      <div
        className="expenses-summary"
        style={{
          marginBottom: "18px"
        }}
      >
        <div>
          <p>Total Tracked</p>

          <h2>
            ₹
            {totalExpenses.toLocaleString(
              "en-IN"
            )}
          </h2>
        </div>

        <div
          style={{
            textAlign: "right"
          }}
        >
          <p>Highest Week</p>

          <strong>
            {highestWeek
              ? highestWeek.month
              : "--"}
          </strong>
        </div>
      </div>

      <div className="chart-height">
        {monthlyChart.length ? (
          <Line
            data={data}
            options={options}
          />
        ) : (
          <div
            className="empty-chart-state"
          >
            <h4>
              No spending trend
              available
            </h4>

            <p>
              Add expenses with
              different dates to
              generate insights.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MonthlyOverview;
