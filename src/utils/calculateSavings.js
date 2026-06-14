export const calculateSavingsPercentage = (
    currentAmount,
    targetAmount
  ) => {
    if (!targetAmount) return 0;
  
    return Math.min(
      100,
      Math.round((currentAmount / targetAmount) * 100)
    );
  };
  
  export const calculateRemainingAmount = (
    currentAmount,
    targetAmount
  ) => {
    return Math.max(0, targetAmount - currentAmount);
  };