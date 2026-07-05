import React from "react";
import { FaLightbulb } from "react-icons/fa";

function AIInsights({ insights }) {
  return (
    <div className="glass-card budget-card">

      <div className="budget-header">

        <div className="budget-icon">

          <FaLightbulb />

        </div>

        <div>

          <h3>Smart Insights</h3>

          <p className="budget-subtitle">

            AI-powered financial observations

          </p>

        </div>

      </div>

      <div className="insights-list">

        {insights.length===0 ? (

          <div className="empty-widget">

            Add more transactions to generate insights.

          </div>

        ) : (

          insights.map((insight,index)=>(

            <div
              key={index}
              className="insight-card"
            >

              💡 {insight}

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default AIInsights;