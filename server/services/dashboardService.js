const Expense = require("../models/Expense");
const Savings = require("../models/Savings");
const Investment = require("../models/Investment");

const {
  generateAnalytics
} = require("../analytics/analyticsEngine");

async function getDashboardData(userId) {

  const [expenses, savings, investments] =
    await Promise.all([

      Expense.find({ user: userId }).sort({
        date: -1
      }),

      Savings.find({ user: userId }),

      Investment.find({ user: userId })

    ]);

  const totalExpenses =
    expenses.reduce(

      (sum, item)=>

      sum+Number(item.amount||0),

      0

    );

  const totalSavings =
    savings.reduce(

      (sum,item)=>

      sum+

      Number(

      item.currentAmount||

      item.savedAmount||

      item.saved||

      item.amount||

      0

      ),

      0

    );

  const totalInvested =
    investments.reduce(

      (sum,item)=>

      sum+

      Number(

      item.investedAmount||

      item.amount||

      item.purchaseValue||

      0

      ),

      0

    );

  const currentInvestmentValue =
    investments.reduce(

      (sum,item)=>

      sum+

      Number(

      item.currentValue||

      item.marketValue||

      item.amount||

      item.investedAmount||

      0

      ),

      0

    );

  const investmentProfit =
    currentInvestmentValue-
    totalInvested;

  const analytics =
    generateAnalytics(

      {

        totalExpenses,

        totalSavings,

        currentInvestmentValue

      },

      expenses

    );

  return{

    totalExpenses,

    totalSavings,

    totalInvested,

    currentInvestmentValue,

    investmentProfit,

    analytics

  };

}

module.exports={

getDashboardData

};