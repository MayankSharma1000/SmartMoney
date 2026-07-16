import Card from "@/components/ui/Card";
import { FaMoneyBillWave } from "react-icons/fa";

function BudgetProgress({
  monthlyBudget = 0,
  spent = 0,
  remaining = 0,
  percentageUsed = 0
}) {
  const safePercentage = Math.min(
    Math.max(percentageUsed || 0, 0),
    100
  );

  return (
    <Card elevated className="budget-card">
      <div className="budget-header">
        <div className="budget-icon">
          <FaMoneyBillWave />
        </div>

        <div>
          <h3>Monthly Budget</h3>
          <p className="budget-subtitle">
            Current month spending limit
          </p>
        </div>
      </div>

      <div className="budget-main-value">
        ₹{monthlyBudget.toLocaleString("en-IN")}
      </div>

      <div className="budget-progress">
        <div
          className="budget-progress-fill"
          style={{
            width: `${safePercentage}%`
          }}
        />
      </div>

      <div className="budget-stats">
        <div className="budget-stat">
          <span className="budget-label">
            Spent
          </span>

          <strong>
            ₹{spent.toLocaleString("en-IN")}
          </strong>
        </div>

        <div className="budget-stat">
          <span className="budget-label">
            Remaining
          </span>

          <strong>
            ₹{remaining.toLocaleString("en-IN")}
          </strong>
        </div>
      </div>

      <div className="budget-footer">
        <span>
          Budget Utilized
        </span>

        <span className="budget-percent">
          {safePercentage}%
        </span>
      </div>
    </Card>
  );
}

export default BudgetProgress;
