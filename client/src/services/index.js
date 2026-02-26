// apiClient.js
import axios from "axios";

const baseURL =
  import.meta.env.MODE === "production"
    ? "DEV URL LGA DO HERE"
    : "http://127.0.0.1:8000";

const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000
});

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      return Promise.reject({
        status: error.response.status,
        message: error.response.data?.detail || "Something went wrong"
      });
    } else if (error.request) {
      return Promise.reject({
        status: 0,
        message: "Server not reachable"
      });
    } else {
      return Promise.reject({
        status: 0,
        message: error.message
      });
    }
  }
);

export default apiClient;