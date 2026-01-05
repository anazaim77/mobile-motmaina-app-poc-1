import axios, { AxiosError } from "axios";
import { API_BASE_URL, APP_VARIANT, APP_ENV } from "@/shared/config/env";
import { tokenProvider } from "./tokenProvider";
import { normalizeError } from "./apiError";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - inject auth token and metadata headers
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await tokenProvider?.getAccessToken?.();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add metadata headers
    config.headers["X-App-Variant"] = APP_VARIANT;
    config.headers["X-App-Env"] = APP_ENV;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor - handle errors and 401 responses
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const normalizedError = normalizeError(error);

    // Handle 401 - clear session
    if (normalizedError.statusCode === 401) {
      await tokenProvider?.clearSession?.();
    }

    return Promise.reject(normalizedError);
  },
);
