import axios from "axios";
import { getAuthHeader } from "./authService";

const API_URL = "http://localhost:5500/api/expenses";

/* ========================= */
/* GET EXPENSES */
/* ========================= */

export const getExpenses = async () => {
  const response = await axios.get(API_URL, getAuthHeader());
  return response.data;
};

/* ========================= */
/* ADD EXPENSE */
/* ========================= */

export const addExpense = async (expenseData) => {
  const response = await axios.post(
    API_URL,
    expenseData,
    getAuthHeader()
  );

  return response.data;
};

/* ========================= */
/* UPDATE EXPENSE */
/* ========================= */

export const updateExpense = async (expenseId, expenseData) => {
  const response = await axios.put(
    `${API_URL}/${expenseId}`,
    expenseData,
    getAuthHeader()
  );

  return response.data;
};

/* ========================= */
/* DELETE EXPENSE */
/* ========================= */

export const deleteExpense = async (expenseId) => {
  const response = await axios.delete(
    `${API_URL}/${expenseId}`,
    getAuthHeader()
  );

  return response.data;
};