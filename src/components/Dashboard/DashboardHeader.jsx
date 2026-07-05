import React from "react";
import { FaBell } from "react-icons/fa";
import { motion } from "framer-motion";

function DashboardHeader({ user }) {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  }

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });

  return (
    <motion.header
      className="dashboard-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="dashboard-header-content">
        <span className="dashboard-date">
          📅 {today}
        </span>

        <h1 className="dashboard-title">
          {greeting},{" "}
          <span className="dashboard-user">
            {user?.name || "Mayank"}
          </span>{" "}
          👋
        </h1>

        <p className="dashboard-subtitle">
          Track your spending, monitor your investments, and grow your wealth —
          all from one place.
        </p>
      </div>

      <button
        className="notification-btn"
        aria-label="Notifications"
      >
        <FaBell />
      </button>
    </motion.header>
  );
}

export default DashboardHeader;