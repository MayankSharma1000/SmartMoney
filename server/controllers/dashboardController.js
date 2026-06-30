const summary =
await getDashboardData(
req.user._id
);

res.status(200).json({

success:true,

summary:{

totalExpenses:
summary.totalExpenses,

totalSavings:
summary.totalSavings,

totalInvested:
summary.totalInvested,

currentInvestmentValue:
summary.currentInvestmentValue,

investmentProfit:
summary.investmentProfit,

savingsRate:
summary.analytics.healthBreakdown.savingsStrength,

financialHealthScore:
summary.analytics.financialHealthScore,

financialHealthLabel:
summary.analytics.financialHealthLabel,

healthBreakdown:
summary.analytics.healthBreakdown,

categoryChart:
summary.analytics.categoryChart,

monthlyChart:
summary.analytics.monthlyChart

}

});