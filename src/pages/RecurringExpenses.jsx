import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaCalendarAlt,
  FaHome,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

import { recurringExpenseIcons } from "../utils/recurringExpenseIcons";

import AppShell from "../components/layout/AppShell/AppShell";
import Navbar from "../components/Navbar/Navbar.jsx";
import Button from "../components/ui/Button/Button";

import {
  createRecurringExpense,
  deleteRecurringExpense,
  getRecurringExpenses,
} from "../services/recurringExpenseService";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function RecurringExpenses() {
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "Bills",
    frequency: "Monthly",
    nextDueDate: "",
  });

  /* =========================================
     LOAD RECURRING EXPENSES
  ========================================= */

  useEffect(() => {
    const loadRecurringExpenses = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getRecurringExpenses();

        const recurringItems =
          response?.data ||
          response?.recurringExpenses ||
          response ||
          [];

        setItems(
          Array.isArray(recurringItems)
            ? recurringItems
            : []
        );
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load recurring expenses"
        );

        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadRecurringExpenses();
  }, []);

  /* =========================================
     MONTHLY EQUIVALENT
  ========================================= */

  const getMonthlyEquivalent = (item) => {
    const amount =
      Number(item.amount || 0);

    switch (item.frequency) {
      case "Weekly":
        return (amount * 52) / 12;

      case "Quarterly":
        return amount / 3;

      case "Yearly":
        return amount / 12;

      case "Monthly":
      default:
        return amount;
    }
  };

  /* =========================================
     MONTHLY COMMITMENT
  ========================================= */

  const totalMonthly = useMemo(() => {
    return items.reduce(
      (sum, item) =>
        sum + getMonthlyEquivalent(item),
      0
    );
  }, [items]);

  /* =========================================
     NEXT PAYMENT
  ========================================= */

  const nextPayment = useMemo(() => {
    if (items.length === 0) {
      return null;
    }

    return [...items]
      .filter((item) => item.nextDueDate)
      .sort(
        (a, b) =>
          new Date(a.nextDueDate) -
          new Date(b.nextDueDate)
      )[0];
  }, [items]);

  /* =========================================
     ANNUAL COMMITMENT
  ========================================= */

  const annualCommitment = useMemo(() => {
    return totalMonthly * 12;
  }, [totalMonthly]);

  /* =========================================
     CATEGORY TOTALS
  ========================================= */

  const categoryTotals = useMemo(() => {
    const totals = {};

    items.forEach((item) => {
      const category =
        item.category || "Other";

      const monthlyAmount =
        getMonthlyEquivalent(item);

      totals[category] =
        (totals[category] || 0) +
        monthlyAmount;
    });

    return totals;
  }, [items]);

  /* =========================================
     CHART DATA
  ========================================= */

  const chartData = useMemo(
    () => ({
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
            "#06b6d4",
          ],

          borderWidth: 0,
        },
      ],
    }),
    [categoryTotals]
  );

  /* =========================================
     LARGEST CATEGORY
  ========================================= */

  const largestCategory = useMemo(() => {
    const entries =
      Object.entries(categoryTotals);

    if (entries.length === 0) {
      return null;
    }

    return entries.sort(
      (a, b) => b[1] - a[1]
    )[0];
  }, [categoryTotals]);

  /* =========================================
     FORM CHANGE
  ========================================= */

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* =========================================
     CREATE RECURRING EXPENSE
  ========================================= */

  const handleAddRecurring = async (e) => {
    e.preventDefault();

    try {
      setError("");

      const payload = {
        ...formData,
        amount: Number(formData.amount),
      };

      const response =
        await createRecurringExpense(
          payload
        );

      const createdItem =
        response?.data ||
        response?.recurringExpense ||
        response;

      if (createdItem) {
        setItems((prev) => [
          createdItem,
          ...prev,
        ]);
      }

      setFormData({
        title: "",
        amount: "",
        category: "Bills",
        frequency: "Monthly",
        nextDueDate: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to add recurring expense"
      );
    }
  };

  /* =========================================
     DELETE RECURRING EXPENSE
  ========================================= */

  const handleDelete = async (id) => {
    if (!id) return;

    const confirmed =
      window.confirm(
        "Delete this recurring expense?"
      );

    if (!confirmed) return;

    try {
      setError("");

      await deleteRecurringExpense(id);

      setItems((prev) =>
        prev.filter(
          (item) =>
            (item._id || item.id) !== id
        )
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to delete recurring expense"
      );
    }
  };

  return (
    <AppShell>
      <Navbar />

      {/* PAGE HEADER */}

      <section className="page-header">
        <h1>Recurring Expenses</h1>

        <p>
          Track fixed commitments like EMIs,
          subscriptions, internet, rent,
          insurance and other repeat payments.
        </p>
      </section>

      {/* ERROR */}

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      {/* STATS */}

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            {recurringExpenseIcons.Bills}
          </div>

          <h2>
            ₹
            {Math.round(
              totalMonthly
            ).toLocaleString("en-IN")}
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
            {Math.round(
              annualCommitment
            ).toLocaleString("en-IN")}
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

      {/* LOADING */}

      {loading ? (
        <section className="recurring-empty-state">
          <h3>
            Loading recurring expenses...
          </h3>
        </section>
      ) : (
        <>
          {/* BREAKDOWN */}

          {items.length > 0 && (
            <div className="recurring-chart-card">
              <div className="chart-title recurring-chart-header">
                <div>
                  <h3>
                    Recurring Expense Breakdown
                  </h3>

                  <p>
                    Monthly equivalent grouped
                    by category
                  </p>
                </div>

                <span>
                  ₹
                  {Math.round(
                    totalMonthly
                  ).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="recurring-chart">
                <Doughnut
                  data={chartData}
                  options={{
                    responsive: true,

                    maintainAspectRatio:
                      false,

                    plugins: {
                      legend: {
                        position: "bottom",
                      },
                    },
                  }}
                />
              </div>

              <div className="recurring-summary-grid">
                {Object.entries(
                  categoryTotals
                ).map(
                  ([category, amount]) => (
                    <div
                      key={category}
                      className="recurring-summary-card"
                    >
                      <h4>{category}</h4>

                      <h3>
                        ₹
                        {Math.round(
                          amount
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </h3>

                      <p>
                        {totalMonthly > 0
                          ? (
                              (amount /
                                totalMonthly) *
                              100
                            ).toFixed(1)
                          : "0.0"}
                        % of monthly commitments
                      </p>
                    </div>
                  )
                )}
              </div>

              {largestCategory && (
                <div className="recurring-insights">
                  <h3 className="recurring-insights-title">
                    Recurring Expense
                    Insight
                  </h3>

                  <p>
                    Your largest recurring
                    category is{" "}
                    <strong>
                      {largestCategory[0]}
                    </strong>
                    , accounting for{" "}
                    <strong>
                      {totalMonthly > 0
                        ? (
                            (largestCategory[1] /
                              totalMonthly) *
                            100
                          ).toFixed(1)
                        : "0.0"}
                      %
                    </strong>{" "}
                    of your monthly
                    commitments.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* FORM + LIST */}

          <section className="recurring-layout">
            <form
              className="recurring-form"
              onSubmit={
                handleAddRecurring
              }
            >
              <div className="form-title-row">
                <div>
                  <h3>
                    Add Recurring Expense
                  </h3>

                  <p>
                    Add a payment that repeats
                    on a regular schedule.
                  </p>
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
                min="0"
                step="0.01"
                placeholder="Amount"
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
                <option>
                  Subscription
                </option>
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
                <option>
                  Quarterly
                </option>
                <option>Yearly</option>
              </select>

              <input
                type="date"
                name="nextDueDate"
                value={
                  formData.nextDueDate
                }
                onChange={handleChange}
                required
              />

              <Button
                className="auth-submit"
                type="submit"
                disabled={
                  !formData.title ||
                  !formData.amount ||
                  Number(
                    formData.amount
                  ) <= 0 ||
                  !formData.nextDueDate
                }
              >
                <FaPlus />
                Add Recurring
              </Button>
            </form>

            <div className="recurring-list-card">
              <div className="chart-title">
                <div>
                  <h3>
                    Upcoming Payments
                  </h3>

                  {nextPayment ? (
                    <p>
                      Next Due:{" "}
                      <strong>
                        {
                          nextPayment.title
                        }
                      </strong>
                      {" • "}
                      ₹
                      {Number(
                        nextPayment.amount ||
                          0
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  ) : (
                    <p>
                      No recurring payments
                      added yet.
                    </p>
                  )}
                </div>
              </div>

              {items.length === 0 ? (
                <div className="analytics-empty-state">
                  <h3>
                    No recurring expenses yet
                  </h3>

                  <p>
                    Add your first recurring
                    payment to start tracking
                    monthly commitments.
                  </p>
                </div>
              ) : (
                <div className="expense-list">
                  {items.map((item) => {
                    const itemId =
                      item._id || item.id;

                    return (
                      <div
                        className="expense-row"
                        key={itemId}
                      >
                        <div className="expense-left">
                          <div className="transaction-icon">
                            {recurringExpenseIcons[
                              item.category
                            ] ||
                              recurringExpenseIcons.Other}
                          </div>

                          <div>
                            <h4>
                              {item.title}
                            </h4>

                            <p>
                              {item.category}
                              {" • "}
                              {item.frequency}
                              {" • Due "}

                              {item.nextDueDate
                                ? new Date(
                                    item.nextDueDate
                                  ).toLocaleDateString(
                                    "en-IN"
                                  )
                                : "Not set"}
                            </p>
                          </div>
                        </div>

                        <div className="expense-actions">
                          <strong>
                            ₹
                            {Number(
                              item.amount ||
                                0
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </strong>

                          <Button
                            onClick={() =>
                              handleDelete(
                                itemId
                              )
                            }
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </AppShell>
  );
}

export default RecurringExpenses;
