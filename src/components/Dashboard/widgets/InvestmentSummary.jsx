import Card from "@/components/ui/Card";

import "@/styles/dashboard/financial-widget.css";
import "./InvestmentSummary.css";

import { FaArrowTrendUp } from "react-icons/fa6";

function InvestmentSummary({
  portfolioValue = 0,
  investedAmount = 0,
  currency = "INR",
}) {
  const currentValue =
    Number(portfolioValue) || 0;

  const invested =
    Number(investedAmount) || 0;

  const profit =
    currentValue - invested;

  const returns =
    invested > 0
      ? (profit / invested) * 100
      : 0;

  const formatter = new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }
  );

  const hasInvestments =
    invested > 0 || currentValue > 0;

  const progress = hasInvestments
    ? Math.min(Math.max(Math.abs(returns), 0), 100)
    : 0;

  return (
    <Card
      elevated
      className="financial-widget investment-card"
    >
      <div className="widget-header">
        <div className="investment-icon">
          <FaArrowTrendUp />
        </div>

        <div className="widget-heading">
          <h3 className="widget-title">
            Investment Portfolio
          </h3>

          <p className="widget-subtitle">
            Track your invested capital and current value
          </p>

          {hasInvestments && (
            <span
              className={`widget-pill ${
                profit >= 0 ? "success" : ""
              }`}
            >
              {profit > 0
                ? "Growing"
                : profit < 0
                  ? "Down"
                  : "Stable"}
            </span>
          )}
        </div>
      </div>

      <div className="widget-value">
        {formatter.format(currentValue)}
      </div>

      {!hasInvestments ? (
        <div className="widget-empty-state">
          <p>
            No investments added yet.
          </p>

          <span>
            Add your first investment to start
            tracking portfolio performance.
          </span>
        </div>
      ) : (
        <>
          <div className="widget-progress-wrapper">
            <div className="widget-progress">
              <div
                className="investment-progress-fill"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <div className="widget-progress-info">
              <span>
                {returns.toFixed(1)}% Return
              </span>

              <span>
                {profit > 0
                  ? "Positive Growth"
                  : profit < 0
                    ? "Negative Return"
                    : "No Change"}
              </span>
            </div>
          </div>

          <div className="widget-metrics">
            <div className="widget-metric">
              <span className="widget-metric-label">
                Invested
              </span>

              <strong className="widget-metric-value">
                {formatter.format(invested)}
              </strong>
            </div>

            <div className="widget-metric">
              <span className="widget-metric-label">
                Profit / Loss
              </span>

              <strong className="widget-metric-value">
                {profit > 0 ? "+" : ""}
                {formatter.format(profit)}
              </strong>
            </div>
          </div>

          <div className="widget-footer">
            Performance is calculated from your
            recorded investment data.
          </div>
        </>
      )}
    </Card>
  );
}

export default InvestmentSummary;
