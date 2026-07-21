import {
  FaDollarSign,
  FaEuroSign,
  FaMoneyBillWave,
  FaPoundSign,
  FaRupeeSign,
} from "react-icons/fa";

import Button from "../ui/Button/Button";
import StepCard from "./StepCard";

const currencies = [
  {
    code: "INR",
    name: "Indian Rupee",
    symbol: "₹",
    icon: <FaRupeeSign />,
  },
  {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    icon: <FaDollarSign />,
  },
  {
    code: "EUR",
    name: "Euro",
    symbol: "€",
    icon: <FaEuroSign />,
  },
  {
    code: "GBP",
    name: "British Pound",
    symbol: "£",
    icon: <FaPoundSign />,
  },
];

function IncomeStep({
  value,
  currency,
  onChange,
  onCurrencyChange,
  onNext,
  onBack,
}) {
  const selectedCurrency =
    currencies.find(
      (item) => item.code === currency
    ) || currencies[0];

  const isValid =
    Number(value) > 0 && Boolean(currency);

  return (
    <StepCard>

      <div className="step-content">

        <div className="step-icon">
          <FaMoneyBillWave />
        </div>

        <h1>Income & Currency</h1>

        <p>
          Tell us your monthly income and preferred
          currency so SmartMoney can personalize your
          financial dashboard.
        </p>

        <div className="currency-selection">

          <label>
            Preferred Currency
          </label>

          <div className="currency-grid">

            {currencies.map((item) => (
              <button
                key={item.code}
                type="button"
                className={`currency-card ${
                  currency === item.code
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  onCurrencyChange(item.code)
                }
              >
                <div className="currency-symbol">
                  {item.icon}
                </div>

                <div>
                  <strong>{item.code}</strong>
                  <span>{item.name}</span>
                </div>
              </button>
            ))}

          </div>

        </div>

        <div className="income-section">

          <label htmlFor="monthly-income">
            Monthly Income
          </label>

          <div className="income-input">

            <span>
              {selectedCurrency.symbol}
            </span>

            <input
              id="monthly-income"
              type="number"
              min="0"
              step="1"
              inputMode="decimal"
              placeholder="Enter monthly income"
              value={value}
              onChange={(event) =>
                onChange(event.target.value)
              }
            />

          </div>

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
