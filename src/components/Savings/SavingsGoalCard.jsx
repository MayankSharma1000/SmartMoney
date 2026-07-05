import React from "react";
import { FaBullseye, FaCalendarAlt, FaTrash } from "react-icons/fa";
import Button from "../ui/Button/Button";

function SavingsGoalCard({ goal, handleDelete }) {
  const current = Number(goal.currentAmount || 0);
  const target = Number(goal.targetAmount || 0);

  const percentage =
    target > 0
      ? Math.min((current / target) * 100, 100)
      : 0;

  return (
    <div className="goal-card hover-lift fade-up">

      <div className="goal-top">

        <div className="goal-info">

          <div className="goal-icon">

            <FaBullseye />

          </div>

          <div>

            <h3>{goal.title}</h3>

            <span className="goal-category">
              {goal.category}
            </span>

          </div>

        </div>

        <Button
          className="delete-goal-btn"
          onClick={() => handleDelete(goal._id)}
        >
          <FaTrash />
        </Button>

      </div>

      <div className="goal-progress-wrapper">

        <div className="goal-progress-labels">

          <span>
            Saved
          </span>

          <strong>
            {percentage.toFixed(0)}%
          </strong>

        </div>

        <div className="progress-track">

          <div
            className="progress-fill"
            style={{
              width: `${percentage}%`
            }}
          />

        </div>

      </div>

      <div className="goal-amount-row">

        <div>

          <small>Current</small>

          <h4>
            ₹{current.toLocaleString("en-IN")}
          </h4>

        </div>

        <div>

          <small>Target</small>

          <h4>
            ₹{target.toLocaleString("en-IN")}
          </h4>

        </div>

      </div>

      <div className="goal-bottom">

        <div className="goal-date">

          <FaCalendarAlt />

          <span>

            {goal.targetDate
              ? new Date(goal.targetDate).toLocaleDateString("en-IN")
              : "No Target"}

          </span>

        </div>

      </div>

    </div>
  );
}

export default SavingsGoalCard;