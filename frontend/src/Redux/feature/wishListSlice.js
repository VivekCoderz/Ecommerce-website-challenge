import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items : [],
    loading : false,
    error : null
}

const wishListSlice = createSlice({
    name : "wishlist",
    initialState,
    reducers : {
         setWishlist(state, action) {
      state.items = action.payload;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    }
    }
})

export const {setWishlist,setLoading,setError} = wishListSlice.actions
export default wishListSlice.reducer