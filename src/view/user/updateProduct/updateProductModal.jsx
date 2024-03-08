import React, { useState } from "react";
import { Box, Button, CircularProgress, Skeleton, Stack } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import CustomModal from "../../../components/modal/CustomModal";
import { CustomInput } from "../../../components/custom/CustumInputs";
import { updateProductAction } from "../../../store/sagaActions";
import CustomToaster from "../../../lib/toaster";

const UpdateProductModal = ({ open, handleClickClose, callBack }) => {
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterSeverity, setToasterSeverity] = useState("success");
  const [toasterMessage, setToasterMessage] = useState("");
  const { productDetail, productDetailLoading, updateProductLoading } =
    useSelector((state) => state?.user?.product);
  const dispatch = useDispatch();

  const handleToasterClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setToasterOpen(false);
  };

  // Function to trigger the toaster with specific message and severity
  const triggerToaster = (message, severity) => {
    setToasterMessage(message);
    setToasterSeverity(severity);
    setToasterOpen(true);
  };

  const handleClose = () => {
    formik.resetForm();
    handleClickClose();
  };

  const formik = useFormik({
    initialValues: {
      name: productDetail?.name,
      price: productDetail?.price,
      category: productDetail?.category,
      company: productDetail?.company,
    },
    enableReinitialize: true,
    // validationSchema: addProductValidation,
    onSubmit: (values) => {
      dispatch(
        updateProductAction({
          data: {
            name: values?.name,
            price: values?.price,
            category: values?.category,
            userId: values?.userId,
            company: values?.company,
          },
          id: productDetail?._id,
          triggerToaster,
          callBack,
          handleClose,
        })
      );
    },
  });

  return (
    <>
      <CustomModal
        showModal={open}
        closeModal={handleClose}
        title="Edit Product"
      >
        <Stack
          mx="auto"
          spacing="15px"
          component="form"
          onSubmit={formik.handleSubmit}
        >
          {productDetailLoading ? (
            <Skeleton sx={{ height: "72px", width: "221px" }} />
          ) : (
            <CustomInput
              label="Product Name"
              type="text"
              name="name"
              placeholder="Product Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.name && formik.errors.name)}
              helperText={
                formik.touched.name && formik.errors.name && formik.errors.name
              }
            />
          )}

          {productDetailLoading ? (
            <Skeleton sx={{ height: "72px", width: "221px" }} />
          ) : (
            <CustomInput
              label="Company Name"
              type="text"
              name="company"
              placeholder="Company Name"
              value={formik.values.company}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.company && formik.errors.company}
              helperText={
                formik.touched.company &&
                formik.errors.company &&
                formik.errors.company
              }
            />
          )}
          {productDetailLoading ? (
            <Skeleton sx={{ height: "72px", width: "221px" }} />
          ) : (
            <CustomInput
              label="Category Name"
              type="text"
              name="category"
              placeholder="Category Name"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.category && formik.errors.category}
              helperText={
                formik.touched.category &&
                formik.errors.category &&
                formik.errors.category
              }
            />
          )}
          {productDetailLoading ? (
            <Box sx={{ height: "72px", width: "221px" }}>
              <Skeleton sx={{ height: "72px", width: "221px" }} />
            </Box>
          ) : (
            <CustomInput
              label="Price"
              type="text"
              name="price"
              placeholder="Price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.price && formik.errors.price}
              helperText={
                formik.touched.price &&
                formik.errors.price &&
                formik.errors.price
              }
            />
          )}

          <Box textAlign="center">
            <Button
              variant="contained"
              type="submit"
              // onClick={() => navigate(`/sign-in`)}
              sx={{ width: "80px", textTransform: "capitalize" }}
            >
              {updateProductLoading ? (
                <CircularProgress size="24px" color="inherit" />
              ) : (
                "save"
              )}
            </Button>
          </Box>
          <CustomToaster
            open={toasterOpen}
            onClose={handleToasterClose}
            severity={toasterSeverity}
            message={toasterMessage}
          />
        </Stack>
      </CustomModal>
    </>
  );
};

export default UpdateProductModal;
