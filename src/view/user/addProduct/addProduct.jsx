/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import { CustomInput } from "../../../components/custom/CustumInputs";
import { addProductValidation } from "./validation/Validation";
import { addProductAction } from "../../../store/sagaActions";
import CustomToaster from "../../../lib/toaster";

const addProduct = () => {
  // // initial state
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterSeverity, setToasterSeverity] = useState("success");
  const [toasterMessage, setToasterMessage] = useState("");
  const { addProductLoading } = useSelector((state) => state?.user?.product);
  // const navigate = useNavigate();

  console.log("??", addProductLoading);

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

  // // validation
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      category: "",
      userId: userId,
      company: "",
    },
    enableReinitialize: true,
    validationSchema: addProductValidation,
    onSubmit: (values) => {
      formik.resetForm();
      console.log(values);
      dispatch(
        addProductAction({
          data: {
            name: values?.name,
            price: values?.price,
            category: values?.category,
            userId: values?.userId,
            company: values?.company,
          },
          triggerToaster,
        })
      );
    },
  });
  return (
    <Stack
      mx="auto"
      mt={{ lg: "100px", xs: "78px" }}
      spacing="8px"
      width={250}
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <Box textAlign="center" mb="50px">
        <Typography variant="h4">Add Product</Typography>
      </Box>
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
          formik.touched.price && formik.errors.price && formik.errors.price
        }
      />

      <Box textAlign="center">
        <Button
          variant="contained"
          type="submit"
          sx={{
            textTransform: "capitalize",
            fontSize: "12px",
            lineHeight: "normal",
            // py: "0px",
          }}
          // onClick={() => navigate(`/sign-in`)}
        >
          {addProductLoading ? (
            <CircularProgress size="14px" color="inherit" />
          ) : (
            "Add"
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
  );
};

export default addProduct;
