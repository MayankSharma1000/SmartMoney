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

import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";

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
      amount: Number(formData.amount),
      icon: <FaCalendarAlt />
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

            <h2>₹{totalMonthly.toLocaleString("en-IN")}</h2>
            <p>Monthly Commitments</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaCalendarAlt />
            </div>

            <h2>{items.length}</h2>
            <p>Active Recurring Bills</p>
          </div>
        </section>

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

            <button className="auth-submit" type="submit">
              <FaPlus />
              Add Recurring
            </button>
          </form>

          <div className="glass-card recurring-list-card">
            <div className="chart-title">
              <div>
                <h3>Upcoming Payments</h3>
                <p>Recurring costs sorted by upcoming due dates.</p>
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

                    <button onClick={() => handleDelete(item.id)}>
                      <FaTrash />
                    </button>
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