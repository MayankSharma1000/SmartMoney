import React from "react";

import Sidebar from "../components/Sidebar/Sidebar.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import "../components/Analytics/Analytics.css";

import { useDashboard } from "../hooks/useDashboard";

import AnalyticsHeader from "../components/Analytics/1-AnalyticsHeader.jsx";
import InsightCards from "../components/Analytics/2-InsightCards.jsx";
import AIFinancialCoach from "../components/Analytics/10-AIFinancialCoach";
import FinancialHealth from "../components/Analytics/3-FinancialHealth.jsx";
import SpendingOverview from "../components/Analytics/4-SpendingOverview.jsx";
import SavingsGoals from "../components/Analytics/5-SavingsGoals.jsx";
import InvestmentOverview from "../components/Analytics/6-InvestmentOverview.jsx";
import ActivityTimeline from "../components/Analytics/8-ActivityTimeline.jsx";
import AISuggestions from "../components/Analytics/9-AISuggestions.jsx";
import AnalyticsFooter from "../components/Analytics/7-AnalyticsFooter.jsx";

function Analytics() {
  const { dashboardData, loading } = useDashboard();

  const totalSavings =
    dashboardData?.totalSavings || 0;

  const currentInvestmentValue =
    dashboardData?.currentInvestmentValue || 0;

  const investmentProfit =
    dashboardData?.investmentProfit || 0;

  const liabilities = 11240;

  if (loading) {
    return (
      <div className="app-layout">
        <Sidebar />

        <main className="main-content">
          <Navbar />
          <h2>Loading Analytics...</h2>
        </main>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Sidebar />
  
      <main className="main-content analytics-page">
        <Navbar />
  
        <AnalyticsHeader />
  
        <InsightCards />
        
        <AIFinancialCoach analytics={dashboardData?.analytics}
/>  
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
  
      </main>
    </div>
  );
  }

export default Analytics;