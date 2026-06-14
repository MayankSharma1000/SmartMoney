export const predictGoals = (
    savingsGoals,
    totalSavings
  ) => {
    if (!savingsGoals?.length) {
      return [];
    }
  
    return savingsGoals.map((goal) => {
      const remaining =
        goal.targetAmount - goal.currentAmount;
  
      const monthlyContribution =
        goal.monthlyContribution || 1000;
  
      const monthsRequired =
        remaining <= 0
          ? 0
          : Math.ceil(
              remaining / monthlyContribution
            );
  
      return {
        ...goal,
        remaining,
        monthsRequired
      };
    });
  };