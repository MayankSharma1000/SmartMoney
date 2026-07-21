const {
  generateInsights
} = require("./insightGenerator");

const {
  calculateFinancialScore
} = require("./financialScore");

const {
  generateCategoryChart,
  generateMonthlyChart
} = require("./chartGenerator");

function generateAnalytics(
  summary = {},
  expenses = []
) {
  const financial =
    calculateFinancialScore({
      income:
        summary.monthlyIncome || 0,

      expenses:
        summary.totalExpenses || 0,

      savings:
        summary.totalSavings || 0,

      investments:
        summary.currentInvestmentValue || 0,

      monthlyBudget:
        summary.monthlyBudget || 0
    });

  const insights =
    generateInsights({
      monthlyIncome:
        summary.monthlyIncome || 0,

      totalExpenses:
        summary.totalExpenses || 0,

      totalSavings:
        summary.totalSavings || 0,

      currentInvestmentValue:
        summary.currentInvestmentValue || 0,

      financialHealthScore:
        financial.score
    });

  let financialHealthLabel =
    "Not enough data";

  if ((summary.monthlyIncome || 0) > 0) {
    if (financial.score >= 85) {
      financialHealthLabel = "Excellent";
    } else if (financial.score >= 70) {
      financialHealthLabel = "Good";
    } else if (financial.score >= 50) {
      financialHealthLabel = "Average";
    } else {
      financialHealthLabel = "Needs Attention";
    }
  }

  return {
    financialHealthScore:
      financial.score,

    financialHealthLabel,

    healthBreakdown: {
      savingsStrength:
        Math.round(financial.savingsRate),

      investmentStrength:
        Math.round(
          Math.min(
            financial.investmentRate,
            100
          )
        ),

      budgetDiscipline:
        Math.round(
          financial.budgetDiscipline * 10
        ),

      expenseControl:
        Math.round(
          Math.max(
            0,
            100 - financial.expenseRate
          )
        )
    },

    categoryChart:
      generateCategoryChart(expenses),

    monthlyChart:
      generateMonthlyChart(expenses),

    insights
  };
}

module.exports = {
  generateAnalytics
};
