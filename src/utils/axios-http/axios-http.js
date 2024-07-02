/* eslint-disable */
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_URL_BE,
});

instance.interceptors.response.use(
  (response) => response, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      const accessToken = localStorage.getItem('accessToken');
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_APP_URL_BE}/api/Users/refresh-token`, { refreshToken, accessToken });
        localStorage.setItem('accessToken', data.accessToken);
        return instance(originalRequest);
      } catch (error) {
        console.error(error);
        //truong hop khong refresh duoc token
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
const request = (config) => {
  return instance({ ...config });
};

const requestWithToken = (config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('Bạn cần phải đăng nhập để thực hiện chức năng này!');
  }
  return instance({ ...config, headers: { Authorization: `Bearer ${accessToken}` } });
};

export { request, requestWithToken };