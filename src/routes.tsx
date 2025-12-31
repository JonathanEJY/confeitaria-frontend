import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import NotFound from "./pages/NotFound/NotFound";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import Products from "./pages/Products/Products";
import Stock from "./pages/Stock/Stock";

let router = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
  {
    Component: PrivateRoute,
    children: [
      { path: "/dashboard", Component: Dashboard },
      { path: "/products", Component: Products },
      { path: "/stock", Component: Stock },
    ],
  },
  { path: "*", Component: NotFound },
]);

export default router;
