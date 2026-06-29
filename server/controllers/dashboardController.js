const {generateAnalytics} = require("../services/analyticsService");

const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    const [expenses, savings, investments] =
    await Promise.all([
      Expense.find({ user: userId }).sort({ date: -1 }),
      Savings.find({ user: userId }),
      Investment.find({ user: userId })
    ]);

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
    const analytics = generateAnalytics({totalExpenses, totalSavings, currentInvestmentValue});

    /* ========================= */
    /* CATEGORY CHART */
    /* ========================= */

    const categoryTotals = {};

    expenses.forEach((expense) => {
      const category = expense.category || "Other";

      categoryTotals[category] =
        (categoryTotals[category] || 0) +
        Number(expense.amount || 0);
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

    console.log("========== DASHBOARD ==========");
    console.log("Expenses:", totalExpenses);
    console.log("Savings:", totalSavings);
    console.log("Investments:", currentInvestmentValue);
    console.log("Profit:", investmentProfit);
    console.log("Health Score:", analytics.financialHealthScore);
    console.log("Health Label:", analytics.financialHealthLabel);

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
    
        savingsRate: analytics.healthBreakdown.savingsStrength,
        financialHealthScore: analytics.financialHealthScore,
        financialHealthLabel: analytics.financialHealthLabel,
        healthBreakdown: analytics.healthBreakdown,
        categoryChart,
        monthlyChart
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