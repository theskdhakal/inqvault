import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  client: [],
  message: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setClients: (state, action) => {
      state.client = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setUser, setClients, setMessage } = userSlice.actions;

export default userSlice.reducer;
