import { fadeUp } from "@/utils/animations";
import { motion } from "framer-motion";
import "./DashboardHeader.css";

import {
  FaChartLine,
  FaWallet,
} from "react-icons/fa6";

function DashboardHeader({
  user,
  dashboardData,
  currency = "INR",
}) {
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
    month: "long",
    year: "numeric",
  });

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });

  const name =
    user?.name?.trim() ||
    user?.email?.split("@")[0] ||
    "there";

  const totalExpenses =
    Number(dashboardData?.totalExpenses) || 0;

  const totalSavings =
    Number(dashboardData?.totalSavings) || 0;

  const investmentValue =
    Number(dashboardData?.currentInvestmentValue) || 0;

  const netWorth =
    totalSavings + investmentValue;

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
            <span>{name}</span>
            {" "}👋
          </h1>

          <p>
            Welcome back. Here's a clear overview of
            your finances today.
          </p>
        </div>

        <motion.div
          className="wallet-card"
          whileHover={{
            y: -4,
          }}
          transition={{
            duration: 0.2,
          }}
        >
          <div className="wallet-top">
            <div className="wallet-icon">
              <FaWallet />
            </div>

            <span>
              Net Worth
            </span>
          </div>

          <h2>
            {formatter.format(netWorth)}
          </h2>

          <p>
            Savings + Investments
          </p>

          <div className="wallet-growth">
            <FaChartLine />

            <span>
              Based on your current financial data
            </span>
          </div>
        </motion.div>
      </div>

      <div className="hero-kpis">
        <div className="hero-kpi">
          <span>Expenses</span>

          <h3>
            {formatter.format(totalExpenses)}
          </h3>
        </div>

        <div className="hero-kpi">
          <span>Savings</span>

          <h3>
            {formatter.format(totalSavings)}
          </h3>
        </div>

        <div className="hero-kpi">
          <span>Investments</span>

          <h3>
            {formatter.format(investmentValue)}
          </h3>
        </div>

        <div className="hero-kpi">
          <span>Net Worth</span>

          <h3>
            {formatter.format(netWorth)}
          </h3>
        </div>
      </div>
    </motion.section>
  );
}

export default DashboardHeader;
