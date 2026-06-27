import React from "react";
import { Doughnut } from "react-chartjs-2";

function InvestmentOverview({
  totalSavings,
  currentInvestmentValue,
  investmentProfit,
  liabilities
}) {
  const netWorth =
    totalSavings +
    currentInvestmentValue -
    liabilities;

  const roi =
    currentInvestmentValue > 0
      ? (
          (investmentProfit /
            currentInvestmentValue) *
          100
        ).toFixed(2)
      : 0;

  return (
    <div
      className="glass-card analytics-card"
      style={{
        padding: "32px"
      }}
    >
      <div
        className="investment-header"
      >
        <div>
          <h2>Investment Portfolio</h2>

          <p>
            Wealth Tracking & Asset Allocation
          </p>
        </div>

        <span className="live-dot">
          ● Live
        </span>
      </div>

      <div className="portfolio-grid">

        <div className="portfolio-stat">
          <p>Portfolio Value</p>

          <h2>
            ₹
            {currentInvestmentValue.toLocaleString(
              "en-IN"
            )}
          </h2>
        </div>

        <div className="portfolio-stat">
          <p>Total Profit</p>

          <h2
            style={{
              color:"#22c55e"
            }}
          >
            ₹
            {investmentProfit.toLocaleString(
              "en-IN"
            )}
          </h2>
        </div>

        <div className="portfolio-stat">
          <p>ROI</p>

          <h2>
            {roi}%
          </h2>
        </div>

      </div>

      <div
        className="networth-card"
      >

        <div className="networth-left">

          <h3>Net Worth</h3>

          <h1>
            ₹
            {netWorth.toLocaleString(
              "en-IN"
            )}
          </h1>

          <div className="asset-row">

            <span>
              Savings
            </span>

            <strong>
              ₹
              {totalSavings.toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>

          <div className="asset-row">

            <span>
              Investments
            </span>

            <strong>
              ₹
              {currentInvestmentValue.toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>

          <div className="asset-row">

            <span>
              Liabilities
            </span>

            <strong
              style={{
                color:"#ef4444"
              }}
            >
              ₹
              {liabilities.toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>

        </div>

        <div
          style={{
            width:"260px",
            height:"260px"
          }}
        >
          <Doughnut

            data={{
              labels:[
                "Savings",
                "Investments",
                "Liabilities"
              ],

              datasets:[
                {

                  data:[
                    totalSavings,
                    currentInvestmentValue,
                    liabilities
                  ],

                  backgroundColor:[
                    "#22c55e",
                    "#3b82f6",
                    "#ef4444"
                  ],

                  borderWidth:0

                }
              ]
            }}

            options={{
              cutout:"72%",

              plugins:{
                legend:{
                  position:"bottom"
                }
              }
            }}

          />
        </div>

      </div>

      <div className="projection-grid">

        <div>
          <p>Today</p>

          <h3>
            ₹
            {netWorth.toLocaleString("en-IN")}
          </h3>
        </div>

        <div>
          <p>3 Months</p>

          <h3>₹1.55L</h3>
        </div>

        <div>
          <p>6 Months</p>

          <h3>₹1.92L</h3>
        </div>

        <div>
          <p>1 Year</p>

          <h3>₹2.65L</h3>
        </div>

      </div>

    </div>
  );
}

export default InvestmentOverview;