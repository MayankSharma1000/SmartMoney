import "../components/Analytics/Analytics.css";

import DashboardSkeleton from "../components/Dashboard/DashboardSkeleton";
import AppShell from "../components/layout/AppShell/AppShell.jsx";

import { DEFAULT_LIABILITIES } from "../constants/financeConstants";
import { useDashboard } from "../hooks/useDashboard";

import ActivityTimeline from "../components/Analytics/ActivityTimeline.jsx";
import AIFinancialCoach from "../components/Analytics/AIFinancialCoach.jsx";
import AISuggestions from "../components/Analytics/AISuggestions.jsx";
import AnalyticsFooter from "../components/Analytics/AnalyticsFooter.jsx";
import AnalyticsHeader from "../components/Analytics/AnalyticsHeader.jsx";
import FinancialHealth from "../components/Analytics/FinancialHealth.jsx";
import InsightCards from "../components/Analytics/InsightCards.jsx";
import InvestmentOverview from "../components/Analytics/InvestmentOverview.jsx";
import SavingsGoals from "../components/Analytics/SavingsGoals.jsx";
import SpendingOverview from "../components/Analytics/SpendingOverview.jsx";

function Analytics() {
  const { dashboardData, loading } = useDashboard();

  const totalSavings =
    dashboardData?.totalSavings || 0;

  const currentInvestmentValue =
    dashboardData?.currentInvestmentValue || 0;

  const investmentProfit =
    dashboardData?.investmentProfit || 0;

  const liabilities = DEFAULT_LIABILITIES;

  if (loading) {
    return (
      <AppShell>
        <DashboardSkeleton />
      </AppShell>
    );
  }

  return (
      <AppShell>
        <AnalyticsHeader />
        <InsightCards />
        <AIFinancialCoach analytics={dashboardData?.analytics}/>

        <section className="analytics-main-grid">
          <FinancialHealth />
          <SpendingOverview
            dashboardData={dashboardData}
          />
          <SavingsGoals
            totalSavings={totalSavings}
          />
          <InvestmentOverview
            totalSavings={totalSavings}
            currentInvestmentValue={currentInvestmentValue}
            investmentProfit={investmentProfit}
            liabilities={liabilities}
          />
        </section>

        <div className="analytics-bottom-grid">
          <ActivityTimeline />
          <AISuggestions />
        </div>
        <AnalyticsFooter />

      </AppShell>
    );
  }

export default Analytics;
