import "./MetricGrid.css";
import MetricCard from "@/components/shared/MetricCard";

function MetricGrid({ stats = [] }) {
  return (
    <div className="stats-grid">
      {stats.map((stat) => (
        <MetricCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          subtitle={stat.growth}
          icon={stat.icon}
          trend={stat.trend}
          trendType={stat.trendType}
        />
      ))}
    </div>
  );
}

export default MetricGrid;