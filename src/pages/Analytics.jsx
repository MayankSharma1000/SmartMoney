import React from "react";

import Navbar from "../components/Navbar/Navbar.jsx";
import "../components/Analytics/Analytics.css";
import {DEFAULT_LIABILITIES} from "../constants/financeConstants";
import DashboardSkeleton from "../components/Dashboard/DashboardSkeleton";

import { useDashboard } from "../hooks/useDashboard";

import AnalyticsHeader from "../components/Analytics/AnalyticsHeader.jsx";
import InsightCards from "../components/Analytics/InsightCards.jsx";
import FinancialHealth from "../components/Analytics/FinancialHealth.jsx";
import SpendingOverview from "../components/Analytics/SpendingOverview.jsx";
import SavingsGoals from "../components/Analytics/SavingsGoals.jsx";
import InvestmentOverview from "../components/Analytics/InvestmentOverview.jsx";
import ActivityTimeline from "../components/Analytics/ActivityTimeline.jsx";
import AISuggestions from "../components/Analytics/AISuggestions.jsx";
import AIFinancialCoach from "../components/Analytics/AIFinancialCoach.jsx";
import AnalyticsFooter from "../components/Analytics/AnalyticsFooter.jsx";
import AppShell from "../components/layout/AppShell/AppShell.jsx";

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
      <div className="app-layout">
        <Sidebar />

        <main className="main-content">
          <Navbar />
          <DashboardSkeleton />      
        </main>
      </div>
    );
  }

  return (
      <AppShell>
        <Navbar />
  
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