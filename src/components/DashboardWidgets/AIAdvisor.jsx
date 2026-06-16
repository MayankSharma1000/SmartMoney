import React from "react";
import { FaRobot } from "react-icons/fa";

function AIAdvisor({
  advice = [],
  loading = false
}) {
  return (
    <div className="glass-card ai-advisor-card">
      <div className="ai-advisor-header">
        <div className="ai-advisor-icon">
          <FaRobot />
        </div>

        <div>
          <h3>AI Financial Advisor</h3>

          <p className="ai-advisor-subtitle">
            Personalized recommendations based on your spending habits
          </p>
        </div>
      </div>

      {loading ? (
        <div className="ai-loading">
          Generating smart recommendations...
        </div>
      ) : advice.length === 0 ? (
        <div className="ai-empty-state">
          Add expenses, savings and investments to generate AI insights.
        </div>
      ) : (
        <div className="ai-advisor-list">
          {advice.map((item, index) => (
            <div
              key={index}
              className="ai-advisor-item"
            >
              <span className="ai-bullet">
                •
              </span>

              <span className="ai-text">
                {item}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AIAdvisor;