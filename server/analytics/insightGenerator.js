function generateInsights({

    totalExpenses,
  
    totalSavings,
  
    currentInvestmentValue,
  
    prediction,
  
    financialHealthScore
  
  }){
  
  const insights=[];
  
  /* Savings */
  
  if(totalSavings>totalExpenses){
  
  insights.push({
  
  type:"success",
  
  title:"Healthy Savings",
  
  message:
  "Your savings exceed your expenses. Keep maintaining this habit."
  
  });
  
  }else{
  
  insights.push({
  
  type:"warning",
  
  title:"Low Savings",
  
  message:
  "Your monthly expenses are higher than your savings."
  
  });
  
  }
  
  /* Investment */
  
  if(currentInvestmentValue>0){
  
  insights.push({
  
  type:"info",
  
  title:"Investments Growing",
  
  message:
  `Projected investment value: ₹${prediction.projectedInvestment.toLocaleString("en-IN")}.`
  
  });
  
  }
  
  /* Financial Health */
  
  if(financialHealthScore>=80){
  
  insights.push({
  
  type:"success",
  
  title:"Excellent Financial Health",
  
  message:
  "Your overall financial health is excellent."
  
  });
  
  }
  
  return insights;
  
  }
  
  module.exports={
  
  generateInsights
  
  };