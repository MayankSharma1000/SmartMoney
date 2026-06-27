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
          : Math.round(
              (totalSavings /
                (totalSavings + totalExpenses)) *
                100
            );

      let financialHealthScore = 0;

      let budgetDiscipline = 0;
      let savingsStrength = 0;
      let investmentStrength = 0;
      let profitabilityScore = 0;

      /* Savings Strength (40) */

      if (totalSavings >= 100000) {
        savingsStrength = 40;
      } else if (totalSavings >= 50000) {
        savingsStrength = 30;
      } else if (totalSavings >= 10000) {
        savingsStrength = 20;
      } else if (totalSavings > 0) {
        savingsStrength = 10;
      }

      financialHealthScore += savingsStrength;

      /* Investment Strength (30) */

      if (currentInvestmentValue >= 100000) {
        investmentStrength = 30;
      } else if (currentInvestmentValue >= 50000) {
        investmentStrength = 20;
      } else if (currentInvestmentValue >= 10000) {
        investmentStrength = 10;
      }

      financialHealthScore += investmentStrength;

      /* Profitability (15) */

      if (investmentProfit >= 10000) {
        profitabilityScore = 15;
      } else if (investmentProfit > 0) {
        profitabilityScore = 8;
      }

      financialHealthScore += profitabilityScore;

      /* Expense Discipline (15) */

      if (totalExpenses <= 15000) {
        budgetDiscipline = 15;
      } else if (totalExpenses <= 30000) {
        budgetDiscipline = 10;
      } else if (totalExpenses <= 50000) {
        budgetDiscipline = 5;
      }

      financialHealthScore += budgetDiscipline;

      financialHealthScore = Math.min(
        financialHealthScore,
        100
      );

      let financialHealthLabel = "Poor";

      if (financialHealthScore >= 85) {
        financialHealthLabel = "Excellent";
      } else if (financialHealthScore >= 70) {
        financialHealthLabel = "Good";
      } else if (financialHealthScore >= 50) {
        financialHealthLabel = "Average";
      }

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
    console.log("Health Score:", financialHealthScore);
    console.log("Health Label:", financialHealthLabel);

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
        financialHealthLabel,
    
        healthBreakdown: {
          budgetDiscipline,
          savingsStrength,
          investmentStrength,
          profitabilityScore
        },
    
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