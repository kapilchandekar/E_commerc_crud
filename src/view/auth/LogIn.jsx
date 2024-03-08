import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import { userlogInAction } from "../../store/sagaActions";
import {
  CustomInputPsw,
  CustomInput,
} from "../../components/custom/CustumInputs";
import CustomToaster from "../../lib/toaster";
import { signInValidation } from "./validation/Validation";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // // initial state
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterSeverity, setToasterSeverity] = useState("success");
  const [toasterMessage, setToasterMessage] = useState("");

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
  const formik = useFormik({
    initialValues: {
      emailId: "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: signInValidation,
    onSubmit: (values) => {
      console.log(values);
      formik.resetForm();
      dispatch(
        userlogInAction({
          data: {
            email: values?.emailId,
            password: values?.password,
          },
          triggerToaster,
          navigate

        })
      );
    },
  });
  return (
    <>
      <Stack
        mx="auto"
        mt={{ lg: "100px", xs: "78px" }}
        spacing="15px"
        width={250}
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <Box textAlign="center" mb="50px">
          <Typography variant="h4">Log In</Typography>
          <Typography variant="body2" fontWeight={500}>
            Please login with your email
          </Typography>
        </Box>

        <CustomInput
          label="Enter Email"
          type="email"
          name="emailId"
          placeholder="Enter Email"
          value={formik.values.emailId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.emailId && formik.errors.emailId}
          helperText={
            formik.touched.emailId &&
            formik.errors.emailId &&
            formik.errors.emailId
          }
        />
        <CustomInputPsw
          label="Password"
          name="password"
          placeholder="Enter Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && formik.errors.password}
          helperText={
            formik.touched.password &&
            formik.errors.password &&
            formik.errors.password
          }
        />
        <Box textAlign="center">
          <Button
            variant="contained"
            type="submit"
            // onClick={() => navigate(`/sign-in`)}
          >
            Log In
          </Button>
        </Box>
        <CustomToaster
          open={toasterOpen}
          onClose={handleToasterClose}
          severity={toasterSeverity}
          message={toasterMessage}
        />
      </Stack>
    </>
  );
};

export default LogIn;
