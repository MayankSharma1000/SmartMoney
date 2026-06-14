import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaWallet,
  FaUser,
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaPiggyBank,
  FaShieldAlt
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
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
      await register(formData);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again."
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

          <h1>Build Financial Discipline</h1>

          <p>
            Create your account and start tracking expenses, savings goals,
            investments, and monthly spending habits like a pro.
          </p>
        </motion.div>

        <motion.div
          className="auth-insight-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div>
            <span>Money Leaks Found</span>
            <h2>₹4,800</h2>
            <p>Potential savings from avoidable spending</p>
          </div>

          <div className="mini-ring">
            <FaPiggyBank />
          </div>
        </motion.div>

        <div className="auth-feature-row">
          <div>
            <FaShieldAlt />
            <span>Secure Account</span>
          </div>

          <div>
            <FaPiggyBank />
            <span>Savings Goals</span>
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
            <h2>Create Account</h2>
            <p>Start your smart finance tracking journey today.</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <label className="input-group">
            <span>Full Name</span>
            <div className="input-box">
              <FaUser />
              <input
                type="text"
                name="name"
                placeholder="Mayank Sharma"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </label>

          <label className="input-group">
            <span>Email Address</span>
            <div className="input-box">
              <FaEnvelope />
              <input
                type="email"
                name="email"
                placeholder="mayank@example.com"
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
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
              />
            </div>
          </label>

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
            {!loading && <FaArrowRight />}
          </button>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </motion.form>
      </section>
    </main>
  );
}

export default Register;