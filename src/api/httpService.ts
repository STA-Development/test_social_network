import axios, { InternalAxiosRequestConfig } from 'axios';
import { store } from '../Redux/Store/store';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000/',
});
const axiosAuthRequestInterceptor = (config: InternalAxiosRequestConfig) => {
	const token = store.getState()?.auth?.token;

	if (token !== '') {
		config.headers.Authorization = `Bearer ${token}`;
		config.timeout = 10000;
		config.timeoutErrorMessage = 'Axios request time riches to its limit :(';
	}
	return config;
};

axiosInstance.interceptors.request.use(axiosAuthRequestInterceptor);

export default {
	get: axiosInstance.get,
	post: axiosInstance.post,
	put: axiosInstance.put,
	delete: axiosInstance.delete,
	patch: axiosInstance.patch
};