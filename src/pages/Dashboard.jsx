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
import { exportPDFReport, exportExcelReport } from "../utils/exportReports";

import AIAdvisor from "../components/DashboardWidgets/AIAdvisor";
import { useFinancialAdvice } from "../hooks/useFinancialAdvice";

function Dashboard() {
  const { dashboardData, loading, error } = useDashboard();
  const { budget } = useBudget();
  const { expenses } = useExpenses();
  const { advice, loading: adviceLoading } = useFinancialAdvice();

  // Show loader while dashboard data is coming from backend
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

  // Show error if dashboard API fails
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

  /* =========================
     DASHBOARD CALCULATIONS
  ========================= */

  const safeDashboardData = dashboardData || {};

  const budgetStats = calculateBudgetStats(
    budget?.monthlyBudget || 0,
    safeDashboardData.totalExpenses || 0
  );

  const insights = generateInsights(
    expenses || [],
    budget,
    safeDashboardData
  );

  const reportData = {
    dashboardData: safeDashboardData,
    budget,
    budgetStats,
    expenses: expenses || [],
    insights
  };

  /* =========================
     SUMMARY CARDS
  ========================= */

  const stats = [
    {
      title: "Total Expenses",
      value: `₹${(safeDashboardData.totalExpenses || 0).toLocaleString(
        "en-IN"
      )}`,
      growth: `${safeDashboardData.expenseCount || 0} transactions`,
      icon: <FaWallet />
    },
    {
      title: "Total Savings",
      value: `₹${(safeDashboardData.totalSavings || 0).toLocaleString(
        "en-IN"
      )}`,
      growth: `${safeDashboardData.savingsRate || 0}% savings rate`,
      icon: <FaPiggyBank />
    },
    {
      title: "Investments",
      value: `₹${(
        safeDashboardData.currentInvestmentValue || 0
      ).toLocaleString("en-IN")}`,
      growth: `Profit ₹${(safeDashboardData.investmentProfit || 0).toLocaleString(
        "en-IN"
      )}`,
      icon: <FaChartLine />
    },
    {
      title: "Health Score",
      value: `${safeDashboardData.financialHealthScore || 0}/100`,
      growth: "Calculated from live data",
      icon: <FaChartLine />
    }
  ];

  /* =========================
     RECENT TRANSACTIONS
  ========================= */

  const transactions =
    expenses?.slice(0, 5).map((expense) => {
      const expenseAmount = Number(expense.amount || 0);
      const expenseDate = expense.date
        ? new Date(expense.date).toLocaleDateString("en-IN")
        : "No date";

      return {
        id: expense._id,
        name: expense.title || "Untitled Expense",
        date: expenseDate,
        amount: `-₹${expenseAmount.toLocaleString("en-IN")}`,
        category: expense.category || "Other",
        type: "expense"
      };
    }) || [];

  const getTransactionIcon = (category) => {
    if (category === "Food") return <FaUtensils />;
    if (category === "Transport") return <FaCar />;

    return <FaShoppingCart />;
  };

  console.log("Dashboard Data:", dashboardData);
  console.log("Category Chart:", dashboardData?.categoryChart);

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content dashboard-page">
        <Navbar />

        {/* =========================
            DASHBOARD HEADER
        ========================= */}

        <section className="page-header">
          <h1>Financial Command Center</h1>

          <p>
            Track your spending, reduce useless expenses, grow savings, and
            monitor investments from one place.
          </p>
        </section>

        {/* =========================
            REPORT EXPORT BUTTONS
        ========================= */}

        <div className="report-actions">
          <button onClick={() => exportPDFReport(reportData)}>
            Download PDF Report
          </button>

          <button onClick={() => exportExcelReport(reportData)}>
            Download Excel Report
          </button>
        </div>

        <section className="dashboard-grid">
          {/* =========================
              SUMMARY CARDS
          ========================= */}

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

          {/* =========================
              CHARTS
          ========================= */}

          <div className="charts-grid">
            <MonthlyOverview
              monthlyChart={safeDashboardData.monthlyChart || []}
            />

            <TopSpending
              categoryChart={safeDashboardData.categoryChart || []}
            />
          </div>

          {/* =========================
              BUDGET, SAVINGS, INVESTMENTS, INSIGHTS
          ========================= */}

          <div className="goal-grid">
            <BudgetProgress
              monthlyBudget={budget?.monthlyBudget || 0}
              spent={budgetStats.spent}
              remaining={budgetStats.remaining}
              percentageUsed={budgetStats.percentageUsed}
            />
            
            <AIAdvisor
              advice={advice}
              loading={adviceLoading}
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

          {/* =========================
              RECENT TRANSACTIONS
          ========================= */}

          <div className="transactions-card">
            <div className="chart-title">
              <h3>Recent Transactions</h3>
              <span>Live from MongoDB</span>
            </div>

            {transactions.length === 0 ? (
              <p className="empty-state">No transactions added yet.</p>
            ) : (
              transactions.map((item) => (
                <div className="transaction-item" key={item.id}>
                  <div className="transaction-left">
                    <div className="transaction-icon">
                      {getTransactionIcon(item.category)}
                    </div>

                    <div>
                      <p className="transaction-name">{item.name}</p>
                      <p className="transaction-date">{item.date}</p>
                    </div>
                  </div>

                  <p className={`transaction-amount ${item.type}`}>
                    {item.amount}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;