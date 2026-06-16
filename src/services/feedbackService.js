import axios from "axios";
import { getAuthHeader } from "./authService";

const API_URL = "http://localhost:5500/api/feedback";

export const submitFeedback = async (message) => {
  const response = await axios.post(
    API_URL,
    { message },
    getAuthHeader()
  );

  return response.data;
};

export const getMyFeedback = async () => {
  const response = await axios.get(API_URL, getAuthHeader());

  return response.data;
};