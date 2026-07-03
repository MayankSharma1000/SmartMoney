import React, { useState } from "react";

import {
  FaPlus,
  FaTrash,
  FaCalendarAlt,
  FaWifi,
  FaDumbbell,
  FaHome,
  FaMoneyBillWave
} from "react-icons/fa";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

import Button from "../components/ui/Button/Button";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
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
      icon: <FaMoneyBillWave />
    },
    {
      id: 2,
      title: "Internet Bill",
      amount: 999,
      category: "Bills",
      frequency: "Monthly",
      nextDueDate: "2026-06-25",
      icon: <FaWifi />
    },
    {
      id: 3,
      title: "Gym Membership",
      amount: 1500,
      category: "Health",
      frequency: "Monthly",
      nextDueDate: "2026-07-01",
      icon: <FaDumbbell />
    }
  ]);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "Bills",
    frequency: "Monthly",
    nextDueDate: ""
  });

  const totalMonthly = items.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );
  
  const nextPayment = [...items].sort(
    (a, b) =>
      new Date(a.nextDueDate) -
      new Date(b.nextDueDate)
  )[0];
  
  const annualCommitment =
    totalMonthly * 12;

  const categoryTotals = {};

    items.forEach((item) => {
      const category =
        item.category || "Other";
    
      categoryTotals[category] =
        (categoryTotals[category] || 0) +
        Number(item.amount || 0);
    });
    
    const chartData = {
      labels: Object.keys(categoryTotals),
    
      datasets: [
        {
          data: Object.values(
            categoryTotals
          ),
    
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
    };
  
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddRecurring = (e) => {
    e.preventDefault();

    let icon = <FaCalendarAlt />;

    if (formData.category === "Bills")
      icon = <FaWifi />;

    if (formData.category === "Health")
      icon = <FaDumbbell />;

    if (formData.category === "Rent")
      icon = <FaHome />;

    if (formData.category === "EMI")
      icon = <FaMoneyBillWave />;

    const newItem = {
      id: Date.now(),
      ...formData,
      amount: Number(formData.amount),
      icon
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
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
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
              <FaMoneyBillWave />
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
              <FaWifi />
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

        <div className="glass-card" style={{ marginTop: "30px" ,marginBottom: "24px" }}>
          <div
            className="chart-title"
            style={{
              marginTop: "40px",
              marginBottom: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div>
              <h3>Recurring Expense Breakdown</h3>
              <p>Monthly commitments grouped by category</p>
            </div>

            <span>
              ₹{totalMonthly.toLocaleString("en-IN")}
            </span>
          </div>

          <div
            style={{
              maxWidth: "420px",
              margin: "0 auto"
            }}
          >
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

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "16px",
              marginTop: "24px"
            }}
          >
            {Object.entries(categoryTotals).map(
              ([category, amount]) => (
                <div
                  key={category}
                  className="glass-card"
                  style={{
                    padding: "16px",
                    textAlign: "center"
                  }}
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

          <div
            className="glass-card"
            style={{
              marginTop: "20px",
              padding: "20px"
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>
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

            <Button className="auth-submit" type="submit">
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
                    <div className="transaction-icon">{item.icon}</div>

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
      </main>
    </div>
  );
}

export default RecurringExpenses;