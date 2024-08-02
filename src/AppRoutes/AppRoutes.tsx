import React from "react";
import { Route, Routes } from "react-router-dom";

import { ExchangeRoutes } from "./routes/ExchangeRoutes";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<ExchangeRoutes />} path="/*" />
    </Routes>
  );
};
