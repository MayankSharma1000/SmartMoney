import React from "react";
import { useState } from "react";
import { FaPlus, FaTrash, FaPiggyBank } from "react-icons/fa6";

import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";

function Savings() {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Emergency Fund",
      target: 100000,
      saved: 74200
    },
    {
      id: 2,
      title: "Car Maintenance Fund",
      target: 30000,
      saved: 8500
    }
  ]);

  const [formData, setFormData] = useState({
    title: "",
    target: "",
    saved: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddGoal = (e) => {
    e.preventDefault();

    const newGoal = {
      id: Date.now(),
      title: formData.title,
      target: Number(formData.target),
      saved: Number(formData.saved)
    };

    setGoals((prev) => [newGoal, ...prev]);

    setFormData({
      title: "",
      target: "",
      saved: ""
    });
  };

  const handleDelete = (id) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Navbar />

        <section className="page-header">
          <h1>Savings Goals</h1>
          <p>
            Plan emergency funds, car funds, travel goals, and long-term savings
            with progress tracking.
          </p>
        </section>

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

            <input
              type="number"
              name="target"
              placeholder="Target amount ₹"
              value={formData.target}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="saved"
              placeholder="Already saved ₹"
              value={formData.saved}
              onChange={handleChange}
              required
            />

            <button className="auth-submit" type="submit">
              <FaPlus />
              Add Goal
            </button>
          </form>

          <div className="expenses-panel glass-card">
            <div className="expenses-summary">
              <div>
                <p>Total Saved</p>
                <h2>
                  ₹
                  {goals
                    .reduce((sum, goal) => sum + goal.saved, 0)
                    .toLocaleString("en-IN")}
                </h2>
              </div>

              <span>{goals.length} goals</span>
            </div>

            <div className="expense-list">
              {goals.map((goal) => {
                const progress = Math.min(
                  Math.round((goal.saved / goal.target) * 100),
                  100
                );

                return (
                  <div className="expense-row" key={goal.id}>
                    <div className="expense-left">
                      <div className="transaction-icon">
                        <FaPiggyBank />
                      </div>

                      <div>
                        <h4>{goal.title}</h4>
                        <p>
                          ₹{goal.saved.toLocaleString("en-IN")} saved of ₹
                          {goal.target.toLocaleString("en-IN")}
                        </p>

                        <div className="progress-container small-progress">
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>

                          <p className="progress-text">{progress}% completed</p>
                        </div>
                      </div>
                    </div>

                    <div className="expense-actions">
                      <strong className="income">{progress}%</strong>

                      <button onClick={() => handleDelete(goal.id)}>
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

export default Savings;