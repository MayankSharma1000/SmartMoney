import React from "react";
import { FaPlus } from "react-icons/fa";
import Button from "../ui/Button/Button";

function SavingsGoalForm({
  formData,
  handleChange,
  handleAddGoal,
  submitLoading
}) {
  return (
    <section className="goal-form-card">

      <div className="goal-form-header">
        <div>
          <h2>Create Savings Goal</h2>
          <p>
            Track your progress towards every financial milestone.
          </p>
        </div>
      </div>

      <form
        className="goal-form"
        onSubmit={handleAddGoal}
      >

        <div className="form-row">

          <input
            type="text"
            name="title"
            placeholder="Goal Name"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option>Emergency Fund</option>
            <option>Car</option>
            <option>Travel</option>
            <option>House</option>
            <option>Education</option>
            <option>Retirement</option>
            <option>Other</option>
          </select>

        </div>

        <div className="form-row">

          <input
            type="number"
            name="targetAmount"
            placeholder="Target Amount"
            value={formData.targetAmount}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="currentAmount"
            placeholder="Current Savings"
            value={formData.currentAmount}
            onChange={handleChange}
          />

        </div>

        <div className="form-row">

          <input
            type="date"
            name="targetDate"
            value={formData.targetDate}
            onChange={handleChange}
          />

          <input
            type="text"
            name="notes"
            placeholder="Short Note"
            value={formData.notes}
            onChange={handleChange}
          />

        </div>

        <Button
          type="submit"
          disabled={submitLoading}
        >
          <FaPlus />

          {submitLoading
            ? "Creating..."
            : "Create Goal"}
        </Button>

      </form>

    </section>
  );
}

export default SavingsGoalForm;