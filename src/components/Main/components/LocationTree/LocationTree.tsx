import React, { useState, useEffect, useMemo } from "react";
import moment from "moment";
import { LocationTreeView } from "./LocationTreeView";
import FolderIcon from "@mui/icons-material/Folder";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import { useGetAllLocationQuery } from "@src/redux/services/locacationApi";
import {
  useGetAllDevsQuery,
  useGetLasSessQuery,
} from "@src/redux/services/devsApi";
import { api } from "../../../../api/api";
import { useAuth } from "@hooks/useAuth";
import { ILocation } from "@src/types/ILocation";
import { IDev } from "@src/types/IDev";

export const LocationTree = () => {
  const auth = useAuth();
  const { data: locs } = useGetAllLocationQuery({});
  const { data: devs } = useGetAllDevsQuery({});

  const [isDevs, setDevs] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  //const [locations, setLocations] = useState<ILocation[] | []>([]);

  const handleSelectLocation = (id: string | null) => {
    console.log(id);
  };
  console.log("devs", devs?.data);

  // let devsWithLastSession = [...devs?.data];
  // devsWithLastSession.map((dev: IDev) => {
  //   const { data: lastSession } = useGetLasSessQuery({
  //     dev_number: dev.number,
  //   });
  //   return {
  //     ...dev,
  //     lastSession: lastSession?.data,
  //   };
  // });

  function buildTree(items: ILocation[]) {
    const map = new Map();
    const tree: ILocation[] = [];

    const newItems = items?.map((item) => {
      return {
        ...item,
        devs: devs?.data.filter((dev: IDev) => dev.group_dev_id === item.id),
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

  const locations = useMemo(() => buildTree(locs?.data), [devs, locs]);
  const filteredLocations = useMemo(
    () =>
      locations?.filter(
        (item: ILocation) => item.org_id === auth?.user?.id_org
      ),
    [locations]
  );
  // useEffect(() => {
  //   // const transformedArray = buildTree(locs?.data);
  //   setLocations(transformedArray);
  // }, [locs, devs]);
  console.log("locations", locations);
  return (
    <LocationTreeView
      // TODO: проверить под пользователем, у которого нет прав редактирования
      locations={isAdmin ? locations : filteredLocations}
      isDevs={isDevs}
      handleClick={handleSelectLocation}
    />
  );
};
