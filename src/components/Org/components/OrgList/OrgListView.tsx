import { FC, ChangeEvent } from "react";
import { SimpleTreeView } from "@mui/x-tree-view";
import {
  CircularProgress,
  InputBase,
  Divider,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { OrgItem } from "./OrgItem";
import { IOrg } from "@src/types/IOrg";
import { useStyles } from "@hooks/useStyles";

import styles from "./styles.module.scss";

interface Props {
  orgs: IOrg[];
  handleClick: (id: string) => void;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}
export const OrgListView: FC<Props> = (props) => {
  const { orgs, handleClick, handleSearch, isLoading } = props;
  const cx = useStyles(styles);
  return (
    <div className={cx("container")}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <div className={cx("search")}>
            <InputBase
              sx={{ ml: 1, flex: 1, fontSize: "14px", pl: "14px" }}
              placeholder="Поиск по названию"
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
            {orgs?.length > 0 ? (
              orgs?.map((org) => {
                return <OrgItem key={org.id} org={org} />;
              })
            ) : (
              <p className="notfound">Ничего не найдено</p>
            )}
          </SimpleTreeView>
        </>
      )}
    </div>
  );
};
