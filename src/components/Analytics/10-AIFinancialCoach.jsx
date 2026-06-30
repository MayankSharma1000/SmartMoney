import React from "react";

function AIFinancialCoach({ analytics }) {

  const prediction = analytics?.prediction || {};

  const insights = analytics?.insights || [];

  const health =
    analytics?.financialHealthScore || 0;

  const healthLabel =
    analytics?.financialHealthLabel || "Unknown";

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
            savings and investment activity.

          </p>

        </div>

        <div className="coach-score">

          <span>

            {healthLabel}

          </span>

          <h1>

            {health}

          </h1>

          <small>

            /100

          </small>

        </div>

      </div>

      <div className="coach-middle">

        <div>

          <p>

            Predicted Savings

          </p>

          <h1>

            ₹{prediction.predictedSavings?.toLocaleString("en-IN") || 0}

          </h1>

          <span>

            Expected Next Month

          </span>

        </div>

        <div>

          <p>

            Emergency Fund

          </p>

          <h1>

            {prediction.monthsRemaining ?? "--"}

          </h1>

          <span>

            Months Remaining

          </span>

        </div>

      </div>

      <div className="coach-suggestions">

        {insights.length > 0 ? (

          insights.map((item, index) => (

            <div key={index}>

              <strong>

                {item.title}

              </strong>

              <p>

                {item.message}

              </p>

            </div>

          ))

        ) : (

          <div>

            <strong>

              No Insights Yet

            </strong>

            <p>

              Add more expenses, savings and
              investments to receive
              personalized AI recommendations.

            </p>

          </div>

        )}

      </div>

      <button className="coach-button">

        Generate Full AI Report →

      </button>

    </section>

  );

}

export default AIFinancialCoach;