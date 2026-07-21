import Card from "@/components/ui/Card";
import "@/styles/dashboard/financial-widget.css";
import "./BudgetProgress.css";

import { FaMoneyBillWave } from "react-icons/fa";

function BudgetProgress({
  monthlyBudget = 0,
  spent = 0,
  remaining = 0,
  percentageUsed = 0,
}) {
  const safePercentage = Math.min(
    Math.max(percentageUsed || 0, 0),
    100
  );

  const today = new Date();

  const daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();

  const remainingDays = Math.max(
    daysInMonth - today.getDate(),
    1
  );

  const dailyBudget = Math.max(
    Math.floor(remaining / remainingDays),
    0
  );

  return (
    <Card
      elevated
      className="financial-widget budget-card"
    >
      {/* Header */}

      <div className="widget-header">

        <div className="budget-icon">
          <FaMoneyBillWave />
        </div>

        <div className="widget-heading">

          <h3 className="widget-title">
            Monthly Budget
          </h3>

          <p className="widget-subtitle">
            Current month spending limit
          </p>

          <span
            className={`widget-pill ${
              safePercentage >= 90
                ? "danger"
                : safePercentage >= 70
                ? "warning"
                : "success"
            }`}
          >
            {safePercentage >= 90
              ? "Critical"
              : safePercentage >= 70
              ? "Watch"
              : "Healthy"}
          </span>

        </div>

      </div>

      {/* Main Amount */}

      <div className="widget-value">
        ₹{monthlyBudget.toLocaleString("en-IN")}
      </div>

      {/* Progress */}

      <div className="widget-progress-wrapper">

        <div className="widget-progress">

          <div
            className="budget-progress-fill"
            style={{
              width: `${safePercentage}%`,
            }}
          />

        </div>

        <div className="widget-progress-info">

          <span>
            {safePercentage}% Used
          </span>

          <span>
            ₹{remaining.toLocaleString("en-IN")} Left
          </span>

        </div>

      </div>

      {/* Metrics */}

      <div className="widget-metrics">

        <div className="widget-metric">

          <span className="widget-metric-label">
            Spent
          </span>

          <strong className="widget-metric-value">
            ₹{spent.toLocaleString("en-IN")}
          </strong>

        </div>

        <div className="widget-metric">

          <span className="widget-metric-label">
            Daily Budget
          </span>

          <strong className="widget-metric-value">
            ₹{dailyBudget.toLocaleString("en-IN")}
          </strong>

        </div>

      </div>

      {/* Footer */}

      <div className="widget-footer">

        <span>
          🗓 Budget resets in {remainingDays} days
        </span>

      </div>

    </Card>
  );
}

export default BudgetProgress;
