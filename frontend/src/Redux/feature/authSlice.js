import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    isAuthenticated: false,
    user: null,
    error: null,
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {

        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },

        loginFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        logout: (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
        }

    }
});

export const {
    loginStart,
    loginSuccess,
    loginFail,
    logout
} = authSlice.actions;

export default authSlice.reducer;