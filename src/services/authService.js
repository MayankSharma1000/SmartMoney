import axios from "axios";

import { API_URL } from "../config/api";

const AUTH_API_URL = `${API_URL}/auth`;

/* ========================= */
/* REGISTER */
/* ========================= */

export const registerUser = async (userData) => {
  const response = await axios.post(
    `${AUTH_API_URL}/register`,
    userData
  );

  return response.data;
};

/* ========================= */
/* LOGIN */
/* ========================= */

export const loginUser = async (userData) => {
  const response = await axios.post(
    `${AUTH_API_URL}/login`,
    userData
  );

  return response.data;
};

/* ========================= */
/* AUTH HEADER */
/* ========================= */

export const getAuthHeader = () => {
  const token =
    localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};