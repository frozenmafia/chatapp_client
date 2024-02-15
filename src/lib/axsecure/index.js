import axios, { AxiosError } from "axios";
import { url } from "../../redux/constants/urls";
import {
  EMAIL,
  ID,
  LAST_ACTIVE_KEY,
  TOKEN,
  USERNAME,
} from "../../redux/constants/localStorage";

class AxSecure {
  constructor() {
    const baseUrl = `http://${url}`;

    this.instance = axios.create({
      baseURL: baseUrl,
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  setupInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
        if (error.code == AxiosError.ERR_BAD_REQUEST) {
          localStorage.removeItem(TOKEN);
          localStorage.removeItem(USERNAME);
          localStorage.removeItem(EMAIL);
          localStorage.removeItem(ID);
          localStorage.removeItem(LAST_ACTIVE_KEY);
        }
        return Promise.reject(error);
      }
    );
  }

  get(url, config) {
    return this.instance.get(url, config);
  }

  post(url, data, config) {
    const contentType =
      data instanceof FormData ? "multipart/form-data" : "application/json";
    const headers = {
      ...(config?.headers || {}),
      "Content-Type": contentType,
    };
    const updatedConfig = { ...config, headers };

    return this.instance.post(url, data, updatedConfig);
  }
}

const axsecure = new AxSecure();

export default axsecure;
