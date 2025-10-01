import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL || "localhost";
const port = import.meta.env.VITE_PORT || "8081";
// Create Axios instance
const axiosInstance = axios.create({
    baseURL: `${baseURL}:${port}/api`,
});

export default axiosInstance;
