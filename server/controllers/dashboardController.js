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
    const analytics = generateAnalytics({
      totalExpenses, totalSavings, currentInvestmentValue
    }, expenses);

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
        categoryChart: analytics.categoryChart,
        monthlyChart: analytics.monthlyChart
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