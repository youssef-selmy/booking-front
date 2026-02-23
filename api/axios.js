import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { domain } from "../globals";

const api = axios.create({
  baseURL: domain,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (!token) return config;

    try {
      const decoded = jwtDecode(token);
      const exp = decoded.exp * 1000;

      if (Date.now() >= exp) {
        localStorage.removeItem("token");

        window.location.href = "/login";

        return Promise.reject(new Error("Token expired"));
      }

      config.headers.Authorization = `Bearer ${token}`;
    } catch (err) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return Promise.reject(err);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
