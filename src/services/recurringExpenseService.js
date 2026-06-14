import axios from "axios";
import { getAuthHeader } from "./authService";

const API_URL =
  "http://localhost:5500/api/recurring-expenses";

export const getRecurringExpenses = async () => {
  const response = await axios.get(
    API_URL,
    getAuthHeader()
  );

  return response.data;
};

export const createRecurringExpense = async (
  recurringExpenseData
) => {
  const response = await axios.post(
    API_URL,
    recurringExpenseData,
    getAuthHeader()
  );

  return response.data;
};

export const deleteRecurringExpense = async (
  id
) => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    getAuthHeader()
  );

  return response.data;
};