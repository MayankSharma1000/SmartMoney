import React from "react";

import MonthlyOverview from "../DashboardWidgets/MonthlyOverview";

function SpendingOverview({ dashboardData }) {

  const totalSpent =
    dashboardData?.totalExpenses || 0;

  const avgWeekly = Math.round(
    totalSpent / 4
  );

  const categories =
    dashboardData?.categoryChart || [];

  return (

    <div className="glass-card analytics-card spending-card">

      <div className="card-header">

        <div>

          <h2>Monthly Spending</h2>

          <p className="section-subtitle">

            Spending Overview

          </p>

        </div>

        <span className="health-badge">

          This Month

        </span>

      </div>

      {/* BIG KPI */}

      <div className="spending-kpi">

        <div>

          <h1>

            ₹{totalSpent.toLocaleString("en-IN")}

          </h1>

          <p>Total Expenses</p>

        </div>

        <div className="kpi-growth">

          ↓ 12%

        </div>

      </div>

      {/* GRAPH */}

      <div className="chart-container">

        <MonthlyOverview
          monthlyChart={
            dashboardData?.monthlyChart || []
          }
        />

      </div>

      {/* QUICK STATS */}

      <div className="quick-stats">

        <div>

          <p>Weekly Avg</p>

          <h3>

            ₹{avgWeekly.toLocaleString("en-IN")}

          </h3>

        </div>

        <div>

          <p>Transactions</p>

          <h3>

            {dashboardData?.expenseCount || 0}

          </h3>

        </div>

        <div>

          <p>Categories</p>

          <h3>

            {categories.length}

          </h3>

        </div>

      </div>

      {/* CATEGORY CHIPS */}

      <div className="category-chips">

        {categories.map((cat,index)=>(

          <div
            key={index}
            className="category-chip"
          >

            <span>

              {cat.name}

            </span>

            <strong>

              ₹{cat.value}

            </strong>

          </div>

        ))}

      </div>

    </div>

  );

}

export default SpendingOverview;