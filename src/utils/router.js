import React from "react";
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import About from "../pages/About";
import Chat from "../pages/Chat";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";

const ProtectedRoutes = () => {
  const localStorageToken = localStorage.getItem("token");
  return localStorageToken ? <Outlet /> : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/chat",
        element: <Chat />,
        errorElement: <NotFound />,
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/about" index replace />,
    errorElement: <NotFound />,
  },
  {
    path: "/about",
    element: <About />,
    index: true,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
