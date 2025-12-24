import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import NotFound from "./pages/NotFound/NotFound";
import Dashboard from "./pages/Dashboard/Dashboard";
import { privateLoader } from "./auth/privateLoader";

let router = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
  { path: "/dashboard", Component: Dashboard, loader: privateLoader },
  { path: "*", Component: NotFound },
]);

export default router;
