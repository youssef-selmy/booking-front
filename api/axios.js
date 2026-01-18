import axios from "axios";

const api = axios.create({
  baseURL: "http://72.60.34.197:8000/api/v1", // your .NET API base url
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;