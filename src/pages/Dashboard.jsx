import {
  FaChartLine,
  FaHeartbeat,
  FaPiggyBank,
  FaWallet,
} from "react-icons/fa";

import AppShell from "@/components/layout/AppShell";
import PageHeader from "@/components/shared/PageHeader";
import Section from "@/components/shared/Section";

import AIInsights from "../components/Dashboard/AIInsights";
import ChartsSection from "../components/Dashboard/ChartsSection";
import MetricGrid from "../components/Dashboard/MetricGrid";
import QuickActions from "../components/Dashboard/QuickActions";
import RecentTransactions from "../components/Dashboard/RecentTransactions";

import BudgetProgress from "../components/DashboardWidgets/BudgetProgress";
import InvestmentSummary from "../components/DashboardWidgets/InvestmentSummary";
import SavingsProgress from "../components/DashboardWidgets/SavingsProgress";

import { useBudget } from "../hooks/useBudget";
import { useDashboard } from "../hooks/useDashboard";
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
        <PageHeader
            title="Dashboard"
            subtitle="Monitor your expenses, savings, investments and financial health from one intelligent workspace."
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
      <PageHeader
          title="Dashboard"
          subtitle="Monitor your expenses, savings, investments and financial health from one intelligent workspace."
      />

      <Section>
        <MetricGrid stats={stats} />
      </Section>

      <Section
          title="Quick Actions"
          subtitle="Frequently used shortcuts"
      >
          <QuickActions />
      </Section>

      <Section
          title="Analytics"
          subtitle="Track your financial trends"
      >
          <ChartsSection
              dashboardData={dashboardData}
          />
      </Section>

      <Section
          title="Recent Transactions"
          subtitle="Your latest financial activity"
      >

          <RecentTransactions
              transactions={
                  dashboardData.recentTransactions || []
              }
          />

      </Section>

      <Section
          title="Financial Overview"
          subtitle="Budget, savings, investments and AI insights"
      >

      <div className="goal-grid">
        <BudgetProgress
          monthlyBudget={budget?.monthlyBudget || 0}
          spent={budgetStats.spent}
          remaining={budgetStats.remaining}
          percentageUsed={budgetStats.percentageUsed}
        />

        <SavingsProgress />

        <InvestmentSummary />

        <AIInsights insights={insights} />
        </div>
      </Section>
    </AppShell>
  );
}

export default Dashboard;
