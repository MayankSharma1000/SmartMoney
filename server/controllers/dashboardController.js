const Expense = require("../models/Expense");
const Savings = require("../models/Savings");
const Investment = require("../models/Investment");

const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    const expenses = await Expense.find({ user: userId }).sort({ date: -1 });
    const savings = await Savings.find({ user: userId });
    const investments = await Investment.find({ user: userId });

    /* ========================= */
    /* BASIC TOTALS */
    /* ========================= */

    const totalExpenses = expenses.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );

    const totalSavings = savings.reduce((sum, item) => {
      return (
        sum +
        Number(
          item.currentAmount ||
            item.savedAmount ||
            item.saved ||
            item.amount ||
            0
        )
      );
    }, 0);

    const totalInvested = investments.reduce((sum, item) => {
      return (
        sum +
        Number(
          item.investedAmount ||
            item.invested ||
            item.amount ||
            item.purchaseValue ||
            0
        )
      );
    }, 0);

    const currentInvestmentValue = investments.reduce((sum, item) => {
      return (
        sum +
        Number(
          item.currentValue ||
            item.current ||
            item.marketValue ||
            item.value ||
            item.investedAmount ||
            item.amount ||
            0
        )
      );
    }, 0);

    const investmentProfit = currentInvestmentValue - totalInvested;

    /* ========================= */
    /* FINANCIAL HEALTH SCORE */
    /* ========================= */

    const savingsRate =
      totalSavings + totalExpenses === 0
        ? 0
        : Math.round((totalSavings / (totalSavings + totalExpenses)) * 100);

    const savingsScore =
      savingsRate >= 40
        ? 35
        : savingsRate >= 25
        ? 28
        : savingsRate >= 15
        ? 20
        : savingsRate > 0
        ? 12
        : 5;

    const expenseScore =
      totalExpenses === 0
        ? 20
        : totalExpenses <= 20000
        ? 30
        : totalExpenses <= 35000
        ? 22
        : 12;

    const investmentScore =
      currentInvestmentValue > 0
        ? 25
        : totalSavings > 0
        ? 10
        : 0;

    const profitScore =
      investmentProfit > 0 ? 10 : currentInvestmentValue > 0 ? 5 : 0;

    const financialHealthScore = Math.min(
      100,
      savingsScore + expenseScore + investmentScore + profitScore
    );

    /* ========================= */
    /* CATEGORY CHART */
    /* ========================= */

    const categoryTotals = {};

    expenses.forEach((expense) => {
      const category = expense.category || "Other";

      categoryTotals[category] =
        (categoryTotals[category] || 0) + Number(expense.amount || 0);
    });

    const categoryChart = Object.entries(categoryTotals)
      .map(([category, amount]) => ({
        category,
        amount
      }))
      .sort((a, b) => b.amount - a.amount);

    /* ========================= */
    /* WEEKLY EXPENSE TREND */
    /* ========================= */

    const weeklyTotals = {
      "Week 1": 0,
      "Week 2": 0,
      "Week 3": 0,
      "Week 4": 0
    };

    expenses.forEach((expense) => {
      const date = expense.date ? new Date(expense.date) : new Date();
      const day = date.getDate();

      let weekLabel = "Week 4";

      if (day <= 7) {
        weekLabel = "Week 1";
      } else if (day <= 14) {
        weekLabel = "Week 2";
      } else if (day <= 21) {
        weekLabel = "Week 3";
      }

      weeklyTotals[weekLabel] += Number(expense.amount || 0);
    });

    const monthlyChart = Object.entries(weeklyTotals).map(
      ([month, amount]) => ({
        month,
        expenses: amount
      })
    );

    /* ========================= */
    /* RESPONSE */
    /* ========================= */

    res.status(200).json({
      success: true,
      summary: {
        totalExpenses,
        totalSavings,
        totalInvested,
        currentInvestmentValue,
        investmentProfit,
        savingsRate,
        financialHealthScore,
        expenseCount: expenses.length,
        savingsGoalsCount: savings.length,
        investmentsCount: investments.length,
        categoryChart,
        monthlyChart,
        recentTransactions: expenses.slice(0, 5)
      }
    });
  } catch (error) {
    console.error("Dashboard Summary Error:", error);

    res.status(500).json({
      success: false,
      message: "Dashboard summary could not be loaded"
    });
  }
};

module.exports = {
  getDashboardSummary
};