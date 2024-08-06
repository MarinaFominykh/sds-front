import { useState, useEffect, FC } from "react";

import { LocationTreeView } from "./LocationTreeView";
import { Alert } from "@mui/material";

import { useAppSelector } from "@hooks/redux";
import { useGetAllLocationQuery } from "@src/redux/services/locacationApi";
import { ILocation } from "@src/types/ILocation";

interface Props {
  handleSelectLocation: (id: string | null) => void;
}
export const LocationTree: FC<Props> = (props) => {
  const { handleSelectLocation, ...other } = props;
  const { selectedLocation } = useAppSelector((state) => state.locationSlice);
  const { isLoading, isError } = useGetAllLocationQuery({});
  const [currentLocations, setCurrenLocations] = useState<ILocation[]>([]);
  const { locationsTree } = useAppSelector((state) => state.locationSlice);

  useEffect(() => {
    setCurrenLocations(locationsTree);
  }, [locationsTree, selectedLocation]);

  return (
    <>
      {isError ? (
        <Alert severity="error">Произошла ошибка при загрузке устройств</Alert>
      ) : (
        <LocationTreeView
          {...other}
          locations={currentLocations}
          handleClick={handleSelectLocation}
          isLoading={isLoading}
        />
      )}
    </>
  );
};
