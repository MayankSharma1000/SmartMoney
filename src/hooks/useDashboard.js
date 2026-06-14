import { useEffect, useState } from "react";

import { getDashboardSummary } from "../services/dashboardService";

export const useDashboard = () => {
  const [dashboardData, setDashboardData] =
    useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data =
          await getDashboardSummary();

        setDashboardData(data.summary);
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