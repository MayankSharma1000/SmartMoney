import React, { useEffect, useState } from "react";
import {
    FaPlus,
    FaTrash,
    FaUtensils,
    FaCar,
    FaBolt,
    FaGamepad,
    FaPlane
  } from "react-icons/fa6";
  
  import {
    FaShoppingCart,
    FaHeart,
    FaGraduationCap,
    FaQuestionCircle
  } from "react-icons/fa";

import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";

import {
  getExpenses,
  addExpense,
  deleteExpense
} from "../services/expenseService.js";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "Food",
    amount: "",
    date: "",
    note: "",
    paymentMethod: "UPI"
  });

  const categoryIcons = {
    Food: <FaUtensils />,
    Transport: <FaCar />,
    Shopping: <FaShoppingCart />,
    Bills: <FaBolt />,
    Entertainment: <FaGamepad />,
    Health: <FaHeart />,
    Education: <FaGraduationCap />,
    Travel: <FaPlane />,
    Other: <FaQuestionCircle />
  };

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getExpenses();
      setExpenses(data.expenses || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load expenses. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const totalExpense = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0
  );

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();

    try {
      setSubmitLoading(true);
      setError("");

      const payload = {
        ...formData,
        amount: Number(formData.amount)
      };

      const data = await addExpense(payload);

      setExpenses((prev) => [data.expense, ...prev]);

      setFormData({
        title: "",
        category: "Food",
        amount: "",
        date: "",
        note: "",
        paymentMethod: "UPI"
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to add expense. Please try again."
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setError("");

      await deleteExpense(id);

      setExpenses((prev) =>
        prev.filter((expense) => expense._id !== id)
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to delete expense. Please try again."
      );
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Navbar />

        <section className="page-header">
          <h1>Expense Tracker</h1>
          <p>
            Add, monitor, and reduce your daily expenses with category-level
            clarity.
          </p>
        </section>

        {error && <div className="auth-error">{error}</div>}

        <section className="expense-layout">
          <form className="expense-form glass-card" onSubmit={handleAddExpense}>
            <h3>Add New Expense</h3>

            <input
              type="text"
              name="title"
              placeholder="Expense title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option>Food</option>
              <option>Transport</option>
              <option>Shopping</option>
              <option>Bills</option>
              <option>Entertainment</option>
              <option>Health</option>
              <option>Education</option>
              <option>Travel</option>
              <option>Other</option>
            </select>

            <input
              type="number"
              name="amount"
              placeholder="Amount in ₹"
              value={formData.amount}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />

            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option>UPI</option>
              <option>Cash</option>
              <option>Credit Card</option>
              <option>Debit Card</option>
              <option>Net Banking</option>
              <option>Other</option>
            </select>

            <textarea
              name="note"
              placeholder="Optional note"
              value={formData.note}
              onChange={handleChange}
            ></textarea>

            <button className="auth-submit" type="submit" disabled={submitLoading}>
              <FaPlus />
              {submitLoading ? "Adding..." : "Add Expense"}
            </button>
          </form>

          <div className="expenses-panel glass-card">
            <div className="expenses-summary">
              <div>
                <p>Total Spent</p>
                <h2>₹{totalExpense.toLocaleString("en-IN")}</h2>
              </div>

              <span>{expenses.length} transactions</span>
            </div>

            {loading ? (
              <p className="progress-text">Loading expenses...</p>
            ) : expenses.length === 0 ? (
              <p className="progress-text">
                No expenses yet. Add your first expense to start tracking.
              </p>
            ) : (
              <div className="expense-list">
                {expenses.map((expense) => (
                  <div className="expense-row" key={expense._id}>
                    <div className="expense-left">
                      <div className="transaction-icon">
                        {categoryIcons[expense.category] || categoryIcons.Other}
                      </div>

                      <div>
                        <h4>{expense.title}</h4>
                        <p>
                          {expense.category} •{" "}
                          {expense.date
                            ? new Date(expense.date).toLocaleDateString("en-IN")
                            : "No date"}{" "}
                          • {expense.paymentMethod || "UPI"}
                        </p>

                        {expense.note && (
                          <p className="expense-note">{expense.note}</p>
                        )}
                      </div>
                    </div>

                    <div className="expense-actions">
                      <strong>-₹{Number(expense.amount).toLocaleString("en-IN")}</strong>

                      <button onClick={() => handleDelete(expense._id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Expenses;