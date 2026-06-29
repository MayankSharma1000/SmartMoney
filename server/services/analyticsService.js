const {
    calculateFinancialScore
  } = require("../analytics/financialScore");
  
  function generateAnalytics(data) {
  
    const financial = calculateFinancialScore({
      income: data.totalIncome,
      expenses: data.totalExpenses,
      savings: data.totalSavings,
      investments: data.currentInvestmentValue
    });
  
    return {
  
      financialHealth: financial.score,
  
      savingsRate: financial.savingsRate,
  
      expenseRate: financial.expenseRate,
  
      investmentRate: financial.investmentRate
  
    };
  
  }
  
  module.exports = {
    generateAnalytics
  };

  const {
    calculateFinancialScore
  } = require("../analytics/financialScore");
  
  function generateAnalytics(summary) {
  
    const financial = calculateFinancialScore({
  
      income:
        summary.totalSavings +
        summary.totalExpenses,
  
      expenses:
        summary.totalExpenses,
  
      savings:
        summary.totalSavings,
  
      investments:
        summary.currentInvestmentValue
  
    });
  
    return {
  
      financialHealthScore:
        financial.score,
  
      financialHealthLabel:
        financial.score >= 85
          ? "Excellent"
          : financial.score >= 70
          ? "Good"
          : financial.score >= 50
          ? "Average"
          : "Poor",
  
      healthBreakdown: {
  
        savingsStrength:
          Math.round(financial.savingsRate),
  
        investmentStrength:
          Math.round(financial.investmentRate),
  
        budgetDiscipline:
          Math.round(
            100 -
            financial.expenseRate
          ),
  
        profitabilityScore:
          Math.round(
            financial.investmentRate
          )
  
      }
  
    };
  
  }
  
  module.exports = {
  
    generateAnalytics
  
  };