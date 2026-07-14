import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/authSlice.js"
import cartReducer from "./feature/cartSlice.js"
import wishlistReducer from "./feature/wishListSlice.js"
const store = configureStore({
    reducer : {
        auth: authReducer,
        cart : cartReducer,
        wishlist : wishlistReducer
    }
})

export default store