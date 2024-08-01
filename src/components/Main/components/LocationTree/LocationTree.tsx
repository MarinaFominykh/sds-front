import React, { useState, useEffect, useMemo } from "react";

import { LocationTreeView } from "./LocationTreeView";
import { Alert } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@hooks/redux";
import {
  setSelectedLocation,
  setLocations,
  setLocationsTree,
  setIsSelected,
  setIsLoadingScheme,
} from "@src/redux/reducers/locationSlice";
import { setSelectedDev } from "@src/redux/reducers/devSlice";
import { setDevs, setVisibleDevice } from "@src/redux/reducers/devSlice";
import { useGetAllOrgsQuery } from "@src/redux/services/orgApi";
import { useGetAllLocationQuery } from "@src/redux/services/locacationApi";
import {
  useGetAllDevsQuery,
  useGetAllLastSessQuery,
  useGetControlSessQuery,
  useGetLastSessQuery,
} from "@src/redux/services/devsApi";
import { useGetSchemeQuery } from "@src/redux/services/schemeApi";

import { useAuth } from "@hooks/useAuth";
import { ILocation } from "@src/types/ILocation";

import { IDev } from "@src/types/IDev";
import { ISession } from "@src/types/ISession";
import { api } from "@api/api";
import { createBodyQuery } from "@src/utils/functions";
import { ECOMMAND } from "@src/types/ECommand";

export const LocationTree = () => {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const { locations: locationArr, selectedLocation: currentLocation } =
    useAppSelector((state) => state.locationSlice);
  const { isVisibleDevice, selectedDev } = useAppSelector(
    (state) => state.devSlice
  );
  const { data: orgs } = useGetAllOrgsQuery({});
  const { data: locs, isLoading, isError } = useGetAllLocationQuery({});
  const { data: devs } = useGetAllDevsQuery({});
  const { data: controlSession } = useGetControlSessQuery(
    { dev_number: selectedDev?.number },
    { skip: !isVisibleDevice }
  );
  const { data: lastSession } = useGetLastSessQuery(
    { dev_number: selectedDev?.number },
    { skip: !isVisibleDevice }
  );
  const { data: lastSessions } = useGetAllLastSessQuery({});
  const [isAdmin, setIsAdmin] = useState(false);
  // const [id, setId] = useState("0");
  //const { data: scheme } = useGetSchemeQuery({ id_devs_groups: id });

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

  //Добавляем в выбранное устройство последнюю сессию, когда приходят данные о последней сессии
  // useEffect(() => {
  //   if (isVisibleDevice) {
  //     dispatch(
  //       setSelectedDev({
  //         ...(selectedDev as IDev),
  //         last_sess: lastSession?.data?.[0],
  //       })
  //     );
  //   }
  // }, [lastSession]);

  // Фильтрация массива с сессиями: оставляем по одной последней сессии для каждого устройства
  function filterUniqueMaxId(sessions: ISession[]) {
    interface UniqueDevs {
      [key: string]: ISession;
    }
    const uniqueDevs: UniqueDevs = {};
    sessions?.forEach((obj) => {
      const { dev_number } = obj;
      const id = Number(obj.id);
      if (
        !(dev_number in uniqueDevs) ||
        id > Number(uniqueDevs[dev_number].id)
      ) {
        uniqueDevs[dev_number] = obj;
      }
    });

    return Object.values(uniqueDevs);
  }

  // Добавляем поле с последней сессии в массив устройств, который приходит с сервера
  function addTimeInDev(devs: IDev[], sessions: ISession[]) {
    return devs?.map((dev: IDev) => {
      return {
        ...dev,
        time: sessions.find((sess) => sess.dev_id === dev.id)?.time_srv,
      };
    });
  }

  // Преобразуем массив с локациями в древовидную структуру
  function buildTree(items: ILocation[], devs: IDev[]) {
    const map = new Map();
    const tree: ILocation[] = [];

    const newItems = items?.map((item) => {
      return {
        ...item,
        devs: devs?.filter((dev: IDev) => dev.group_dev_id === item.id),
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

  useEffect(() => {
    // Если у пользователя есть права редактирования:
    if (auth && "user" in auth && auth?.user?.roles_ids.roles[1] === 2)
      setIsAdmin(true);
  }, [auth?.user]);

  //Мемоизированное значение массива с уникальными сессиями
  const allSessions = useMemo(
    () => filterUniqueMaxId(lastSessions?.data),
    [lastSessions?.data]
  );
  // Мемоизированное значение массива устройств с добавленным полем time
  const devsWithSessions = useMemo(
    () => addTimeInDev(devs?.data, allSessions),
    [devs?.data, allSessions]
  );

  // Мемоизированное значение массива с локациями в виде дерева
  const locations = useMemo(
    () => buildTree(locs?.data, devsWithSessions),
    [devs, locs, devsWithSessions]
  );

  // Мемоизированное значение массива с локациями в виде дерева, отфильтрованное для пользователей без прав редактирования
  const filteredLocations = useMemo(
    () =>
      locations?.filter(
        (item: ILocation) => item.org_id === auth?.user?.id_org
      ),
    [locations]
  );
  useEffect(() => {
    if (locs && "data" in locs) {
      dispatch(setLocations(locs.data));
    }
  }, [locs?.data]);
  useEffect(() => {
    if (locations) {
      dispatch(setLocationsTree(locations));
    }
  }, [locations]);

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
          locations={isAdmin ? locations : filteredLocations}
          handleClick={handleSelectLocation}
          isLoading={isLoading}
        />
      )}
    </>
  );
};
