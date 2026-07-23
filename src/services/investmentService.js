import axios from "axios";
import { getAuthHeader } from "./authService";

import { API_URL } from "../config/api";

const INVESTMENT_API_URL = `${API_URL}/investments`;

/* ========================= */
/* GET INVESTMENTS */
/* ========================= */

export const getInvestments = async () => {
  const response = await axios.get(
    INVESTMENT_API_URL,
    getAuthHeader()
  );

  return response.data;
};

/* ========================= */
/* CREATE INVESTMENT */
/* ========================= */

export const createInvestment = async (investmentData) => {
  const response = await axios.post(
    INVESTMENT_API_URL,
    investmentData,
    getAuthHeader()
  );

  return response.data;
};

/* ========================= */
/* UPDATE INVESTMENT */
/* ========================= */

export const updateInvestment = async (
  investmentId,
  investmentData
) => {
  const response = await axios.put(
    `${INVESTMENT_API_URL}/${investmentId}`,
    investmentData,
    getAuthHeader()
  );

  return response.data;
};

/* ========================= */
/* DELETE INVESTMENT */
/* ========================= */

export const deleteInvestment = async (investmentId) => {
  const response = await axios.delete(
    `${INVESTMENT_API_URL}/${investmentId}`,
    getAuthHeader()
  );

  return response.data;
};
