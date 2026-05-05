import axios, { AxiosInstance, AxiosResponse } from 'axios';

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      const message = error.response?.data?.message || 'Lỗi kết nối server';
      return Promise.reject(new Error(message));
    }
  );

  export default apiClient;