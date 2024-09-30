import {createSlice} from "@reduxjs/toolkit";
import {StorageService} from "@/shared/services/storage-service.ts";
import {AuthState} from "@/shared/interfaces";

const initialState: AuthState = {
    isAuthorized: !!StorageService.getToken(),
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