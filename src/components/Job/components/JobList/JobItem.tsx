import { FC } from "react";
import { TreeItem } from "@mui/x-tree-view";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { IJob } from "@src/types/IJob";

interface Props {
  job: IJob;
}
export const JobItem: FC<Props> = ({ job }) => {
  return (
    <TreeItem
      itemId={job.id || ""}
      label={job.name || ""}
      slots={{
        // expandIcon: DomainAddOutlinedIcon,
        // collapseIcon: DomainAddOutlinedIcon,
        endIcon: AccountCircleOutlinedIcon,
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
