import { useState, useEffect, useMemo, FC } from "react";

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
  const { data: locs, isLoading, isError } = useGetAllLocationQuery({});
  const [currentLocations, setCurrenLocations] = useState<ILocation[]>([]);

  // Преобразуем массив с локациями в древовидную структуру
  function buildTree(items: ILocation[]) {
    const map = new Map();
    const tree: ILocation[] = [];

    items?.forEach((item) => {
      map.set(item.id, { ...item, subLocations: [] });
    });

    map.forEach((item) => {
      if (item.parent_id !== "0") {
        const parentItem = map.get(item.parent_id);
        if (parentItem) {
          parentItem.subLocations.push(item);
        }
      } else {
        tree.push(item);
      }
    });

    return tree;
  }

  // Мемоизированное значение массива с локациями в виде дерева
  const locations = useMemo(() => buildTree(locs?.data), [locs]);
  useEffect(() => {
    const filteredLocations = locations?.filter(
      (item) =>
        item.org_id === selectedLocation?.org_id &&
        item.id !== selectedLocation?.id
    );
    setCurrenLocations(filteredLocations);
  }, [locations, selectedLocation]);

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
