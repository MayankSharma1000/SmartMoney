function calculateFinancialScore({
    income = 0,
    expenses = 0,
    savings = 0,
    investments = 0,
    monthlyBudget = 0
  }) {
    const safeIncome = Number(income) || 0;
    const safeExpenses = Number(expenses) || 0;
    const safeSavings = Number(savings) || 0;
    const safeInvestments = Number(investments) || 0;
    const safeBudget = Number(monthlyBudget) || 0;

    /*
     * We cannot calculate a meaningful financial
     * score without income.
     */
    if (safeIncome <= 0) {
      return {
        score: 0,
        savingsRate: 0,
        expenseRate: 0,
        investmentRate: 0,
        budgetDiscipline: 0
      };
    }

    const expenseRate =
      (safeExpenses / safeIncome) * 100;

    /*
     * Available income after this month's expenses.
     * This is a monthly cash-flow indicator, not the
     * same thing as accumulated savings.
     */
    const availableIncome = Math.max(
      safeIncome - safeExpenses,
      0
    );

    const savingsRate =
      (availableIncome / safeIncome) * 100;

    /*
     * Investment value relative to monthly income.
     * Capped later so large portfolios do not
     * artificially dominate the score.
     */
    const investmentRate =
      (safeInvestments / safeIncome) * 100;

    /*
     * 40 points:
     * Monthly spending discipline.
     */
    const expenseScore = Math.max(
      0,
      Math.min(
        40,
        40 - Math.max(expenseRate - 50, 0) * 0.8
      )
    );

    /*
     * 30 points:
     * Remaining monthly income.
     */
    const savingsScore = Math.min(
      savingsRate,
      30
    );

    /*
     * 20 points:
     * Actual investment participation.
     */
    const investmentScore = Math.min(
      investmentRate,
      20
    );

    /*
     * 10 points:
     * Budget discipline, but ONLY when a budget
     * actually exists.
     */
    let budgetDiscipline = 0;

    if (safeBudget > 0) {
      const budgetUsage =
        (safeExpenses / safeBudget) * 100;

      if (budgetUsage <= 100) {
        budgetDiscipline = 10;
      } else {
        budgetDiscipline = Math.max(
          0,
          10 - (budgetUsage - 100) * 0.2
        );
      }
    }

    const score = Math.round(
      Math.max(
        0,
        Math.min(
          100,
          expenseScore +
            savingsScore +
            investmentScore +
            budgetDiscipline
        )
      )
    );

    return {
      score,
      savingsRate,
      expenseRate,
      investmentRate,
      budgetDiscipline
    };
  }

  module.exports = {
    calculateFinancialScore
  };
