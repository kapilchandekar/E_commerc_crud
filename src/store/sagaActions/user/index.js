import { createAction } from "@reduxjs/toolkit";

export const getProductListAction = createAction("GET_PRODUCT_LIST_ACTION");
export const addProductAction = createAction("ADD_PRODUCT_ACTION");
export const deleteProductAction = createAction("DELETE_PRODUCT_ACTION");
export const updateProductAction = createAction("UPDATE_PRODUCT_ACTION");
export const productDetailAction = createAction("PRODUCT_DETAIL_ACTION");