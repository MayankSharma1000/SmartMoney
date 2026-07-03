import React, { useState } from "react";
import Button from "../components/ui/Button/Button";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import { setBudget } from "../services/budgetService.js";

function Budget() {
  const [monthlyBudget, setMonthlyBudget] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

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
          <h1>Monthly Budget</h1>
          <p>Set your monthly spending limit.</p>
        </section>

        <form className="expense-form glass-card" onSubmit={handleSubmit}>
          <h3>Set Budget</h3>

          {error && <div className="auth-error">{error}</div>}

          <input
            type="number"
            placeholder="Enter monthly budget"
            value={monthlyBudget}
            onChange={(e) => setMonthlyBudget(e.target.value)}
            required
          />

          <Button className="auth-submit" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Budget"}
          </Button>

          {message && <p className="progress-text">{message}</p>}
        </form>
      </main>
    </div>
  );
}

export default Budget;