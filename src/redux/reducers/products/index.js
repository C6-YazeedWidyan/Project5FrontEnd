import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    menProducts: [],
    womenProducts: [],
    kidsProducts: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    deleteFromProducts: (state, action) => {
      state.products = state.products.filter((product) => {
        return product.id !== action.payload;
      });
    },
    updateProducts: (state, action) => {
      state.products = state.products.map((product) => {
        if (product.id == action.payload.id) {
          product.title = action.payload.title;
          product.price = action.payload.price;
          product.img = action.payload.img;
          product.descriptions = action.payload.descriptions;
          product.in_stock = action.payload.in_stock;
        }
        return product;
      });
    },
    setMenProducts: (state, action) => {
      state.menProducts = action.payload;
    },
    setWomenProducts: (state, action) => {
      state.womenProducts = action.payload;
    },
    setKidsProducts: (state, action) => {
      state.kidsProducts = action.payload;
    },
  },
});

export const {
  setProducts,
  deleteFromProducts,
  setMenProducts,
  setWomenProducts,
  setKidsProducts,
  updateProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
