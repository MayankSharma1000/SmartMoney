import React from "react";

function GoalPredictions({
  predictions
}) {
  return (
    <div className="glass-card">
      <h3>Goal Predictions</h3>

      {predictions.length === 0 ? (
        <p>
          Create a savings goal to
          unlock predictions.
        </p>
      ) : (
        predictions.map((goal) => (
          <div
            key={goal._id}
            className="goal-prediction"
          >
            <h4>{goal.title}</h4>

            <p>
              Remaining:
              ₹
              {goal.remaining.toLocaleString(
                "en-IN"
              )}
            </p>

            <p>
              Estimated Time:
              {goal.monthsRequired}
              months
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default GoalPredictions;