function generateGoalProgress({

    totalSavings,
  
    monthlySavings
  
  }) {
  
    const emergencyFundGoal = 200000;
  
    const completion =
      Math.min(
        (totalSavings / emergencyFundGoal) * 100,
        100
      );
  
    const remaining =
      Math.max(
        emergencyFundGoal - totalSavings,
        0
      );
  
    const monthsRemaining =
      monthlySavings > 0
        ? Math.ceil(
            remaining / monthlySavings
          )
        : null;
  
    return {
  
      emergencyFundGoal,
  
      completion:
  
        Math.round(completion),
  
      remaining,
  
      monthsRemaining
  
    };
  
  }
  
  module.exports = {
  
    generateGoalProgress
  
  };