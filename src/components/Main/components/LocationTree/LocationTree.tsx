import React, { useState, useEffect, useMemo } from "react";

import { LocationTreeView } from "./LocationTreeView";
import { Alert } from "@mui/material";
import { useGetAllLocationQuery } from "@src/redux/services/locacationApi";
import {
  useGetAllDevsQuery,
  useGetAllLasSessQuery,
} from "@src/redux/services/devsApi";

import { useAuth } from "@hooks/useAuth";
import { ILocation } from "@src/types/ILocation";

import { IDev } from "@src/types/IDev";
import { ISession } from "@src/types/ISession";

export const LocationTree = () => {
  const auth = useAuth();
  const { data: locs, isLoading, isError } = useGetAllLocationQuery({});
  const { data: devs } = useGetAllDevsQuery({});
  const { data: lastSessions } = useGetAllLasSessQuery({});
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSelectLocation = (id: string | null) => {};
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
        time: sessions.find((sess) => sess.dev_number === dev.number)?.time_srv,
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

  const allSessions = useMemo(
    () => filterUniqueMaxId(lastSessions?.data),
    [lastSessions?.data]
  );
  const devsWithSessions = useMemo(
    () => addTimeInDev(devs?.data, allSessions),
    [devs?.data, allSessions]
  );

  const locations = useMemo(
    () => buildTree(locs?.data, devsWithSessions),
    [devs, locs, devsWithSessions]
  );
  const filteredLocations = useMemo(
    () =>
      locations?.filter(
        (item: ILocation) => item.org_id === auth?.user?.id_org
      ),
    [locations]
  );

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
