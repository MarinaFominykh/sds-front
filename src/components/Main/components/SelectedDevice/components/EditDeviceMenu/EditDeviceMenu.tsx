import { FC } from "react";
import { Menu, MenuItem, ListItemIcon } from "@mui/material";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import MoveUpRoundedIcon from "@mui/icons-material/MoveUpRounded";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { eVariantModal } from "@src/types/EvariantModal";
import { IDev } from "@src/types/IDev";

interface Props {
  device: IDev | null;
  isOpenMenu: boolean;
  anchorEl: HTMLElement | null;
  onCloseMenu: () => void;
  handleOpenModal: (variant: eVariantModal, title: string) => void;
}
export const EditDeviceMenu: FC<Props> = ({
  device,
  isOpenMenu,
  anchorEl,
  onCloseMenu,
  handleOpenModal,
}) => {
  return (
    <Menu
      open={isOpenMenu}
      id="editDeviceMenu"
      anchorEl={anchorEl}
      onClose={onCloseMenu}
    >
      <MenuItem
        onClick={() =>
          handleOpenModal(eVariantModal.editDev, "Редактировать устройство")
        }
      >
        <ListItemIcon>
          <ModeEditRoundedIcon fontSize="small" />
        </ListItemIcon>
        Редактировать
      </MenuItem>
      <MenuItem
        onClick={() => handleOpenModal(eVariantModal.moveDev, "Переместить")}
      >
        <ListItemIcon>
          <MoveUpRoundedIcon fontSize="small" />
        </ListItemIcon>
        Переместить
      </MenuItem>
      <MenuItem
        onClick={() =>
          handleOpenModal(
            eVariantModal.newVerivRange,
            "Установить поверочный интервал"
          )
        }
      >
        <ListItemIcon>
          <MiscellaneousServicesIcon fontSize="small" />
        </ListItemIcon>
        Поверочный интервал
      </MenuItem>
      {device?.control_sess ? (
        <MenuItem
          onClick={() =>
            handleOpenModal(
              eVariantModal.deleteControlSession,
              "Удалить контрольную сессию?"
            )
          }
        >
          <ListItemIcon>
            <DeleteOutlineIcon fontSize="small" />
          </ListItemIcon>
          Удалить контрольную сессию
        </MenuItem>
      ) : (
        <MenuItem disabled>
          <ListItemIcon>
            <DeleteOutlineIcon fontSize="small" />
          </ListItemIcon>
          Контрольная сессия не установлена
        </MenuItem>
      )}
    </Menu>
  );
};
