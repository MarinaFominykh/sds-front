import React, { FC, ElementType, useEffect } from "react";
import { SimpleTreeView } from "@mui/x-tree-view";
import { ILocation } from "@src/types/ILocation";
import { IDev } from "@src/types/IDev";
import { LocationItem } from "./LocationItem";

import { useStyles } from "@hooks/useStyles";

import styles from "./styles.module.scss";

interface Props {
  locations: ILocation[];
  handleClick: (id: string | null) => void;
}
export const LocationTreeView: FC<Props> = (props) => {
  const {
    locations,

    handleClick,

    ...other
  } = props;
  const cx = useStyles(styles);

  return (
    <div className={cx("container")}>
      <SimpleTreeView
        className={cx("tree")}
        onSelectedItemsChange={(e, id) => handleClick(id)}
      >
        {locations?.map((location) => (
          <LocationItem key={location.id} location={location} />
        ))}
      </SimpleTreeView>
    </div>
  );
};
