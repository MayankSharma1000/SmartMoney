const Expense = require("../models/Expense");
const Savings = require("../models/Savings");
const Investment = require("../models/Investment");

const generateFinancialAdvice = async (userId) => {

  const [expenses, savings, investments] = await Promise.all([
    Expense.find({ user: userId }),
    Savings.find({ user: userId }),
    Investment.find({ user: userId })
  ]);

  const totalExpenses = expenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const totalSavings = savings.reduce(
    (sum, item) => sum + item.currentAmount,
    0
  );

  const totalInvestment = investments.reduce(
    (sum, item) => sum + item.currentValue,
    0
  );

  const advice = [];

  if (totalSavings < totalExpenses * 0.2) {
    advice.push(
      "Your savings are below recommended levels. Aim to save at least 20% of your monthly spending."
    );
  }

  if (totalInvestment < totalSavings * 0.3) {
    advice.push(
      "Consider allocating a portion of your savings toward long-term investments."
    );
  }

  advice.push(
    `You currently have ₹${totalSavings.toLocaleString("en-IN")} in savings.`
  );

  advice.push(
    `Your investments are valued at ₹${totalInvestment.toLocaleString("en-IN")}.`
  );

  return advice;

};

module.exports = {
  generateFinancialAdvice
};
