import React from "react";
import { YMaps } from "@pbe/react-yandex-maps";
import { AppRoutes } from "./AppRoutes";
import { AuthProvider } from "./hooks/useAuth";

export const App: React.FC = () => {
  return (
    //  <YMaps>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
    //  </YMaps>
  );
};
