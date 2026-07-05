import React from "react";

function FinancialHealth() {

  const metrics = [
    {
      title: "Savings Strength",
      value: 91,
      color: "#22c55e"
    },
    {
      title: "Investment Growth",
      value: 67,
      color: "#3b82f6"
    },
    {
      title: "Budget Discipline",
      value: 88,
      color: "#8b5cf6"
    },
    {
      title: "Profitability",
      value: 74,
      color: "#f59e0b"
    }
  ];

  const overallHealth = Math.round(
    metrics.reduce(
      (sum, item) => sum + item.value,
      0
    ) / metrics.length
  );

  return (
    <div className="glass-card analytics-card financial-health-card">

      <div className="card-header">

        <div>

          <h2>Financial Health</h2>

          <p className="health-change">
            ▲ +7 this month
          </p>

        </div>

        <span className="health-badge">

          {overallHealth >= 80
            ? "Excellent"
            : overallHealth >= 60
            ? "Good"
            : "Needs Attention"}

        </span>

      </div>

      <div className="financial-body">

        <div className="health-score">

          <div
            className="score-ring"
            style={{
              background: `conic-gradient(
                #22c55e ${overallHealth * 3.6}deg,
                #1e293b 0deg
              )`
            }}
          >

            <div className="score-inner">

              <h1>{overallHealth}</h1>

              <p>/100</p>

            </div>

          </div>

          <h3 className="score-title">

            Overall Score

          </h3>

        </div>

        <div className="health-metrics">

          {metrics.map((item) => (

            <div
              key={item.title}
              className="metric-row"
            >

              <div className="metric-header">

                <span>{item.title}</span>

                <strong>{item.value}%</strong>

              </div>

              <div className="metric-progress">

                <div
                  className="metric-fill"
                  style={{
                    width: `${item.value}%`,
                    background: item.color
                  }}
                />

              </div>

            </div>

          ))}

          <div className="health-ai">

            <h4>

              AI Insight

            </h4>

            <p>

              Your financial score has improved by
              <strong> 7 points </strong>
              since last month.

              Your strongest area is

              <strong> Savings</strong>.

              Increasing your investment allocation by
              another 10-15% could push your score above
              <strong> 90</strong>.

            </p>

          </div>

        </div>

      </div>

    </div>
  );

}

export default FinancialHealth;