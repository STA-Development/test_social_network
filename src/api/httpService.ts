import axios, { InternalAxiosRequestConfig } from 'axios';
import { store } from '../Redux/Store/store';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
});
const axiosAuthRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = store.getState()?.auth?.token;
  const axiosConfig = config;
  if (token !== '') {
    axiosConfig.headers.Authorization = `Bearer ${token}`;
    axiosConfig.timeout = 10000;
    axiosConfig.timeoutErrorMessage =
      'Axios request time riches to its limit :(';
  }
  return axiosConfig;
};

axiosInstance.interceptors.request.use(axiosAuthRequestInterceptor);

export default {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
  patch: axiosInstance.patch,
};
