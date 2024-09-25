export interface AuthState {
    isAuthorized: boolean;
    token: string | null;
}

export interface LoginCredentials {
    username: string;
    password: string;
}