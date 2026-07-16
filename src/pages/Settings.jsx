import AppShell from "@/components/layout/AppShell/AppShell";
import Navbar from "@/components/Navbar/Navbar";
import SettingsSection from "@/components/Settings/SettingsSection";

import Button from "@/components/ui/Button";
import "@/styles/pages/settings.css";

import {
  FaDatabase,
  FaGlobe,
  FaPalette,
  FaShieldAlt,
  FaSignOutAlt
} from "react-icons/fa";

function Settings() {
  return (
    <AppShell>
      <Navbar />

      <section className="page-header">
        <h1>Settings</h1>
        <p>
          Manage your profile, preferences and application settings.
        </p>
      </section>

      <SettingsSection
        title="Profile"
        description="Basic account information"
      >
        <div className="settings-row">
          <strong>Name</strong>
          <span>Mayank Sharma</span>
        </div>

        <div className="settings-row">
          <strong>Email</strong>
          <span>Logged in account</span>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Appearance"
        description="Customize your experience"
      >
        <div className="settings-row">
          <span>
            <FaPalette /> Theme
          </span>

          <span>Dark Mode</span>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Preferences"
        description="Regional settings"
      >
        <div className="settings-row">
          <span>
            <FaGlobe /> Currency
          </span>

          <span>Indian Rupee (₹)</span>
        </div>

        <div className="settings-row">
          <span>Timezone</span>

          <span>Asia/Kolkata</span>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Data"
        description="Manage your application data"
      >
        <Button>
          <FaDatabase />

          Export Data
        </Button>
      </SettingsSection>

      <SettingsSection
        title="Security"
        description="Session management"
      >
        <Button>
          <FaShieldAlt />

          Change Password
        </Button>

        <Button>
          <FaSignOutAlt />

          Logout
        </Button>
      </SettingsSection>
    </AppShell>
  );
}

export default Settings;
