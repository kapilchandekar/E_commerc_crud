import { lazy } from "react";

export const guestRoutes = [
  {
    path: "/",
    name: "signUp",
    exact: true,
    component: lazy(() => import("../../view/auth/SignUp")),
  },
  {
    path: "/log-in",
    name: "logIn",
    exact: true,
    component: lazy(() => import("../../view/auth/LogIn")),
  },
  {
    redirectRoute: true,
    name: 'SignUp',
    path: '/'
  }
];
export const userRoutes = [
  {
    path: "/",
    name: "Dashboard",
    exact: true,
    component: lazy(() => import("../../view/user/dashboard/Dashboard")),
  },
  {
    path: "/add-product",
    name: "addProduct",
    exact: true,
    component: lazy(() => import("../../view/user/addProduct/addProduct")),
  },

  {
    redirectRoute: true,
    name: 'Dashboard',
    path: '/',
  },
];
