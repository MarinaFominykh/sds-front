import React from "react";
import { NewUser } from "@components/Modals/NewUser";
import { useModal } from "@hooks/useModal";
import { SelectedLocation } from "./components/SelectedLocation";
import { SelectedDevice } from "./components/SelectedDevice";
import { useAppSelector } from "@hooks/redux";

export const Main = () => {
  const { isVisibleDevice } = useAppSelector((state) => state.devSlice);

  return <>{isVisibleDevice ? <SelectedDevice /> : <SelectedLocation />}</>;
};
