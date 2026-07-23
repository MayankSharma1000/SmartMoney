import axios from "axios";
import { getAuthHeader } from "./authService";

import { API_URL } from "../config/api";

const RECURRING_API_URL = `${API_URL}/recurring-expenses`;

export const getRecurringExpenses = async () => {
  const response = await axios.get(
    RECURRING_API_URL,
    getAuthHeader()
  );

  return response.data;
};

export const createRecurringExpense = async (
  recurringExpenseData
) => {
  const response = await axios.post(
    RECURRING_API_URL,
    recurringExpenseData,
    getAuthHeader()
  );

  return response.data;
};

export const deleteRecurringExpense = async (
  id
) => {
  const response = await axios.delete(
    `${RECURRING_API_URL}/${id}`,
    getAuthHeader()
  );

  return response.data;
};