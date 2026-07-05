import React from "react";

function ActivityTimeline() {

  const activities = [

    {
      title: "Added Expense",
      subtitle: "Starbucks Coffee",
      amount: "- ₹420",
      time: "10 mins ago",
      color: "#ef4444"
    },

    {
      title: "Salary Credited",
      subtitle: "Monthly Salary",
      amount: "+ ₹48,000",
      time: "2 hours ago",
      color: "#22c55e"
    },

    {
      title: "Investment Added",
      subtitle: "Nifty 50 Index",
      amount: "+ ₹5,000",
      time: "Yesterday",
      color: "#3b82f6"
    },

    {
      title: "Savings Updated",
      subtitle: "Emergency Fund",
      amount: "+ ₹2,000",
      time: "Yesterday",
      color: "#8b5cf6"
    }

  ];

  return (

    <section className="analytics-card glass-card activity-card">

      <div className="activity-header">

        <h2>Recent Activity</h2>

        <span>Live</span>

      </div>

      <div className="activity-list">

        {activities.map((item,index)=>(

          <div
            key={index}
            className="activity-item"
          >

            <div
              className="activity-dot"
              style={{
                background:item.color
              }}
            />

            <div className="activity-content">

              <h4>{item.title}</h4>

              <p>{item.subtitle}</p>

            </div>

            <div className="activity-right">

              <strong
                style={{
                  color:item.color
                }}
              >
                {item.amount}
              </strong>

              <span>{item.time}</span>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

}

export default ActivityTimeline;