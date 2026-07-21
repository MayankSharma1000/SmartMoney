const {
  RECENT_TRANSACTION_LIMIT
} = require("../constants/dashboardConstants");

function calculateDashboardTotals(
  expenses = [],
  savings = [],
  investments = []
) {
  const totalExpenses = expenses.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  const totalSavings = savings.reduce(
    (sum, item) =>
      sum + Number(item.currentAmount || 0),
    0
  );

  const totalSavingsTarget = savings.reduce(
    (sum, item) =>
      sum + Number(item.targetAmount || 0),
    0
  );

  const totalInvested = investments.reduce(
    (sum, item) =>
      sum + Number(item.investedAmount || 0),
    0
  );

  const currentInvestmentValue = investments.reduce(
    (sum, item) =>
      sum + Number(item.currentValue || 0),
    0
  );

  const investmentProfit =
    currentInvestmentValue - totalInvested;

  return {
    totalExpenses,
    totalSavings,
    totalSavingsTarget,
    totalInvested,
    currentInvestmentValue,
    investmentProfit
  };
}

function getRecentTransactions(expenses = []) {
  return [...expenses]
    .sort(
      (a, b) =>
        new Date(b.date) - new Date(a.date)
    )
    .slice(0, RECENT_TRANSACTION_LIMIT || 5)
    .map((expense) => ({
      _id: expense._id,
      title: expense.title,
      category: expense.category,
      amount: expense.amount,
      date: expense.date,
      paymentMethod: expense.paymentMethod
    }));
}

module.exports = {
  calculateDashboardTotals,
  getRecentTransactions
};
