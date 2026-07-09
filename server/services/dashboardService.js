const Expense = require("../models/Expense");
const Savings = require("../models/Savings");
const Investment = require("../models/Investment");

const {generateAnalytics} = require("../analytics/analyticsEngine");
const {calculateDashboardTotals, getRecentTransactions} = require("../utils/dashboardCalculations");


async function buildDashboard(userId) {
  try {

    const [expenses, savings, investments] = await Promise.all([
      Expense.find({ user: userId })
        .select("title category amount paymentMethod date")
        .sort({ date: -1 })
        .lean(),

      Savings.find({ user: userId }).lean(),
      Investment.find({ user: userId }).lean()
    ]);

  /* ========================= */
  /* BASIC TOTALS */
  /* ========================= */

  const {
    totalExpenses,
    totalSavings,
    totalInvested,
    currentInvestmentValue,
    investmentProfit
  } = calculateDashboardTotals(
    expenses,
    savings,
    investments
  );


  /* ========================= */
  /* ANALYTICS */
  /* ========================= */

  const analytics = generateAnalytics(
    {
      totalExpenses,
      totalSavings,
      currentInvestmentValue
    },
    expenses
  );


  /* ========================= */
  /* RETURN */
  /* ========================= */

  return {
    totalExpenses,
    totalSavings,
    totalInvested,
    currentInvestmentValue,
    investmentProfit,

    expenseCount: expenses.length,

    financialHealthScore:
      analytics.financialHealthScore,

    financialHealthLabel:
      analytics.financialHealthLabel,

    healthBreakdown:
      analytics.healthBreakdown,

    categoryChart:
      analytics.categoryChart || [],

    monthlyChart:
      analytics.monthlyChart || [],

    recentTransactions:
      getRecentTransactions(expenses)

  };
  } catch (error) {
    throw new Error(
      `Failed to build dashboard: ${error.message}`
    );
  }
}

module.exports = {
  buildDashboard
};
