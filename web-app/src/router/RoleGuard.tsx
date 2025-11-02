import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { Role } from "../types/types";

type RoleGuardProps = {
  allowed: Role[];
  children: React.ReactElement;
  redirectTo?: string;
};

const RoleGuard: React.FC<RoleGuardProps> = ({
  allowed,
  children,
  redirectTo = "/sign-in",
}) => {
  const role = useSelector(
    (s: RootState) => s.auth.profile?.role as Role | undefined
  );

  if (!role) return <Navigate to={redirectTo} replace />;
  if (!allowed.includes(role)) return <Navigate to="/unauthorized" replace />;

  return children;
};

export default RoleGuard;
