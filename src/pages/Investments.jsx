import React, {
  useEffect,
  useMemo,
  useState
} from "react";

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
import Button from "../components/ui/Button/Button";

import { investmentTypes } from "../constants/investmentTypes";
import { investmentIcons } from "../utils/investmentIcons";

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

  const totalInvested = useMemo(() => {
    return investments.reduce(
      (sum, item) => sum + Number(item.investedAmount || 0),
      0
    );
  }, [investments]);
  
  const currentValue = useMemo(() => {
    return investments.reduce(
      (sum, item) => sum + Number(item.currentValue || 0),
      0
    );
  }, [investments]);
  
  const profit = useMemo(() => {
    return currentValue - totalInvested;
  }, [currentValue, totalInvested]);

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
    const confirmed = window.confirm(
      "Are you sure you want to delete this investment?"
    );
    if (!confirmed) return;
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

        <section className="stats-grid investment-stats">          
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
            {investmentTypes.map(type => (
              <option
                key={type}
                value={type}
              >
                {type}
              </option>
            ))}
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

            <Button
              type="submit"
              variant="primary"
              className="auth-submit"
              disabled={
                submitLoading ||
                !formData.name ||
                Number(formData.investedAmount) <= 0 ||
                Number(formData.currentValue) <= 0
              }
            >
              <FaPlus />
              {submitLoading ? "Adding..." : "Add Investment"}
            </Button>
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
              <div className="empty-widget">
                <h3>No Investments Yet</h3>
                <p>
                  Start tracking your portfolio by adding your first investment.
                </p>
              </div>
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
                          {investmentIcons[item.type] || investmentIcons.Other}
                        </div>

                        <div>
                          <h4>{item.name}</h4>
                          <p>
                            {item.type}

                            {item.platform
                              ? ` • ${item.platform}`
                              : ""}

                            {" • "}Invested ₹
                            {invested.toLocaleString("en-IN")}
                          </p>
                          <p className="expense-note">
                            {item.notes || "No notes"}
                          </p>
                        </div>
                      </div>

                      <div className="expense-actions">
                        <strong className={itemProfit >= 0 ? "income" : "expense"}>
                          ₹{current.toLocaleString("en-IN")} ({itemReturn}%)
                        </strong>

                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(item._id)}
                          aria-label="Delete investment"
                        >
                          <FaTrash />
                        </Button>
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