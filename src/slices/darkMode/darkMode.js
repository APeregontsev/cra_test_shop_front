import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
  },
});

// это actions условно generators
export const { setDarkMode } = darkModeSlice.actions;

// это reducer
export default darkModeSlice.reducer;
