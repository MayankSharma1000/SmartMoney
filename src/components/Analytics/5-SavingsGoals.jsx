import React from "react";
import { Line } from "react-chartjs-2";

function SavingsGoals({ totalSavings }) {
  return (
    <div
      className="glass-card analytics-card"
      style={{
        padding: "32px",
        minHeight: "520px"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "28px"
        }}
      >
        <div>
          <h2>Savings Goals</h2>

          <p
            style={{
              color: "#94a3b8",
              marginTop: "6px"
            }}
          >
            Build your financial future.
          </p>
        </div>

        <div
          className="goal-badge"
        >
          68%
        </div>
      </div>

      <div
        className="analytics-hero-card"
      >
        <div>
          <p>Emergency Fund</p>

          <h1>
            ₹{totalSavings.toLocaleString("en-IN")}
          </h1>

          <span>
            Goal ₹2,00,000
          </span>
        </div>

        <div className="goal-circle">

          <div className="goal-circle-inner">

            {(
              (totalSavings / 200000) *
              100
            ).toFixed(0)}
            %

          </div>

        </div>

      </div>

      <div
        className="goal-progress"
      >
        <div
          className="goal-progress-fill"
          style={{
            width: `${Math.min(
              (totalSavings / 200000) * 100,
              100
            )}%`
          }}
        />
      </div>

      <div
        className="goal-info-grid"
      >
        <div>

          <p>Monthly Saving</p>

          <h3>₹15,000</h3>

        </div>

        <div>

          <p>Projected Finish</p>

          <h3>Oct 2026</h3>

        </div>

        <div>

          <p>Saving Streak</p>

          <h3>8 Months 🔥</h3>

        </div>

      </div>

      <div
        style={{
          height: "240px",
          marginTop: "30px"
        }}
      >
        <Line
          data={{
            labels: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun"
            ],

            datasets: [
              {
                label: "Savings",

                data: [
                  25000,
                  48000,
                  67000,
                  89000,
                  105000,
                  totalSavings
                ],

                borderColor: "#22c55e",

                backgroundColor:
                  "rgba(34,197,94,.15)",

                fill: true,

                tension: 0.4
              }
            ]
          }}

          options={{
            responsive: true,

            maintainAspectRatio: false,

            plugins: {
              legend: {
                display: false
              }
            }
          }}
        />
      </div>

    </div>
  );
}

export default SavingsGoals;