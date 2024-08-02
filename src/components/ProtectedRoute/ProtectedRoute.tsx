import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

interface Props {
  children?: ReactNode;
}

export const ProtectedRoute: FC<Props> = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();
  if (!auth || !auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

//  const auth = useAuth();

//  if (!auth || !auth.user) {
//    return <Navigate to="/login" replace />;
//  }

//  return children;
