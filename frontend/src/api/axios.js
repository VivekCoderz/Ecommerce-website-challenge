import axios from "axios";

// Set VITE_API_URL in frontend/.env.local (e.g. http://localhost:5000) for local
// development. Without it, the deployed Render backend is used.
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "https://novacart-backend-45p2.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
