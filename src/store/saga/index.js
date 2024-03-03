import { all, takeLatest } from "redux-saga/effects";
import { addProductAction, deleteProductAction, getProductListAction, productDetailAction, updateProductAction, userSignUpAction, userlogInAction } from "../sagaActions";
import { UserSignUpSaga, userlogInSaga} from "./auth";
import { addProductSaga, deleteProductSaga, getProductListSaga, productDetailSaga, updateProductSaga } from "./user";

function* authWatcher() {
  yield takeLatest(userSignUpAction.type, UserSignUpSaga);
  yield takeLatest(userlogInAction.type, userlogInSaga);
  yield takeLatest(getProductListAction.type, getProductListSaga);
}
function* userWatcher() {
  yield takeLatest(getProductListAction.type, getProductListSaga);
  yield takeLatest(addProductAction.type, addProductSaga);
  yield takeLatest(deleteProductAction.type, deleteProductSaga);
  yield takeLatest(updateProductAction.type, updateProductSaga);
  yield takeLatest(productDetailAction.type, productDetailSaga);
}

export default function* rootSaga() {
  yield all([authWatcher(), userWatcher()]);
 
}
