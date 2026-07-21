function FinancialHealth({ dashboardData }) {
  const overallHealth =
    Number(dashboardData?.financialHealthScore) || 0;

  const healthLabel =
    dashboardData?.financialHealthLabel ||
    (overallHealth >= 85
      ? "Excellent"
      : overallHealth >= 70
      ? "Good"
      : overallHealth >= 50
      ? "Average"
      : "Needs Attention");

  const breakdown =
    dashboardData?.healthBreakdown || {};

  const clamp = (value) =>
    Math.max(
      0,
      Math.min(100, Number(value) || 0)
    );

  const metrics = [
    {
      title: "Savings Strength",
      value: clamp(breakdown.savingsStrength),
      color: "#22c55e"
    },
    {
      title: "Investment Strength",
      value: clamp(breakdown.investmentStrength),
      color: "#3b82f6"
    },
    {
      title: "Budget Discipline",
      value: clamp(breakdown.budgetDiscipline),
      color: "#8b5cf6"
    },
    {
      title: "Profitability",
      value: clamp(breakdown.profitabilityScore),
      color: "#f59e0b"
    }
  ];

  const strongestMetric = metrics.reduce(
    (strongest, current) =>
      current.value > strongest.value
        ? current
        : strongest,
    metrics[0]
  );

  const weakestMetric = metrics.reduce(
    (weakest, current) =>
      current.value < weakest.value
        ? current
        : weakest,
    metrics[0]
  );

  const hasFinancialData =
    Number(dashboardData?.totalExpenses || 0) > 0 ||
    Number(dashboardData?.totalSavings || 0) > 0 ||
    Number(
      dashboardData?.currentInvestmentValue || 0
    ) > 0;

  return (
    <div className="glass-card analytics-card financial-health-card">
      <div className="card-header">
        <div>
          <h2>Financial Health</h2>

          <p className="health-change">
            Based on your current financial data
          </p>
        </div>

        <span className="health-badge">
          {healthLabel}
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

                <strong>
                  {Math.round(item.value)}%
                </strong>
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
            <h4>Financial Insight</h4>

            {hasFinancialData ? (
              <p>
                Your current financial health score is{" "}
                <strong>
                  {overallHealth}/100
                </strong>
                . Your strongest area is{" "}
                <strong>
                  {strongestMetric.title}
                </strong>
                . Focus on improving{" "}
                <strong>
                  {weakestMetric.title}
                </strong>{" "}
                to strengthen your overall financial
                position.
              </p>
            ) : (
              <p>
                Add expenses, savings and investments
                to generate a meaningful financial
                health assessment.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinancialHealth;
