import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  ErrorMsg: "",
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    signupStart: (state) => {
      state.isLoading = true;
      state.ErrorMsg = "";
    },
    signupSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.ErrorMsg = "";
    },
    signupFail: (state, { payload }) => {
      state.isLoading = false;
      state.ErrorMsg = payload?.data;
    },
  },
});

export const {signupStart,signupSuccess,signupFail} = signupSlice.actions;

export const signupReducer = signupSlice.reducer
