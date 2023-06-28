import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  book: [],
  burrowHistory: [],
  reviews: [],
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBook: (state, action) => {
      if (!state.book.length && !action.payload.length) return;

      state.book = action.payload;
    },
    setBurrowHistory: (state, action) => {
      if (!state.burrowHistory.length && !action.payload.length) return;

      state.burrowHistory = action.payload;
    },
    setReviews: (state, action) => {
      if (!state.reviews.length && !action.payload.length) return;

      state.reviews = action.payload;
    },
  },
});

export const { setBook, setBurrowHistory, setReviews } = bookSlice.actions;

export default bookSlice.reducer;
