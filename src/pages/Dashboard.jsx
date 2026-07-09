import {
  FaWallet,
  FaPiggyBank,
  FaChartLine,
  FaHeartbeat,
} from "react-icons/fa";

import AppShell from "@/components/layout/AppShell";
import PageHero from "@/components/shared/PageHero";

import MetricGrid from "../components/Dashboard/MetricGrid";
import QuickActions from "../components/Dashboard/QuickActions";
import ChartsSection from "../components/Dashboard/ChartsSection";
import RecentTransactions from "../components/Dashboard/RecentTransactions";
import AIInsights from "../components/Dashboard/AIInsights";

import BudgetProgress from "../components/DashboardWidgets/BudgetProgress";
import SavingsProgress from "../components/DashboardWidgets/SavingsProgress";
import InvestmentSummary from "../components/DashboardWidgets/InvestmentSummary";

import { useDashboard } from "../hooks/useDashboard";
import { useBudget } from "../hooks/useBudget";
import { useExpenses } from "../hooks/useExpenses";

import { calculateBudgetStats } from "../utils/calculateBudgetStats";
import { generateInsights } from "../utils/generateInsights";

function Dashboard() {
  const { dashboardData, loading } = useDashboard();
  const { budget } = useBudget();
  const { expenses } = useExpenses();

  if (loading) {
    return (
      <AppShell>
        <PageHero
          title="Dashboard"
          subtitle="Loading your financial workspace..."
        />
      </AppShell>
    );
  }

  const budgetStats = calculateBudgetStats(
    budget?.monthlyBudget || 0,
    dashboardData.totalExpenses
  );

  const insights = generateInsights(
    expenses,
    budget,
    dashboardData
  );

  const stats = [
    {
      title: "Expenses",
      value: `₹${dashboardData.totalExpenses.toLocaleString("en-IN")}`,
      growth: `${dashboardData.expenseCount} Transactions`,
      trend: "-4.2%",
      trendType: "negative",
      icon: <FaWallet />,
    },
    {
      title: "Savings",
      value: `₹${dashboardData.totalSavings.toLocaleString("en-IN")}`,
      growth: "Growing Emergency Fund",
      trend: "+12.8%",
      trendType: "positive",
      icon: <FaPiggyBank />,
    },
    {
      title: "Investments",
      value: `₹${dashboardData.currentInvestmentValue.toLocaleString(
        "en-IN"
      )}`,
      growth: `Profit ₹${dashboardData.investmentProfit.toLocaleString(
        "en-IN"
      )}`,
      trend: "+18.6%",
      trendType: "positive",
      icon: <FaChartLine />,
    },
    {
      title: "Financial Health",
      value: `${dashboardData.financialHealthScore}/100`,
      growth: dashboardData.financialHealthLabel,
      trend: "+6.3%",
      trendType: "positive",
      icon: <FaHeartbeat />,
    },
  ];

  return (
    <AppShell>
      <PageHero
        title="Dashboard"
        subtitle="Monitor your expenses, savings, investments and financial health from one intelligent workspace."
      />

      <MetricGrid stats={stats} />

      <QuickActions />

      <ChartsSection dashboardData={dashboardData} />

      <RecentTransactions
        transactions={dashboardData.recentTransactions || []}
      />

      <section className="goal-grid">
        <BudgetProgress
          monthlyBudget={budget?.monthlyBudget || 0}
          spent={budgetStats.spent}
          remaining={budgetStats.remaining}
          percentageUsed={budgetStats.percentageUsed}
        />

        <SavingsProgress />

        <InvestmentSummary />

        <AIInsights insights={insights} />
      </section>
    </AppShell>
  );
}

export default Dashboard;