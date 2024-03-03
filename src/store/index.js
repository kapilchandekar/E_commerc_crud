import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

// // static import
import rootSaga from "./saga";
import { authRootReducer, userRootReducer } from "./reducer";


// setup saga middleware
const sagaMiddleware = createSagaMiddleware();

// create root reducer
const rootReducer = {
  auth: authRootReducer,
  user: userRootReducer,
};

// setup store
const Store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: () => [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default Store;
