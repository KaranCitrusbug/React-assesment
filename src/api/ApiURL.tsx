import axios, { AxiosResponse } from "axios";

const API_URL = process.env.REACT_APP_AUTHENTICATION_API_URL;


export const noAuthApi = axios.create({
  baseURL:  API_URL,
  headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    
  },
  withCredentials: false,
  responseType: "json",
});

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
  responseType: "json",
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const getToken = localStorage.getItem("accessToken");
    const token = JSON?.parse(getToken!);
    const accessToken = token?.access;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
