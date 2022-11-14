import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    userId: null,
    userType: 1,
    isLoggedIn: false,
  },
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload);
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem("userId", action.payload);
    },
    setLogout: (state, action) => {
      state.token = null;
      state.userId = null;
      state.isLoggedIn = false;
      localStorage.clear();
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
  },
});

export const { setLogin, setUserId, setLogout, setUserType } =
  authSlice.actions;

export default authSlice.reducer;
