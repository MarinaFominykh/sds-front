import { useMemo, useState, ChangeEvent } from "react";
import { useGetAllWellsQuery } from "@src/redux/services/wellApi";
import { useGetAllLocationQuery } from "@src/redux/services/locacationApi";
import { IWell } from "@src/types/IWell";
import { ILocation } from "@src/types/ILocation";
import { WellsTreeView } from "./WellsTreeView";

export const WellsTree = () => {
  const { data: locs, isLoading } = useGetAllLocationQuery({});
  const { data: wells } = useGetAllWellsQuery({});
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  //Из массива с локациями оставим элементы, где есть скважины
  const getFiltredWells = (array: ILocation[], searchValue: string) => {
    console.log("array = ", array);
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
  //Преобразуем массив с локациями в древовидную структуру, добавляем поле с массивом скважин
  function buildTree(items: ILocation[], wells: IWell[]) {
    const map = new Map();
    const tree: ILocation[] = [];

    const newItems = items?.map((item) => {
      return {
        ...item,

        wells: wells?.filter((well: IWell) => well.group_id === item.id),
      };
    });
    newItems?.forEach((item) => {
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
  const locations = useMemo(
    () => buildTree(locs?.data, wells?.data),
    [locs, wells]
  );

  const filteredWells = useMemo(
    () => getFiltredWells(locations, searchValue),
    [locations, searchValue]
  );
  return (
    <WellsTreeView
      locations={filteredWells}
      isLoading={isLoading}
      handleSearch={handleSearch}
    />
  );
};
