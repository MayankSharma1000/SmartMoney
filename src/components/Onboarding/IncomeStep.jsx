import React from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import Button from "../ui/Button/Button";
import StepCard from "./StepCard";

function IncomeStep({
  value,
  onChange,
  onNext,
  onBack
}) {
  const isValid = Number(value) > 0;

  return (
    <StepCard>
      <div className="step-content">

        <div className="step-icon">
          <FaMoneyBillWave />
        </div>

        <h1>Monthly Income</h1>

        <p>
          Your monthly income helps us calculate your savings
          rate, financial health score and budget recommendations.
        </p>

        <div className="income-input">

          <span>₹</span>

          <input
            type="number"
            placeholder="50,000"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />

        </div>

        <div className="income-hints">

          <div>✓ Savings Rate</div>

          <div>✓ Budget Planning</div>

          <div>✓ Financial Health</div>

        </div>

        <div className="step-actions">

          <Button
            variant="secondary"
            onClick={onBack}
          >
            Back
          </Button>

          <Button
            onClick={onNext}
            disabled={!isValid}
          >
            Continue
          </Button>

        </div>

      </div>
    </StepCard>
  );
}

export default IncomeStep;