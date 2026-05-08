import axios, { AxiosInstance } from 'axios';

// Webpack DefinePlugin replaces process.env.VITE_API_BASE_URL at build time.
// In Jest, setupTests.ts sets this value.
const BASE_URL = (typeof process !== 'undefined' && process.env?.VITE_API_BASE_URL) || 'http://localhost:5000';

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  loadingEvents.emit('start');
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    loadingEvents.emit('stop');
    return response.data;
  },
  (error) => {
    loadingEvents.emit('stop');
    const message = error.response?.data?.message || 'Lỗi kết nối server';
    return Promise.reject(new Error(message));
  }
);

type LoadingListener = (loading: boolean) => void;

class LoadingEventEmitter {
  private listeners: LoadingListener[] = [];
  private activeRequests = 0;

  on(listener: LoadingListener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  emit(event: 'start' | 'stop') {
    if (event === 'start') {
      this.activeRequests++;
    } else {
      this.activeRequests = Math.max(0, this.activeRequests - 1);
    }
    const isLoading = this.activeRequests > 0;
    this.listeners.forEach((l) => l(isLoading));
  }
}

export const loadingEvents = new LoadingEventEmitter();

export default apiClient;
