function generateCategoryChart(expenses) {
  const categoryTotals = {};

  expenses.forEach((expense) => {
    const category =
      expense.category || "Other";

    categoryTotals[category] =
      (categoryTotals[category] || 0) +
      Number(expense.amount || 0);

  });

  return Object.entries(categoryTotals)
    .map(([category, amount]) => ({
      category,
      amount
    }))
    .sort((a, b) => b.amount - a.amount);
}

function generateMonthlyChart(expenses) {
  const weeklyTotals = {
    "Week 1": 0,
    "Week 2": 0,
    "Week 3": 0,
    "Week 4": 0
  };

  expenses.forEach((expense) => {

    const date =
      expense.date
        ? new Date(expense.date)
        : new Date();

    const day =
      date.getDate();

    let week = "Week 4";

    if (day <= 7)
      week = "Week 1";

    else if (day <= 14)
      week = "Week 2";

    else if (day <= 21)
      week = "Week 3";

    weeklyTotals[week] +=
      Number(expense.amount || 0);
  });

  return Object.entries(weeklyTotals)
    .map(([month, expenses]) => ({
      month,
      expenses
    }));
}

module.exports = {
  generateCategoryChart,
  generateMonthlyChart
};