import React from "react";
import { useEffect, useState } from "react";

function AnalyticsFooter() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const now = new Date();

    setTime(
      now.toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short"
      })
    );
  }, []);

  return (
    <footer className="analytics-footer">

      <div className="footer-profile">

        <div className="profile-avatar">
          MS
        </div>

        <div>

          <h3>Mayank Sharma</h3>

          <p>Full Stack Developer</p>

        </div>

      </div>

      <div className="analytics-footer-badges">
        <div className="footer-badge secure">
          🔒 AES-256 Encrypted
        </div>

        <div className="footer-badge cloud">
          ☁ Cloud Synced
        </div>
      </div>

      <div className="footer-right">

        <p>Updated</p>

        <strong>{time}</strong>

        <span>Expense Tracker v2.0</span>

      </div>

    </footer>
  );
}

export default AnalyticsFooter;