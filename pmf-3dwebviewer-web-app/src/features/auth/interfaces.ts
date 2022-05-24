export interface ILoginForm {
    email: string | undefined;
    password: string | undefined;
}

export interface ILoginResponse {
    accessToken: {
        token: string;
        expiresIn: number;
    };
    refreshToken: {
        token: string;
        expiresIn: number;
    };
    profile: IUser;
}

export interface IUser {
    id: string;
    email: string;
    fullName: string;
}
