import axios from "axios";
import { getAuthHeader } from "./authService";

import { API_URL } from "../config/api";

const FEEDBACK_API_URL = `${API_URL}/feedback`;

export const submitFeedback = async (message) => {
  const response = await axios.post(
    FEEDBACK_API_URL,
    { message },
    getAuthHeader()
  );

  return response.data;
};

export const getMyFeedback = async () => {
  const response = await axios.get(FEEDBACK_API_URL, getAuthHeader());

  return response.data;
};