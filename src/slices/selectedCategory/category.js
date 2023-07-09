import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: 0,
};

const categorySelectSlice = createSlice({
  name: "selectedCategory",
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

// это actions условно generators
export const { selectCategory } = categorySelectSlice.actions;

// это reducer
export default categorySelectSlice.reducer;
