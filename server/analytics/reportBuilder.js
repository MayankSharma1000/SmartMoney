function buildFinancialReport(analytics) {

    const prediction =
      analytics.prediction;
  
    const insights =
      analytics.insights;
  
    const report = `
  
  Financial Health:
  ${analytics.financialHealthScore}/100
  
  Predicted Savings:
  ₹${prediction.predictedSavings}
  
  Emergency Fund:
  ${prediction.monthsRemaining} months remaining
  
  Insights:
  
  ${insights
    .map(
      item =>
        `- ${item.title}: ${item.message}`
    )
    .join("\n")}
  
  Write a professional financial report.
  
  Give practical advice.
  
  Keep it under 200 words.
  
  `;
  
    return report;
  
  }
  
  module.exports = {
  
    buildFinancialReport
  
  };