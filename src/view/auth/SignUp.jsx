import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import {
  CustomInputPsw,
  CustomInput,
} from "../../components/custom/CustumInputs";
import { signUpValidation } from "./validation/Validation";
import { userSignUpAction } from "../../store/sagaActions";
import CustomToaster from "../../lib/toaster";

const SignUp = () => {
  // // initial state
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterSeverity, setToasterSeverity] = useState("success");
  const [toasterMessage, setToasterMessage] = useState("");
  const { isLoading } = useSelector((state) => state.auth.signup);
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

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // // validation
  const formik = useFormik({
    initialValues: {
      name: "",
      emailId: "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: signUpValidation,
    onSubmit: (values) => {
      formik.resetForm();
      console.log(values);
      dispatch(
        userSignUpAction({
          data: {
            name: values?.name,
            email: values?.emailId,
            password: values?.password,
          },
          triggerToaster,
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
          <Typography variant="h4">Sign Up</Typography>
          <Typography variant="body2" fontWeight={500}>
            Please input your personal details
          </Typography>
        </Box>
        <CustomInput
          label="Enter Name"
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.name && formik.errors.name)}
          helperText={
            formik.touched.name && formik.errors.name && formik.errors.name
          }
        />
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
          <Button variant="contained" type="submit" sx={{ width: "90px", textTransform:"capitalize" }}>
            {isLoading ? (
              <CircularProgress size="24px" color="inherit" />
            ) : (
              "sign up"
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
    </>
  );
};

export default SignUp;
