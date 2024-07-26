/* eslint-disable */
import axios from 'axios';

const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
  });

  instance.interceptors.response.use(
    (response) => response, async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('refreshToken');
        const accessToken = localStorage.getItem('accessToken');
        //sẽ sửa sau
        const userId = localStorage.getItem('userId');
        try {
          const { data } = await axios.post(`${import.meta.env.VITE_APP_URL_BE}/api/Users/refresh-token`, { refreshToken, accessToken, id: userId });
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
  
  return instance;
};

const authInstance = createAxiosInstance(import.meta.env.VITE_APP_URL_BE);

const request = (instance, config) => {
  return instance({ ...config });
};

const requestWithToken = (instance, config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('Bạn cần phải đăng nhập để thực hiện chức năng này!');
  }
  return instance({ ...config, headers: { Authorization: `Bearer ${accessToken}` } });
};

export { request, requestWithToken, authInstance };