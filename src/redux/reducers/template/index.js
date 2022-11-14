import { createSlice } from "@reduxjs/toolkit";

export const templateSlice = createSlice({
  name: "template",
  initialState: {
    templateText: "",
  },
  reducers: {
    setTemplate: (state, action) => {
      state.templateText = action.payload;
    },
  },
});

export const { setTemplate } = templateSlice.actions;

export default templateSlice.reducer;
