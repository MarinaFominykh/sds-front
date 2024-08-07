import { FC, ChangeEvent } from "react";
import { SimpleTreeView } from "@mui/x-tree-view";
import {
  CircularProgress,
  InputBase,
  Divider,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { WellItem } from "./WellItem";
import { ILocation } from "@src/types/ILocation";

import { useStyles } from "@hooks/useStyles";

import styles from "./styles.module.scss";

interface Props {
  locations: ILocation[];
  isLoading: boolean;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClick: (id: string) => void;
}

export const WellsTreeView: FC<Props> = ({
  locations,
  isLoading,
  handleSearch,
  handleClick,
}) => {
  const cx = useStyles(styles);

  return (
    <div className={cx("container")}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <div className={cx("search")}>
            <InputBase
              // id="search"
              sx={{ ml: 1, flex: 1, fontSize: "14px", pl: "14px" }}
              placeholder="Поиск по номеру"
              // inputProps={{ "aria-label": "search google maps" }}
              onChange={handleSearch}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </div>
          <SimpleTreeView
            onSelectedItemsChange={(_, id) => handleClick(id ?? "")}
          >
            {locations.map((location) => {
              return <WellItem key={location.id} location={location} />;
            })}
          </SimpleTreeView>
        </>
      )}
    </div>
  );
};
