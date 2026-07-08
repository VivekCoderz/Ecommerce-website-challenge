import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/authSlice.js"
import cartReducer from "./feature/cartSlice.js"
const store = configureStore({
    reducer : {
        auth: authReducer,
        cart : cartReducer
    }
})

export default store