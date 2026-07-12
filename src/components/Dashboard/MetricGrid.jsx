import "./MetricGrid.css";
import StatCard from "@/components/ui/StatCard";

function MetricGrid({ stats = [] }) {
  return (
    <div className="stats-grid">
      {stats.map((stat) => (
        <StatCard
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
