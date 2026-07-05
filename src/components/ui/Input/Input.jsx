import React from "react";
import "./Input.css";

function Input({
  label,
  error,
  className = "",
  ...props
}) {
  return (
    <div className="input-group">
      {label && (
        <label className="input-label">
          {label}
        </label>
      )}

      <input
        className={`input-field ${error ? "input-error" : ""} ${className}`}
        {...props}
      />

      {error && (
        <p className="input-error-text">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;