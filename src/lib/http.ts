// src/utils/http.ts
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

// 定义接口返回的数据类型
interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

// 创建 Axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: "https://api.rebang.today/v1", // 基础 URL
  timeout: 10000, // 超时时间
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (
    response: AxiosResponse<ApiResponse<unknown>>
  ): AxiosResponse<ApiResponse<unknown>> => {
    const { data } = response;
    if (data.code !== 200) {
      console.error(`API Error: ${data.message}`);
      throw new Error(data.message);
    }
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    if (error.response) {
      const { status } = error.response;
      switch (status) {
        case 401:
          console.error("Unauthorized, please login again.");
          break;
        case 403:
          console.error("Forbidden, no permission.");
          break;
        case 404:
          console.error("Resource not found.");
          break;
        default:
          console.error(`HTTP Error: ${status}`);
      }
    } else if (error.request) {
      console.error("No response received from the server.");
    } else {
      console.error(`Request Error: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

// 封装 GET 请求
export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const res = await instance.get<ApiResponse<T>>(url, config);
  return res.data.data;
};

// 封装 POST 请求
export const post = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  const res = await instance.post<ApiResponse<T>>(url, data, config);
  return res.data.data;
};

// 封装 PUT 请求
export const put = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  const res = await instance.put<ApiResponse<T>>(url, data, config);
  return res.data.data;
};

// 封装 DELETE 请求
export const del = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const res = await instance.delete<ApiResponse<T>>(url, config);
  return res.data.data;
};
