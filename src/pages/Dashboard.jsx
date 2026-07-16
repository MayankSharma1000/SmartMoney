import {
  FaChartLine,
  FaHeartbeat,
  FaPiggyBank,
  FaWallet,
} from "react-icons/fa";

import AppShell from "@/components/layout/AppShell";
import Section from "@/components/shared/Section";
import DashboardHeader from "../components/Dashboard/DashboardHeader";

import AIInsights from "../components/Dashboard/AIInsights";
import ChartsSection from "../components/Dashboard/ChartsSection";
import QuickActions from "../components/Dashboard/QuickActions";
import RecentTransactions from "../components/Dashboard/RecentTransactions";

import BudgetProgress from "../components/Dashboard/widgets/BudgetProgress";
import InvestmentSummary from "../components/Dashboard/widgets/InvestmentSummary";
import SavingsProgress from "../components/Dashboard/widgets/SavingsProgress";

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
        <DashboardHeader
            user={{
                name: "Mayank",
                currency: "INR",
            }}
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

      <DashboardHeader
        user={{
          name: "Mayank",
          currency: "INR",
        }}
        dashboardData={dashboardData}
      />

      {/* Quick Actions */}
      <Section
        title="Quick Actions"
        subtitle="Frequently used shortcuts"
      >
        <QuickActions />
      </Section>

      {/* Recent Activity */}
      <div className="dashboard-workspace">
        <div className="workspace-left">
          <Section
            title="Recent Transactions"
            subtitle="Latest activity"
          >
            <RecentTransactions />
          </Section>

        </div>

        <div className="workspace-right">
          <Section
            title="Weekly Spending"
            subtitle="Live analytics"
          >
            <ChartsSection
              dashboardData={dashboardData}
            />
          </Section>
        </div>
      </div>

      {/* Financial Overview */}
      <Section
        title="Financial Control Center"
        subtitle="Monitor and manage every aspect of your finances."
      >
        <div className="financial-control-center">

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
