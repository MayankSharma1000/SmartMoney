import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/ui/Button/Button";
import {
  FaWallet,
  FaChartLine,
  FaLock,
  FaEnvelope,
  FaArrowRight,
  FaGoogle
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(formData);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-bg-orb orb-one"></div>
      <div className="auth-bg-orb orb-two"></div>
      <div className="auth-bg-grid"></div>

      <div className="auth-theme">
        <ThemeToggle />
      </div>

      <section className="auth-left">
        <motion.div
          className="brand-block"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="brand-logo">
            <FaWallet />
          </div>

          <h1>Smart Expense Tracker</h1>

          <p>
            Track spending, control useless expenses, build savings, and monitor
            investments from one powerful financial dashboard.
          </p>
        </motion.div>

        <motion.div
          className="auth-insight-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div>
            <span>Monthly Savings</span>
            <h2>₹12,450</h2>
            <p>+18.4% better than last month</p>
          </div>

          <div className="mini-chart">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </motion.div>

        <div className="auth-feature-row">
          <div>
            <FaChartLine />
            <span>Live Insights</span>
          </div>

          <div>
            <FaLock />
            <span>JWT Secure</span>
          </div>
        </div>
      </section>

      <section className="auth-right">
        <motion.form
          className="auth-card"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
        >
          <div className="auth-card-header">
            <h2>Welcome Back</h2>
            <p>Login to your personal finance command center.</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <label className="input-group">
            <span>Email Address</span>
            <div className="input-box">
              <FaEnvelope />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </label>

          <label className="input-group">
            <span>Password</span>
            <div className="input-box">
              <FaLock />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </label>

          <Button
            type="submit"
            loading={loading}
            className="auth-submit"
            icon={!loading ? <FaArrowRight /> : null}
          >
            Login
          </Button>

          <Button
            variant="ghost"
            type="button"
            className="google-btn"
            icon={<FaGoogle />}
          >
            Continue with Google
          </Button>

          <p className="auth-switch">
            New here? <Link to="/register">Create an account</Link>
          </p>
        </motion.form>
      </section>
    </main>
  );
}

export default Login;