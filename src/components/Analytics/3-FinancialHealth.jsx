import React from "react";

/* ========================================= */
/* COMPONENT */
/* ========================================= */

function FinancialHealth() {

  const metrics = [
    {
      title: "Savings",
      value: 100,
      color: "#22c55e"
    },
    {
      title: "Investments",
      value: 33,
      color: "#3b82f6"
    },
    {
      title: "Expenses",
      value: 100,
      color: "#8b5cf6"
    },
    {
      title: "Profitability",
      value: 53,
      color: "#f59e0b"
    }
  ];

  return (

    <div
      className="glass-card analytics-card financial-health-card"
    >

      {/* HEADER */}

      <div className="card-header">

        <h2>
          Financial Health
        </h2>

        <span className="health-badge">

          Good

        </span>

      </div>

      {/* BODY */}

      <div className="financial-body">

        {/* SCORE */}

        <div className="health-score">

          <div className="score-ring">

            <div className="score-inner">

              <h1>73</h1>

              <p>/100</p>

            </div>

          </div>

        </div>

        {/* METRICS */}

        <div className="health-metrics">

          {metrics.map((item) => (

            <div
              key={item.title}
              className="metric-row"
            >

              <div className="metric-header">

                <span>

                  {item.title}

                </span>

                <strong>

                  {item.value}%

                </strong>

              </div>

              <div className="metric-progress">

                <div

                  className="metric-fill"

                  style={{
                    width: `${item.value}%`,
                    background: item.color
                  }}

                />

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default FinancialHealth;