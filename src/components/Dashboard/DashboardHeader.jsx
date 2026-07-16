import { fadeUp } from "@/utils/animations";
import { motion } from "framer-motion";
import "./DashboardHeader.css";

import {
  FaArrowTrendUp,
  FaShieldHeart,
  FaWallet,
} from "react-icons/fa6";

function DashboardHeader({
  user,
  dashboardData,
}) {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const score =
    dashboardData?.financialHealthScore ?? 92;

  const currency =
    user?.currency || "INR";

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });

  const netWorth =
    dashboardData?.currentInvestmentValue || 0;

  return (
    <motion.section
      className="dashboard-hero"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      <div className="hero-content">

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
            Your finances are looking healthier today.
          </p>

          <div className="financial-score">

            <FaShieldHeart />

            <span>
              Financial Score
            </span>

            <strong>
              {score}/100
            </strong>

          </div>

        </div>

        <motion.div
          whileHover={{
            y: -6,
            scale: 1.02,
          }}
          transition={{
            duration: 0.25,
          }}
          className="wallet-card"
        >
          <div className="wallet-top">

            <div className="wallet-icon">
              <FaWallet />
            </div>

            <span>
              Primary Wallet
            </span>

          </div>

          <h2>
            {formatter.format(netWorth)}
          </h2>

          <p>
            {currency}
          </p>

          <div className="wallet-growth">

            <FaArrowTrendUp />

            <span>
              +8.4% this month
            </span>

          </div>

        </motion.div>

      </div>

      <div className="hero-kpis">

      <div className="hero-kpi">
          <span>Expenses</span>
          <h3>
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency,
              maximumFractionDigits: 0,
            }).format(dashboardData?.totalExpenses || 0)}
          </h3>
        </div>

        <div className="hero-kpi">
          <span>Savings</span>
          <h3>
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency,
              maximumFractionDigits: 0,
            }).format(dashboardData?.totalSavings || 0)}
          </h3>
        </div>

        <div className="hero-kpi">
          <span>Investments</span>
          <h3>
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency,
              maximumFractionDigits: 0,
            }).format(dashboardData?.currentInvestmentValue || 0)}
          </h3>
        </div>

        <div className="hero-kpi">
          <span>Health Score</span>
          <h3>
            {dashboardData?.financialHealthScore || 0}/100
          </h3>
        </div>

      </div>

    </motion.section>
  );
}

export default DashboardHeader;
