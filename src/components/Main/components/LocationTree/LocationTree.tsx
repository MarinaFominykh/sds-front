import { useState, useEffect, useMemo } from "react";

import { LocationTreeView } from "./LocationTreeView";
import { Alert } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@hooks/redux";
import {
  setSelectedLocation,
  setIsSelected,
  setIsLoadingScheme,
} from "@src/redux/reducers/locationSlice";
import { setSelectedDev } from "@src/redux/reducers/devSlice";
import { setDevs, setVisibleDevice } from "@src/redux/reducers/devSlice";
import { useGetAllOrgsQuery } from "@src/redux/services/orgApi";
import { useGetAllLocationQuery } from "@src/redux/services/locacationApi";
import {
  useGetAllDevsQuery,
  useGetControlSessQuery,
  useGetLastSessQuery,
} from "@src/redux/services/devsApi";
import { useAuth } from "@hooks/useAuth";
import { ILocation } from "@src/types/ILocation";
import { IDev } from "@src/types/IDev";
import { api } from "@api/api";
import { createBodyQuery } from "@src/utils/functions";
import { ECOMMAND } from "@src/types/ECommand";

export const LocationTree = () => {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const {
    locations: locationArr,
    selectedLocation: currentLocation,
    locationsTree,
  } = useAppSelector((state) => state.locationSlice);
  const { isVisibleDevice, selectedDev } = useAppSelector(
    (state) => state.devSlice
  );
  const { data: orgs } = useGetAllOrgsQuery({});
  const { isLoading, isError } = useGetAllLocationQuery({});
  const { data: devs } = useGetAllDevsQuery({});
  const { data: controlSession } = useGetControlSessQuery(
    { dev_number: selectedDev?.number },
    { skip: !isVisibleDevice }
  );
  const { data: lastSession } = useGetLastSessQuery(
    { dev_number: selectedDev?.number },
    { skip: !isVisibleDevice }
  );
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSelectLocation = (id: string) => {
    // Проверяем: если выбрана та же локация, то ничего не делаем, чтобы не было повторного рендеринга компонента SelectedLocation
    if (currentLocation?.id !== id) {
      const query = createBodyQuery(ECOMMAND.GETSCHEME, { id_devs_groups: id });

      //dispatch(setSelectedLocation(null));
      const isLocation = !id?.includes("dev_");
      if (isLocation) {
        dispatch(setVisibleDevice(false));
        const selectedLocation = locationArr?.find(
          (location: ILocation) => location.id === id
        );

        if (selectedLocation) {
          const org = orgs?.data.find(
            (org: ILocation) => selectedLocation.org_id === org.id
          );
          dispatch(setIsLoadingScheme(true));
          api
            .fetch(query)
            .then((res) => {
              const svg = res?.data?.[0]?.svg;
              const newSelectedLocation = { ...selectedLocation, org, svg };

              dispatch(setSelectedLocation(newSelectedLocation));
              dispatch(setIsSelected(true));
            })
            .catch((error) => console.log("error=>", error))
            .finally(() => dispatch(setIsLoadingScheme(false)));
        } else {
          dispatch(setIsSelected(false));
        }
      } else {
        dispatch(setVisibleDevice(true));
        const devId = id.replace("dev_", "");
        const selectedDev = devs?.data.find((dev: IDev) => dev.id === devId);

        dispatch(setSelectedDev(selectedDev));
        // TODO: проверить работу без этой строчки
        //dispatch(setSelectedLocation(null));
      }
    } else {
      dispatch(setVisibleDevice(false));
    }
  };

  //Добавляем в выбранное устройство контрольную сессию, когда приходят данные о контрольной сессии
  useEffect(() => {
    if (isVisibleDevice) {
      dispatch(
        setSelectedDev({
          ...(selectedDev as IDev),
          control_sess: controlSession?.data?.[0],
          last_sess: lastSession?.data?.[0],
        })
      );
    }
  }, [controlSession, lastSession]);

  useEffect(() => {
    // Если у пользователя есть права редактирования:
    if (auth && "user" in auth && auth?.user?.roles_ids.roles[1] === 2)
      setIsAdmin(true);
  }, [auth?.user]);

  // Мемоизированное значение массива с локациями в виде дерева, отфильтрованное для пользователей без прав редактирования
  const filteredLocations = useMemo(
    () =>
      locationsTree?.filter(
        (item: ILocation) => item.org_id === auth?.user?.id_org
      ),
    [locationsTree]
  );

  useEffect(() => {
    if (devs && "data" in devs) {
      dispatch(setDevs(devs.data));
    }
  }, [devs]);

  return (
    <>
      {isError ? (
        <Alert severity="error">Произошла ошибка при загрузке устройств</Alert>
      ) : (
        <LocationTreeView
          // TODO: проверить под пользователем, у которого нет прав редактирования
          locations={isAdmin ? locationsTree : filteredLocations}
          handleClick={handleSelectLocation}
          isLoading={isLoading}
        />
      )}
    </>
  );
};
