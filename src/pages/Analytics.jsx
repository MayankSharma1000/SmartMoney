import React from "react";
import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";

import MonthlyOverview from "../components/DashboardWidgets/MonthlyOverview.jsx";
import TopSpending from "../components/DashboardWidgets/TopSpending.jsx";

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

      <main className="main-content">
        <Navbar />

        <section className="page-header">
          <h1>Financial Analytics</h1>
          <p>
            Deep insights into expenses, savings, spending patterns, and wealth
            growth.
          </p>
        </section>

        <section className="charts-grid" style={{ marginBottom: "24px" }}>
          <MonthlyOverview />
          <TopSpending />
        </section>

        <section className="goal-grid">
          {insights.map((item) => (
            <div className="insight-card" key={item.title}>
              <h3 className="insight-title">{item.title}</h3>
              <p className="insight-text">{item.text}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Analytics;