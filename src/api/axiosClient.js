import axios from "axios";
import { API_URL } from "@/constants/env.js";

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response) => (response && response.data ? response.data.message : response),
  (error) => Promise.reject(error)
);

export default axiosClient;
