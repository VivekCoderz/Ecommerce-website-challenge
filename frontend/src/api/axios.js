import axios from "axios";

const api = axios.create({
//   baseURL: 'https://novacart-backend-45p2.onrender.com',
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;