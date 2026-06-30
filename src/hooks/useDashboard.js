import { useEffect, useState } from "react";

import { getDashboardSummary } from "../services/dashboardService";

export const useDashboard = () => {
  const [dashboardData, setDashboardData] =
  useState({
    totalExpenses: 0,
    totalSavings: 0,
    totalInvested: 0,
    currentInvestmentValue: 0,
    investmentProfit: 0,
    financialHealthScore: 0,
    financialHealthLabel: "Loading...",
    categoryChart: [],
    monthlyChart: [],
    recentTransactions: []
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data =
          await getDashboardSummary();

        setDashboardData(data.data);

      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    dashboardData,
    loading,
    error
  };
};