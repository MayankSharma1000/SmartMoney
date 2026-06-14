import React from "react";
import { FaEnvelope, FaUser, FaWallet } from "react-icons/fa6";

import Sidebar from "../components/Sidebar.jsx";
import Navbar from "../components/Navbar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Navbar />

        <section className="page-header">
          <h1>Profile</h1>
          <p>Manage your account and personal finance preferences.</p>
        </section>

        <section className="profile-card glass-card">
          <div className="profile-avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : "M"}
          </div>

          <div className="profile-info">
            <div>
              <FaUser />
              <span>{user?.name || "Mayank Sharma"}</span>
            </div>

            <div>
              <FaEnvelope />
              <span>{user?.email || "mayank@example.com"}</span>
            </div>

            <div>
              <FaWallet />
              <span>Smart Expense Tracker User</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Profile;