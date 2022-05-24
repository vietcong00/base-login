import { IUser } from '@/features/auth/interfaces';
import { DEFAULT_LANGUAGE, SUPPORT_LANGUAGE } from './constants';
import { isStringify } from './helpers';
import { storage } from './localStorage';

const BUFFER_TIME = 60 * 1000; // 60s

export const enum AUTH_SERVICE_KEY {
    ACCESS_TOKEN = 'ACCESS_TOKEN',
    REFRESH_TOKEN = 'REFRESH_TOKEN',
    USER = 'USER',
    LANGUAGE = 'LANGUAGE',
    ACCESS_TOKEN_EXPIRED_AT = 'ACCESS_TOKEN_EXPIRED_AT',
    REFRESH_TOKEN_EXPIRED_AT = 'REFRESH_TOKEN_EXPIRED_AT',
}
class LocalStorageAuthService {
    setAccessToken(token: string): void {
        storage.setLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN, token);
    }

    setRefreshToken(token: string): void {
        storage.setLocalStorage(AUTH_SERVICE_KEY.REFRESH_TOKEN, token);
    }

    setAccessTokenExpiredAt(expiredIn: number): void {
        const expiredAt = new Date().getTime() + expiredIn * 1000 - BUFFER_TIME;
        storage.setLocalStorage(
            AUTH_SERVICE_KEY.ACCESS_TOKEN_EXPIRED_AT,
            String(expiredAt),
        );
    }

    setRefreshTokenExpiredAt(expiredIn: number): void {
        const expiredAt = new Date().getTime() + expiredIn * 1000 - BUFFER_TIME;
        storage.setLocalStorage(
            AUTH_SERVICE_KEY.REFRESH_TOKEN_EXPIRED_AT,
            String(expiredAt),
        );
    }

    setLanguage(value: SUPPORT_LANGUAGE): void {
        storage.setLocalStorage(AUTH_SERVICE_KEY.LANGUAGE, value);
    }

    getAccessToken(): string {
        return storage.getLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN);
    }

    getLanguage(): SUPPORT_LANGUAGE {
        return (storage.getLocalStorage(AUTH_SERVICE_KEY.LANGUAGE) ||
            DEFAULT_LANGUAGE) as SUPPORT_LANGUAGE;
    }

    resetAccessToken(): void {
        storage.setLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN, '');
    }

    resetRefreshToken(): void {
        storage.setLocalStorage(AUTH_SERVICE_KEY.REFRESH_TOKEN, '');
    }

    resetAccessTokenExpiredAt(): void {
        storage.setLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN_EXPIRED_AT, '');
    }

    resetRefreshTokenExpiredAt(): void {
        storage.setLocalStorage(AUTH_SERVICE_KEY.REFRESH_TOKEN_EXPIRED_AT, '');
    }

    resetAll(): void {
        this.resetAccessToken();
        this.resetAccessTokenExpiredAt();
        this.resetRefreshToken();
        this.resetRefreshTokenExpiredAt();
        this.setUser(null);
    }

    setUser(user: null | IUser): void {
        if (!user) {
            storage.setLocalStorage(AUTH_SERVICE_KEY.USER, '');
        }
        if (!isStringify(user)) {
            return;
        }
        storage.setLocalStorage(AUTH_SERVICE_KEY.USER, JSON.stringify(user));
    }
}

const localStorageAuthService = new LocalStorageAuthService();
export default localStorageAuthService;
