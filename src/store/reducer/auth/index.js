import { combineReducers } from "@reduxjs/toolkit";
import { loginReducer } from "./loginSlice";
import { signupReducer } from "./signUpSlice";

const authRootReducer = combineReducers({
  login: loginReducer,
  signup: signupReducer
});
export default authRootReducer;