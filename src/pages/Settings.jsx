import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppShell from "@/components/layout/AppShell/AppShell";
import Navbar from "@/components/Navbar/Navbar";
import SettingsSection from "@/components/Settings/SettingsSection";
import Button from "@/components/ui/Button";

import { useAuth } from "../context/AuthContext";
import { useFinancialReport } from "../hooks/useFinancialReport";

import "@/styles/pages/settings.css";

import {
  FaDatabase,
  FaGlobe,
  FaSignOutAlt,
} from "react-icons/fa";

function Settings() {
  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  const {
    exportPDF,
    exportExcel,
    loading,
  } = useFinancialReport();

  const [exporting, setExporting] =
    useState(false);

  const handleExportData = async () => {
    if (loading || exporting) {
      return;
    }

    try {
      setExporting(true);

      exportPDF();

      await exportExcel();
    } catch (error) {
      console.error(
        "Failed to export application data:",
        error
      );
    } finally {
      setExporting(false);
    }
  };

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <AppShell>
      <Navbar />

      <section className="page-header">
        <h1>Settings</h1>

        <p>
          Manage your account preferences
          and application data.
        </p>
      </section>

      <SettingsSection
        title="Account"
        description="Your SmartMoney account information"
      >
        <div className="settings-row">
          <strong>Name</strong>

          <span>
            {user?.name || "Not available"}
          </span>
        </div>

        <div className="settings-row">
          <strong>Email</strong>

          <span>
            {user?.email || "Not available"}
          </span>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Preferences"
        description="Financial preferences selected for your account"
      >
        <div className="settings-row">
          <span>
            <FaGlobe /> Currency
          </span>

          <span>
            {user?.currency || "INR"}
          </span>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Data"
        description="Export your financial information"
      >
        <Button
          onClick={handleExportData}
          disabled={
            loading || exporting
          }
        >
          <FaDatabase />

          {exporting
            ? "Exporting..."
            : loading
            ? "Preparing Data..."
            : "Export Data"}
        </Button>
      </SettingsSection>

      <SettingsSection
        title="Session"
        description="Manage your current session"
      >
        <Button onClick={handleLogout}>
          <FaSignOutAlt />
          Logout
        </Button>
      </SettingsSection>
    </AppShell>
  );
}

export default Settings;
