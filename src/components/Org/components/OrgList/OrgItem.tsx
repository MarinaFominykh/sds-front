import { FC } from "react";
import { TreeItem } from "@mui/x-tree-view";
import DomainAddOutlinedIcon from "@mui/icons-material/DomainAddOutlined";
import { IOrg } from "@src/types/IOrg";

interface Props {
  org: IOrg;
}
export const OrgItem: FC<Props> = ({ org }) => {
  return (
    <TreeItem
      itemId={org.id || ""}
      label={org.full_name}
      slots={{
        // expandIcon: DomainAddOutlinedIcon,
        // collapseIcon: DomainAddOutlinedIcon,
        endIcon: DomainAddOutlinedIcon,
      }}
      sx={{
        color: "#222",

        fontSize: "14px",
        "& .MuiTreeItem-content": {
          padding: "0px",
        },
        "& .MuiSvgIcon-root": {
          color: "#266bf1",
        },
      }}
    />
  );
};
