import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    setFavourites: (state, action) => {
      const storageKey = "favList";
      if (!state.includes(action.payload)) {
        state.push(action.payload);
        localStorage.setItem(storageKey, JSON.stringify(state));
      } else {
        state = state.filter((fav_item) => fav_item !== action.payload);
        localStorage.setItem(storageKey, JSON.stringify(state));
        return state;
      }
    },

    setInitialFavList: (state, action) => {
      const storageKey = "favList";
      localStorage.setItem(storageKey, JSON.stringify(action.payload));
      return [...action.payload];
    },
  },
});

// это actions условно generators
export const { setFavourites, setInitialFavList } = favouritesSlice.actions;

// это reducer
export default favouritesSlice.reducer;
