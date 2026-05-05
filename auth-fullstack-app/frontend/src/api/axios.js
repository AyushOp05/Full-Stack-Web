import axios from "axios";

const apiBaseUrl =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? "/_/backend/api" : "http://localhost:5000/api");

const api = axios.create({
  baseURL: apiBaseUrl
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;

