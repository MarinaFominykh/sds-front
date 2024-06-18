import React from "react";

import { Header } from "@components/Header";
// import { Footer } from '@components/Footer';

type Props = {
  children: React.ReactNode;
};

export const ExchangePageContainer: React.FC<Props> = ({ children }) => {
  return <>{children}</>;
};
