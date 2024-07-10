import axios from "axios";

const Base_URL = "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: Base_URL,
});


export { axiosInstance };
