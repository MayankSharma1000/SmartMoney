import { useMemo } from "react";

import { useBudget } from "./useBudget";
import { useDashboard } from "./useDashboard";
import { useExpenses } from "./useExpenses";

import { calculateBudgetStats } from "../utils/calculateBudgetStats";
import { generateInsights } from "../utils/generateInsights";

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

  const exportPDF = async () => {
    if (loading) {
      console.warn(
        "Financial data is still loading."
      );
      return;
    }

    const {
      exportPDFReport,
    } = await import(
      "../utils/exportPDFReport"
    );

    exportPDFReport(reportData);
  };

  const exportExcel = async () => {
    if (loading) {
      console.warn(
        "Financial data is still loading."
      );
      return;
    }

    const {
      exportExcelReport,
    } = await import(
      "../utils/exportExcelReport"
    );

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
