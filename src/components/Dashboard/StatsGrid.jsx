import React from "react";
import "./StatsGrid.css";
import { motion } from "framer-motion";

function StatsGrid({ stats }) {
  return (
    <div className="stats-grid">

      {stats.map((stat, index) => (

        <motion.div
          className="stat-card"
          key={stat.title}
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{
            y: -6,
            transition: { duration: 0.18 }
          }}
          transition={{
            delay: index * 0.08,
            duration: 0.35
          }}
        >

          <div className="stat-header">

            <p className="stat-title">
              {stat.title}
            </p>

            <div className="stat-icon">
              {stat.icon}
            </div>

          </div>

          <h2 className="stat-value">
            {stat.value}
          </h2>

          <p className="stat-growth">
            {stat.growth}
          </p>

        </motion.div>

      ))}

    </div>
  );
}

export default StatsGrid;