function calculateFinancialScore({

    income,

    expenses,

    savings,

    investments

}){

let score = 0;

/* Savings */

const savingsRate =
income > 0
? (savings/income)*100
:0;

if(savingsRate>=30){

score+=30;

}

else{

score+=savingsRate;

}

/* Expenses */

const expenseRate =
income>0
?(expenses/income)*100
:100;

if(expenseRate<=50){

score+=30;

}

else{

score+=Math.max(
0,
30-(expenseRate-50)
);

}

/* Investments */

const investmentRate =
income>0
?(investments/income)*100
:0;

score+=Math.min(
investmentRate,
20
);

/* Stability */

score+=20;

return{

score:Math.round(
Math.min(score,100)
),

savingsRate,

expenseRate,

investmentRate

};

}

module.exports={
calculateFinancialScore
};