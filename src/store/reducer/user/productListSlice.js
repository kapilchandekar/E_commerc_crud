import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  getProductListLoading: false,
  getProductListErrorMsg: "",
  productList: [],
  addProductLoading: false,
  addProductErrorMsg: "",
  deleteProductLoading: false,
  deleteProductErrorMsg: "",
  updateProductLoading: false,
  updateProductErrorMsg: "",
  productDetail:"",
  productDetailLoading:"",
  productDetailErrorMsg:""
};

const productListSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProductListStart: (state) => {
      state.getProductListLoading = true;
      state.getProductListErrorMsg = "";
    },
    getProductListSuccess: (state, { payload }) => {
      state.getProductListLoading = false;
      state.productList = payload;
    },
    getProductListFail: (state, { payload }) => {
      state.getProductListLoading = false;
      state.getProductListErrorMsg = payload?.data;
    },
    addProductStart: (state) => {
      state.addProductLoading = true;
      state.addProductErrorMsg = "";
    },
    addProductSuccess: (state, { payload }) => {
      state.addProductLoading = false;
      state.addProductErrorMsg = "";
    },
    addProductFail: (state, { payload }) => {
      state.addProductLoading = false;
      state.addProductErrorMsg = payload;
    },
    deleteProductStart: (state) => {
      state.deleteProductLoading = true;
      state.deleteProductErrorMsg = "";
    },
    deleteProductSuccess: (state, { payload }) => {
      state.deleteProductLoading = false;
      state.deleteProductErrorMsg = "";
    },
    deleteProductFail: (state, { payload }) => {
      state.deleteProductLoading = false;
      state.deleteProductErrorMsg = payload;
    },
    updateProductStart: (state) => {
      state.updateProductLoading = true;
      state.updateProductErrorMsg = "";
    },
    updateProductSuccess: (state, { payload }) => {
      state.updateProductLoading = false;
      state.updateProductErrorMsg = "";
    },
    updateProductFail: (state, { payload }) => {
      state.updateProductLoading = false;
      state.updateProductErrorMsg = payload;
    },
    productDetailStart: (state) => {
      state.productDetailLoading = true;
      state.productDetailErrorMsg = "";
    },
    productDetailSuccess: (state, { payload }) => {
      state.productDetailLoading = false;
      state.productDetail = payload
      state.productDetailErrorMsg = "";
    },
    productDetailFail: (state, { payload }) => {
      state.productDetailLoading = false;
      state.productDetailErrorMsg = payload;
    },
  },
});

export const {
  getProductListStart,
  getProductListSuccess,
  getProductListFail,
  addProductStart,
  addProductSuccess,
  addProductFail,
  deleteProductStart,
  deleteProductFail,
  deleteProductSuccess,
  updateProductFail,
  updateProductStart,
  updateProductSuccess,
  productDetailStart,
  productDetailFail,
  productDetailSuccess
} = productListSlice.actions;

export const productListReducer = productListSlice.reducer;
