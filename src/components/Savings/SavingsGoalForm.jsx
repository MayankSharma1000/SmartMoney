import Button from "@/components/ui/Button";
import { FaPlus, FaSave } from "react-icons/fa";

function SavingsGoalForm({
  formData,
  handleChange,
  handleSubmit,
  submitLoading,
  isEditing,
}) {
  return (
    <section className="goal-form-card">
      <div className="goal-form-header">
        <div>
          <h2>
            {isEditing
              ? "Update Savings Goal"
              : "Create Savings Goal"}
          </h2>

          <p>
            Track your progress towards every financial milestone.
          </p>
        </div>
      </div>

      <form
        className="goal-form"
        onSubmit={handleSubmit}
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
          {isEditing ? <FaSave /> : <FaPlus />}

          {submitLoading
            ? isEditing
              ? "Updating..."
              : "Creating..."
            : isEditing
            ? "Update Goal"
            : "Create Goal"}
        </Button>
      </form>
    </section>
  );
}

export default SavingsGoalForm;
