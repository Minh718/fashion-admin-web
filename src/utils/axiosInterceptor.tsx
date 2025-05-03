// src/utils/axiosInterceptor.js
import axios from "axios";
import Cookies from "js-cookie";
import { baseURL } from "../constants/index";

// Create an Axios instance
// const apiUrl = process.env.REACT_APP_API_URL;

const setCookieSecure = ({ accessToken, refreshToken }) => {
  Cookies.set("accessToken", accessToken, { secure: true, sameSite: "strict" });
  Cookies.set("refreshToken", refreshToken, {
    secure: true,
    sameSite: "strict",
  });
};

const api = axios.create({
  baseURL: baseURL, // Replace with your API base URL
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken"); // Get access token from localStorage
    const userId = Cookies.get("x-user-id"); // Get access token from localStorage
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // Add Authorization header
      config.headers["x-user-id"] = userId; // Add Authorization header
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => response, // Return response if no error
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is a 401 (Unauthorized)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark request as retried

      // Try to refresh the access token
      const refreshToken = localStorage.getItem("refreshToken"); // Get refresh token

      if (refreshToken) {
        try {
          const response = await axios.post(`${baseURL}/auth/refreshtoken`, {
            refreshToken,
          });

          const { accessToken, refreshToken2 } = response.data.result; // Extract new access token
          setCookieSecure({
            accessToken: accessToken,
            refreshToken: refreshToken2,
          });

          // Update the original request's Authorization header
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          // Retry the original request with the new access token
          return axios(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token error:", refreshError);

          // Handle refresh token error (e.g., redirect to login)
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          Cookies.remove("x-user-id");
          window.location.href = "/signin"; // Redirect to signin page
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token available, redirect to signin
        window.location.href = "/signin";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error); // Reject the promise with the original error
  }
);
export default api;
