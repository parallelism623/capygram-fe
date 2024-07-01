/* eslint-disable */
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_URL_BE,
});

const request = (config) => {
  return instance({ ...config });
};

const requestWithToken = (config) => {
  const token = localStorage.getItem('token');
  // if (!token) {
  //   throw new Error('Bạn cần phải đăng nhập để thực hiện chức năng này!');
  // }
  return instance({ ...config, headers: { Authorization: `Bearer ${token}` } });
};

export { request, requestWithToken };