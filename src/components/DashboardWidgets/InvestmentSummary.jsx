import React from "react";
import { FaArrowTrendUp } from "react-icons/fa6";

function InvestmentSummary() {
  const portfolioValue = 142800;
  const monthlyGain = 12450;
  const returns = 9.6;

  return (
    <div className="goal-card">
      <div className="stat-icon">
        <FaArrowTrendUp />
      </div>

      <p className="goal-name">Investment Portfolio</p>

      <h3 className="goal-amount">
        ₹{portfolioValue.toLocaleString("en-IN")}
      </h3>

      <div className="progress-container">
        <p
          style={{
            color: "var(--success)",
            fontWeight: "700",
            marginBottom: "10px"
          }}
        >
          +₹{monthlyGain.toLocaleString("en-IN")} this month
        </p>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${returns * 10}%`
            }}
          />
        </div>

        <p className="progress-text">
          Annual Return: {returns}%
        </p>
      </div>
    </div>
  );
}

export default InvestmentSummary;