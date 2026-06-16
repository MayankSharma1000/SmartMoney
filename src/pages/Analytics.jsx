import React from "react";

import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";

import MonthlyOverview from "../components/DashboardWidgets/MonthlyOverview.jsx";
import TopSpending from "../components/DashboardWidgets/TopSpending.jsx";

import {
  FaWallet,
  FaChartLine,
  FaPiggyBank,
  FaBullseye
} from "react-icons/fa";

function Analytics() {
  const insights = [
    {
      title: "Food Delivery Alert",
      text: "You are spending heavily on food delivery. Cutting this by 30% can save around ₹1,440 monthly."
    },
    {
      title: "Fuel Usage Stable",
      text: "Your fuel spending is consistent. No major spike detected this month."
    },
    {
      title: "Savings Rate Improved",
      text: "Your savings rate improved from 12% to 18%. Keep pushing toward 25%."
    },
    {
      title: "Investment Growth",
      text: "Your investment portfolio is showing positive growth with around 9.6% returns."
    }
  ];

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content analytics-page">
        <Navbar />

        {/* HEADER */}

        <section className="page-header">
          <h1>Financial Analytics</h1>

          <p>
            Deep insights into expenses, savings, spending patterns and wealth
            growth.
          </p>
        </section>

        {/* KPI CARDS */}

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <FaWallet />
            </div>

            <h2>₹14,318</h2>

            <p>Total Expenses</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaPiggyBank />
            </div>

            <h2>₹74,200</h2>

            <p>Total Savings</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaChartLine />
            </div>

            <h2>₹0</h2>

            <p>Investments</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaBullseye />
            </div>

            <h2>40 / 100</h2>

            <p>Financial Health</p>
          </div>
        </section>

        {/* CHARTS */}

        <section
          className="charts-grid"
          style={{
            marginTop: "24px",
            marginBottom: "24px"
          }}
        >
          <MonthlyOverview />

          <TopSpending />
        </section>

        {/* SMART INSIGHTS */}

        <section className="analytics-insights-grid">
          {insights.map((item) => (
            <div
              className="insight-card"
              key={item.title}
            >
              <h3 className="insight-title">
                {item.title}
              </h3>

              <p className="insight-text">
                {item.text}
              </p>
            </div>
          ))}
        </section>

        {/* SUMMARY SECTION */}

        <section
          className="glass-card"
          style={{
            marginTop: "24px",
            padding: "24px"
          }}
        >
          <h2
            style={{
              marginBottom: "18px"
            }}
          >
            Financial Summary
          </h2>

          <ul
            style={{
              lineHeight: "2"
            }}
          >
            <li>
              Shopping is your largest
              spending category.
            </li>

            <li>
              Bills account for nearly
              one-fourth of total spending.
            </li>

            <li>
              Savings rate can be
              improved significantly.
            </li>

            <li>
              Building investments should
              be your next priority.
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Analytics;