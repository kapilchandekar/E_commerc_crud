import { combineReducers } from "@reduxjs/toolkit";
import { productListReducer } from "./productListSlice";

const userRootReducer = combineReducers({
  product: productListReducer,
});
export default userRootReducer;
