import { FC } from "react";

import FolderIcon from "@mui/icons-material/Folder";

import GpsNotFixedIcon from "@mui/icons-material/GpsNotFixed";
interface Props {
  location: ILocation;
}

import { TreeItem } from "@mui/x-tree-view";
import { ILocation } from "@src/types/ILocation";

export const WellItem: FC<Props> = ({ location }) => {
  return (
    <TreeItem
      itemId={location.id || ""}
      label={location.g_name}
      slots={{
        expandIcon: FolderIcon,
        collapseIcon: FolderIcon,
        endIcon: FolderIcon,
      }}
      sx={{
        color: "#222",

        fontSize: "14px",
        "& .MuiTreeItem-content": {
          padding: "0px",
        },
        "& .MuiSvgIcon-root": {
          color: `${location.deleted ? "#808080" : "#FFE2C0"}`,
        },
      }}
    >
      {location.subLocations?.length !== 0 && (
        <>
          {location.subLocations?.map((item) => (
            <WellItem key={item.id} location={item} />
          ))}
        </>
      )}
      {location?.wells?.map((well) => {
        return (
          <TreeItem
            key={`dev_${well.id}`}
            itemId={`well_${well.id}`}
            label={well.number}
            slots={{
              endIcon: GpsNotFixedIcon,
            }}
            sx={{
              color: "black",
              "& .MuiSvgIcon-root": {
                color: `${location.deleted ? "#808080" : "#266bf1"}`,
              },
            }}
          ></TreeItem>
        );
      })}
    </TreeItem>
  );
};
