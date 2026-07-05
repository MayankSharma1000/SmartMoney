import React from "react";

/* ========================================= */
/* DATA */
/* ========================================= */

const insights = [
  {
    icon: "🍔",
    title: "Food Delivery",
    description: "You spent ₹1,440 more on food delivery.",
    change: "+18%",
    color: "#ef4444"
  },
  {
    icon: "⛽",
    title: "Fuel Usage",
    description: "Your fuel expenses stayed consistent.",
    change: "0%",
    color: "#3b82f6"
  },
  {
    icon: "🐷",
    title: "Savings Rate",
    description: "Your savings increased to 18%.",
    change: "+6%",
    color: "#22c55e"
  },
  {
    icon: "📈",
    title: "Investments",
    description: "Your portfolio grew by 9.6%.",
    change: "+9.6%",
    color: "#8b5cf6"
  }
];

/* ========================================= */
/* COMPONENT */
/* ========================================= */

function InsightCards() {
  return (
    <section className="analytics-insights-grid">

      {insights.map((item) => (

        <div
          className="insight-card"
          key={item.title}
        >

          <div className="insight-left">

            <div
              className="insight-icon"
              style={{
                background: item.color
              }}
            >
              {item.icon}
            </div>

            <div>

              <h3>{item.title}</h3>

              <p>{item.description}</p>

            </div>

          </div>

          <span
            className="insight-change"
            style={{
              color: item.color
            }}
          >
            {item.change}
          </span>

        </div>

      ))}

    </section>
  );
}

export default InsightCards;