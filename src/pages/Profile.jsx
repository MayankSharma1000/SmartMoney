import React, { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaUser,
  FaWallet,
  FaPiggyBank,
  FaChartLine,
  FaShieldAlt,
  FaBriefcase,
  FaBullseye,
  FaEdit,
  FaSave
} from "react-icons/fa";

import Button from "../components/ui/Button/Button";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import DashboardSkeleton from "../components/Dashboard/DashboardSkeleton";

import { useAuth } from "../context/AuthContext.jsx";
import { useDashboard } from "../hooks/useDashboard.js";
import { useBudget } from "../hooks/useBudget.js";

function Profile() {
  const { user } = useAuth();
  const {
    dashboardData,
    loading
  } = useDashboard();  const { budget } = useBudget();

  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    occupation: "Software Engineer",
    monthlyIncome: "50000",
    financialGoal: "Emergency Fund"
  });

  useEffect(() => {
    try {
      const savedProfile = JSON.parse(
        localStorage.getItem("financeProfile")
      );
  
      if (savedProfile) {
        setProfileData(savedProfile);
      }
  
    } catch {
      localStorage.removeItem("financeProfile");
    }
  }, []);

  const handleChange = (e) => {
    setProfileData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = () => {
    localStorage.setItem("financeProfile", JSON.stringify(profileData));
    setIsEditing(false);
  };

  const monthlyIncome = Number(profileData.monthlyIncome || 0);

  const monthlyBudget = budget?.monthlyBudget || 0;
  
  const budgetUsage = React.useMemo(() => {
  
    if (!monthlyBudget) return 0;
  
    return Math.round(
      ((dashboardData?.totalExpenses || 0) /
        monthlyBudget) * 100
    );
  
  }, [dashboardData, monthlyBudget]);

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
            Manage your financial profile, income, monthly budget and account
            overview.
          </p>
        </section>

        <section className="profile-card glass-card">
          <div className="profile-avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : "M"}
          </div>

          <div className="profile-info premium-profile-info">
            <div className="profile-main-row">
              <div>
                <h2>{user?.name || "Mayank Sharma"}</h2>

                <p>
                  <FaEnvelope />
                  {user?.email || "mayank@example.com"}
                </p>
              </div>

              <Button
                className="auth-submit profile-edit-btn"
                disabled={
                  isEditing &&
                  (
                    !profileData.occupation ||
                    !profileData.monthlyIncome ||
                    Number(profileData.monthlyIncome) <= 0 ||
                    !profileData.financialGoal
                  )
                }
                onClick={
                  isEditing
                    ? handleSave
                    : () => setIsEditing(true)
                }
              >
                {isEditing ? <FaSave /> : <FaEdit />}
                {isEditing ? "Save Profile" : "Edit Profile"}
              </Button>
            </div>

            <div className="profile-details">
              <div>
                <span>
                  <FaBriefcase /> Occupation
                </span>

                {isEditing ? (
                  <input
                    name="occupation"
                    value={profileData.occupation}
                    onChange={handleChange}
                  />
                ) : (
                  <strong>{profileData.occupation}</strong>
                )}
              </div>

              <div>
                <span>
                  <FaWallet /> Monthly Income
                </span>

                {isEditing ? (
                  <input
                    type="number"
                    name="monthlyIncome"
                    value={profileData.monthlyIncome}
                    onChange={handleChange}
                  />
                ) : (
                  <strong>₹{monthlyIncome.toLocaleString("en-IN")}</strong>
                )}
              </div>

              <div>
                <span>
                  <FaWallet /> Monthly Budget
                </span>

                <strong>₹{monthlyBudget.toLocaleString("en-IN")}</strong>
              </div>

              <div>
                <span>
                  <FaBullseye /> Financial Goal
                </span>

                {isEditing ? (
                  <input
                    name="financialGoal"
                    value={profileData.financialGoal}
                    onChange={handleChange}
                  />
                ) : (
                  <strong>{profileData.financialGoal}</strong>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <p className="stat-title">Total Expenses</p>
              <div className="stat-icon">
                <FaWallet />
              </div>
            </div>

            <h2 className="stat-value">
              ₹{(dashboardData?.totalExpenses || 0).toLocaleString("en-IN")}
            </h2>

            <p className="stat-growth">Current tracked spending</p>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <p className="stat-title">Total Savings</p>
              <div className="stat-icon">
                <FaPiggyBank />
              </div>
            </div>

            <h2 className="stat-value">
              ₹{(dashboardData?.totalSavings || 0).toLocaleString("en-IN")}
            </h2>

            <p className="stat-growth">Across savings goals</p>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <p className="stat-title">Investments</p>
              <div className="stat-icon">
                <FaChartLine />
              </div>
            </div>

            <h2 className="stat-value">
              ₹
              {(dashboardData?.currentInvestmentValue || 0).toLocaleString(
                "en-IN"
              )}
            </h2>

            <p className="stat-growth">Current portfolio value</p>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <p className="stat-title">Health Score</p>
              <div className="stat-icon">
                <FaShieldAlt />
              </div>
            </div>

            <h2 className="stat-value">
              {dashboardData?.financialHealthScore || 0}/100
            </h2>

            <p className="stat-growth">Based on live finance data</p>
          </div>
        </section>

        <section className="glass-card financial-snapshot-card">
          <div className="snapshot-header">
            <h2>Financial Snapshot</h2>
            <p>Quick profile-based financial overview</p>
          </div>

          <div className="profile-summary-grid premium-summary-grid">
            <div>
              <h4>Monthly Income</h4>
              <p>₹{monthlyIncome.toLocaleString("en-IN")}</p>
            </div>

            <div>
              <h4>Monthly Budget</h4>
              <p>₹{monthlyBudget.toLocaleString("en-IN")}</p>
            </div>

            <div>
              <h4>Budget Usage</h4>
              <p> {budgetUsage}% </p>
            </div>

            <div>
              <h4>Savings Rate</h4>
              <p>{dashboardData?.savingsRate || 0}%</p>
            </div>

            <div>
              <h4>Transactions</h4>
              <p>{dashboardData?.expenseCount || 0}</p>
            </div>

            <div>
              <h4>Investment Profit</h4>
              <p>
                ₹
                {(dashboardData?.investmentProfit || 0).toLocaleString(
                  "en-IN"
                )}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Profile;