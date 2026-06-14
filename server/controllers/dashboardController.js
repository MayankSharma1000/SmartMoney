const Expense = require("../models/Expense");
const Savings = require("../models/Savings");
const Investment = require("../models/Investment");

const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    const expenses = await Expense.find({ user: userId });
    const savings = await Savings.find({ user: userId });
    const investments = await Investment.find({ user: userId });

    const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);

    const totalSavings = savings.reduce(
      (sum, item) => sum + item.currentAmount,
      0
    );

    const totalInvested = investments.reduce(
      (sum, item) => sum + item.investedAmount,
      0
    );

    const currentInvestmentValue = investments.reduce(
      (sum, item) => sum + item.currentValue,
      0
    );

    const investmentProfit = currentInvestmentValue - totalInvested;

    const savingsRate =
      totalExpenses === 0
        ? 100
        : Math.round((totalSavings / (totalSavings + totalExpenses)) * 100);

    const financialHealthScore = Math.min(
      100,
      Math.round(savingsRate * 0.4 + (investmentProfit > 0 ? 30 : 10) + 30)
    );

    const categoryTotals = {};

    expenses.forEach((expense) => {
      categoryTotals[expense.category] =
        (categoryTotals[expense.category] || 0) + expense.amount;
    });

    const categoryChart = Object.entries(categoryTotals).map(
      ([category, amount]) => ({
        category,
        amount
      })
    );

    const monthlyTotals = {};

    expenses.forEach((expense) => {
      const date = new Date(expense.date);
      const key = date.toLocaleString("default", {
        month: "short",
        year: "2-digit"
      });

      monthlyTotals[key] = (monthlyTotals[key] || 0) + expense.amount;
    });

    const monthlyChart = Object.entries(monthlyTotals).map(
      ([month, amount]) => ({
        month,
        expenses: amount
      })
    );

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
        monthlyChart
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getDashboardSummary
};