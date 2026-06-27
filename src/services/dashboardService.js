import axios from "axios";
import { getAuthHeader } from "./authService";

const API_URL = "http://localhost:5500/api/dashboard";

/* ========================= */
/* GET DASHBOARD SUMMARY */
/* ========================= */

export const getDashboardSummary = async () => {
  const response = await axios.get(
    `${API_URL}/summary`,
    getAuthHeader()
  );

  console.log(
    "Dashboard API Response:",
    response.data
  );
  
  return response.data;
};