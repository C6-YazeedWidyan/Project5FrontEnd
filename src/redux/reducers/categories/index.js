import { createSlice } from "@reduxjs/toolkit";
export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    deleteFromCategories: (state, action) => {
      state.categories = state.categories.filter((category) => {
        return category.id !== action.payload;
      });
    },
  },
});

export const { setCategories, deleteFromCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
