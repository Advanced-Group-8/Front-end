import { createBrowserRouter } from "react-router-dom";

import NotFound from "../pages/NotFound";
import ButtonsPage from "../pages/ButtonsPage";
import SignaturePage from "../pages/SignaturePage";
import IconButton from "../components/buttons/IconButton";
import ProfilePage from "../pages/ProfilePage.tsx";
import SignInPage from "../pages/SignInPage/SignInPage.tsx";
import SignUpPage from "../pages/SignUpPage/SignUpPage.tsx";
import RoleGuard from "./RoleGuard";
import RoleBasedLayout from "../layout/RoleBasedLayout.tsx";
import AdminDashboard from "../pages/RoleDashboards/AdminDashboard.tsx";
import CarrierDashboard from "../pages/RoleDashboards/CarrierDashboard.tsx";
import Unauthorized from "../pages/Unauthorized.tsx";
import DashboardRouter from "./DashBoardRouter.tsx";
import LayoutWithTwoColumns from "../pages/Orderlist/LayoutWithTwoColumns.tsx";
import OrderDetailsPage from "../pages/OrderDetailsPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RoleBasedLayout />,
    children: [
      {
        index: true,
        element: <DashboardRouter />,
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
        path: "sign-up",
        element: <SignUpPage />,
      },
      {
        path: "sign-in",
        element: <SignInPage />,
      },
      {
        path: "unauthorized",
        element: <Unauthorized />,
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
            <AdminDashboard />
          </RoleGuard>
        ),
      },
      {
        path: "carrier",
        element: (
          <RoleGuard allowed={["carrier"]}>
            <CarrierDashboard />
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
