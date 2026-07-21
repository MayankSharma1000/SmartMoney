import React from "react";

function SavingsGoals({
  totalSavings = 0,
  currency = "INR",
}) {
  const savings = Number(totalSavings) || 0;

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });

  return (
    <section className="analytics-card savings-goals-card">
      <div className="analytics-section-header">
        <div>
          <h2>Savings Overview</h2>

          <p>
            Your current recorded savings.
          </p>
        </div>
      </div>

      <div className="analytics-hero-card">
        <div>
          <p>Total Savings</p>

          <h1>
            {formatter.format(savings)}
          </h1>

          <span>
            Based on your recorded financial data
          </span>
        </div>
      </div>

      {savings <= 0 && (
        <div className="analytics-empty-state">
          <h3>No savings recorded yet</h3>

          <p>
            Add a savings goal or record your savings
            to start tracking progress here.
          </p>
        </div>
      )}
    </section>
  );
}

export default SavingsGoals;
