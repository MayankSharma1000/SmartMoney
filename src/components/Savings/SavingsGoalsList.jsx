import SavingsGoalCard from "./SavingsGoalCard";

function SavingsGoalsList({
  goals,
  handleDelete,
  handleEdit
}) {
  if (goals.length === 0) {
    return (
      <div className="empty-goals">

        <h2>No Savings Goals</h2>

        <p>
          Create your first savings goal to begin tracking your financial journey.
        </p>

      </div>
    );
  }

  return (
    <section
      className="goals-grid"
    >

      {goals.map(goal => (
        <SavingsGoalCard
        key={goal._id}
        goal={goal}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        />
      ))}

    </section>
  );
}

export default SavingsGoalsList;
