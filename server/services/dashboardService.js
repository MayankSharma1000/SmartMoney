const Expense = require("../models/Expense");
const Savings = require("../models/Savings");
const Investment = require("../models/Investment");
const Budget = require("../models/Budget");
const User = require("../models/User");

const {
  generateAnalytics
} = require("../analytics/analyticsEngine");

const {
  calculateDashboardTotals,
  getRecentTransactions
} = require("../utils/dashboardCalculations");

async function buildDashboard(userId) {
  try {
    const now = new Date();

    const monthStart =
      new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      );

    const nextMonthStart =
      new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        1
      );

    const currentMonth =
      now.toLocaleString("default", {
        month: "long"
      });

    const currentYear =
      now.getFullYear();

    /*
     * Fetch the authenticated user's actual
     * financial data.
     */
    const [
      user,
      expenses,
      savings,
      investments,
      budget
    ] = await Promise.all([
      User.findById(userId)
        .select(
          "name email monthlyIncome currency onboardingCompleted"
        )
        .lean(),

      Expense.find({
        user: userId,
        date: {
          $gte: monthStart,
          $lt: nextMonthStart
        }
      })
        .select(
          "title category amount paymentMethod date"
        )
        .sort({ date: -1 })
        .lean(),

      Savings.find({
        user: userId
      }).lean(),

      Investment.find({
        user: userId
      }).lean(),

      Budget.findOne({
        user: userId,
        month: currentMonth,
        year: currentYear
      }).lean()
    ]);

    if (!user) {
      throw new Error("User not found");
    }

    const {
      totalExpenses,
      totalSavings,
      totalSavingsTarget,
      totalInvested,
      currentInvestmentValue,
      investmentProfit
    } = calculateDashboardTotals(
      expenses,
      savings,
      investments
    );

    const monthlyIncome =
      Number(user.monthlyIncome) || 0;

    const monthlyBudget =
      Number(budget?.monthlyBudget) || 0;

    const analytics =
      generateAnalytics(
        {
          monthlyIncome,
          monthlyBudget,
          totalExpenses,
          totalSavings,
          totalSavingsTarget,
          currentInvestmentValue
        },
        expenses
      );

    return {
      user: {
        name: user.name,
        email: user.email,
        currency: user.currency || "INR",
        monthlyIncome,
        onboardingCompleted:
          Boolean(user.onboardingCompleted)
      },

      period: {
        month: currentMonth,
        year: currentYear
      },

      monthlyIncome,

      monthlyBudget,

      totalExpenses,

      totalSavings,

      totalSavingsTarget,

      totalInvested,

      currentInvestmentValue,

      investmentProfit,

      expenseCount:
        expenses.length,

      savingsGoalCount:
        savings.length,

      investmentCount:
        investments.length,

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

      insights:
        analytics.insights || [],

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
