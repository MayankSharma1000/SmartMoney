import "./MetricCard.css";

function MetricCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendType = "neutral",
}) {
  return (
    <div className="metric-card">

      <div className="metric-card-header">

        <div className="metric-card-icon">
          {icon}
        </div>

        {trend && (
          <span className={`metric-card-trend ${trendType}`}>
            {trend}
          </span>
        )}

      </div>

      <p className="metric-card-title">
        {title}
      </p>

      <h2 className="metric-card-value">
        {value}
      </h2>

      {subtitle && (
        <p className="metric-card-subtitle">
          {subtitle}
        </p>
      )}

    </div>
  );
}

export default MetricCard;