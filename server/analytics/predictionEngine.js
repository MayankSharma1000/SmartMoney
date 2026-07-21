function generatePrediction({
  totalSavings = 0,
  totalExpenses = 0,
  currentInvestmentValue = 0,
  totalSavingsTarget = 0
}) {
  const savings =
    Number(totalSavings) || 0;

  const expenses =
    Number(totalExpenses) || 0;

  const investmentValue =
    Number(currentInvestmentValue) || 0;

  const savingsTarget =
    Number(totalSavingsTarget) || 0;

  const monthlySavings =
    Math.max(
      savings - expenses,
      0
    );

  const predictedSavings =
    Math.round(
      savings +
      monthlySavings * 0.10
    );

  const projectedInvestment =
    Math.round(
      investmentValue * 1.08
    );

  const remainingAmount =
    savingsTarget > 0
      ? Math.max(
          savingsTarget - savings,
          0
        )
      : 0;

  const monthsRemaining =
    savingsTarget > 0 &&
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
    savingsTarget,
    remainingAmount,
    monthsRemaining
  };
}

module.exports = {
  generatePrediction
};
