/* eslint-disable */
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
      const originalRequest = error.data.success;
      console.log(originalRequest);
      
      if (error.data.result_detail === 500 && !originalRequest) {
        originalRequest = true;
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

const publicInstance = createAxiosInstance(import.meta.env.VITE_APP_URL_BE);
const authInstance = createAuthInstance(import.meta.env.VITE_APP_URL_BE);

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

export { request, requestWithToken, authInstance, publicInstance };