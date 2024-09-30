const JWT_TOKEN_KEY = 'jwtToken';

export const StorageService = {
    getToken: () => localStorage.getItem(JWT_TOKEN_KEY),
    setToken: (token: string) => localStorage.setItem(JWT_TOKEN_KEY, token),
    clearToken: () => localStorage.removeItem(JWT_TOKEN_KEY),
};