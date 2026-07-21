function AnalyticsHeader({
  user,
  period,
}) {
  const hour =
    new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  }

  const name =
    user?.name?.trim() || "there";

  const currentDate =
    new Date().toLocaleDateString(
      undefined,
      {
        month: "long",
        year: "numeric",
      }
    );

  const selectedPeriod =
    period?.month && period?.year
      ? `${period.month} ${period.year}`
      : currentDate;

  return (
    <section className="page-header">
      <div className="page-header-content">
        <span className="page-greeting">
          {greeting}, {name} 👋
        </span>

        <h1 className="page-title">
          Financial Analytics
        </h1>

        <p className="page-subtitle">
          Review your spending, savings,
          investments and overall financial
          position.
        </p>
      </div>

      <div className="page-header-actions">
        <div className="analytics-date-btn">
          <div className="date-content">
            <small>Current Period</small>

            <strong>
              {selectedPeriod}
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AnalyticsHeader;
