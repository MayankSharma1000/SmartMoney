function generatePrediction({

    totalSavings,
  
    totalExpenses,
  
    currentInvestmentValue
  
  }) {
  
    const monthlySavings =
      Math.max(
        totalSavings - totalExpenses,
        0
      );
  
    const predictedSavings =
      Math.round(
        totalSavings +
        monthlySavings * 0.10
      );
  
    const projectedInvestment =
      Math.round(
        currentInvestmentValue * 1.08
      );
  
    const emergencyFundGoal = 200000;
  
    const remainingAmount =
      Math.max(
        emergencyFundGoal -
        totalSavings,
        0
      );
  
    const monthsRemaining =
      monthlySavings > 0
        ? Math.ceil(
            remainingAmount /
            monthlySavings
          )
        : null;
  
    return {
  
      monthlySavings,
  
      predictedSavings,
  
      projectedInvestment,
  
      emergencyFundGoal,
  
      remainingAmount,
  
      monthsRemaining
  
    };
  
  }
  
  module.exports = {
  
    generatePrediction
  
  };