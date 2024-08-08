import { useMemo, useEffect } from "react";
import { Header } from "@components/Header";
import { Outlet } from "react-router-dom";
import { useGetAllLocationQuery } from "@src/redux/services/locacationApi";
import {
  useGetAllDevsQuery,
  useGetAllLastSessQuery,
} from "@src/redux/services/devsApi";
import { useGetAllWellsQuery } from "@src/redux/services/wellApi";
import { useDispatch } from "react-redux";
import {
  setLocationsTree,
  setLocations,
} from "@src/redux/reducers/locationSlice";
import { ILocation } from "@src/types/ILocation";
import { IDev } from "@src/types/IDev";
import { ISession } from "@src/types/ISession";
import { IWell } from "@src/types/IWell";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";

export const Layout = () => {
  const cx = useStyles(styles);
  const dispatch = useDispatch();
  const { data: locs } = useGetAllLocationQuery({});
  const { data: devs } = useGetAllDevsQuery({});
  const { data: wells } = useGetAllWellsQuery({});
  const { data: lastSessions } = useGetAllLastSessQuery({});

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
  function buildTree(items: ILocation[], devs: IDev[], wells: IWell[]) {
    const map = new Map();
    const tree: ILocation[] = [];

    const newItems = items?.map((item) => {
      return {
        ...item,
        devs: devs?.filter((dev: IDev) => dev.group_dev_id === item.id),
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
    () => buildTree(locs?.data, devsWithSessions, wells?.data),
    [devs, locs, devsWithSessions, wells]
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
      <Header />
      <main className={cx("main")}>
        <Outlet />
      </main>
    </>
  );
};
