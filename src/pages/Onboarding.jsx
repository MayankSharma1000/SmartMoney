import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button/Button";
import { completeOnboarding } from "../services/onboardingService";

function Onboarding() {

    const navigate = useNavigate();

    const [step, setStep] = useState(0);

    const [formData, setFormData] = useState({

        monthlyIncome: "",

        currency: "INR",

        employmentType: ""

    });

    const handleNext = async () => {

        if (step < 3) {

            setStep(step + 1);

            return;

        }

        await completeOnboarding(formData);

        navigate("/dashboard");

    };

    return (
        <div>
            {step === 0 && (
                <div>
                    <h1>Welcome 👋</h1>
                    <p>
                        Let's personalize your financial workspace.
                    </p>

                    <Button onClick={handleNext}>
                        Continue
                    </Button>
                </div>
            )}

            {step === 1 && (
                <div>
                    <h2>
                        Monthly Income
                    </h2>
                    <input
                        type="number"
                        value={formData.monthlyIncome}
                        onChange={(e)=>
                            setFormData({
                                ...formData,
                                monthlyIncome:e.target.value
                            })
                        }
                    />

                    <Button onClick={handleNext}>
                        Continue
                    </Button>
                </div>
            )}

            {step === 2 && (
                <div>
                    <h2>Currency</h2>
                    <select
                        value={formData.currency}

                        onChange={(e)=>
                            setFormData({
                                ...formData,
                                currency:e.target.value
                            })
                        }
                    >
                        <option>INR</option>
                        <option>USD</option>
                        <option>EUR</option>
                        <option>GBP</option>
                    </select>

                    <Button onClick={handleNext}>
                        Continue
                    </Button>
                </div>
            )}

            {step === 3 && (
                <div>
                    <h2>
                        Employment
                    </h2>

                    <select
                        value={formData.employmentType}
                        onChange={(e)=>

                            setFormData({
                                ...formData,
                                employmentType:e.target.value
                            })
                        }
                    >
                        <option value="">
                            Select
                        </option>

                        <option>Salaried</option>
                        <option>Student</option>
                        <option>Business</option>
                        <option>Freelancer</option>
                        <option>Other</option>
                    </select>

                    <Button onClick={handleNext}>
                        Finish
                    </Button>

                </div>
            )}
        </div>
    );
}

export default Onboarding;