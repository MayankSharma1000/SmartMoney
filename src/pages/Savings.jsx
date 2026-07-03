import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaPiggyBank } from "react-icons/fa";

import Button from "../components/ui/Button/Button";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";

import {
  getSavingsGoals,
  createSavingsGoal,
  deleteSavingsGoal
} from "../services/savingsService.js";

function Savings() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    targetAmount: "",
    currentAmount: "",
    category: "Emergency Fund",
    targetDate: "",
    notes: ""
  });

  const loadGoals = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getSavingsGoals();
      setGoals(data.goals || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load savings goals."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGoals();
  }, []);

  const totalSaved = goals.reduce(
    (sum, goal) => sum + Number(goal.currentAmount || 0),
    0
  );

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddGoal = async (e) => {
    e.preventDefault();

    try {
      setSubmitLoading(true);
      setError("");

      const payload = {
        ...formData,
        targetAmount: Number(formData.targetAmount),
        currentAmount: Number(formData.currentAmount || 0)
      };

      const data = await createSavingsGoal(payload);

      setGoals((prev) => [data.goal, ...prev]);

      setFormData({
        title: "",
        targetAmount: "",
        currentAmount: "",
        category: "Emergency Fund",
        targetDate: "",
        notes: ""
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to add savings goal."
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setError("");

      await deleteSavingsGoal(id);

      setGoals((prev) => prev.filter((goal) => goal._id !== id));
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to delete savings goal."
      );
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Navbar />

        <section className="page-header">
          <h1>Savings Goals</h1>
          <p>
            Plan emergency funds, car funds, travel goals and long-term savings
            with real MongoDB progress tracking.
          </p>
        </section>

        {error && <div className="auth-error">{error}</div>}

        <section className="expense-layout">
          <form className="expense-form glass-card" onSubmit={handleAddGoal}>
            <h3>Add Savings Goal</h3>

            <input
              type="text"
              name="title"
              placeholder="Goal name"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option>Emergency Fund</option>
              <option>Car</option>
              <option>House</option>
              <option>Travel</option>
              <option>Wedding</option>
              <option>Education</option>
              <option>Retirement</option>
              <option>Other</option>
            </select>

            <input
              type="number"
              name="targetAmount"
              placeholder="Target amount ₹"
              value={formData.targetAmount}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="currentAmount"
              placeholder="Already saved ₹"
              value={formData.currentAmount}
              onChange={handleChange}
            />

            <input
              type="date"
              name="targetDate"
              value={formData.targetDate}
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
              className="auth-submit"
              disabled={submitLoading}
              loading={submitLoading}
            >
              <FaPlus />
              Add Goal
            </Button>
          </form>

          <div className="expenses-panel glass-card">
            <div className="expenses-summary">
              <div>
                <p>Total Saved</p>
                <h2>₹{totalSaved.toLocaleString("en-IN")}</h2>
              </div>

              <span>{goals.length} goals</span>
            </div>

            {loading ? (
              <p className="progress-text">Loading savings goals...</p>
            ) : goals.length === 0 ? (
              <p className="progress-text">
                No savings goals yet. Add your first goal.
              </p>
            ) : (
              <div className="expense-list">
                {goals.map((goal) => {
                  const target = Number(goal.targetAmount || 0);
                  const saved = Number(goal.currentAmount || 0);

                  const progress = target
                    ? Math.min(Math.round((saved / target) * 100), 100)
                    : 0;

                  return (
                    <div className="expense-row" key={goal._id}>
                      <div className="expense-left">
                        <div className="transaction-icon">
                          <FaPiggyBank />
                        </div>

                        <div>
                          <h4>{goal.title}</h4>

                          <p>
                            ₹{saved.toLocaleString("en-IN")} saved of ₹
                            {target.toLocaleString("en-IN")}
                          </p>

                          <div className="progress-container small-progress">
                            <div className="progress-bar">
                              <div
                                className="progress-fill"
                                style={{ width: `${progress}%` }}
                              />
                            </div>

                            <p className="progress-text">
                              {progress}% completed
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="expense-actions">
                        <strong className="income">{progress}%</strong>

                        <Button
                          type="button"
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(goal._id)}
                          aria-label="Delete savings goal"
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

export default Savings;