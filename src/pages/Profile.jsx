import {
  useMemo,
} from "react";

import {
  FaBriefcase,
  FaBullseye,
  FaChartLine,
  FaEnvelope,
  FaPiggyBank,
  FaShieldAlt,
  FaUser,
  FaWallet,
} from "react-icons/fa";

import DashboardSkeleton from "../components/Dashboard/DashboardSkeleton";
import Sidebar from "../components/layout/Sidebar/Sidebar.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";

import { useAuth } from "../context/AuthContext.jsx";
import { useBudget } from "../hooks/useBudget.js";
import { useDashboard } from "../hooks/useDashboard.js";

import {
  formatCurrency,
} from "../utils/formatCurrency.js";

function Profile() {
  const {
    user,
  } = useAuth();

  const {
    dashboardData,
    loading,
  } = useDashboard();

  const {
    budget,
  } = useBudget();

  const currency =
    user?.currency || "INR";

  const monthlyIncome =
    Number(
      user?.monthlyIncome || 0
    );

  const monthlyBudget =
    Number(
      budget?.monthlyBudget || 0
    );

  const totalExpenses =
    Number(
      dashboardData?.totalExpenses || 0
    );

  const totalSavings =
    Number(
      dashboardData?.totalSavings || 0
    );

  const investmentValue =
    Number(
      dashboardData?.currentInvestmentValue ||
        0
    );

  const investmentProfit =
    Number(
      dashboardData?.investmentProfit ||
        0
    );

  const budgetUsage =
    useMemo(() => {
      if (monthlyBudget <= 0) {
        return 0;
      }

      return Math.round(
        (totalExpenses /
          monthlyBudget) *
          100
      );
    }, [
      totalExpenses,
      monthlyBudget,
    ]);

  const savingsRate =
    useMemo(() => {
      if (monthlyIncome <= 0) {
        return 0;
      }

      return Math.round(
        (totalSavings /
          monthlyIncome) *
          100
      );
    }, [
      totalSavings,
      monthlyIncome,
    ]);

  const savingsTarget =
    Number(
      user?.savingsTarget || 0
    );

  const savingsTargetProgress =
    savingsTarget > 0
      ? Math.min(
          Math.round(
            (totalSavings /
              savingsTarget) *
              100
          ),
          100
        )
      : 0;

  if (loading) {
    return (
      <div className="app-layout">
        <Sidebar />

        <main className="main-content">
          <Navbar />

          <DashboardSkeleton />
        </main>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Navbar />

        <section className="page-header">
          <h1>Profile</h1>

          <p>
            Your account and financial
            overview based on your current
            SmartMoney data.
          </p>
        </section>

        <section className="profile-card glass-card">
          <div className="profile-avatar">
            {user?.name
              ?.charAt(0)
              ?.toUpperCase() ||
              <FaUser />}
          </div>

          <div className="profile-info premium-profile-info">
            <div className="profile-main-row">
              <div>
                <h2>
                  {user?.name ||
                    "SmartMoney User"}
                </h2>

                <p>
                  <FaEnvelope />

                  {user?.email ||
                    "Email unavailable"}
                </p>
              </div>
            </div>

            <div className="profile-details">
              <div>
                <span>
                  <FaBriefcase />
                  Employment
                </span>

                <strong>
                  {user?.employmentType ||
                    "Not specified"}
                </strong>
              </div>

              <div>
                <span>
                  <FaWallet />
                  Monthly Income
                </span>

                <strong>
                  {formatCurrency(
                    monthlyIncome,
                    currency
                  )}
                </strong>
              </div>

              <div>
                <span>
                  <FaWallet />
                  Monthly Budget
                </span>

                <strong>
                  {formatCurrency(
                    monthlyBudget,
                    currency
                  )}
                </strong>
              </div>

              <div>
                <span>
                  <FaBullseye />
                  Savings Target
                </span>

                <strong>
                  {savingsTarget > 0
                    ? formatCurrency(
                        savingsTarget,
                        currency
                      )
                    : "Not set"}
                </strong>
              </div>
            </div>
          </div>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <p className="stat-title">
                Total Expenses
              </p>

              <div className="stat-icon">
                <FaWallet />
              </div>
            </div>

            <h2 className="stat-value">
              {formatCurrency(
                totalExpenses,
                currency
              )}
            </h2>

            <p className="stat-growth">
              Current tracked spending
            </p>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <p className="stat-title">
                Total Savings
              </p>

              <div className="stat-icon">
                <FaPiggyBank />
              </div>
            </div>

            <h2 className="stat-value">
              {formatCurrency(
                totalSavings,
                currency
              )}
            </h2>

            <p className="stat-growth">
              Across savings goals
            </p>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <p className="stat-title">
                Investments
              </p>

              <div className="stat-icon">
                <FaChartLine />
              </div>
            </div>

            <h2 className="stat-value">
              {formatCurrency(
                investmentValue,
                currency
              )}
            </h2>

            <p className="stat-growth">
              Current portfolio value
            </p>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <p className="stat-title">
                Health Score
              </p>

              <div className="stat-icon">
                <FaShieldAlt />
              </div>
            </div>

            <h2 className="stat-value">
              {dashboardData
                ?.financialHealthScore ||
                0}
              /100
            </h2>

            <p className="stat-growth">
              Based on tracked finance data
            </p>
          </div>
        </section>

        <section className="glass-card financial-snapshot-card">
          <div className="snapshot-header">
            <h2>
              Financial Snapshot
            </h2>

            <p>
              Current overview based on
              your account and tracked
              financial activity.
            </p>
          </div>

          <div className="profile-summary-grid premium-summary-grid">
            <div>
              <h4>
                Monthly Income
              </h4>

              <p>
                {formatCurrency(
                  monthlyIncome,
                  currency
                )}
              </p>
            </div>

            <div>
              <h4>
                Monthly Budget
              </h4>

              <p>
                {formatCurrency(
                  monthlyBudget,
                  currency
                )}
              </p>
            </div>

            <div>
              <h4>
                Budget Usage
              </h4>

              <p>
                {budgetUsage}%
              </p>
            </div>

            <div>
              <h4>
                Savings / Income
              </h4>

              <p>
                {savingsRate}%
              </p>
            </div>

            <div>
              <h4>
                Transactions
              </h4>

              <p>
                {dashboardData
                  ?.expenseCount ||
                  0}
              </p>
            </div>

            <div>
              <h4>
                Investment Profit
              </h4>

              <p>
                {formatCurrency(
                  investmentProfit,
                  currency
                )}
              </p>
            </div>

            {savingsTarget > 0 && (
              <div>
                <h4>
                  Savings Target Progress
                </h4>

                <p>
                  {savingsTargetProgress}%
                </p>
              </div>
            )}

            <div>
              <h4>
                Currency
              </h4>

              <p>
                {currency}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Profile;
