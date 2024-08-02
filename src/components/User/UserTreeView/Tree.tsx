import { FC } from "react";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";
import { IUser } from "@src/types/IUser";

interface Props {
  users: IUser[];
  handleSelected: (id: string | null) => void;
  //   icon: ElementType;
}

export const Tree: FC<Props> = ({ users, handleSelected }) => {
  const cx = useStyles(styles);

  return (
    <SimpleTreeView
      onSelectedItemsChange={(_, id) => handleSelected(id)}
      className={cx("tree")}
      slots={{
        endIcon: AccountCircleOutlinedIcon,
      }}
      sx={{
        "& .MuiSvgIcon-root": {
          color: "#266bf1",
        },
      }}
    >
      {users?.map((user) => (
        <TreeItem
          key={user.id}
          itemId={user.id}
          label={`${user.name} ${user.father} ${user.family}`}
          className={cx("tree-item")}
          sx={{
            "& .MuiTreeItem-content": {
              alignItems: "flex-start",
            },
          }}
        />
      ))}
    </SimpleTreeView>
  );
};
