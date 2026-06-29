const calculateFinancialHealth = (
    totalIncome,
    totalExpenses,
    totalSavings,
    investmentValue
  ) => {
  
    let score = 0;
  
    /* Savings */
  
    const savingsRate =
      totalIncome > 0
        ? (totalSavings / totalIncome) * 100
        : 0;
  
    score += Math.min(savingsRate,25);
  
    /* Expenses */
  
    const expenseRate =
      totalIncome > 0
        ? (totalExpenses / totalIncome) * 100
        : 100;
  
    score += Math.max(
      0,
      35 - expenseRate
    );
  
    /* Investments */
  
    const investRate =
      totalIncome > 0
        ? (investmentValue / totalIncome) * 100
        : 0;
  
    score += Math.min(
      investRate,
      20
    );
  
    /* Bonus */
  
    score += 20;
  
    return Math.min(
      Math.round(score),
      100
    );
  
  };
  
  module.exports = {
  
  calculateFinancialHealth
  
  };