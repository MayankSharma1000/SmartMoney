import axios from "axios";
import { getAuthHeader } from "./authService";

const API_URL = "http://localhost:5500/api/savings";

/* ========================= */
/* GET SAVINGS GOALS */
/* ========================= */

export const getSavingsGoals = async () => {
  const response = await axios.get(
    API_URL,
    getAuthHeader()
  );

  return response.data;
};

/* ========================= */
/* CREATE SAVINGS GOAL */
/* ========================= */

export const createSavingsGoal = async (goalData) => {
  const response = await axios.post(
    API_URL,
    goalData,
    getAuthHeader()
  );

  return response.data;
};

/* ========================= */
/* UPDATE SAVINGS GOAL */
/* ========================= */

export const updateSavingsGoal = async (
  goalId,
  goalData
) => {
  const response = await axios.put(
    `${API_URL}/${goalId}`,
    goalData,
    getAuthHeader()
  );

  return response.data;
};

/* ========================= */
/* DELETE SAVINGS GOAL */
/* ========================= */

export const deleteSavingsGoal = async (goalId) => {
  const response = await axios.delete(
    `${API_URL}/${goalId}`,
    getAuthHeader()
  );

  return response.data;
};