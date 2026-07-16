import Card from "@/components/ui/Card";
import { FaPiggyBank } from "react-icons/fa";

function SavingsProgress() {
  const currentAmount = 74200;
  const targetAmount = 100000;

  const progress = Math.round(
    (currentAmount / targetAmount) * 100
  );

  const remainingAmount =
    targetAmount - currentAmount;

  return (
    <Card elevated className="budget-card">
      <div className="budget-header">
        <div className="budget-icon">
          <FaPiggyBank />
        </div>

        <div>
          <h3>Emergency Fund</h3>

          <p className="budget-subtitle">
            Financial safety reserve
          </p>
        </div>
      </div>

      <div className="budget-main-value">
        ₹{currentAmount.toLocaleString("en-IN")}
      </div>

      <div className="budget-progress">
        <div
          className="budget-progress-fill"
          style={{
            width: `${progress}%`
          }}
        />
      </div>

      <div className="budget-stats">
        <div className="budget-stat">
          <span className="budget-label">
            Saved
          </span>

          <strong>
            ₹{currentAmount.toLocaleString("en-IN")}
          </strong>
        </div>

        <div className="budget-stat">
          <span className="budget-label">
            Remaining
          </span>

          <strong>
            ₹{remainingAmount.toLocaleString("en-IN")}
          </strong>
        </div>
      </div>

      <div className="budget-footer">
        <span>
          Goal Progress
        </span>

        <span className="budget-percent">
          {progress}%
        </span>
      </div>
    </Card>
  );
}

export default SavingsProgress;
