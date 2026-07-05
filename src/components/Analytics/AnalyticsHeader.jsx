import React from "react";
import Button from "../ui/Button/Button";
/* ========================================= */
/* COMPONENT */
/* ========================================= */

function AnalyticsHeader() {
  return (
    <section className="page-header">

      {/* LEFT SIDE */}

      <div className="page-header-content">

        <span className="page-greeting">
          Good Evening, Mayank 👋
        </span>

        <h1 className="page-title">
          Financial Analytics
        </h1>

        <p className="page-subtitle">
          Here's your financial overview for today.
          Analyze expenses, savings, investments and
          your overall financial health.
        </p>

      </div>

      {/* RIGHT SIDE */}

      <div className="page-header-actions">

        <Button className="analytics-date-btn">

          <span>📅</span>

          <div className="date-content">

            <small>Selected Period</small>

            <strong>May 1 – May 31, 2026</strong>

          </div>

          <span className="dropdown-icon">
            ▼
          </span>

        </Button>

      </div>

    </section>
  );
}

export default AnalyticsHeader;