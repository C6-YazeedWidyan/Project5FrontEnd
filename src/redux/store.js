import { configureStore } from "@reduxjs/toolkit";
import templateReducer from "./reducers/template";
import productsReducer from "./reducers/products";
import authReducer from "./reducers/auth";
import matchesReducer from "./reducers/matches";
import cartReducer from "./reducers/cart";
import wishlistReducer from "./reducers/wishlist";
import categoriesReducer from "./reducers/categories";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    template: templateReducer,
    products: productsReducer,
    matches: matchesReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    categories: categoriesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
