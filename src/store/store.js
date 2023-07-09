import { configureStore } from "@reduxjs/toolkit";
import hideSidebarSlice from "../slices/hideSidebar/hideSidebar";
import darkModeSlice from "../slices/darkMode/darkMode";
import categoriesSlice from "../slices/categories/categories";
import categorySelectSlice from "../slices/selectedCategory/category";
import productsSlice from "../slices/products/products";
import shopingCardSlice from "../slices/shopingCard/shopingCard";
import favouritesSlice from "../slices/favourites/favourites";

export const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    selectedCategory: categorySelectSlice,
    products: productsSlice,
    card: shopingCardSlice,
    favourites: favouritesSlice,
    sidebar: hideSidebarSlice,
    darkMode: darkModeSlice,
  },
});
