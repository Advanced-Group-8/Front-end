import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import OrderList from "../pages/Orderlist/Orderlist.tsx";
import Layout from "../layout/Layout";
import NotFound from "../pages/NotFound";
import ButtonsPage from "../pages/ButtonsPage";
import SignaturePage from "../pages/SignaturePage";
import IconButton from "../components/buttons/IconButton";
import ProfilePage from "../pages/ProfilePage.tsx";
import SignInPage from "../pages/SignInPage/SignInPage.tsx";
import LayoutWithTwoColumns from "../pages/Orderlist/LayoutWithTwoColumns.tsx";
import OrderDetailsPage from "../pages/OrderDetailsPage.tsx";

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
        element: <LayoutWithTwoColumns />,
/*         children: [
          { index: true, element: <p>Select a package</p> },
          { path: ":id", element: <OrderDetailsPage /> }, // will handle details
        ], */
      },
      {
        path: "buttons",
        element: <ButtonsPage />,
      },
      {
        path: "signature",
        element: <SignaturePage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "sign-in",
        element:<SignInPage/>,
      },
      {
        path: "scanner",
        element: (
          <div className="flex items-center justify-center">
            <p>Scanner page - Placeholder</p>
            <IconButton
              iconVariant="cancel"
              className="ml-4"
              onClick={() => router.navigate(-1)}
            >
              Back
            </IconButton>
          </div>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
