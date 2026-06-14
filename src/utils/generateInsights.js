export const generateInsights = (expenses, budget, dashboardData) => {
    const insights = [];
  
    if (!expenses?.length) {
      return ["Start adding expenses to unlock smart insights."];
    }
  
    const totalExpense = expenses.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );
  
    const categories = {};
  
    expenses.forEach((expense) => {
      categories[expense.category] =
        (categories[expense.category] || 0) + Number(expense.amount || 0);
    });
  
    const topCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0];
  
    if (topCategory && totalExpense > 0) {
      const percentage = Math.round((topCategory[1] / totalExpense) * 100);
  
      insights.push(`${topCategory[0]} accounts for ${percentage}% of your spending.`);
    }
  
    if (budget?.monthlyBudget && totalExpense > budget.monthlyBudget * 0.8) {
      insights.push("You have already used more than 80% of your monthly budget.");
    }
  
    if (dashboardData?.financialHealthScore >= 80) {
      insights.push("Your financial health score is excellent.");
    }
  
    if (dashboardData?.savingsRate >= 20) {
      insights.push("Your savings rate is healthy.");
    }
  
    return insights;
  };