import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaChartLine,
  FaCoins,
  FaBitcoin,
  FaUniversity
} from "react-icons/fa";

import Sidebar from "../components/Sidebar/Sidebar.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";

import {
  getInvestments,
  createInvestment,
  deleteInvestment
} from "../services/investmentService.js";

function Investments() {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    type: "Mutual Fund",
    investedAmount: "",
    currentValue: "",
    purchaseDate: "",
    platform: "",
    notes: ""
  });

  const typeIcons = {
    "Mutual Fund": <FaUniversity />,
    Stock: <FaChartLine />,
    ETF: <FaChartLine />,
    Gold: <FaCoins />,
    Crypto: <FaBitcoin />,
    Bond: <FaUniversity />,
    "Fixed Deposit": <FaUniversity />,
    PPF: <FaUniversity />,
    NPS: <FaUniversity />,
    Other: <FaChartLine />
  };

  const loadInvestments = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getInvestments();
      setInvestments(data.investments || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load investments."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvestments();
  }, []);

  const totalInvested = investments.reduce(
    (sum, item) => sum + Number(item.investedAmount || 0),
    0
  );

  const currentValue = investments.reduce(
    (sum, item) => sum + Number(item.currentValue || 0),
    0
  );

  const profit = currentValue - totalInvested;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddInvestment = async (e) => {
    e.preventDefault();

    try {
      setSubmitLoading(true);
      setError("");

      const payload = {
        ...formData,
        investedAmount: Number(formData.investedAmount),
        currentValue: Number(formData.currentValue)
      };

      const data = await createInvestment(payload);

      setInvestments((prev) => [data.investment, ...prev]);

      setFormData({
        name: "",
        type: "Mutual Fund",
        investedAmount: "",
        currentValue: "",
        purchaseDate: "",
        platform: "",
        notes: ""
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to add investment."
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setError("");

      await deleteInvestment(id);

      setInvestments((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to delete investment."
      );
    }
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
            current value and profit/loss from MongoDB.
          </p>
        </section>

        {error && <div className="auth-error">{error}</div>}

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

            <select name="type" value={formData.type} onChange={handleChange}>
              <option>Stock</option>
              <option>Mutual Fund</option>
              <option>ETF</option>
              <option>Gold</option>
              <option>Crypto</option>
              <option>Bond</option>
              <option>Fixed Deposit</option>
              <option>PPF</option>
              <option>NPS</option>
              <option>Other</option>
            </select>

            <input
              type="number"
              name="investedAmount"
              placeholder="Invested amount ₹"
              value={formData.investedAmount}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="currentValue"
              placeholder="Current value ₹"
              value={formData.currentValue}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleChange}
            />

            <input
              type="text"
              name="platform"
              placeholder="Platform e.g. Groww, Zerodha"
              value={formData.platform}
              onChange={handleChange}
            />

            <textarea
              name="notes"
              placeholder="Optional notes"
              value={formData.notes}
              onChange={handleChange}
            />

            <button className="auth-submit" type="submit" disabled={submitLoading}>
              <FaPlus />
              {submitLoading ? "Adding..." : "Add Investment"}
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

            {loading ? (
              <p className="progress-text">Loading investments...</p>
            ) : investments.length === 0 ? (
              <p className="progress-text">
                No investments yet. Add your first investment.
              </p>
            ) : (
              <div className="expense-list">
                {investments.map((item) => {
                  const invested = Number(item.investedAmount || 0);
                  const current = Number(item.currentValue || 0);
                  const itemProfit = current - invested;
                  const itemReturn = invested
                    ? ((itemProfit / invested) * 100).toFixed(2)
                    : 0;

                  return (
                    <div className="expense-row" key={item._id}>
                      <div className="expense-left">
                        <div className="transaction-icon">
                          {typeIcons[item.type] || typeIcons.Other}
                        </div>

                        <div>
                          <h4>{item.name}</h4>
                          <p>
                            {item.type} • Invested ₹
                            {invested.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>

                      <div className="expense-actions">
                        <strong className={itemProfit >= 0 ? "income" : "expense"}>
                          ₹{current.toLocaleString("en-IN")} ({itemReturn}%)
                        </strong>

                        <button onClick={() => handleDelete(item._id)}>
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Investments;