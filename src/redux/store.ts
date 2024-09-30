import {configureStore} from "@reduxjs/toolkit";
import authSlice from "@/redux/auth/auth-slice.ts";

const store = configureStore({
    reducer: {
        auth: authSlice,
    },
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = typeof store.dispatch;
export default store;