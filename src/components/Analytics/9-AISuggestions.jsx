import React from "react";

function AISuggestions() {

  const suggestions = [

    {
      title: "Reduce Food Spending",
      description:
        "Food delivery increased by 18% this month. Saving just ₹1,500/month could add ₹18,000 annually.",
      color: "#ef4444"
    },

    {
      title: "Emergency Fund",
      description:
        "You're 60% toward your emergency fund goal. Continue saving ₹15,000/month to finish by October.",
      color: "#22c55e"
    },

    {
      title: "Investment Opportunity",
      description:
        "Your investment allocation is healthy. Consider increasing SIPs by 10% to improve long-term returns.",
      color: "#3b82f6"
    },

    {
      title: "Budget Health",
      description:
        "Your monthly spending is within budget. Great discipline! Keep your savings rate above 20%.",
      color: "#8b5cf6"
    }

  ];

  return (

    <section className="analytics-card glass-card ai-card">

      <div className="activity-header">

        <h2>AI Smart Suggestions</h2>

        <span>Powered by AI</span>

      </div>

      <div className="ai-list">

        {suggestions.map((item,index)=>(

          <div
            key={index}
            className="ai-item"
          >

            <div
              className="ai-bar"
              style={{
                background:item.color
              }}
            />

            <div>

              <h4>{item.title}</h4>

              <p>{item.description}</p>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

}

export default AISuggestions;