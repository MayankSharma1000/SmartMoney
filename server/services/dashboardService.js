const Expense = require("../models/Expense");
const Savings = require("../models/Savings");
const Investment = require("../models/Investment");

const {
  generateAnalytics
} = require("./analyticsService");

async function getDashboardData(userId) {

  /* ============================= */
  /* FETCH DATA (Parallel Queries) */
  /* ============================= */

  const [expenses, savings, investments] =
    await Promise.all([

      Expense.find({
        user: userId
      }).sort({
        date: -1
      }),

      Savings.find({
        user: userId
      }),

      Investment.find({
        user: userId
      })

    ]);

  /* ============================= */
  /* TOTALS */
  /* ============================= */

  const totalExpenses = expenses.reduce(
    (sum, item) =>
      sum + Number(item.amount || 0),
    0
  );

  const totalSavings = savings.reduce(

    (sum, item) =>

      sum +

      Number(

        item.currentAmount ||

        item.savedAmount ||

        item.saved ||

        item.amount ||

        0

      ),

    0

  );

  const totalInvested = investments.reduce(

    (sum, item) =>

      sum +

      Number(

        item.investedAmount ||

        item.invested ||

        item.amount ||

        item.purchaseValue ||

        0

      ),

    0

  );

  const currentInvestmentValue =
    investments.reduce(

      (sum, item) =>

        sum +

        Number(

          item.currentValue ||

          item.current ||

          item.marketValue ||

          item.value ||

          item.investedAmount ||

          item.amount ||

          0

        ),

      0

    );

  const investmentProfit =
    currentInvestmentValue -
    totalInvested;

  /* ============================= */
  /* ANALYTICS */
  /* ============================= */

  const analytics =
    generateAnalytics({

      totalExpenses,

      totalSavings,

      currentInvestmentValue

    });

  /* ============================= */
  /* RETURN */
  /* ============================= */

  return {

    totalExpenses,

    totalSavings,

    totalInvested,

    currentInvestmentValue,

    investmentProfit,

    analytics,

    expenses

  };

}

module.exports = {

  getDashboardData

};