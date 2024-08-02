import { FC } from "react";

import { TreeItem } from "@mui/x-tree-view";
import FolderIcon from "@mui/icons-material/Folder";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ILocation } from "@src/types/ILocation";

interface Props {
  location: ILocation;
  isLoading: boolean;
}

export const LocationItem: FC<Props> = ({ location, isLoading }) => {
  const getExpandIcon = () => {
    return location?.subLocations?.length !== 0
      ? KeyboardArrowRightRoundedIcon
      : FolderIcon;
  };
  const getEndIcon = () => {
    return location?.subLocations?.length !== 0
      ? KeyboardArrowDownIcon
      : FolderIcon;
  };
  const getColorIcon = () => {
    return location?.subLocations?.length !== 0 ? "222" : "#FFE2C0";
  };

  return (
    <TreeItem
      itemId={location.id || ""}
      label={location.g_name}
      slots={{
        expandIcon: getExpandIcon(),
        //collapseIcon: getIcon(),
        endIcon: getEndIcon(),
      }}
      sx={{
        color: "#222",
        fontSize: "14px",
        "& .MuiTreeItem-content": {
          padding: "0px",
        },
        "& .MuiSvgIcon-root": {
          color: `${location.deleted ? "#808080" : getColorIcon()}`,
        },
      }}
    >
      {location.subLocations?.length !== 0 && (
        <>
          {location.subLocations?.map((item) => (
            <LocationItem key={item.id} location={item} isLoading={isLoading} />
          ))}
        </>
      )}
    </TreeItem>
  );
};
