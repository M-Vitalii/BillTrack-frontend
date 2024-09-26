import { api } from "@/shared/api/api-client";
import { StorageService } from "@/shared/services/storage-service";
import {LoginCredentials} from "@/shared/interfaces";

class AuthService {
    public async login(credentials: LoginCredentials): Promise<void> {
        try {
            const response = await api.post<{ jwtToken: string }>('/login', credentials);
            const token = response.data.jwtToken;
            StorageService.setToken(token);
        } catch (error) {
            throw new Error('Login failed');
        }
    }

    public logout(): void {
        StorageService.clearToken();
    }
}

export default new AuthService();
