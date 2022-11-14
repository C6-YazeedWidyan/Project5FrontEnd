import { createSlice } from "@reduxjs/toolkit";
export const matchesSlice = createSlice({
  name: "matches",
  initialState: {
    matches: [],
  },
  reducers: {
    setMatches: (state, action) => {
      state.matches = action.payload;
    },
    deleteFromMatches: (state, action) => {
      state.matches = state.matches.filter((match) => {
        return match.id !== action.payload;
      });
    },
  },
});

export const { setMatches, deleteFromMatches } = matchesSlice.actions;

export default matchesSlice.reducer;
