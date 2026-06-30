const {
    generatePrediction
  } = require("./predictionEngine");

const {
    generateInsights
  }=require("./insightGenerator");

const {
    calculateFinancialScore
  } = require("./financialScore");
  
const {
    generateGoalProgress
  } = require("./goalEngine");

const {
    generateCategoryChart,
    generateMonthlyChart
  } = require("./chartGenerator");
  
  function generateAnalytics(summary, expenses) {
  
    const financial =
      calculateFinancialScore({
  
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

      const prediction =
      generatePrediction({
    
        totalSavings:
          summary.totalSavings,
    
        totalExpenses:
          summary.totalExpenses,
    
        currentInvestmentValue:
          summary.currentInvestmentValue
    
      });

      const goal =
      generateGoalProgress({

        totalSavings:
          summary.totalSavings,

        monthlySavings:
          prediction.monthlySavings

      });
      
      const insights=
        generateInsights({

        totalExpenses:
        summary.totalExpenses,

        totalSavings:
        summary.totalSavings,

        currentInvestmentValue:
        summary.currentInvestmentValue,

        prediction,

        financialHealthScore:
        financial.score

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
            100 - financial.expenseRate
          ),
  
        profitabilityScore:
          Math.round(
            financial.investmentRate
          )
      },
      categoryChart: generateCategoryChart(expenses),
      monthlyChart: generateMonthlyChart(expenses),
      prediction,
      goal,
      insights
    };
  }
  
  module.exports = {
  generateAnalytics
  };