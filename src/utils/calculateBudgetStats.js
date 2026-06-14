export const calculateBudgetStats = (
    monthlyBudget,
    totalExpenses
  ) => {
    const spent = totalExpenses;
  
    const remaining = Math.max(
      0,
      monthlyBudget - spent
    );
  
    const percentageUsed =
      monthlyBudget === 0
        ? 0
        : Math.round(
            (spent / monthlyBudget) * 100
          );
  
    return {
      spent,
      remaining,
      percentageUsed
    };
  };