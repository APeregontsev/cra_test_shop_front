import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hideSidebar: false,
};

const hideSidebarSlice = createSlice({
  name: "hideSidebar",
  initialState,
  reducers: {
    setSidebar: (state, action) => {
      state.hideSidebar = action.payload;
    },
  },
});

// это actions условно generators
export const { setSidebar } = hideSidebarSlice.actions;

// это reducer
export default hideSidebarSlice.reducer;
