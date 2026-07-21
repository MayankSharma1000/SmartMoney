function AIFinancialCoach({
  user,
  dashboardData,
}) {
  const insights =
    dashboardData?.insights || [];

  const health =
    dashboardData?.financialHealthScore || 0;

  const healthLabel =
    dashboardData?.financialHealthLabel ||
    "Not enough data";

  const name =
    user?.name?.trim() || "there";

  const hasFinancialActivity =
    (dashboardData?.expenseCount || 0) > 0 ||
    (dashboardData?.savingsGoalCount || 0) > 0 ||
    (dashboardData?.investmentCount || 0) > 0;

  return (
    <section className="analytics-card ai-coach">
      <div className="coach-top">
        <div>
          <span className="coach-tag">
            SMART FINANCIAL INSIGHTS
          </span>

          <h2>
            Financial overview for {name}
          </h2>

          <p>
            Insights generated from your
            recorded spending, savings and
            investment data.
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

      <div className="coach-suggestions">
        {insights.length > 0 ? (
          insights.map(
            (item, index) => (
              <div key={`${item.title}-${index}`}>
                <strong>
                  {item.title}
                </strong>

                <p>
                  {item.message}
                </p>
              </div>
            )
          )
        ) : (
          <div>
            <strong>
              {hasFinancialActivity
                ? "No Additional Insights"
                : "No Financial Activity Yet"}
            </strong>

            <p>
              {hasFinancialActivity
                ? "Continue tracking your finances to build a more complete financial picture."
                : "Add expenses, savings goals or investments to begin generating personalized financial insights."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default AIFinancialCoach;
