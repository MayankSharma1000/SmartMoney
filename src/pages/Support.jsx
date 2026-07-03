import React, { useEffect, useState } from "react";
import {
  FaHeadset,
  FaPaperPlane,
  FaInfoCircle,
  FaSignOutAlt
} from "react-icons/fa";

import Button from "../components/ui/Button/Button";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import {
  submitFeedback,
  getMyFeedback
} from "../services/feedbackService.js";

function Support() {
  const { logout, user } = useAuth();

  const [feedback, setFeedback] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const loadFeedback = async () => {
    try {
      const data = await getMyFeedback();
      setFeedbackList(data.feedback || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    try {
      setSending(true);
      setMessage("");
      setError("");

      const data = await submitFeedback(feedback);

      setMessage(data.message || "Feedback submitted successfully.");
      setFeedback("");

      await loadFeedback();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Feedback could not be submitted. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Navbar />

        <section className="page-header">
          <h1>Support Center</h1>
          <p>
            Share feedback, report issues, request improvements, or safely
            logout from your account.
          </p>
        </section>

        <section className="support-grid">
          <div className="glass-card support-card">
            <div className="support-header">
              <div className="stat-icon">
                <FaHeadset />
              </div>

              <div>
                <h3>Feedback & Support</h3>
                <p>Tell us what feels confusing, broken, missing, or useful.</p>
              </div>
            </div>

            <form className="support-form" onSubmit={handleFeedbackSubmit}>
              {error && <div className="auth-error">{error}</div>}

              <textarea
                placeholder="Write your feedback here..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              />

              <Button className="auth-submit" type="submit" disabled={sending}>
                <FaPaperPlane />
                {sending ? "Sending..." : "Send Feedback"}
              </Button>

              {message && <p className="progress-text">{message}</p>}
            </form>
          </div>

          <div className="glass-card support-card">
            <div className="support-header">
              <div className="stat-icon">
                <FaInfoCircle />
              </div>

              <div>
                <h3>Account</h3>
                <p>Logged in as {user?.name || "SmartMoney User"}.</p>
              </div>
            </div>

            <Button className="support-logout-btn" onClick={logout}>
              <FaSignOutAlt />
              Logout Securely
            </Button>
          </div>
        </section>

        <section className="glass-card support-history">
          <h3>My Feedback History</h3>

          {feedbackList.length === 0 ? (
            <p className="progress-text">No feedback submitted yet.</p>
          ) : (
            <div className="feedback-list">
              {feedbackList.map((item) => (
                <div className="feedback-item" key={item._id}>
                  <p>{item.message}</p>

                  <div className="feedback-meta">
                    <span>{item.status}</span>
                    <span>
                      {new Date(item.createdAt).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Support;