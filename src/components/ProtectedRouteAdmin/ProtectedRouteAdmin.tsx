import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

interface Props {
  children?: ReactNode;
}

export const ProtectedRouteAdmin: FC<Props> = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();
  if (!auth || !auth.user || auth?.user?.roles_ids.roles[1] !== 2) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};
