import axios from "axios";

const API_URL =
  "http://localhost:5500/api/ai";

export const getFinancialAdvice =
  async (token) => {
    const response =
      await axios.post(
        `${API_URL}/financial-advice`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

    return response.data;
  };