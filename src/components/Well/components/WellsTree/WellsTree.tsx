import { useMemo, useState, ChangeEvent, useEffect } from "react";
import { useGetAllWellsQuery } from "@src/redux/services/wellApi";
import {
  useGetAllLocationQuery,
  useGetLocationByParentIdQuery,
} from "@src/redux/services/locacationApi";
import { useGetAllOrgsQuery } from "@src/redux/services/orgApi";
import { useGetDevByIdQuery } from "@src/redux/services/devsApi";
import { useAppSelector, useAppDispatch } from "@hooks/redux";
import {
  setSelectedWell,
  setIsSelectedWell,
  resetSelectedWell,
} from "@src/redux/reducers/wellSlice";
import { ISelectedWell, IWell } from "@src/types/IWell";
import { ILocation } from "@src/types/ILocation";
import { WellsTreeView } from "./WellsTreeView";

export const WellsTree = () => {
  const dispatch = useAppDispatch();
  const [orgId, setOrgId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [deviceId, setDeviceId] = useState("");

  const { isLoading } = useGetAllLocationQuery({});
  const { data: wells } = useGetAllWellsQuery({});
  const { data: org, isSuccess: isGetOrg } = useGetAllOrgsQuery(
    { id_org: orgId },
    { skip: !Boolean(orgId) }
  );
  const { data: location, isSuccess: isGetLocation } =
    useGetLocationByParentIdQuery(
      { id: locationId },
      { skip: !Boolean(locationId) }
    );
  const { data: device, isSuccess: isGetDevice } = useGetDevByIdQuery(
    { id: deviceId },
    { skip: !Boolean(deviceId) }
  );
  const { locationsTree } = useAppSelector((state) => state.locationSlice);
  const { selectedWell } = useAppSelector((state) => state.wellSlice);

  // const { selectedWell, isSelectedWell } = useAppSelector(
  //   (state) => state.wellSlice
  // );
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSelectWell = (id: string) => {
    const isWell = id.includes("well_");

    if (isWell) {
      const wellId = id.replace("well_", "");
      const well = wells?.data?.find((well: IWell) => well.id === wellId);

      if (well) {
        dispatch(setSelectedWell({ ...selectedWell, ...well }));
        dispatch(setIsSelectedWell(true));
        setOrgId(well?.org_id);
        setLocationId(well?.group_id);
        setDeviceId(well?.dev_id);
      }
    } else {
      dispatch(setIsSelectedWell(false));
      dispatch(resetSelectedWell());
    }
  };
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
  // useEffect(() => {
  //   console.log({ isGetDevice, isGetLocation, isGetOrg });
  //   dispatch(
  //     setSelectedWell({
  //       ...(selectedWell as ISelectedWell),
  //       location: location?.data?.[0],
  //       org: org?.data?.[0],
  //       device: device?.data?.[0],
  //     })
  //   );
  // }, [isGetDevice, isGetOrg, isGetLocation]);
  useEffect(() => {
    dispatch(
      setSelectedWell({
        ...(selectedWell as ISelectedWell),
        location: location?.data?.[0],
        org: org?.data?.[0],
        device: device?.data?.[0],
      })
    );
  }, [isGetLocation, location, isGetDevice, device, isGetOrg, org]);

  useEffect(() => {}, [isGetDevice]);

  return (
    <>
      <WellsTreeView
        locations={filteredWells}
        isLoading={isLoading}
        handleSearch={handleSearch}
        handleClick={handleSelectWell}
      />
    </>
  );
};
