import { lazy } from "react";

export const guestRoutes = [
  {
    path: "/sign-up",
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
    path: '/sign-up'
  }
];
export const userRoutes = [
  {
    path: "/dashboard",
    name: "dashboard",
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
    name: "/dashboard",
    path: "dashboard",
  },
];
