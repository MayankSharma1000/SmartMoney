import axios from "axios";
import { getAuthHeader } from "./authService";

import { API_URL } from "../config/api";

const EXPENSE_API_URL = `${API_URL}/expenses`;

/* ========================= */
/* GET EXPENSES */
/* ========================= */

export const getExpenses = async () => {
  const response = await axios.get(EXPENSE_API_URL, getAuthHeader());
  return response.data;
};

/* ========================= */
/* ADD EXPENSE */
/* ========================= */

export const addExpense = async (expenseData) => {
  const response = await axios.post(
    EXPENSE_API_URL,
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
    `${EXPENSE_API_URL}/${expenseId}`,
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
    `${EXPENSE_API_URL}/${expenseId}`,
    getAuthHeader()
  );

  return response.data;
};