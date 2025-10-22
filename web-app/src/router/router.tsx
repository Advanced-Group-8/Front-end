import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import OrderList from "../pages/Orderlist.tsx";
import NotFound from "../pages/NotFound";
import ButtonsPage from "../pages/ButtonsPage";
import SignaturePage from "../pages/SignaturePage";
import IconButton from "../components/buttons/IconButton";
import ProfilePage from "../pages/ProfilePage.tsx";
import SignInPage from "../pages/SignInPage/SignInPage.tsx";
import RoleGuard from "./RoleGuard";
import RoleBasedLayout from "../layout/RoleBasedLayout.tsx";
import AdminPage from "../pages/AdminPage.tsx";
import CarrierPage from "../pages/CarrierPage.tsx";
import UnAuthorized from "../pages/UnAuthorized.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RoleBasedLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "orders",
        element: <OrderList />,
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
        element: <SignInPage />,
      },
      {
        path: "unauthorized",
        element: <UnAuthorized />,
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
      {
        path: "admin",
        element: (
          <RoleGuard allowed={["admin"]}>
            <AdminPage />
          </RoleGuard>
        ),
      },
      {
        path: "carrier",
        element: (
          <RoleGuard allowed={["carrier"]}>
            <CarrierPage />
          </RoleGuard>
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
