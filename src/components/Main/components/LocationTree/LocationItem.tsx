import React, { FC, ReactNode, ElementType } from "react";
import { TreeItem } from "@mui/x-tree-view";
import FolderIcon from "@mui/icons-material/Folder";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import { ILocation } from "@src/types/ILocation";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";

interface Props {
  location: ILocation;
  isDevs: boolean;
  //subLocations: ILocation[];
}

export const LocationItem: FC<Props> = ({ location, isDevs }) => {
  const getIcon = () => {
    return isDevs ? FolderIcon : FolderZipIcon;
  };

  return (
    <>
      <TreeItem
        itemId={location.id}
        label={location.g_name}
        slots={{
          expandIcon: getIcon(),
          collapseIcon: getIcon(),
          endIcon: getIcon(),
        }}
        sx={{
          color: "#222",
          fontSize: "14px",
          "& .MuiSvgIcon-root": {
            color: `${
              location.deleted ? "#808080" : isDevs ? "#FFE2C0" : "#FFAD4E"
            }`,
          },
        }}
      >
        {location.subLocations?.length !== 0 && (
          <>
            {location.subLocations?.map((item) => (
              <LocationItem key={item.id} location={item} isDevs={true} />
            ))}
          </>
        )}
        {location?.devs?.map((dev) => {
          return (
            <TreeItem
              key={dev.id}
              itemId={`dev_${dev.id}`}
              label={dev.number}
              slots={{
                endIcon: CrisisAlertIcon,
              }}
              sx={{
                color: "#000",
                fontSize: "14px",
                "& .MuiSvgIcon-root": {
                  color: `${dev.deleted ? "#808080" : "#0FA958"}`,
                },
              }}
            />
          );
        })}
      </TreeItem>
    </>
  );
};
