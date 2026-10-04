// client/src/api.js
import axios from "axios";

// Automatically uses VITE_API_URL set on Vercel, or falls back to your live Render backend URL
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://vazragameverse-1.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
