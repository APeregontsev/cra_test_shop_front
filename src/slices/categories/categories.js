import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

// это actions условно generators
export const { setCategories } = categoriesSlice.actions;

// это reducer
export default categoriesSlice.reducer;
