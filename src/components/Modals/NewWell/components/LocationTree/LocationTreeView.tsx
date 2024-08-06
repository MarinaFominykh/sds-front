import { FC } from "react";
import { CircularProgress } from "@mui/material";
import { SimpleTreeView } from "@mui/x-tree-view";
import { ILocation } from "@src/types/ILocation";
import { LocationItem } from "./LocationItem";

import { useStyles } from "@hooks/useStyles";

import styles from "./styles.module.scss";

interface Props {
  locations: ILocation[];
  handleClick: (id: string | null) => void;
  isLoading: boolean;
}
export const LocationTreeView: FC<Props> = (props) => {
  const { locations, handleClick, isLoading, ...other } = props;
  const cx = useStyles(styles);

  return (
    <>
      {isLoading ? (
        <CircularProgress sx={{ color: "#266bf1" }} />
      ) : (
        <SimpleTreeView
          className={cx("tree")}
          onSelectedItemsChange={(_, id) => handleClick(id)}
        >
          {locations?.map((location) => (
            <LocationItem
              {...other}
              key={location.id}
              location={location}
              isLoading={isLoading}
            />
          ))}
        </SimpleTreeView>
      )}
    </>
  );
};
