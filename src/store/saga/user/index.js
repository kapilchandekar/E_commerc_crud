import { put } from "redux-saga/effects";
import {
  addProductFail,
  addProductStart,
  addProductSuccess,
  deleteProductFail,
  deleteProductStart,
  deleteProductSuccess,
  getProductListFail,
  getProductListStart,
  getProductListSuccess,
  productDetailFail,
  productDetailStart,
  productDetailSuccess,
  updateProductFail,
  updateProductStart,
  updateProductSuccess,
} from "../../sagaActions";
import {
  ADD_PRODUCT_URL,
  DELETE_PRODUCT_URL,
  PRODUCT_DETAILS_URL,
  PRODUCT_LIST_URL,
  UPDATE_PRODUCT_URL,
} from "../../../apis";
import { errorHandler } from "../../../utils";

//get product list
export function* getProductListSaga() {
  yield put(getProductListStart());
  yield errorHandler({
    endpoint: PRODUCT_LIST_URL,
    successHandler: yield function* (response) {
      yield put(
        getProductListSuccess({
          ...response,
        })
      );
    },
    failHandler: yield function* (response) {
      yield put(getProductListFail({ ...response }));
    },
    failHandlerType: "CUSTOM",
    apiType: "get",
  });
}

//add product
export function* addProductSaga(action) {
  yield put(addProductStart());
  const { data, triggerToaster } = action?.payload;
  yield errorHandler({
    endpoint: ADD_PRODUCT_URL,
    successHandler: yield function* (response) {
      yield put(
        addProductSuccess({
          ...response,
        })
      );
      triggerToaster('Product Added', "success")
    },
    failHandler: yield function* (response) {
      yield put(addProductFail({ ...response }));
    },
    failHandlerType: "CUSTOM",
    apiType: "post",
    payload: data,
  });
}

//delete product
export function* deleteProductSaga(action) {
  yield put(deleteProductStart());
  const { id, callBack, triggerToaster } = action?.payload;
  yield errorHandler({
    endpoint: `${DELETE_PRODUCT_URL}${id}`,
    successHandler: yield function* (response) {
      yield put(
        deleteProductSuccess({
          ...response,
        })
      );
      if (callBack) callBack();
      triggerToaster('Product deleted', "success")

    },
    failHandler: yield function* (response) {
      yield put(deleteProductFail({ ...response }));
    },
    failHandlerType: "CUSTOM",
    apiType: "delete",
  });
}

//update product
export function* updateProductSaga(action) {
  yield put(updateProductStart());
  const { data, id, callBack,  triggerToaster } = action?.payload;
  yield errorHandler({
    endpoint: `${UPDATE_PRODUCT_URL}${id}`,
    successHandler: yield function* (response) {
      yield put(
        updateProductSuccess({
          ...response,
        })
      );
      callBack()
      // handleClose()
      triggerToaster("Product Updated", "success")
    },
    failHandler: yield function* (response) {
      yield put(updateProductFail({ ...response }));
    },
    failHandlerType: "CUSTOM",
    apiType: "put",
    payload: data,

  });
}

//get product detail
export function* productDetailSaga(action) {
  yield put(productDetailStart());
  const { id } = action?.payload;
  yield errorHandler({
    endpoint: `${PRODUCT_DETAILS_URL}${id}`,
    successHandler: yield function* (response) {
      yield put(
        productDetailSuccess({
          ...response,
        })
      );
    },
    failHandler: yield function* (response) {
      yield put(productDetailFail({ ...response }));
    },
    failHandlerType: "CUSTOM",
    apiType: "get",
  });
}
