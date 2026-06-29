import React from "react";

function AIFinancialCoach() {

  return (

    <section className="analytics-card ai-coach">

      <div className="coach-top">

        <div>

          <span className="coach-tag">

            AI FINANCIAL COACH

          </span>

          <h2>

            Good Evening, Mayank 👋

          </h2>

          <p>

            Based on your latest spending,
            savings and investments.

          </p>

        </div>

        <div className="coach-score">

          <span>Health</span>

          <h1>86</h1>

          <small>/100</small>

        </div>

      </div>

      <div className="coach-middle">

        <div>

          <p>Prediction</p>

          <h1>

            ₹18,450

          </h1>

          <span>

            Expected Monthly Savings

          </span>

        </div>

        <div>

          <p>Confidence</p>

          <h1>92%</h1>

          <span>

            AI Confidence Score

          </span>

        </div>

      </div>

      <div className="coach-suggestions">

        <div>

          ✓ Food spending increased by 18%

        </div>

        <div>

          ✓ Fuel spending decreased by 6%

        </div>

        <div>

          ✓ Emergency fund is growing steadily

        </div>

        <div>

          ✓ Budget discipline is excellent

        </div>

      </div>

      <button className="coach-button">

        Generate Full AI Report →

      </button>

    </section>

  );

}

export default AIFinancialCoach;