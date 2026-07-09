import React, { useMemo, useState } from "react";

import {
  FaPlus,
  FaTrash,
  FaCalendarAlt,
  FaHome
} from "react-icons/fa";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Doughnut } from "react-chartjs-2";
import { recurringExpenseIcons } from "../utils/recurringExpenseIcons";

import AppShell from "../components/layout/AppShell/AppShell";
import Button from "../components/ui/Button/Button";
import Navbar from "../components/Navbar/Navbar.jsx";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function RecurringExpenses() {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Education Loan EMI",
      amount: 11240,
      category: "EMI",
      frequency: "Monthly",
      nextDueDate: "2026-07-05",
    },
    {
      id: 2,
      title: "Internet Bill",
      amount: 999,
      category: "Bills",
      frequency: "Monthly",
      nextDueDate: "2026-06-25",
    },
    {
      id: 3,
      title: "Gym Membership",
      amount: 1500,
      category: "Health",
      frequency: "Monthly",
      nextDueDate: "2026-07-01",
    }
  ]);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "Bills",
    frequency: "Monthly",
    nextDueDate: ""
  });

  const totalMonthly = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );
  }, [items]);
  
  const nextPayment = useMemo(() => {
    return [...items].sort(
      (a, b) =>
        new Date(a.nextDueDate) -
        new Date(b.nextDueDate)
    )[0];
  }, [items]);
  
  const annualCommitment = useMemo(() => {
    return totalMonthly * 12;
  }, [totalMonthly]);

  const categoryTotals = useMemo(() => {
    const totals = {};
  
    items.forEach((item) => {
      const category = item.category || "Other";
  
      totals[category] =
        (totals[category] || 0) +
        Number(item.amount || 0);
    });
  
    return totals;
  }, [items]);
  
  const chartData = useMemo(() => ({
    labels: Object.keys(categoryTotals),
  
    datasets: [
      {
        data: Object.values(categoryTotals),
  
        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
          "#06b6d4"
        ]
      }
    ]
  }), [categoryTotals]);
  
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddRecurring = (e) => {
    e.preventDefault();

    const newItem = {
      id: Date.now(),
      ...formData,
      amount: Number(formData.amount)
    };
    
    setItems((prev) => [newItem, ...prev]);

    setFormData({
      title: "",
      amount: "",
      category: "Bills",
      frequency: "Monthly",
      nextDueDate: ""
    });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Delete this recurring expense?"
    );
  
    if (!confirmed) return;
  
    setItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <AppShell>
        <Navbar />

        <section className="page-header">
          <h1>Recurring Expenses</h1>
          <p>
            Track fixed monthly commitments like EMI, subscriptions, internet,
            rent, gym, insurance and other repeat payments.
          </p>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
          <div className="stat-icon">
            {recurringExpenseIcons.Bills}
          </div>

            <h2>
              ₹{totalMonthly.toLocaleString("en-IN")}
            </h2>

            <p>Monthly Commitments</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaCalendarAlt />
            </div>

            <h2>{items.length}</h2>

            <p>Active Bills</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaHome />
            </div>

            <h2>
              ₹
              {annualCommitment.toLocaleString(
                "en-IN"
              )}
            </h2>

            <p>Annual Commitment</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              {recurringExpenseIcons.Bills}
            </div>

            <h2>
              {
                items.filter(
                  (item) =>
                    item.category === "Bills"
                ).length
              }
            </h2>

            <p>Utility Bills</p>
          </div>
        </section>

        <div className="glass-card recurring-chart-card">
          <div className="chart-title recurring-chart-header">
            <div>
              <h3>Recurring Expense Breakdown</h3>
              <p>Monthly commitments grouped by category</p>
            </div>

            <span>
              ₹{totalMonthly.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="recurring-chart">
            <Doughnut
              data={chartData}
              options={{
                plugins: {
                  legend: {
                    position: "bottom"
                  }
                }
              }}
            />
          </div>

          <div className="recurring-summary-grid">
            {Object.entries(categoryTotals).map(
              ([category, amount]) => (
                <div
                  key={category}
                  className="glass-card recurring-summary-card"
                >
                  <h4>{category}</h4>

                  <h3>
                    ₹{amount.toLocaleString("en-IN")}
                  </h3>

                  <p>
                    {(
                      (amount / totalMonthly) *
                      100
                    ).toFixed(1)}
                    % of monthly expenses
                  </p>
                </div>
              )
            )}
          </div>

          <div className="glass-card recurring-insights">
            <h3 className="recurring-insights-title">
              Recurring Expense Insights
            </h3>

            <p>
              Your largest recurring expense is{" "}
              <strong>
                {
                  Object.entries(categoryTotals).sort(
                    (a, b) => b[1] - a[1]
                  )[0]?.[0]
                }
              </strong>
              , accounting for{" "}
              <strong>
                {(
                  (
                    Object.entries(categoryTotals).sort(
                      (a, b) => b[1] - a[1]
                    )[0]?.[1] /
                    totalMonthly
                  ) *
                  100
                ).toFixed(1)}
                %
              </strong>
              {" "}of your monthly commitments.
            </p>
          </div>
        </div>

        <section className="recurring-layout">
          <form
            className="glass-card recurring-form"
            onSubmit={handleAddRecurring}
          >
            <div className="form-title-row">
              <div>
                <h3>Add Recurring Expense</h3>
                <p>Fixed payments that repeat every month.</p>
              </div>

              <div className="stat-icon">
                <FaPlus />
              </div>
            </div>

            <input
              type="text"
              name="title"
              placeholder="Name e.g. Netflix, EMI, Internet"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="amount"
              placeholder="Amount in ₹"
              value={formData.amount}
              onChange={handleChange}
              required
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option>Bills</option>
              <option>EMI</option>
              <option>Subscription</option>
              <option>Rent</option>
              <option>Health</option>
              <option>Insurance</option>
              <option>Other</option>
            </select>

            <select
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
            >
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Yearly</option>
            </select>

            <input
              type="date"
              name="nextDueDate"
              value={formData.nextDueDate}
              onChange={handleChange}
              required
            />

            <Button
              className="auth-submit"
              type="submit"
              disabled={
                !formData.title ||
                !formData.amount ||
                Number(formData.amount) <= 0 ||
                !formData.nextDueDate
              }
            >              
                <FaPlus />
              Add Recurring
            </Button>
          </form>

          <div className="glass-card recurring-list-card">
            <div className="chart-title">
              <div>
                <h3>Upcoming Payments</h3>
                <p>
                  Next Due:
                  {" "}
                  <strong>
                    {nextPayment?.title}
                  </strong>
                  {" • "}
                  ₹
                  {nextPayment?.amount?.toLocaleString(
                    "en-IN"
                  )}
                </p>
              </div>
            </div>

            <div className="expense-list">
              {items.map((item) => (
                <div className="expense-row" key={item.id}>
                  <div className="expense-left">
                    <div className="transaction-icon">
                      {recurringExpenseIcons[item.category] ||
                        recurringExpenseIcons.Other}
                      </div>
                    <div>
                      <h4>{item.title}</h4>
                      <p>
                        {item.category} • {item.frequency} • Due{" "}
                        {new Date(item.nextDueDate).toLocaleDateString(
                          "en-IN"
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="expense-actions">
                    <strong>
                      ₹{Number(item.amount).toLocaleString("en-IN")}
                    </strong>

                    <Button onClick={() => handleDelete(item.id)}>
                      <FaTrash />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AppShell>
  );
}

export default RecurringExpenses;