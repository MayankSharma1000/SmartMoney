import "./MetricCard.css";

function MetricCard({
    title,
    value,
    subtitle,
    icon,
    trend,
    trendType = "positive",
    onClick
}) {
    return (
        <article
            className="metric-card"
            onClick={onClick}
        >
            <div className="metric-header">

                <div className="metric-icon">
                    {icon}
                </div>

                {trend && (
                    <span
                        className={`metric-trend ${trendType}`}
                    >
                        {trend}
                    </span>
                )}

            </div>

            <div className="metric-content">

                <p className="metric-title">
                    {title}
                </p>

                <h2 className="metric-value">
                    {value}
                </h2>

                {subtitle && (
                    <span className="metric-subtitle">
                        {subtitle}
                    </span>
                )}

            </div>

        </article>
    );
}

export default MetricCard;