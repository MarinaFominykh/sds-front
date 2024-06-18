import { FC, ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

interface Props {
  children: ReactNode;
}

export const ProtectedRoute: FC<Props> = ({ children }) => {
  const auth = useAuth();

  if (!auth || !auth.user) {
    return <Navigate to="/login" />;
  }

  return children;
};
