import React from "react";
import { useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaArrowTrendUp,
  FaCoins,
  FaBitcoinSign,
  FaBuildingColumns
} from "react-icons/fa6";

import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";

function Investments() {
  const [investments, setInvestments] = useState([
    {
      id: 1,
      name: "Nifty 50 Index Fund",
      type: "Mutual Fund",
      invested: 60000,
      current: 68400
    },
    {
      id: 2,
      name: "Gold ETF",
      type: "Gold",
      invested: 25000,
      current: 27800
    }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    type: "Mutual Fund",
    invested: "",
    current: ""
  });

  const typeIcons = {
    "Mutual Fund": <FaBuildingColumns />,
    Stock: <FaArrowTrendUp />,
    Gold: <FaCoins />,
    Crypto: <FaBitcoinSign />
  };

  const totalInvested = investments.reduce(
    (sum, item) => sum + item.invested,
    0
  );

  const currentValue = investments.reduce(
    (sum, item) => sum + item.current,
    0
  );

  const profit = currentValue - totalInvested;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddInvestment = (e) => {
    e.preventDefault();

    const newInvestment = {
      id: Date.now(),
      name: formData.name,
      type: formData.type,
      invested: Number(formData.invested),
      current: Number(formData.current)
    };

    setInvestments((prev) => [newInvestment, ...prev]);

    setFormData({
      name: "",
      type: "Mutual Fund",
      invested: "",
      current: ""
    });
  };

  const handleDelete = (id) => {
    setInvestments((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Navbar />

        <section className="page-header">
          <h1>Investment Tracker</h1>
          <p>
            Track mutual funds, stocks, gold, crypto, SIPs, invested amount,
            current value, and profit/loss.
          </p>
        </section>

        <section className="stats-grid" style={{ marginBottom: "24px" }}>
          <div className="stat-card">
            <p className="stat-title">Total Invested</p>
            <h2 className="stat-value">
              ₹{totalInvested.toLocaleString("en-IN")}
            </h2>
            <p className="stat-growth">Capital deployed</p>
          </div>

          <div className="stat-card">
            <p className="stat-title">Current Value</p>
            <h2 className="stat-value">
              ₹{currentValue.toLocaleString("en-IN")}
            </h2>
            <p className="stat-growth">Portfolio value</p>
          </div>

          <div className="stat-card">
            <p className="stat-title">Total Profit</p>
            <h2 className="stat-value">
              ₹{profit.toLocaleString("en-IN")}
            </h2>
            <p className="stat-growth">
              {totalInvested
                ? `${((profit / totalInvested) * 100).toFixed(2)}% returns`
                : "0% returns"}
            </p>
          </div>
        </section>

        <section className="expense-layout">
          <form
            className="expense-form glass-card"
            onSubmit={handleAddInvestment}
          >
            <h3>Add Investment</h3>

            <input
              type="text"
              name="name"
              placeholder="Investment name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option>Mutual Fund</option>
              <option>Stock</option>
              <option>Gold</option>
              <option>Crypto</option>
            </select>

            <input
              type="number"
              name="invested"
              placeholder="Invested amount ₹"
              value={formData.invested}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="current"
              placeholder="Current value ₹"
              value={formData.current}
              onChange={handleChange}
              required
            />

            <button className="auth-submit" type="submit">
              <FaPlus />
              Add Investment
            </button>
          </form>

          <div className="expenses-panel glass-card">
            <div className="expenses-summary">
              <div>
                <p>Portfolio Holdings</p>
                <h2>{investments.length}</h2>
              </div>

              <span>Active investments</span>
            </div>

            <div className="expense-list">
              {investments.map((item) => {
                const itemProfit = item.current - item.invested;
                const itemReturn = item.invested
                  ? ((itemProfit / item.invested) * 100).toFixed(2)
                  : 0;

                return (
                  <div className="expense-row" key={item.id}>
                    <div className="expense-left">
                      <div className="transaction-icon">
                        {typeIcons[item.type]}
                      </div>

                      <div>
                        <h4>{item.name}</h4>
                        <p>
                          {item.type} • Invested ₹
                          {item.invested.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>

                    <div className="expense-actions">
                      <strong className={itemProfit >= 0 ? "income" : "expense"}>
                        ₹{item.current.toLocaleString("en-IN")} ({itemReturn}%)
                      </strong>

                      <button onClick={() => handleDelete(item.id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Investments;