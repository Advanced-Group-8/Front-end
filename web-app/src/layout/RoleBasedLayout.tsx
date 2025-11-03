import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store.ts";
import type { Role } from "../types/types.ts";
import Navbar from "../components/navbar/Navbar.tsx";
import Footer from "../components/footer/Footer.tsx";

const SenderShell: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => (
  <div className="min-h-screen flex-col flex">
    <Navbar />
    <main className="grow w-full mx-auto px-4">{children}</main>
    <Footer />
  </div>
);

const ReceiverShell: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => (
   <div className="min-h-screen flex-col flex">
    <Navbar />
    <main className="grow w-full mx-auto px-4">{children}</main>
    <Footer />
  </div>
);

const CarrierShell: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => (
  <div className="min-h-screen flex-col flex bg-gray-50">
    <Navbar />
    <main className="grow w-full mx-auto px-4">{children}</main>
    <Footer />
  </div>
);

const AdminShell: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex-col flex bg-neutral-100">
    <Navbar />
    <main className="grow w-full mx-auto px-4">{children}</main>
    <Footer />
  </div>
);

const RoleBasedLayout: React.FC = () => {
  const role = useSelector(
    (s: RootState) => s.auth.profile?.role as Role | undefined
  );

  if (role === "carrier")
    return (
      <CarrierShell>
        <Outlet />
      </CarrierShell>
    );
  if (role === "admin")
    return (
      <AdminShell>
        <Outlet />
      </AdminShell>
    );
  if (role === "receiver")
    return (
      <ReceiverShell>
        <Outlet />
      </ReceiverShell>
    );
  // default sender
  return (
    <SenderShell>
      <Outlet />
    </SenderShell>
  );
};

export default RoleBasedLayout;
