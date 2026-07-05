import React from "react";
import {
  FaUserGraduate,
  FaBriefcase,
  FaBuilding,
  FaLaptopCode,
  FaUmbrellaBeach,
  FaUser
} from "react-icons/fa";

import Button from "../ui/Button/Button";
import StepCard from "./StepCard";

const employmentOptions = [
  {
    title: "Salaried",
    subtitle: "Full-time employee",
    icon: <FaBriefcase />
  },
  {
    title: "Student",
    subtitle: "Learning & Growing",
    icon: <FaUserGraduate />
  },
  {
    title: "Business",
    subtitle: "Business Owner",
    icon: <FaBuilding />
  },
  {
    title: "Freelancer",
    subtitle: "Flexible Income",
    icon: <FaLaptopCode />
  },
  {
    title: "Retired",
    subtitle: "Post Career",
    icon: <FaUmbrellaBeach />
  },
  {
    title: "Other",
    subtitle: "Custom Option",
    icon: <FaUser />
  }
];

function EmploymentStep({
  value,
  onChange,
  onBack,
  onNext
}) {
  return (
    <StepCard>
      <div className="step-content">

        <div className="step-icon">
          <FaBriefcase />
        </div>

        <h1>Employment Type</h1>

        <p>
          Select what best describes your current employment.
          We'll personalize your financial insights accordingly.
        </p>

        <div className="employment-grid">

          {employmentOptions.map((option) => (
            <div
              key={option.title}
              className={`employment-card ${
                value === option.title ? "active" : ""
              }`}
              onClick={() => onChange(option.title)}
            >
              <div className="employment-icon">
                {option.icon}
              </div>

              <h3>{option.title}</h3>

              <span>{option.subtitle}</span>
            </div>
          ))}

        </div>

        <div className="step-actions">

          <Button
            variant="secondary"
            onClick={onBack}
          >
            Back
          </Button>

          <Button
            disabled={!value}
            onClick={onNext}
          >
            Continue
          </Button>

        </div>

      </div>
    </StepCard>
  );
}

export default EmploymentStep;