const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
  "http://localhost:5500";

export const API_URL = `${API_BASE_URL}/api`;

export default API_URL;
