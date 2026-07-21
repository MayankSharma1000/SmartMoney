function generateInsights({
  monthlyIncome = 0,
  totalExpenses = 0,
  totalSavings = 0,
  currentInvestmentValue = 0,
  financialHealthScore = 0
}) {
  const insights = [];

  const income =
    Number(monthlyIncome) || 0;

  const expenses =
    Number(totalExpenses) || 0;

  const savings =
    Number(totalSavings) || 0;

  const investments =
    Number(currentInvestmentValue) || 0;

  if (income <= 0) {
    insights.push({
      type: "info",
      title: "Complete Your Financial Profile",
      message:
        "Add your monthly income to receive meaningful financial insights."
    });

    return insights;
  }

  const expenseRate =
    (expenses / income) * 100;

  if (expenses === 0) {
    insights.push({
      type: "info",
      title: "No Expenses Recorded",
      message:
        "Add your expenses to start tracking your monthly spending."
    });
  } else if (expenseRate > 80) {
    insights.push({
      type: "warning",
      title: "High Spending",
      message:
        "Your recorded expenses are using more than 80% of your monthly income."
    });
  } else if (expenseRate <= 50) {
    insights.push({
      type: "success",
      title: "Controlled Spending",
      message:
        "Your recorded expenses are currently below 50% of your monthly income."
    });
  }

  if (savings <= 0) {
    insights.push({
      type: "info",
      title: "Start a Savings Goal",
      message:
        "Create a savings goal to begin tracking progress toward your financial targets."
    });
  } else {
    insights.push({
      type: "success",
      title: "Savings Active",
      message:
        "You have active savings recorded in SmartMoney."
    });
  }

  if (investments <= 0) {
    insights.push({
      type: "info",
      title: "No Investments Recorded",
      message:
        "Add investments when applicable to track portfolio value and performance."
    });
  } else {
    insights.push({
      type: "info",
      title: "Portfolio Tracking Active",
      message:
        "Your investment portfolio is being included in your financial overview."
    });
  }

  if (financialHealthScore >= 80) {
    insights.push({
      type: "success",
      title: "Strong Financial Position",
      message:
        "Your current recorded financial data indicates strong overall financial health."
    });
  }

  return insights;
}

module.exports = {
  generateInsights
};
