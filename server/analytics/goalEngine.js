function generateGoalProgress({
  totalSavings = 0,
  monthlySavings = 0,
  totalSavingsTarget = 0
}) {
  const savings =
    Number(totalSavings) || 0;

  const monthlyContribution =
    Number(monthlySavings) || 0;

  const savingsTarget =
    Number(totalSavingsTarget) || 0;

  const completion =
    savingsTarget > 0
      ? Math.min(
          (savings / savingsTarget) * 100,
          100
        )
      : 0;

  const remaining =
    savingsTarget > 0
      ? Math.max(
          savingsTarget - savings,
          0
        )
      : 0;

  const monthsRemaining =
    savingsTarget > 0 &&
    monthlyContribution > 0
      ? Math.ceil(
          remaining /
          monthlyContribution
        )
      : null;

  return {
    savingsTarget,
    completion:
      Math.round(completion),
    remaining,
    monthsRemaining
  };
}

module.exports = {
  generateGoalProgress
};
