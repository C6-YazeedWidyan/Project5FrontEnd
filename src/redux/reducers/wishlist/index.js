import { createSlice } from "@reduxjs/toolkit";

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
  },
  reducers: {
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    addToWishlist: (state, action) => {
      state.wishlist.push(action.payload);
    },
    deleteFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter((product) => {
        return product.id !== action.payload;
      });
    },
  },
});

export const { setWishlist, deleteFromWishlist, addToWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
