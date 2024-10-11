import envConfig from "@/config";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: envConfig.baseApi,
});

export default axiosInstance;
