const {
    RECENT_TRANSACTION_LIMIT
  } = require("../constants/dashboardConstants");

function calculateDashboardTotals(
    expenses,
    savings,
    investments
  ) {

    const totalExpenses = expenses.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );

    const totalSavings = savings.reduce(
      (sum, item) =>
        sum +
        Number(
          item.currentAmount ??
          item.savedAmount ??
          item.saved ??
          item.amount ??
          0
        ),
      0
    );

    const totalInvested = investments.reduce(
      (sum, item) =>
        sum +
        Number(
          item.investedAmount ??
          item.invested ??
          item.amount ??
          item.purchaseValue ??
          0
        ),
      0
    );

    const currentInvestmentValue = investments.reduce(
      (sum, item) =>
        sum +
        Number(
          item.currentValue ??
          item.current ??
          item.marketValue ??
          item.value ??
          item.investedAmount ??
          item.amount ??
          0
        ),
      0
    );

    return {

      totalExpenses,

      totalSavings,

      totalInvested,

      currentInvestmentValue,

      investmentProfit:
        currentInvestmentValue - totalInvested

    };

  }

  function getRecentTransactions(expenses) {
        return expenses
        .slice(0, RECENT_TRANSACTION_LIMIT)
        .map((expense) => ({
            _id: expense._id,
            title: expense.title,
            category: expense.category,
            amount: expense.amount,
            date: expense.date,
            paymentMethod: expense.paymentMethod
        }));
    }

    function getRecentTransactions(expenses) {
      return expenses
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
    }

    module.exports = {
      calculateDashboardTotals,
      getRecentTransactions
    };
