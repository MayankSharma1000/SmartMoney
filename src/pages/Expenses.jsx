import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  FaPlus,
  FaTrash,
  FaUtensils,
  FaCar,
  FaBolt,
  FaGamepad,
  FaPlane,
  FaMagnifyingGlass
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
  const [searchParams, setSearchParams] = useSearchParams();

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchText, setSearchText] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  const categories = [
    "All",
    "Food",
    "Transport",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Education",
    "Travel",
    "Other"
  ];

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

  useEffect(() => {
    const navbarSearch = searchParams.get("search") || "";
    setSearchText(navbarSearch);
  }, [searchParams]);

  const totalExpense = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0
  );

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const searchValue = searchText.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        expense.title?.toLowerCase().includes(searchValue) ||
        expense.category?.toLowerCase().includes(searchValue) ||
        expense.paymentMethod?.toLowerCase().includes(searchValue) ||
        expense.note?.toLowerCase().includes(searchValue);

      const matchesCategory =
        selectedCategory === "All" || expense.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [expenses, searchText, selectedCategory]);

  const filteredTotal = filteredExpenses.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0
  );

  const handleSearchChange = (value) => {
    setSearchText(value);

    if (value.trim()) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  const clearFilters = () => {
    setSearchText("");
    setSelectedCategory("All");
    setSearchParams({});
  };

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

      setExpenses((prev) => prev.filter((expense) => expense._id !== id));
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
          <div className="header-flex">
            <div>
              <h1>Expense Tracker</h1>

              <p>
                Add, search, filter and monitor your daily expenses with
                category-level clarity.
              </p>
            </div>

            <button
              className="auth-submit"
              onClick={() =>
                document.querySelector(".expense-form")?.scrollIntoView({
                  behavior: "smooth"
                })
              }
            >
              <FaPlus />
              Add Expense
            </button>
          </div>
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
            />

            <button className="auth-submit" type="submit" disabled={submitLoading}>
              <FaPlus />
              {submitLoading ? "Adding..." : "Save Expense"}
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

            <div className="expense-filter-bar">
              <div className="expense-search-box">
                <FaMagnifyingGlass />

                <input
                  type="text"
                  placeholder="Search by title, category, payment or note..."
                  value={searchText}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>

              <button onClick={clearFilters}>Clear</button>
            </div>

            <div className="filtered-summary">
              <span>
                Showing {filteredExpenses.length} of {expenses.length}
              </span>

              <strong>₹{filteredTotal.toLocaleString("en-IN")}</strong>
            </div>

            {loading ? (
              <p className="progress-text">Loading expenses...</p>
            ) : expenses.length === 0 ? (
              <p className="progress-text">
                No expenses yet. Add your first expense to start tracking.
              </p>
            ) : filteredExpenses.length === 0 ? (
              <p className="progress-text">
                No matching expenses found. Try clearing filters.
              </p>
            ) : (
              <div className="expense-list">
                {filteredExpenses.map((expense) => (
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
                      <strong>
                        -₹{Number(expense.amount || 0).toLocaleString("en-IN")}
                      </strong>

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