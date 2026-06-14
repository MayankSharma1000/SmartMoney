import React from "react";

function BudgetProgress({
  monthlyBudget,
  spent,
  remaining,
  percentageUsed
}) {
  return (
    <div className="glass-card budget-card">
      <h3>Monthly Budget</h3>

      <div className="budget-values">
        <h2>
          ₹{monthlyBudget.toLocaleString("en-IN")}
        </h2>

        <p>
          Remaining:
          ₹{remaining.toLocaleString("en-IN")}
        </p>
      </div>

      <div className="budget-progress">
        <div
          className="budget-progress-fill"
          style={{
            width: `${Math.min(
              percentageUsed,
              100
            )}%`
          }}
        />
      </div>

      <div className="budget-footer">
        <span>
          Used: {percentageUsed}%
        </span>

        <span>
          ₹{spent.toLocaleString("en-IN")}
        </span>
      </div>
    </div>
  );
}

export default BudgetProgress;