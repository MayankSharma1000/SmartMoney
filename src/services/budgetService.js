import axios from "axios";
import { getAuthHeader } from "./authService";

const API_URL =
  "http://localhost:5500/api/budget";

export const getBudget = async () => {
  const response = await axios.get(
    API_URL,
    getAuthHeader()
  );

  return response.data;
};

export const setBudget = async (
  budgetData
) => {
  const response = await axios.post(
    API_URL,
    budgetData,
    getAuthHeader()
  );

  return response.data;
};