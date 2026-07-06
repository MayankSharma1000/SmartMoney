import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaPiggyBank } from "react-icons/fa";

import Button from "../components/ui/Button/Button";
import AppShell from "../components/layout/AppShell/AppShell";
import "../styles/savings.css";
import Navbar from "../components/Navbar/Navbar.jsx";
import SavingsHero from "../components/Savings/SavingsHero";
import SavingsSummary from "../components/Savings/SavingsSummary";
import SavingsGoalForm from "../components/Savings/SavingsGoalForm";
import SavingsGoalsList from "../components/Savings/SavingsGoalsList";

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

  const currentMonth = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric"
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

  const totalSaved = React.useMemo(() => {
    return goals.reduce(
      (sum, goal) => sum + Number(goal.currentAmount || 0),
      0
    );
  }, [goals]);

  const averageProgress = React.useMemo(() => {

    if (goals.length === 0) return 0;
  
    const total = goals.reduce((sum, goal) => {
  
      const target = Number(goal.targetAmount || 0);
  
      const current = Number(goal.currentAmount || 0);
  
      if (!target) return sum;
  
      return sum + (current / target) * 100;
  
    }, 0);
  
    return Math.round(total / goals.length);
  
  }, [goals]);

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
    const confirmed = window.confirm(
      "Are you sure you want to delete this savings goal?"
    );
  
    if (!confirmed) return;
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
    <AppShell>
        <Navbar />
        <SavingsHero />
          <SavingsSummary
              totalSaved={totalSaved}
              goals={goals.length}
              averageProgress={averageProgress}
          />

        {error && <div className="auth-error">{error}</div>}

        <section className="savings-page">
          <SavingsGoalForm
              formData={formData}
              handleChange={handleChange}
              handleAddGoal={handleAddGoal}
              submitLoading={submitLoading}
          />
          <section className="goals-section">
            <div className="section-heading">
              <div>
                <h2>Your Savings Goals</h2>
                <p>
                  Monitor progress across every financial goal.
                </p>
              </div>

              <div className="goal-count">
                {goals.length} Goal{goals.length !== 1 ? "s" : ""}
              </div>

            </div>
            {loading ? (
              <div className="loading-state">
                Loading savings goals...
              </div>
            ) : (
              <SavingsGoalsList
                goals={goals}
                handleDelete={handleDelete}
              />
            )}
          </section>
        </section>
      </AppShell>
  );
}

export default Savings;