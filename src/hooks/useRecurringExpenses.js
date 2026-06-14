import { useEffect, useState } from "react";

import {
  getRecurringExpenses
} from "../services/recurringExpenseService";

export const useRecurringExpenses =
  () => {
    const [expenses, setExpenses] =
      useState([]);

    const [loading, setLoading] =
      useState(true);

    useEffect(() => {
      const fetchExpenses =
        async () => {
          try {
            const data =
              await getRecurringExpenses();

            setExpenses(
              data.recurringExpenses ||
                []
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
      loading,
      setExpenses
    };
  };