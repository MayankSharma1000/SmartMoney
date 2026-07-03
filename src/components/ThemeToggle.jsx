import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import Button from "../components/ui/Button/Button";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle Theme"
    >
      <div className="theme-toggle-track">
        <div
          className={`theme-toggle-thumb ${
            theme === "dark" ? "dark" : "light"
          }`}
        >
          {theme === "dark" ? (
            <FaMoon size={14} />
          ) : (
            <FaSun size={14} />
          )}
        </div>
      </div>
    </Button>
  );
}

export default ThemeToggle;