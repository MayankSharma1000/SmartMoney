import React, { useState } from "react";
import Button from "../components/ui/Button/Button";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import { setBudget } from "../services/budgetService.js";

function Budget() {
  const [monthlyBudget, setMonthlyBudget] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const currentMonth = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const month = new Date().toLocaleString("default", {
        month: "long"
      });

      const year = new Date().getFullYear();

      await setBudget({
        monthlyBudget: Number(monthlyBudget),
        month,
        year
      });

      setMessage("Budget saved successfully.");
      setMonthlyBudget("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Budget could not be saved. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Navbar />

        <section className="page-header">
          <h1>Budget Planner</h1>
          <p>
            Set a monthly spending limit and stay in control of your finances.
          </p>
        </section>

        <form
          className="expense-form glass-card"
          onSubmit={handleSubmit}
        >
          <h3>Set Budget</h3>

          <p className="budget-month">
            Budget for {currentMonth}
          </p>

          {error && <div className="auth-error">{error}</div>}

          <input
            type="number"
            placeholder="e.g. 50000"
            value={monthlyBudget}
            onChange={(e) => setMonthlyBudget(e.target.value)}
            min="1"
            required
          />

          <Button
            className="auth-submit"
            type="submit"
            disabled={
              saving ||
              !monthlyBudget ||
              Number(monthlyBudget) <= 0
            }
          >
            {saving ? "Saving..." : "Save Budget"}
          </Button>

          {message && <p className="progress-text">{message}</p>}
        </form>
      </main>
    </div>
  );
}

export default Budget;