import apiClient from "@/shared/api/api-client.ts";
import { LoginCredentials } from "@/shared/types";

class AuthService {
    public async login(credentials: LoginCredentials): Promise<void> {
        try {
            const response = await apiClient.post<{jwtToken: string}>('/login', credentials);
            const token = response.data.jwtToken;
            localStorage.setItem('jwtToken', token);
        } catch (error) {
            throw new Error('Login failed');
        }
    }

    public logout(): void {
        localStorage.removeItem('jwtToken');
    }

    public getToken(): string | null {
        return localStorage.getItem('jwtToken');
    }
}

export default new AuthService();
