import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { categoryIcons } from "../utils/categoryIcons.jsx";
import { categories } from "../constants/categories";
import { ITEMS_PER_PAGE } from "../constants/pagination";
import Button from "../components/ui/Button/Button";

import {
  FaPlus,
  FaTrash,
  FaMagnifyingGlass
} from "react-icons/fa6";

import AppShell from "../components/layout/AppShell/AppShell";
import Navbar from "../components/Navbar/Navbar.jsx";

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

  const [searchText, setSearchText] = useState(
    searchParams.get("search") || ""
  );
  
  const [selectedCategory, setSelectedCategory] =
    useState("All");
  
  const [currentPage, setCurrentPage] =
    useState(1);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    amount: "",
    date: "",
    note: "",
    paymentMethod: "UPI"
  });

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

  const totalExpense = useMemo(() => {
    return expenses.reduce(
      (sum, expense) => sum + Number(expense.amount || 0),
      0
    );
  }, [expenses]);

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

  const totalPages = Math.ceil(
    filteredExpenses.length / ITEMS_PER_PAGE
  );
  
  const currentExpenses = filteredExpenses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearchChange = (value) => {
    setCurrentPage(1);
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
        category: "",
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
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );
  
    if (!confirmed) return;
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
    <AppShell>
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
          </div>
        </section>

        {error && <div className="auth-error">{error}</div>}

        <section className="expenses-container">

        <form
          className="expense-form glass-card"
          onSubmit={handleAddExpense}
        >
        <div className="chart-title">
          <div>
            <h3>Add New Expense</h3>
            <p>Quickly record a transaction</p>
          </div>
        </div>

        <div className="expense-form-grid">

          <input
            type="text"
            name="title"
            placeholder="Expense title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Category
            </option>

            {categories
              .filter(category => category !== "All")
              .map(category => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
          </select>

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
          </select>

          <Button
            className="expense-submit-btn"
            type="submit"
            disabled={
              submitLoading ||
              !formData.title ||
              !formData.amount ||
              !formData.category
            }
          >
            <FaPlus />

            {submitLoading
              ? "Adding..."
              : "Add Expense"}
          </Button>
        </div>
      </form>
          <div className="expenses-panel glass-card">
            <div className="expense-panel-header">
              <div>
                <h2>Transaction History</h2>
                <p>
                  Complete record of all expenses
                </p>
              </div>

              <h2>
                ₹{totalExpense.toLocaleString("en-IN")}
              </h2>
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
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>

              <Button onClick={clearFilters}>Clear</Button>
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
              <>
                <div className="expense-list">
                  {currentExpenses.map((expense) => (
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
                          <p className="expense-note">
                            {expense.note || "No notes"}
                          </p>
                        </div>
                      </div>

                      <div className="expense-actions">
                        <strong>
                          -₹{Number(expense.amount || 0).toLocaleString("en-IN")}
                        </strong>

                        <Button onClick={() => handleDelete(expense._id)}>
                          <FaTrash />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              
                <div className="pagination">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <Button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={
                        currentPage === index + 1
                          ? "page-btn active"
                          : "page-btn"
                      }
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </AppShell>
  );
}

export default Expenses;