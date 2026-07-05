import React from "react";

import {
  FaWallet,
  FaBullseye,
  FaChartLine
} from "react-icons/fa";

function SavingsSummary({
  totalSaved,
  goals,
  averageProgress
}) {

  const cards = [

    {
      title:"Total Saved",

      value:`₹${Number(totalSaved).toLocaleString("en-IN")}`,

      subtitle:"Across all goals",

      icon:<FaWallet />,

      color:"blue"

    },

    {
      title:"Active Goals",

      value:goals,

      subtitle:"Goals in progress",

      icon:<FaBullseye />,

      color:"green"

    },

    {
      title:"Average Progress",

      value:`${averageProgress}%`,

      subtitle:"Across all goals",

      icon:<FaChartLine />,

      color:"purple"

    }

  ];

  return (

    <section className="summary-grid">

      {cards.map(card=>(

        <div
          key={card.title}
          className={`summary-card ${card.color}`}
        >

          <div className="summary-icon">

            {card.icon}

          </div>

          <div>

            <span>

              {card.title}

            </span>

            <h2>

              {card.value}

            </h2>

            <p>

              {card.subtitle}

            </p>

          </div>

        </div>

      ))}

    </section>

  );

}

export default SavingsSummary;