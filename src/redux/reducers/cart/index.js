import { createSlice } from "@reduxjs/toolkit";
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    setCart: (state, action) => {
      console.log("yazan");
      state.cart = action.payload;
      console.log(state);
    },
    addItemToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    deleteItemFromCart: (state, action) => {
      state.cart = state.cart.filter((product) => {
        return product.id !== action.payload;
      });
    },
  },
});

export const { setCart, deleteItemFromCart, addItemToCart } = cartSlice.actions;

export default cartSlice.reducer;
