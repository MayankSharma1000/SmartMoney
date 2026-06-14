import { useEffect, useState } from "react";

import {
  getExpenses
} from "../services/expenseService";

export const useExpenses = () => {
  const [expenses, setExpenses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data =
          await getExpenses();

        setExpenses(
          data.expenses || []
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  return {
    expenses,
    loading
  };
};