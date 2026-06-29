function generateCategoryChart(expenses) {

  const categoryTotals = {};

  expenses.forEach((expense) => {

    if (!categoryTotals[expense.category]) {
      categoryTotals[expense.category] = 0;
    }

    categoryTotals[expense.category] += expense.amount;

  });

  return Object.entries(categoryTotals)

    .map(([name, value]) => ({
      name,
      value
    }))

    .sort((a, b) => b.value - a.value);

}

function generateWeeklyChart(expenses) {

  const weeklyTotals = {
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
    Sun: 0
  };

  const days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];

  expenses.forEach((expense) => {

    const day =
      days[new Date(expense.date).getDay()];

    weeklyTotals[day] += expense.amount;

  });

  return Object.entries(weeklyTotals).map(

    ([day, amount]) => ({
      day,
      amount
    })

  );

}

module.exports = {

  generateCategoryChart,

  generateWeeklyChart

};