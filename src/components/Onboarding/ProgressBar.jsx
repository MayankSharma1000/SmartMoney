import React from "react";

function ProgressBar({ currentStep, totalSteps }) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="progress-wrapper">
      <div className="progress-text">
        <span>
          Step {currentStep} of {totalSteps}
        </span>

        <span>{Math.round(percentage)}%</span>
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
  );
}

export default ProgressBar;