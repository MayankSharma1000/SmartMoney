import React from "react";

import MonthlyOverview from "../DashboardWidgets/MonthlyOverview";
import TopSpending from "../DashboardWidgets/TopSpending";

function SpendingOverview({ dashboardData }) {
  return (
    <div
      className="glass-card analytics-card"
      style={{
        padding: "32px",
        minHeight: "520px"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px"
        }}
      >
        <div>
          <h2>Spending Overview</h2>

          <p
            style={{
              color: "#94a3b8",
              marginTop: "6px"
            }}
          >
            Where your money goes every month
          </p>
        </div>

        <span
          style={{
            color: "#94a3b8",
            fontWeight: 600
          }}
        >
          This Month
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "28px"
        }}
      >
        <div>
          <div
            style={{
              height: "320px"
            }}
          >
            <MonthlyOverview
              monthlyChart={
                dashboardData?.monthlyChart || []
              }
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "18px",
              marginTop: "24px"
            }}
          >
            <div className="analytics-mini-card">
              <p>Avg Weekly</p>

              <h3>₹5,230</h3>
            </div>

            <div className="analytics-mini-card">
              <p>Total Spent</p>

              <h3>
                ₹
                {dashboardData?.totalExpenses?.toLocaleString(
                  "en-IN"
                ) || "0"}
              </h3>
            </div>

            <div className="analytics-mini-card">
              <p>vs Last Month</p>

              <h3
                style={{
                  color: "#22c55e"
                }}
              >
                -12.4%
              </h3>
            </div>
          </div>
        </div>

        <div>
          <h3
            style={{
              marginBottom: "20px"
            }}
          >
            Top Categories
          </h3>

          <div
            style={{
              height: "420px"
            }}
          >
            <TopSpending
              categoryChart={
                dashboardData?.categoryChart || []
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpendingOverview;