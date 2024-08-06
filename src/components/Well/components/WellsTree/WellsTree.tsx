import { useMemo, useState, ChangeEvent } from "react";
import { useGetAllWellsQuery } from "@src/redux/services/wellApi";
import { useGetAllLocationQuery } from "@src/redux/services/locacationApi";
import { useAppSelector } from "@hooks/redux";
import { IWell } from "@src/types/IWell";
import { ILocation } from "@src/types/ILocation";
import { WellsTreeView } from "./WellsTreeView";

export const WellsTree = () => {
  const { data: locs, isLoading } = useGetAllLocationQuery({});
  const { data: wells } = useGetAllWellsQuery({});
  const { locationsTree } = useAppSelector((state) => state.locationSlice);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  //Глубокая копия массива с деревом локаций
  const locationsTreeCopy = JSON.parse(JSON.stringify(locationsTree));

  //Из массива с локациями оставим элементы, где есть скважины
  //TODO: фильтруются только локации. Добавить фильтрацию скважин
  const getFiltredWells = (array: ILocation[], searchValue: string) => {
    return array.filter((location) => {
      if (location.wells?.some((well) => well.number.includes(searchValue))) {
        return true;
      } else if (location.subLocations.length > 0) {
        location.subLocations = getFiltredWells(
          location.subLocations,
          searchValue
        );
        return location.subLocations.length > 0;
      }
      return false;
    });
  };

  const filteredWells = useMemo(
    () => getFiltredWells(locationsTreeCopy, searchValue),
    [searchValue, locationsTree]
  );

  return (
    <WellsTreeView
      locations={filteredWells}
      isLoading={isLoading}
      handleSearch={handleSearch}
    />
  );
};
