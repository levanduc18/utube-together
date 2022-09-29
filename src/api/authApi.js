import axiosClient from "./axiosClient";
import URL from "@/constants/url.js";

const getProfile = () =>
  axiosClient.get(URL.getProfile, { withCredentials: true });

const getAuthenticated = () =>
  axiosClient.get(URL.getAuthenticated, { withCredentials: true });

export default { getProfile, getAuthenticated };
