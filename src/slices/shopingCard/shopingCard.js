import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shopingCard: {},
};

const shopingCardSlice = createSlice({
  name: "shopingCard",
  initialState,
  reducers: {
    addShopingCard: (state, action) => {
      if (state.shopingCard[action.payload]) {
        state.shopingCard[action.payload]++;
      } else {
        state.shopingCard[action.payload] = 1;
      }
    },
    removeShopingCard: (state, action) => {
      if (state.shopingCard[action.payload] - 1 > 0) {
        state.shopingCard[action.payload]--;
      } else {
        delete state.shopingCard[action.payload];
      }
    },
    resetShopingCard: (state, action) => {
      state.shopingCard = {};
    },
  },
});

// это actions условно generators
export const { addShopingCard, removeShopingCard, resetShopingCard } = shopingCardSlice.actions;

// это reducer
export default shopingCardSlice.reducer;
