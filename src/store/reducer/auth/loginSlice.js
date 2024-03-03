import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  authToken: "",
  isLoading: false,
};
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    userlogInStart: (state) => {
      state.isLoading = true;
    },
    userlogInSuccess: (state) => {
      state.isLoading = false;
      state.isAuth = true;
      localStorage.setItem("authToken", Math.random());
    },
    userlogInFailed: (state) => {
      state.isLoading = false;
      state.isAuth = false;
    },
  },
});

export const { userlogInStart, userlogInSuccess, userlogInFailed } =
  loginSlice.actions;

export const loginReducer = loginSlice.reducer;
