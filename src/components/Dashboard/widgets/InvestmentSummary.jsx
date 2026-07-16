import React from "react";
import { FaArrowTrendUp } from "react-icons/fa6";

function InvestmentSummary() {
  const portfolioValue = 142800;
  const investedAmount = 130350;
  const profit = 12450;
  const returns = 9.6;

  return (
    <div className="glass-card budget-card">
      <div className="budget-header">
        <div className="budget-icon">
          <FaArrowTrendUp />
        </div>

        <div>
          <h3>Investment Portfolio</h3>

          <p className="budget-subtitle">
            Long-term wealth growth
          </p>
        </div>
      </div>

      <div className="budget-main-value">
        ₹{portfolioValue.toLocaleString("en-IN")}
      </div>

      <div className="budget-progress">
        <div
          className="budget-progress-fill"
          style={{
            width: `${Math.min(
              returns * 10,
              100
            )}%`
          }}
        />
      </div>

      <div className="budget-stats">
        <div className="budget-stat">
          <span className="budget-label">
            Invested
          </span>

          <strong>
            ₹{investedAmount.toLocaleString(
              "en-IN"
            )}
          </strong>
        </div>

        <div className="budget-stat">
          <span className="budget-label">
            Profit
          </span>

          <strong
            style={{
              color: "var(--success)"
            }}
          >
            +₹{profit.toLocaleString("en-IN")}
          </strong>
        </div>
      </div>

      <div className="budget-footer">
        <span>
          Annual Return
        </span>

        <span className="budget-percent">
          {returns}%
        </span>
      </div>
    </div>
  );
}

export default InvestmentSummary;