import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import OrderList from "../pages/OrderList.tsx";
import Layout from "../layout/Layout";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "orders",
        element: <OrderList />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
