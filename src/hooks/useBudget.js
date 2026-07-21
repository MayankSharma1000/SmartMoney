import { useEffect, useState } from "react";
import { getBudget } from "../services/budgetService";

export const useBudget = () => {
  const [budget, setBudget] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const data = await getBudget();

        if (data.budget) {
          setBudget(data.budget);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBudget();
  }, []);

  return {
    budget,
    loading,
    setBudget
  };
};