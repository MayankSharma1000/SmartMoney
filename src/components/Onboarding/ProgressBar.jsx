function ProgressBar({
  currentStep,
  totalSteps,
}) {
  const progress =
    (currentStep / totalSteps) * 100;

  return (
    <div className="progress-wrapper">

      <div className="progress-text">
        <span>
          Step {currentStep} of {totalSteps}
        </span>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

    </div>
  );
}

export default ProgressBar;
