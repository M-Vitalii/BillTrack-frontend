import { Dispatch } from '@reduxjs/toolkit';

import AuthService from "@/features/auth/services/auth-service.ts";
import { loginSuccess } from '@/redux/auth/auth-slice';
import { logout as logoutAction } from '@/redux/auth/auth-slice';
import { LoginCredentials } from '@/shared/types';

export const login = (credentials: LoginCredentials) => async (dispatch: Dispatch) => {
    try {
        await AuthService.login(credentials);
        dispatch(loginSuccess());
    } catch (error) {
        console.error('Login failed', error);
        throw error;
    }
};

export const logout = () => async (dispatch: Dispatch) => {
    try {
        AuthService.logout();
        dispatch(logoutAction());
    } catch (error) {
        console.error('Logout failed', error);
    }
};
