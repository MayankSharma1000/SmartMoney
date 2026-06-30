const {
  getDashboardData
} = require("../services/dashboardService");

const getDashboardSummary = async (req, res) => {

  try {

    const summary =
      await getDashboardData(req.user._id);

    res.status(200).json({

      success: true,

      summary: {

        totalExpenses:
          summary.totalExpenses,

        totalSavings:
          summary.totalSavings,

        totalInvested:
          summary.totalInvested,

        currentInvestmentValue:
          summary.currentInvestmentValue,

        investmentProfit:
          summary.investmentProfit,

        savingsRate:
          summary.analytics.healthBreakdown.savingsStrength,

        financialHealthScore:
          summary.analytics.financialHealthScore,

        financialHealthLabel:
          summary.analytics.financialHealthLabel,

        healthBreakdown:
          summary.analytics.healthBreakdown,

        categoryChart:
          summary.analytics.categoryChart,

        monthlyChart:
          summary.analytics.monthlyChart

      }

    });

  }

  catch (error) {

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