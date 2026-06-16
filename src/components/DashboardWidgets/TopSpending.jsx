import React from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const COLORS = [
  "#3B82F6", // Transport
  "#22C55E", // Food
  "#F59E0B", // Bills
  "#EF4444", // Shopping
  "#8B5CF6", // Entertainment
  "#06B6D4" // Health
];

function TopSpending({
  categoryChart = []
}) {
  if (!categoryChart.length) {
    return (
      <div className="chart-card">
        <div className="chart-title">
          <h3>Top Spending</h3>
        </div>

        <p>No spending data found.</p>
      </div>
    );
  }

  const totalExpenses =
    categoryChart.reduce(
      (sum, item) =>
        sum + item.amount,
      0
    );

  return (
    <div className="chart-card">
      <div className="chart-title">
        <h3>Top Spending</h3>

        <span>
          Category-wise expense split
        </span>
      </div>

      <div
        style={{
          width: "100%",
          height: 320
        }}
      >
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={categoryChart}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
            >
              {categoryChart.map(
                (_, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                          COLORS.length
                      ]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip
              formatter={(value) => [
                `₹${value.toLocaleString(
                  "en-IN"
                )}`,
                "Amount"
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="total-expenses-center">
        <h2>
          ₹
          {totalExpenses.toLocaleString(
            "en-IN"
          )}
        </h2>

        <p>Total Expenses</p>
      </div>

      <div className="category-legend">
        {categoryChart.map(
          (item, index) => {
            const percentage = (
              (item.amount /
                totalExpenses) *
              100
            ).toFixed(1);

            return (
              <div
                key={item.category}
                className="legend-item"
              >
                <div
                  className="legend-color"
                  style={{
                    background:
                      COLORS[
                        index %
                          COLORS.length
                      ]
                  }}
                />

                <span>
                  {item.category}
                </span>

                <strong>
                  ₹
                  {item.amount.toLocaleString(
                    "en-IN"
                  )}
                  {" "}
                  ({percentage}%)
                </strong>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

export default TopSpending;