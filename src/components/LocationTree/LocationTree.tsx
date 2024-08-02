import { useState, useEffect, useMemo, FC } from "react";

import { LocationTreeView } from "./LocationTreeView";
import { Alert } from "@mui/material";

import { useAppDispatch } from "@hooks/redux";
import {
  setLocations,
  setLocationsTree,
} from "@src/redux/reducers/locationSlice";

import { useGetAllLocationQuery } from "@src/redux/services/locacationApi";
import {
  useGetAllDevsQuery,
  useGetAllLastSessQuery,
} from "@src/redux/services/devsApi";

import { useAuth } from "@hooks/useAuth";
import { ILocation } from "@src/types/ILocation";

import { IDev } from "@src/types/IDev";
import { ISession } from "@src/types/ISession";

interface Props {
  handleSelectLocation: (id: string | null) => void;
  isDevs: boolean;
}
export const LocationTree: FC<Props> = (props) => {
  const { handleSelectLocation, ...other } = props;
  const auth = useAuth();
  const dispatch = useAppDispatch();

  const { data: locs, isLoading, isError } = useGetAllLocationQuery({});
  const { data: devs } = useGetAllDevsQuery({});
  const { data: lastSessions } = useGetAllLastSessQuery({});
  const [isAdmin, setIsAdmin] = useState(false);

  // const handleSelectLocation = (id: string | null) => {
  //   dispatch(setSelectedLocation(null));
  //   const isLocation = !id?.includes("dev_");
  //   if (isLocation) {
  //     const selectedLocation = locationArr?.find(
  //       (location: ILocation) => location.id === id
  //     );

  //     if (selectedLocation) {
  //       const org = orgs?.data.find(
  //         (org: ILocation) => selectedLocation.org_id === org.id
  //       );
  //       dispatch(setSelectedLocation({ ...selectedLocation, org }));
  //       dispatch(setIsSelected(true));
  //     }
  //   } else dispatch(setIsSelected(false));
  // };
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

  return (
    <>
      {isError ? (
        <Alert severity="error">Произошла ошибка при загрузке устройств</Alert>
      ) : (
        <LocationTreeView
          // TODO: проверить под пользователем, у которого нет прав редактирования
          {...other}
          locations={isAdmin ? locations : filteredLocations}
          handleClick={handleSelectLocation}
          isLoading={isLoading}
        />
      )}
    </>
  );
};
