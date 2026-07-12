import axios from "axios";
import { getAuthHeader } from "./authService";

const API_URL = "http://localhost:5500/api/investments";

/* ========================= */
/* GET INVESTMENTS */
/* ========================= */

export const getInvestments = async () => {
  const response = await axios.get(
    API_URL,
    getAuthHeader()
  );

  return response.data;
};

/* ========================= */
/* CREATE INVESTMENT */
/* ========================= */

export const createInvestment = async (investmentData) => {
  const response = await axios.post(
    API_URL,
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
    `${API_URL}/${investmentId}`,
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
    `${API_URL}/${investmentId}`,
    getAuthHeader()
  );

  return response.data;
};
