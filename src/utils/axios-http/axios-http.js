/* eslint-disable */
import {  refreshToken } from '@/api/authApi/auth';
import axios from 'axios';

//tao ra instance axios cho cac request khong can token
const createAxiosInstance = (baseURL) => {
  return axios.create({
    baseURL,
  });
};

const createAuthInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
  });

  instance.interceptors.response.use(
    (response) => response, async (error) => {

      if (error.response.status === 500 ) {
        
        try {
          const { data } = await refreshToken();
          
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);

          //gắn accessToken cho instance
          instance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;

        } catch (error) {
          console.error(error);
          //truong hop khong refresh duoc token
          // localStorage.removeItem('accessToken');
          // localStorage.removeItem('refreshToken');
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    }
  );
  
  return instance;
};

const publicInstance = createAxiosInstance(import.meta.env.VITE_APP_URL_BE);
const authInstance = createAuthInstance(import.meta.env.VITE_APP_URL_BE);
const postInstance = createAuthInstance(import.meta.env.VITE_APP_URL_BE_POST);

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

export { request, requestWithToken, authInstance, publicInstance, postInstance };