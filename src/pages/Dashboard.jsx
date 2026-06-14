import React from "react";
import { motion } from "framer-motion";
import {
  FaWallet,
  FaPiggyBank,
  FaChartLine,
  FaUtensils,
  FaCar,
  FaShoppingCart,
  FaLightbulb
} from "react-icons/fa";

import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import MonthlyOverview from "../components/DashboardWidgets/MonthlyOverview.jsx";
import SavingsProgress from "../components/DashboardWidgets/SavingsProgress.jsx";
import InvestmentSummary from "../components/DashboardWidgets/InvestmentSummary.jsx";
import TopSpending from "../components/DashboardWidgets/TopSpending.jsx";
import BudgetProgress from "../components/DashboardWidgets/BudgetProgress.jsx";

import { useDashboard } from "../hooks/useDashboard";
import { useBudget } from "../hooks/useBudget";
import { useExpenses } from "../hooks/useExpenses";

import { calculateBudgetStats } from "../utils/calculateBudgetStats";
import { generateInsights } from "../utils/generateInsights";


import {
  exportPDFReport,
  exportExcelReport
} from "../utils/exportReports";

function Dashboard() {
  const { dashboardData, loading, error } = useDashboard();
  const { budget } = useBudget();
  const { expenses } = useExpenses();

  if (loading) {
    return (
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Navbar />
          <h2>Loading Dashboard...</h2>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Navbar />
          <h2>{error}</h2>
        </main>
      </div>
    );
  }

  const budgetStats = calculateBudgetStats(
    budget?.monthlyBudget || 0,
    dashboardData.totalExpenses
  );

  const insights = generateInsights(expenses, budget, dashboardData);

  const reportData = {
    dashboardData,
    budget,
    budgetStats,
    expenses,
    insights
  };

  const stats = [
    {
      title: "Total Expenses",
      value: `₹${dashboardData.totalExpenses.toLocaleString("en-IN")}`,
      growth: `${dashboardData.expenseCount} transactions`,
      icon: <FaWallet />
    },
    {
      title: "Total Savings",
      value: `₹${dashboardData.totalSavings.toLocaleString("en-IN")}`,
      growth: `${dashboardData.savingsRate}% savings rate`,
      icon: <FaPiggyBank />
    },
    {
      title: "Investments",
      value: `₹${dashboardData.currentInvestmentValue.toLocaleString("en-IN")}`,
      growth: `Profit ₹${dashboardData.investmentProfit.toLocaleString(
        "en-IN"
      )}`,
      icon: <FaChartLine />
    },
    {
      title: "Health Score",
      value: `${dashboardData.financialHealthScore}/100`,
      growth: "Calculated from live data",
      icon: <FaChartLine />
    }
  ];

  const transactions = [
    {
      name: "Zomato Dinner",
      date: "Today",
      amount: "-₹640",
      icon: <FaUtensils />,
      type: "expense"
    },
    {
      name: "Fuel Refill",
      date: "Yesterday",
      amount: "-₹2,000",
      icon: <FaCar />,
      type: "expense"
    },
    {
      name: "Clothing",
      date: "2 days ago",
      amount: "-₹1,850",
      icon: <FaShoppingCart />,
      type: "expense"
    }
  ];

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content dashboard-page">
        <Navbar />

        <section className="page-header">
          <h1>Financial Command Center</h1>

          <p>
            Track your spending, reduce useless expenses, grow savings, and
            monitor investments from one place.
          </p>
        </section>

        <div className="report-actions">
          <button onClick={() => exportPDFReport(reportData)}>
            Download PDF Report
          </button>

          <button onClick={() => exportExcelReport(reportData)}>
            Download Excel Report
          </button>
        </div>

        <section className="dashboard-grid">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                className="stat-card"
                key={stat.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="stat-header">
                  <p className="stat-title">{stat.title}</p>

                  <div className="stat-icon">{stat.icon}</div>
                </div>

                <h2 className="stat-value">{stat.value}</h2>

                <p className="stat-growth">{stat.growth}</p>
              </motion.div>
            ))}
          </div>

          <div className="charts-grid">
            <MonthlyOverview monthlyChart={dashboardData.monthlyChart || []} />
            <TopSpending categoryChart={dashboardData.categoryChart || []} />
          </div>

          <div className="goal-grid">
            <BudgetProgress
              monthlyBudget={budget?.monthlyBudget || 0}
              spent={budgetStats.spent}
              remaining={budgetStats.remaining}
              percentageUsed={budgetStats.percentageUsed}
            />

            <SavingsProgress />
            <InvestmentSummary />

            <div className="insight-card">
              <div className="stat-icon">
                <FaLightbulb />
              </div>

              <h3 className="insight-title">Smart Insights</h3>

              <div>
                {insights.map((insight, index) => (
                  <p key={index} className="insight-text">
                    • {insight}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="transactions-card">
            <div className="chart-title">
              <h3>Recent Transactions</h3>

              <span>View all</span>
            </div>

            {transactions.map((item) => (
              <div className="transaction-item" key={item.name}>
                <div className="transaction-left">
                  <div className="transaction-icon">{item.icon}</div>

                  <div>
                    <p className="transaction-name">{item.name}</p>

                    <p className="transaction-date">{item.date}</p>
                  </div>
                </div>

                <p className={`transaction-amount ${item.type}`}>
                  {item.amount}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;