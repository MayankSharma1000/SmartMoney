import axios from "axios";
import { getAuthHeader } from "./authService";

import { API_URL } from "../config/api";

const SAVINGS_API_URL = `${API_URL}/savings`;

/* ========================= */
/* GET SAVINGS GOALS */
/* ========================= */

export const getSavingsGoals = async () => {
  const response = await axios.get(
    SAVINGS_API_URL,
    getAuthHeader()
  );

  return response.data;
};

/* ========================= */
/* CREATE SAVINGS GOAL */
/* ========================= */

export const createSavingsGoal = async (goalData) => {
  const response = await axios.post(
    SAVINGS_API_URL,
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
    `${SAVINGS_API_URL}/${goalId}`,
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
    `${SAVINGS_API_URL}/${goalId}`,
    getAuthHeader()
  );

  return response.data;
};