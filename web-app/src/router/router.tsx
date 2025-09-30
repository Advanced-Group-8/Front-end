import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Orderlist from "../pages/Orderlist";
import Layout from "../layout/Layout";
import NotFound from "../pages/NotFound";
import ButtonsPage from "../pages/ButtonsPage";

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
        element: <Orderlist />,
      },
      {
        path: "buttons",
        element: <ButtonsPage />
      }
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
