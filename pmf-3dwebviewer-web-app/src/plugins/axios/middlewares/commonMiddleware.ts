import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import momentTimezone from 'moment-timezone';
import { HttpMiddleware } from './httpMiddleware';
import { HttpStatus } from '../../../common/constants';
import { IBodyResponse } from '../../../common/interfaces';
import tokenService from '../../../common/authStorage';
import i18n from '../../vue-i18n';
export default class CommonMiddleware extends HttpMiddleware {
    async onRequest(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
        Object.assign(config, {
            headers: {
                ...config.headers,
                'X-Timezone': momentTimezone().format('Z'),
                'X-Timezone-Name': momentTimezone.tz.guess(),
                'accept-language': tokenService.getLanguage(),
                'Content-Type': 'application/json',
            },
        });
        return config;
    }

    onResponse(response: AxiosResponse): AxiosResponse {
        if (typeof response?.data === 'string') response.data = JSON.parse(response.data);
        response.data = {
            ...response?.data,
            success: true,
        };
        return response.data;
    }

    onResponseError(error: AxiosError): IBodyResponse<unknown> {
        if (error.response) {
            if (typeof error?.response?.data === 'string') {
                error.response.data = JSON.parse(error.response.data);
            }
            if (error?.response?.data) {
                error.response.data = {
                    ...((error?.response?.data as object) || {}),
                    success: false,
                };
            }

            return error.response.data as IBodyResponse<unknown>;
        } else if (error.request) {
            error.request.data = {
                ...(error?.request?.data || {}),
                success: false,
                isRequestError: true,
                message: error.message,
            };
            return error.request?.data;
        }
        return {
            ...error,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            statusText: i18n.global.t('common.errors.system'),
            headers: {},
            success: false,
            message: i18n.global.t('common.errors.system'),
            data: undefined,
            code: HttpStatus.INTERNAL_SERVER_ERROR,
        };
    }
}
