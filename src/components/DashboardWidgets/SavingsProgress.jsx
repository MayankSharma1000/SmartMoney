import React from "react";
import { FaPiggyBank } from "react-icons/fa6";

function SavingsProgress() {
  const currentAmount = 74200;
  const targetAmount = 100000;

  const progress = Math.round((currentAmount / targetAmount) * 100);

  return (
    <div className="goal-card">
      <div className="stat-icon">
        <FaPiggyBank />
      </div>

      <p className="goal-name">Emergency Fund</p>

      <h3 className="goal-amount">
        ₹{currentAmount.toLocaleString("en-IN")}
      </h3>

      <div className="progress-container">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="progress-text">
          {progress}% completed of ₹{targetAmount.toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
}

export default SavingsProgress;