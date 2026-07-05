import React from "react";
import { FaWallet } from "react-icons/fa";
import Button from "../ui/Button/Button";
import StepCard from "./StepCard";

function WelcomeStep({ onNext, userName }) {
  return (
    <StepCard>
      <div className="welcome-step">

        <div className="welcome-icon">
          <FaWallet />
        </div>

        <h1>
          Welcome{userName ? `, ${userName}` : ""} 👋
        </h1>

        <p>
          Let's build your personal financial workspace.
          In less than a minute we'll customize your dashboard
          so your insights are accurate from day one.
        </p>

        <div className="welcome-points">
          <div>✓ Track Expenses</div>
          <div>✓ Build Savings</div>
          <div>✓ Monitor Investments</div>
          <div>✓ Get Smart Insights</div>
        </div>

        <Button
          className="onboarding-btn"
          onClick={onNext}
        >
          Let's Get Started
        </Button>

      </div>
    </StepCard>
  );
}

export default WelcomeStep;