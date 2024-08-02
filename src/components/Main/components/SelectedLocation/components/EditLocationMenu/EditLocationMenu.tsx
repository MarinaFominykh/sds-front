import { FC } from "react";
import { Menu, MenuItem, ListItemIcon } from "@mui/material";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import MoveUpRoundedIcon from "@mui/icons-material/MoveUpRounded";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import PhotoSizeSelectLargeIcon from "@mui/icons-material/PhotoSizeSelectLarge";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import { eVariantModal } from "@src/types/EvariantModal";
import { ILocation } from "@src/types/ILocation";

interface Props {
  isOpen: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  handleOpenModal: (variant: eVariantModal, title: string) => void;
  location: ILocation | null;
}
export const EditLocationMenu: FC<Props> = ({
  isOpen,
  anchorEl,
  onClose,
  handleOpenModal,
  location,
}) => {
  return (
    <Menu
      open={isOpen}
      id="editLocationMenu"
      anchorEl={anchorEl}
      onClose={onClose}
    >
      <MenuItem
        onClick={() =>
          handleOpenModal(
            eVariantModal.editLocation,
            "Редактировать расположение"
          )
        }
      >
        <ListItemIcon>
          <ModeEditRoundedIcon fontSize="small" />
        </ListItemIcon>
        Редактировать
      </MenuItem>
      <MenuItem
        onClick={() =>
          handleOpenModal(
            eVariantModal.moveLocation,
            `Переместить ${location?.g_name}`
          )
        }
      >
        <ListItemIcon>
          <MoveUpRoundedIcon fontSize="small" />
        </ListItemIcon>
        Переместить
      </MenuItem>
      <MenuItem
        onClick={() =>
          handleOpenModal(
            eVariantModal.addSubLocation,
            `Добавить подгруппу в ${location?.g_name}`
          )
        }
      >
        <ListItemIcon>
          <CreateNewFolderOutlinedIcon fontSize="small" />
        </ListItemIcon>
        Добавить подгруппу
      </MenuItem>
      <MenuItem
        onClick={() =>
          handleOpenModal(
            eVariantModal.newDev,
            `Добавить устройство для ${location?.g_name}`
          )
        }
      >
        <ListItemIcon>
          <CrisisAlertIcon fontSize="small" />
        </ListItemIcon>
        Добавить устройство
      </MenuItem>
      <MenuItem
        onClick={() =>
          handleOpenModal(
            eVariantModal.newDevs,
            `Загрузить список устройств для ${location?.g_name}`
          )
        }
      >
        <ListItemIcon>
          <PostAddOutlinedIcon fontSize="small" />
        </ListItemIcon>
        Загрузить список устройств
      </MenuItem>
      <MenuItem
        onClick={() =>
          handleOpenModal(
            eVariantModal.newScheme,
            `Загрузить схему расположения для ${location?.g_name}`
          )
        }
      >
        <ListItemIcon>
          <PhotoSizeSelectLargeIcon fontSize="small" />
        </ListItemIcon>
        Загрузить схему расположения
      </MenuItem>
    </Menu>
  );
};
