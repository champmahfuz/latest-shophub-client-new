import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../src/Pages/Login";
import Register from "../src/Pages/Register";
import Dashboard from "../src/component/Dashboard";
import ShopPage from "../src/component/ShopPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
  },

  {
    path: "/*",
    element: <ShopPage />,
  },
]);

export default router;
