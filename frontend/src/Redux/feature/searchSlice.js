import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keyword: "",
  category: "",
  minPrice: 0,
  maxPrice: 10000,
  rating: "",
  sort: "",
  page: 1,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
      state.page = 1;
    },

    setCategory: (state, action) => {
      state.category = action.payload;
      state.page = 1;
    },

    setPrice: (state, action) => {
      state.minPrice = action.payload.minPrice;
      state.maxPrice = action.payload.maxPrice;
      state.page = 1;
    },

    setRating: (state, action) => {
      state.rating = action.payload;
      state.page = 1;
    },

    setSort: (state, action) => {
      state.sort = action.payload;
      state.page = 1;
    },

    setPage: (state, action) => {
      state.page = action.payload;
    },

    clearFilters: (state) => {
      state.keyword = "";
      state.category = "";
      state.minPrice = 0;
      state.maxPrice = 10000;
      state.rating = "";
      state.sort = "";
      state.page = 1;
    },
  },
});

export const {
  setKeyword,
  setCategory,
  setPrice,
  setRating,
  setSort,
  setPage,
  clearFilters,
} = searchSlice.actions;

export default searchSlice.reducer;