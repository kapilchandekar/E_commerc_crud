import { put } from "redux-saga/effects";

import { errorHandler } from "../../../utils";
import { toaster } from "../../../lib";
import { USER_LOG_IN_URL, USER_SIGN_UP_URL } from "../../../apis";

import {
  signupFail,
  signupStart,
  signupSuccess,
} from "../../reducer/auth/signUpSlice";
import {
  userlogInFailed,
  userlogInStart,
  userlogInSuccess,
} from "../../sagaActions";

// login saga
export function* userlogInSaga(action) {
  yield put(userlogInStart());
  const { data, navigate, triggerToaster } = action?.payload;
  yield errorHandler({
    endpoint: USER_LOG_IN_URL,
    successHandler: yield function* (response) {
      yield put(userlogInSuccess(response));
      localStorage.setItem("authToken", response?.authToken);
      window.location.reload();
     
    },
    failHandler: yield function* (response) {
      yield put(userlogInFailed());
      triggerToaster(response, "error");
    },
    failHandlerType: "CUSTOM",
    payload: data,
    apiType: "post",
  });
}

// signup saga
export function* UserSignUpSaga(action) {
  yield put(signupStart());
  const { data, navigate, triggerToaster } = action?.payload;
  yield errorHandler({
    endpoint: USER_SIGN_UP_URL,
    successHandler: yield function* (response) {
      yield put(
        signupSuccess({
          ...response,
        })
      );
      localStorage.setItem("userId", response?._id);
      triggerToaster("Registration succesfully now you can login", "success");
    },
    failHandler: yield function* (response) {
      yield put(signupFail(response));
      triggerToaster(response, "error");
    },
    failHandlerType: "CUSTOM",
    payload: data,
    apiType: "post",
  });
}
