import AppShell from "@/components/layout/AppShell";
import Section from "@/components/shared/Section";

import AIInsights from "../components/Dashboard/AIInsights";
import ChartsSection from "../components/Dashboard/ChartsSection";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import QuickActions from "../components/Dashboard/QuickActions";
import RecentTransactions from "../components/Dashboard/RecentTransactions";

import BudgetProgress from "../components/Dashboard/widgets/BudgetProgress";
import InvestmentSummary from "../components/Dashboard/widgets/InvestmentSummary";
import SavingsProgress from "../components/Dashboard/widgets/SavingsProgress";

import { useFinancialReport } from "../hooks/useFinancialReport";

function Dashboard() {
  const {
    dashboardData,
    budget,
    budgetStats,
    insights,
    exportPDF,
    exportExcel,
    loading,
  } = useFinancialReport();

  const user = {
    name: "Mayank",
    currency: "INR",
  };

  const handleExport = async () => {
    try {
      exportPDF();
      await exportExcel();
    } catch (error) {
      console.error(
        "Failed to export financial reports:",
        error
      );
    }
  };

  if (loading) {
    return (
      <AppShell>
        <DashboardHeader user={user} />
      </AppShell>
    );
  }

  return (
    <AppShell>

      {/* Hero */}
      <DashboardHeader
        user={user}
        dashboardData={dashboardData}
      />

      {/* Quick Actions */}
      <Section
        title="Quick Actions"
        subtitle="Create, manage and export your financial data."
      >
        <QuickActions
          onExport={handleExport}
          exportLoading={loading}
        />
      </Section>

      {/* Financial Control Center */}
      <Section
        title="Financial Control Center"
        subtitle="Monitor your budget, savings, investments and AI insights."
      >
        <div className="financial-control-center">

          <BudgetProgress
            monthlyBudget={
              budget?.monthlyBudget || 0
            }
            spent={
              budgetStats?.spent || 0
            }
            remaining={
              budgetStats?.remaining || 0
            }
            percentageUsed={
              budgetStats?.percentageUsed || 0
            }
          />

          <SavingsProgress />

          <InvestmentSummary />

          <AIInsights
            insights={insights}
          />

        </div>
      </Section>

      {/* Workspace */}
      <div className="dashboard-workspace">

        <div className="workspace-left">
          <Section
            title="Financial Analytics"
            subtitle="Spending trends and category insights."
          >
            <ChartsSection
              dashboardData={dashboardData}
            />
          </Section>
        </div>

        <div className="workspace-right">
          <Section
            title="Recent Transactions"
            subtitle="Latest activity across all accounts."
          >
            <RecentTransactions />
          </Section>
        </div>

      </div>

    </AppShell>
  );
}

export default Dashboard;
