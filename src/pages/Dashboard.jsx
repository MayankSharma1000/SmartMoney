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

import { useAuth } from "../context/AuthContext";
import { useFinancialReport } from "../hooks/useFinancialReport";

function Dashboard() {
  const { user } = useAuth();

  const {
    dashboardData,
    budget,
    budgetStats,
    insights,
    exportPDF,
    exportExcel,
    loading,
  } = useFinancialReport();

  const currency = user?.currency || "INR";

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
        <DashboardHeader
          user={user}
          currency={currency}
        />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <DashboardHeader
        user={user}
        currency={currency}
        dashboardData={dashboardData}
      />

      <Section
        title="Quick Actions"
        subtitle="Create, manage and export your financial data."
      >
        <QuickActions
          onExport={handleExport}
          exportLoading={loading}
        />
      </Section>

      <Section
        title="Financial Control Center"
        subtitle="Monitor your budget, savings, investments and financial insights."
      >
        <div className="financial-control-center">
          <BudgetProgress
            monthlyBudget={budget?.monthlyBudget || 0}
            spent={budgetStats?.spent || 0}
            remaining={budgetStats?.remaining || 0}
            percentageUsed={budgetStats?.percentageUsed || 0}
            currency={currency}
          />

          <SavingsProgress
            currency={currency}
          />

          <InvestmentSummary
            currency={currency}
            portfolioValue={
              dashboardData?.currentInvestmentValue || 0
            }
            investedAmount={
              dashboardData?.totalInvested || 0
            }
          />

          <AIInsights insights={insights} />
        </div>
      </Section>

      <div className="dashboard-workspace">
        <div className="workspace-left">
          <Section
            title="Financial Analytics"
            subtitle="Spending trends and category insights."
          >
            <ChartsSection
              dashboardData={dashboardData}
              currency={currency}
            />
          </Section>
        </div>

        <div className="workspace-right">
          <Section
            title="Recent Transactions"
            subtitle="Latest activity across all accounts."
          >
            <RecentTransactions
              currency={currency}
            />
          </Section>
        </div>
      </div>
    </AppShell>
  );
}

export default Dashboard;
