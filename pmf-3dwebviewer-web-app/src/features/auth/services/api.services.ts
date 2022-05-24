import { ApiService } from '@/common/services/api';
import { IBodyResponse } from '@/common/interfaces';
import service from '@/plugins/axios';
import { ILoginForm, ILoginResponse } from '../interfaces';

class AuthApiService extends ApiService {
    login(user: ILoginForm) {
        return this.client.post<ILoginResponse, IBodyResponse<ILoginResponse>>(
            '/login',
            user,
        );
    }
}

export const authService = new AuthApiService({ baseUrl: '' }, service);
