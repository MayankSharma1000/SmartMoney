import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { completeOnboarding } from "../services/onboardingService";
import { useAuth } from "../context/AuthContext";

import ProgressBar from "../components/Onboarding/ProgressBar";
import WelcomeStep from "../components/Onboarding/WelcomeStep";
import IncomeStep from "../components/Onboarding/IncomeStep";
import EmploymentStep from "../components/Onboarding/EmploymentStep";
import CurrencyStep from "../components/Onboarding/CurrencyStep";
import GoalsStep from "../components/Onboarding/GoalsStep";

function Onboarding() {
  const navigate = useNavigate();

  const totalSteps = 5;

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    monthlyIncome: "",
    employmentType: "",
    currency: "INR"
  });

  const nextStep = async () => {
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
      return;
    }
  
    try {
      setLoading(true);
      await completeOnboarding(formData);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };
  const { user } = useAuth();

  return (
    <main className="onboarding-page">

      {step > 1 && step < 6 && (
        <ProgressBar
          currentStep={step - 1}
          totalSteps={4}
        />
      )}

      {step === 1 && (
        <WelcomeStep
        userName={user?.name}
          onNext={nextStep}
        />
      )}

      {step === 2 && (
        <IncomeStep
          value={formData.monthlyIncome}
          onChange={(value) =>
            setFormData({
              ...formData,
              monthlyIncome: value
            })
          }
          onBack={previousStep}
          onNext={nextStep}
        />
      )}

      {step === 3 && (
        <EmploymentStep
          value={formData.employmentType}
          onChange={(value) =>
            setFormData({
              ...formData,
              employmentType: value
            })
          }
          onBack={previousStep}
          onNext={nextStep}
        />
      )}

      {step === 4 && (
        <CurrencyStep
          value={formData.currency}
          onChange={(value) =>
            setFormData({
              ...formData,
              currency: value
            })
          }
          onBack={previousStep}
          onNext={nextStep}
        />
      )}

      {step === 5 && (
        <GoalsStep
          loading={loading}
          onFinish={nextStep}
        />
      )}

    </main>
  );
}

export default Onboarding;