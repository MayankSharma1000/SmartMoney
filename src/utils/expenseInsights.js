export const generateExpenseInsights = (
    expenses = []
  ) => {
    if (!expenses.length) {
      return [
        "Start adding expenses to unlock personalized financial insights."
      ];
    }
  
    const totalExpense = expenses.reduce(
      (sum, item) => sum + item.amount,
      0
    );
  
    const categoryTotals = {};
  
    expenses.forEach((expense) => {
      categoryTotals[expense.category] =
        (categoryTotals[expense.category] || 0) +
        expense.amount;
    });
  
    const topCategory = Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1])[0];
  
    const insights = [];
  
    if (topCategory) {
      insights.push(
        `Your highest spending category is ${topCategory[0]} at ₹${topCategory[1].toLocaleString(
          "en-IN"
        )}.`
      );
    }
  
    if (totalExpense > 25000) {
      insights.push(
        "Your monthly spending is relatively high. Consider setting category budgets."
      );
    }
  
    if (
      categoryTotals["Food"] &&
      categoryTotals["Food"] > 4000
    ) {
      insights.push(
        "Food spending is elevated. Reducing delivery orders could improve savings."
      );
    }
  
    return insights;
  };