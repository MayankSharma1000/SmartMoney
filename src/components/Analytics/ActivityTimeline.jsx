
function ActivityTimeline({
  activities = [],
  currency = "INR",
}) {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });

  const hasActivities =
    Array.isArray(activities) &&
    activities.length > 0;

  return (
    <section className="analytics-card activity-card">
      <div className="activity-header">
        <div>
          <h2>Recent Activity</h2>

          <p>
            Your latest recorded financial activity.
          </p>
        </div>
      </div>

      {!hasActivities ? (
        <div className="analytics-empty-state">
          <h3>No recent activity</h3>

          <p>
            Your latest expenses, savings and
            investments will appear here.
          </p>
        </div>
      ) : (
        <div className="activity-list">
          {activities.map((item, index) => {
            const amount =
              Number(item?.amount) || 0;

            return (
              <div
                key={item?._id || index}
                className="activity-item"
              >
                <div className="activity-content">
                  <h4>
                    {item?.title ||
                      "Financial Activity"}
                  </h4>

                  {item?.subtitle && (
                    <p>
                      {item.subtitle}
                    </p>
                  )}
                </div>

                <div className="activity-right">
                  <strong>
                    {amount > 0 ? "+" : ""}
                    {formatter.format(amount)}
                  </strong>

                  {item?.time && (
                    <span>
                      {item.time}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default ActivityTimeline;
