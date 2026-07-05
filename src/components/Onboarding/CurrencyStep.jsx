import React from "react";
import {
  FaRupeeSign,
  FaDollarSign,
  FaEuroSign,
  FaPoundSign
} from "react-icons/fa";

import Button from "../ui/Button/Button";
import StepCard from "./StepCard";

const currencies = [
  {
    code: "INR",
    name: "Indian Rupee",
    symbol: <FaRupeeSign />,
    flag: "🇮🇳"
  },
  {
    code: "USD",
    name: "US Dollar",
    symbol: <FaDollarSign />,
    flag: "🇺🇸"
  },
  {
    code: "EUR",
    name: "Euro",
    symbol: <FaEuroSign />,
    flag: "🇪🇺"
  },
  {
    code: "GBP",
    name: "British Pound",
    symbol: <FaPoundSign />,
    flag: "🇬🇧"
  }
];

function CurrencyStep({
  value,
  onChange,
  onBack,
  onNext
}) {
  return (
    <StepCard>

      <div className="step-content">

        <h1>Choose Your Currency</h1>

        <p>
          Select the currency you use most often.
          You can change it later from Settings.
        </p>

        <div className="currency-grid">

          {currencies.map((currency) => (

            <div
              key={currency.code}
              className={`currency-card ${
                value === currency.code ? "active" : ""
              }`}
              onClick={() => onChange(currency.code)}
            >

              <div className="currency-flag">
                {currency.flag}
              </div>

              <div className="currency-symbol">
                {currency.symbol}
              </div>

              <h3>{currency.code}</h3>

              <span>{currency.name}</span>

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

export default CurrencyStep;