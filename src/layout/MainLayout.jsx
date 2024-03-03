import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";

const MainLayout = ({isAuthenticated}) => {
  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <Suspense>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MainLayout;
