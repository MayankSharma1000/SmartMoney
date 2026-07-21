import { useMemo } from "react";

import { useBudget } from "./useBudget";
import { useDashboard } from "./useDashboard";
import { useExpenses } from "./useExpenses";

import { calculateBudgetStats } from "../utils/calculateBudgetStats";
import { generateInsights } from "../utils/generateInsights";

import {
    exportExcelReport,
    exportPDFReport,
} from "../utils/exportReports";

export const useFinancialReport = () => {
  const {
    dashboardData,
    loading: dashboardLoading,
    error: dashboardError,
  } = useDashboard();

  const {
    budget,
    loading: budgetLoading,
  } = useBudget();

  const {
    expenses,
    loading: expensesLoading,
  } = useExpenses();

  const budgetStats = useMemo(() => {
    return calculateBudgetStats(
      budget?.monthlyBudget || 0,
      dashboardData?.totalExpenses || 0
    );
  }, [
    budget?.monthlyBudget,
    dashboardData?.totalExpenses,
  ]);

  const insights = useMemo(() => {
    return generateInsights(
      expenses || [],
      budget,
      dashboardData
    );
  }, [
    expenses,
    budget,
    dashboardData,
  ]);

  const reportData = useMemo(() => {
    return {
      dashboardData: dashboardData || {},
      budget: budget || {},
      budgetStats: budgetStats || {},
      expenses: expenses || [],
      insights: insights || [],
    };
  }, [
    dashboardData,
    budget,
    budgetStats,
    expenses,
    insights,
  ]);

  const loading =
    dashboardLoading ||
    budgetLoading ||
    expensesLoading;

  const exportPDF = () => {
    if (loading) {
      console.warn(
        "Financial data is still loading."
      );
      return;
    }

    exportPDFReport(reportData);
  };

  const exportExcel = async () => {
    if (loading) {
      console.warn(
        "Financial data is still loading."
      );
      return;
    }

    await exportExcelReport(reportData);
  };

  return {
    reportData,

    exportPDF,
    exportExcel,

    loading,
    error: dashboardError,

    dashboardData,
    budget,
    budgetStats,
    expenses,
    insights,
  };
};
