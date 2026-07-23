import axios from "axios";

import { API_URL } from "../config/api";

const AI_API_URL = `${API_URL}/ai`;

export const getFinancialAdvice =
  async (token) => {
    const response =
      await axios.post(
        `${AI_API_URL}/financial-advice`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

    return response.data;
  };