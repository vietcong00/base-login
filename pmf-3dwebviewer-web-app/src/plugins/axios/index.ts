import HttpMiddlewareService from './service';
import axios, { AxiosRequestConfig } from 'axios';
import AuthMiddleware from './middlewares/authMiddleware';
import CommonMiddleware from './middlewares/commonMiddleware';

const options: AxiosRequestConfig = {
    baseURL: process.env.VUE_APP_API_URL,
    responseType: 'json',
};

const axiosInstance = axios.create(options);

const axiosService = new HttpMiddlewareService(axiosInstance);
axiosService.register([new AuthMiddleware(), new CommonMiddleware()]);

export default axiosInstance;
