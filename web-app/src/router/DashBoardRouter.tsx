import { useSelector } from "react-redux";

import SenderDashboard from "../pages/RoleDashboards/SenderDashboard.tsx";
import ReceiverDashboard from "../pages/RoleDashboards/ReceiverDashboard.tsx";
import CarrierDashboard from "../pages/RoleDashboards/CarrierDashboard.tsx";
import AdminDashboard from "../pages/RoleDashboards/AdminDashboard.tsx";

import type { RootState } from "../store/store";

const DashboardRouter = () => {
  const role = useSelector((s: RootState) => s.auth.profile?.role);

  if (role === "admin") return <AdminDashboard />;
  if (role === "carrier") return <CarrierDashboard />;
  if (role === "receiver") return <ReceiverDashboard />;
  // default: sender
  return <SenderDashboard />;
};

export default DashboardRouter;
