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
  <div className="min-h-screen">
    <header className="p-4 bg-white">Sender header</header>
    <main className="p-6">{children}</main>
  </div>
);

const ReceiverShell: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => (
  <div className="min-h-screen">
    <header className="p-4 bg-white">Receiver header</header>
    <main className="p-6">{children}</main>
  </div>
);

const CarrierShell: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => (
  <div className="min-h-screen bg-gray-50">
    <header className="p-4 bg-yellow-50">Carrier header</header>
    <main className="p-6">{children}</main>
  </div>
);

const AdminShell: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-neutral-100">
    <header className="p-4 bg-gray-800 text-white">Admin header</header>
    <main className="p-6">{children}</main>
  </div>
);

const RoleBasedLayout: React.FC = () => {
  const role = useSelector(
    (s: RootState) => s.auth.profile?.role as Role | undefined
  );

  if (role === "carrier")
    return (
      <CarrierShell>
        <Navbar />
        <Outlet />
        <Footer />
      </CarrierShell>
    );
  if (role === "admin")
    return (
      <AdminShell>
        <Navbar />
        <Outlet />
        <Footer />
      </AdminShell>
    );
  if (role === "receiver")
    return (
      <ReceiverShell>
        <Navbar />
        <Outlet />
        <Footer />
      </ReceiverShell>
    );
  // default sender
  return (
    <SenderShell>
      <Navbar />
      <Outlet />
      <Footer />
    </SenderShell>
  );
};

export default RoleBasedLayout;
