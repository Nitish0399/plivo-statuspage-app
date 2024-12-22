import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice;
