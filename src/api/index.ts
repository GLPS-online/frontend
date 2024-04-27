import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_URL;

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  if (config.headers && token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default client;
