import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Orderlist from "../pages/Orderlist";
import Layout from "../layout/Layout";
import NotFound from "../pages/NotFound";
import ButtonsPage from "../pages/ButtonsPage";
import SignaturePage from "../pages/SignaturePage";
import IconButton from "../components/buttons/IconButton";

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
      },
      {
        path: "signature",
        element: <SignaturePage />,
      },
      {
        path: "scanner",
        element: (
          <div className="flex items-center justify-center">
            <p>Scanner page - Placeholder</p>
            <IconButton iconVariant="cancel" className="ml-4" onClick={() => router.navigate(-1)}>
              Back
            </IconButton>
          </div>
          )
      }
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
