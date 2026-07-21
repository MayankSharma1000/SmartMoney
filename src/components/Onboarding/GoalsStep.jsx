import { FaCheckCircle } from "react-icons/fa";

import Button from "../ui/Button/Button";
import StepCard from "./StepCard";

function GoalsStep({
  onFinish,
  onBack,
  loading = false,
}) {
  return (
    <StepCard>

      <div className="success-step">

        <div className="success-icon">
          <FaCheckCircle />
        </div>

        <h1>Your Workspace is Ready 🎉</h1>

        <p>
          Everything has been configured successfully.
          You're ready to start tracking your finances,
          monitor your spending and build better financial habits.
        </p>

        <div className="success-features">

          <div>✓ Dashboard Personalized</div>

          <div>✓ Analytics Enabled</div>

          <div>✓ Budget Tracking Ready</div>

          <div>✓ Savings Insights Active</div>

        </div>

        <div className="step-actions">

          <Button
            variant="secondary"
            onClick={onBack}
            disabled={loading}
          >
            Back
          </Button>

          <Button
            className="success-btn"
            loading={loading}
            onClick={onFinish}
            disabled={loading}
          >
            {loading
              ? "Setting Up..."
              : "Go To Dashboard"}
          </Button>

        </div>

      </div>

    </StepCard>
  );
}

export default GoalsStep;
