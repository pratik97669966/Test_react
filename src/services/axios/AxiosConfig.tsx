// axios/AxiosConfig.ts
import axios from 'axios';

// Create Axios instance
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// Request interceptor
instance.interceptors.request.use(
  async (config) => {
    if (!config.headers.Authorization) {
      const tokenFromStorage = localStorage.getItem('token');
      if (tokenFromStorage) {
        config.headers.Authorization = 'bearer ' + tokenFromStorage;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
let isRefreshing = false;
let refreshQueue: ((token: string) => void)[] = [];

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401 && !error.config._isRetry) {
      const originalRequest = error.config;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await refreshToken();
          originalRequest._isRetry = true;
          originalRequest.headers['Authorization'] = 'bearer ' + newToken;

          return instance(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } else {
        return new Promise((resolve) => {
          refreshQueue.push((token: string) => {
            originalRequest._isRetry = true;
            originalRequest.headers['Authorization'] = 'bearer ' + token;

            resolve(instance(originalRequest));
          });
        });
      }
    }
    return Promise.reject(error);
  },
);

async function refreshToken() {
  const bodyFormData = new FormData();
  const refresh_token = localStorage.getItem('refresh_token') + '';
  bodyFormData.append('grant_type', 'refresh_token');
  bodyFormData.append('refresh_token', refresh_token);

  const response = await instance.post('/userauth/oauth/token', bodyFormData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Basic ' + btoa('qup-business:bus$6web$#'),
    },
    withCredentials: true,
  });

  const newToken = response.data.access_token;
  localStorage.setItem('token', newToken);
  refreshQueue.forEach((resolve) => resolve(newToken));
  refreshQueue = [];

  return newToken;
}

export default instance;
