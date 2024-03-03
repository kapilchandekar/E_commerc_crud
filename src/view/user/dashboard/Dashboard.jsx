import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Grid, Typography } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

import tableHeader from "./data/tableHeader.json";
import Table from "../../../components/custom/table/table";
import {
  deleteProductAction,
  getProductListAction,
  productDetailAction,
} from "../../../store/sagaActions";
import AlertModal from "../../../components/modal/AlertModal";
import CustomToaster from "../../../lib/toaster";
import UpdateProductModal from "../updateProduct/updateProductModal";

const Dashboard = () => {
  // // initial state
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    close: "",
    productId: "",
  });
  const [openUpdateProductModal, setOpenUpdateProductModal] = useState(false);
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterSeverity, setToasterSeverity] = useState("success");
  const [toasterMessage, setToasterMessage] = useState("");
  const { productList, getProductListLoading } = useSelector(
    (state) => state?.user?.product
  );
  const dispatch = useDispatch();

  const handleToasterClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setToasterOpen(false);
  };

  const handleClickOpen = (id) => {
    setOpenUpdateProductModal(true);
    dispatch(productDetailAction({ id: id }));
  };

  const handleClickClose = () => {
    setOpenUpdateProductModal(false);
  };

  // Function to trigger the toaster with specific message and severity
  const triggerToaster = (message, severity) => {
    setToasterMessage(message);
    setToasterSeverity(severity);
    setToasterOpen(true);
  };

  let rows = [];

  if (productList) {
    rows = Object.values(productList).map((item, index) => {
      const name = <Typography>{item.name}</Typography>;
      const price = <Typography>{item.price}</Typography>;
      const category = <Typography>{item.category}</Typography>;
      const company = <Typography>{item.company}</Typography>;
      let action = null;

      if (item._id) {
        // Check if item has a valid ID before rendering buttons
        action = (
          <Box>
            <FaEdit
              color="green"
              fontSize="20px"
              onClick={() => handleClickOpen(item?._id)}
              cursor="pointer"
            />

            <AiFillDelete
              color="red"
              fontSize="20px"
              cursor="pointer"
              onClick={() =>
                setDeleteModal({ open: true, close: "", productId: item._id })
              }
            />
          </Box>
        );
      }

      return { ...item, name, price, company, action, category };
    });
  }

  const handleClose = () => {
    setDeleteModal({ open: "", close: false, productId: "" });
  };

  const handleDeleteProduct = () => {
    dispatch(
      deleteProductAction({
        id: deleteModal?.productId,
        callBack,
        triggerToaster,
      })
    );
  };

  const callBack = () => {
    setDeleteModal({ open: "", close: false, productId: "" });
    getProductList();
  };

  const getProductList = () => {
    dispatch(getProductListAction());
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <>
      <Grid container justifyContent="center" mt={{ lg: "50px", xs: "75px" }}>
        <Grid item xs={8}>
          <Typography variant="h3" mb="20px">
            Products
          </Typography>
          <Table
            tableHead={tableHeader}
            tableBodyData={getProductListLoading ? "loading" : rows}
          />
        </Grid>
      </Grid>
      <AlertModal
        title="Delete Product"
        subTitle="Are you sure you want to this product ?"
        open={deleteModal?.open}
        handleClose={handleClose}
        handleClick={handleDeleteProduct}
      />
      <CustomToaster
        open={toasterOpen}
        onClose={handleToasterClose}
        severity={toasterSeverity}
        message={toasterMessage}
      />
      <UpdateProductModal
        open={openUpdateProductModal}
        handleClickClose={handleClickClose}
        callBack={callBack}
      />
    </>
  );
};

export default Dashboard;
