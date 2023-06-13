import { configureStore } from "@reduxjs/toolkit";
import hideSidebarSlice from "../slices/hideSidebar/hideSidebar";
import darkModeSlice from "../slices/darkMode/darkMode";
import categoriesSlice from "../slices/categories/categories";
import categorySelectSlice from "../slices/selectedCategory/category";
import productsSlice from "../slices/products/products";
import shopingCardSlice from "../slices/shopingCard/shopingCard";

export const store = configureStore({
  reducer: {
    sidebar: hideSidebarSlice,
    darkMode: darkModeSlice,
    categories: categoriesSlice,
    selectedCategory: categorySelectSlice,
    products: productsSlice,
    card: shopingCardSlice,
  },
});
