import {createSlice} from "@reduxjs/toolkit";
import {AuthState} from "@/shared/types";

const initialState: AuthState = {
    isAuthorized: false,
    token: null,
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
            localStorage.removeItem('jwtToken');
        },
    }
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;