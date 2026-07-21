import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { completeOnboarding } from "../services/onboardingService";

import EmploymentStep from "../components/Onboarding/EmploymentStep";
import GoalsStep from "../components/Onboarding/GoalsStep";
import IncomeStep from "../components/Onboarding/IncomeStep";
import ProgressBar from "../components/Onboarding/ProgressBar";
import WelcomeStep from "../components/Onboarding/WelcomeStep";

function Onboarding() {
  const navigate = useNavigate();
  const { user } = useAuth();

  /*
   * Internal onboarding flow:
   *
   * 1 = Welcome
   * 2 = Income + Currency
   * 3 = Employment
   * 4 = Goals
   */
  const totalSteps = 4;

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    monthlyIncome: "",
    employmentType: "",
    currency: "INR",
  });

  const nextStep = () => {
    if (step < totalSteps) {
      setStep((previousStep) => previousStep + 1);
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep((previousStep) => previousStep - 1);
    }
  };

  const finishOnboarding = async () => {
    if (loading) {
      return;
    }

    try {
      setLoading(true);

      await completeOnboarding(formData);

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Failed to complete onboarding:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="onboarding-page">

      {/* Welcome is not counted as a setup step */}
      {step > 1 && step < 4 && (
        <ProgressBar
          currentStep={step - 1}
          totalSteps={2}
        />
      )}

      {/* Welcome */}
      {step === 1 && (
        <WelcomeStep
          userName={user?.name}
          onNext={nextStep}
        />
      )}

      {/* Step 1 of 3 — Income + Currency */}
      {step === 2 && (
        <IncomeStep
          value={formData.monthlyIncome}
          currency={formData.currency}
          onChange={(value) =>
            setFormData((previousData) => ({
              ...previousData,
              monthlyIncome: value,
            }))
          }
          onCurrencyChange={(currency) =>
            setFormData((previousData) => ({
              ...previousData,
              currency,
            }))
          }
          onBack={previousStep}
          onNext={nextStep}
        />
      )}

      {/* Step 2 of 3 — Employment */}
      {step === 3 && (
        <EmploymentStep
          value={formData.employmentType}
          onChange={(value) =>
            setFormData((previousData) => ({
              ...previousData,
              employmentType: value,
            }))
          }
          onBack={previousStep}
          onNext={nextStep}
        />
      )}

      {/* Step 3 of 3 — Goals */}
      {step === 4 && (
        <GoalsStep
          loading={loading}
          onBack={previousStep}
          onFinish={finishOnboarding}
        />
      )}

    </main>
  );
}

export default Onboarding;
