import React from "react";
import {
  FaBell,
  FaArrowTrendUp,
  FaWallet
} from "react-icons/fa6";
import { motion } from "framer-motion";

function DashboardHeader({ user }) {

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  const today = new Date().toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long"
    }
  );

  return (

    <motion.section
      className="dashboard-hero"
      initial={{ opacity:0,y:25 }}
      animate={{ opacity:1,y:0 }}
      transition={{ duration:.45 }}
    >

      <div className="hero-left">

        <span className="hero-date">

          {today}

        </span>

        <h1>

          {greeting},{" "}

          <span>

            {user?.name || "Mayank"}

          </span>

          👋

        </h1>

        <p>

          Welcome back.

          Here's what's happening with your finances today.

        </p>

      </div>

      <div className="hero-right">

        <div className="hero-stat">

          <div className="hero-stat-icon">

            <FaWallet />

          </div>

          <div>

            <small>

              Net Worth

            </small>

            <h3>

              ₹4,58,400

            </h3>

          </div>

        </div>

        <div className="hero-stat">
          <div className="hero-stat-icon">
            <FaArrowTrendUp />
          </div>

          <div>
            <small> This Month </small>

            <h3 className="positive">
              +8.4%
            </h3>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default DashboardHeader;