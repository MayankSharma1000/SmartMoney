import InvestmentForm from "@/components/Investments/InvestmentForm";
import InvestmentList from "@/components/Investments/InvestmentList";
import EmptyState from "@/components/shared/EmptyState";
import PageHeader from "@/components/shared/PageHeader";

import {
  useEffect,
  useMemo,
  useState
} from "react";

import AppShell from "../components/layout/AppShell/AppShell";
import Navbar from "../components/Navbar/Navbar.jsx";

import {
  createInvestment,
  deleteInvestment,
  getInvestments,
  updateInvestment,
} from "@/services/investmentService";

function Investments() {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    type: "Mutual Fund",
    investedAmount: "",
    currentValue: "",
    purchaseDate: "",
    platform: "",
    notes: ""
  });

  const [editingId, setEditingId] = useState(null);

  const loadInvestments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getInvestments();
      setInvestments(
          response.data?.investments || []
      );

    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load investments."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvestments();
  }, []);

  const totalInvested = useMemo(() => {
    return investments.reduce(
      (sum, item) => sum + Number(item.investedAmount || 0),
      0
    );
  }, [investments]);

  const currentValue = useMemo(() => {
    return investments.reduce(
      (sum, item) => sum + Number(item.currentValue || 0),
      0
    );
  }, [investments]);

  const profit = useMemo(() => {
    return currentValue - totalInvested;
  }, [currentValue, totalInvested]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddInvestment = async (e) => {
    e.preventDefault();

    try {
      setError("");

      if (editingId) {

        const response = await updateInvestment(
          editingId,
          formData
        );

        setInvestments((prev) =>
          prev.map((item) =>
            item._id === editingId
              ? response.data
              : item
          )
        );

        setEditingId(null);

      } else {

        const response = await createInvestment(formData);

        setInvestments((prev) => [
          response.data,
          ...prev,
        ]);

      }

      setFormData({
        name: "",
        platform: "",
        type: "Stock",
        investedAmount: "",
        currentValue: "",
        purchaseDate: "",
        notes: "",
      });

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Failed to save investment."
      );

    }
  };

  const handleEdit = (investment) => {

    setEditingId(investment._id);

    setFormData({
      name: investment.name || "",
      type: investment.type || "",
      platform: investment.platform || "",
      investedAmount: investment.investedAmount || "",
      currentValue: investment.currentValue || "",
      purchaseDate: investment.purchaseDate
        ? investment.purchaseDate.substring(0, 10)
        : "",
      notes: investment.notes || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this investment?"
    );
    if (!confirmed) return;
    try {
      setError("");

      await deleteInvestment(id);

      setInvestments((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to delete investment."
      );
    }
  };

  return (
    <AppShell>
      <Navbar />

      <PageHeader
        title="Investment Tracker"
        subtitle="Track mutual funds, stocks, gold, crypto, SIPs, invested amount, current value and profit/loss from MongoDB."
      />

      {error && <div className="auth-error">{error}</div>}

      <section className="stats-grid investment-stats">
        {/* Keep all three stat cards exactly as they are */}
      </section>

      <section className="expense-layout">
        <InvestmentForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleAddInvestment}
          isEditing={Boolean(editingId)}
        />

        <div className="expenses-panel glass-card">
          <div className="expenses-summary">
            <div>
              <p>Portfolio Holdings</p>
              <h2>{investments.length}</h2>
            </div>

            <span>Active investments</span>
          </div>

          {loading ? (
            <p className="progress-text">Loading investments...</p>
          ) : investments.length === 0 ? (
            <EmptyState
              title="No Investments Yet"
              description="Start tracking your portfolio by adding your first investment."
              actionText="Add Investment"
              onAction={() =>
                document
                  .querySelector("form")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            />
          ) : (
            <InvestmentList
              investments={investments}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </section>
    </AppShell>
  );
}

export default Investments;
