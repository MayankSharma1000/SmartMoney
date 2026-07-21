import "../components/Analytics/Analytics.css";

import DashboardSkeleton from "../components/Dashboard/DashboardSkeleton";
import AppShell from "../components/layout/AppShell/AppShell.jsx";

import { useAuth } from "../context/AuthContext";
import { useDashboard } from "../hooks/useDashboard";

import ActivityTimeline from "../components/Analytics/ActivityTimeline.jsx";
import AIFinancialCoach from "../components/Analytics/AIFinancialCoach.jsx";
import AnalyticsFooter from "../components/Analytics/AnalyticsFooter.jsx";
import AnalyticsHeader from "../components/Analytics/AnalyticsHeader.jsx";
import FinancialHealth from "../components/Analytics/FinancialHealth.jsx";
import InvestmentOverview from "../components/Analytics/InvestmentOverview.jsx";
import SavingsGoals from "../components/Analytics/SavingsGoals.jsx";
import SpendingOverview from "../components/Analytics/SpendingOverview.jsx";

function Analytics() {
  const { user } = useAuth();

  const {
    dashboardData,
    loading,
  } = useDashboard();

  const currency =
    user?.currency ||
    dashboardData?.user?.currency ||
    "INR";

  const totalSavings =
    dashboardData?.totalSavings || 0;

  const currentInvestmentValue =
    dashboardData?.currentInvestmentValue || 0;

  const investmentProfit =
    dashboardData?.investmentProfit || 0;

  if (loading) {
    return (
      <AppShell>
        <DashboardSkeleton />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <AnalyticsHeader
        user={user}
        period={dashboardData?.period}
      />

      <AIFinancialCoach
        user={user}
        dashboardData={dashboardData}
      />

      <section className="analytics-main-grid">
        <FinancialHealth
          dashboardData={dashboardData}
        />

        <SpendingOverview
          dashboardData={dashboardData}
          currency={currency}
        />

        <SavingsGoals
          totalSavings={totalSavings}
          totalSavingsTarget={
            dashboardData?.totalSavingsTarget || 0
          }
          currency={currency}
        />

        <InvestmentOverview
          totalSavings={totalSavings}
          currentInvestmentValue={
            currentInvestmentValue
          }
          investmentProfit={
            investmentProfit
          }
          currency={currency}
        />
      </section>

      <div className="analytics-bottom-grid">
        <ActivityTimeline
          transactions={
            dashboardData?.recentTransactions || []
          }
          currency={currency}
        />
      </div>

      <AnalyticsFooter
        user={user}
      />
    </AppShell>
  );
}

export default Analytics;
