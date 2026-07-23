import axios from "axios";
import { getAuthHeader } from "./authService";

import { API_URL } from "../config/api";

const BUDGET_API_URL = `${API_URL}/budget`;

export const getBudget = async () => {
  const response = await axios.get(
    BUDGET_API_URL,
    getAuthHeader()
  );

  return response.data;
};

export const setBudget = async (
  budgetData
) => {
  const response = await axios.post(
    BUDGET_API_URL,
    budgetData,
    getAuthHeader()
  );

  return response.data;
};