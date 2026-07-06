import React from "react";

import {
  FaWallet,
  FaPiggyBank,
  FaChartLine
} from "react-icons/fa";

import AppShell from "@/components/layout/AppShell";
import SavingsProgress from "../components/DashboardWidgets/SavingsProgress";
import InvestmentSummary from "../components/DashboardWidgets/InvestmentSummary";
import BudgetProgress from "../components/DashboardWidgets/BudgetProgress";

import ReportActions from "../components/Dashboard/ReportActions";
import MetricGrid from "../components/Dashboard/MetricGrid";
import ChartsSection from "../components/Dashboard/ChartsSection";
import FinancialHealthCard from "../components/Dashboard/FinancialHealthCard";
import PageHero from "@/components/shared/PageHero";
import QuickActions from "../components/Dashboard/QuickActions";
import RecentTransactions from "../components/Dashboard/RecentTransactions";
import AIInsights from "../components/Dashboard/AIInsights";
import DashboardSkeleton from "../components/Dashboard/DashboardSkeleton";

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
      value: `₹${dashboardData.totalExpenses.toLocaleString(
        "en-IN"
      )}`,
      growth: `${dashboardData.expenseCount} transactions`,
      icon: <FaWallet />
    },
  
    {
      title: "Total Savings",
      value: `₹${dashboardData.totalSavings.toLocaleString(
        "en-IN"
      )}`,
      growth:
        dashboardData.totalSavings >= 100000
          ? "Strong Savings Position"
          : dashboardData.totalSavings >= 50000
          ? "Growing Emergency Fund"
          : "Building Savings",
      icon: <FaPiggyBank />
    },
  
    {
      title: "Investments",
      value: `₹${dashboardData.currentInvestmentValue.toLocaleString(
        "en-IN"
      )}`,
      growth: `Profit ₹${dashboardData.investmentProfit.toLocaleString(
        "en-IN"
      )}`,
      icon: <FaChartLine />
    },
  
    {
      title: "Health Score",
      value: `${dashboardData.financialHealthScore}/100`,
      growth: `${dashboardData.financialHealthLabel} Financial Health`,
      icon: <FaChartLine />
    }
  ];

  return (
      <AppShell>
        <PageHero
            title="Dashboard"
            subtitle="Monitor your financial health, investments and savings from one place."
        />
        <QuickActions />

        <FinancialHealthCard
          score={dashboardData.financialHealthScore}
          label={dashboardData.financialHealthLabel}
        />

        <ReportActions
            reportData={reportData}
            exportPDFReport={exportPDFReport}
            exportExcelReport={exportExcelReport}
        />

        <section className="dashboard-grid">
          <MetricGrid
              stats={stats}
          />

          <ChartsSection
              dashboardData={dashboardData}
          />
          <RecentTransactions
              transactions={dashboardData.recentTransactions || []}
          />

          <div className="goal-grid">
            <BudgetProgress
              monthlyBudget={budget?.monthlyBudget || 0}
              spent={budgetStats.spent}
              remaining={budgetStats.remaining}
              percentageUsed={budgetStats.percentageUsed}
            />

            <SavingsProgress />
            <InvestmentSummary />
            <AIInsights insights={insights}/>
          </div>
        </section>
      </AppShell>
  );
}

export default Dashboard;