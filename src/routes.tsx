import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Stock from "./pages/Stock";
import DashboardLayout from "./components/layout/DashboardLayout";
import { Labor } from "./pages/Labor";
import { Recipes } from "./pages/Recipes";

let router = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
  {
    Component: PrivateRoute,
    children: [
      {
        Component: DashboardLayout,
        children: [
          { path: "/dashboard", Component: Dashboard },
          { path: "/products", Component: Products },
          { path: "/stock", Component: Stock },
          { path: "/user", Component: Labor },
          { path: "/recipes", Component: Recipes },
        ],
      },
    ],
  },
  { path: "*", Component: NotFound },
]);

export default router;
