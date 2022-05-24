import { AxiosRequestConfig } from 'axios';
import { HttpMiddleware } from './httpMiddleware';
import tokenService from '../../../common/authStorage';

export default class AuthMiddleware extends HttpMiddleware {
    async onRequest(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
        // set authorization
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${tokenService.getAccessToken()}`,
        };
        return config;
    }
}
