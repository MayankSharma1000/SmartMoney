import axios from "axios";
import { getAuthHeader } from "./authService";

import { API_URL } from "../config/api";

const DASHBOARD_API_URL = `${API_URL}/dashboard`;

/* ========================= */
/* GET DASHBOARD SUMMARY */
/* ========================= */

export const getDashboardSummary = async () => {
  const response = await axios.get(
    `${DASHBOARD_API_URL}/summary`,
    getAuthHeader()
  );

  
  return response.data;
};