import {createSlice} from "@reduxjs/toolkit";
import {StorageService} from "@/shared/services/storage-service.ts";
import {AuthState} from "@/shared/interfaces";

const isTokenValid = (): boolean => {
    const token = StorageService.getToken();
    if (!token) return false;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = payload.exp * 1000;
        return Date.now() < expirationTime;
    } catch (error) {
        console.error('Error parsing token:', error);
        return false;
    }
};

const initialState: AuthState = {
    isAuthorized: isTokenValid(),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state) => {
            state.isAuthorized = true;
        },
        logout: (state) => {
            state.isAuthorized = false;
        },
    }
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;