import { FC } from "react";
import { Menu, MenuItem, ListItemIcon } from "@mui/material";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import { eVariantModal } from "@src/types/EvariantModal";
import { ILocation } from "@src/types/ILocation";

interface Props {
  isOpen: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  handleOpenModal: (variant: eVariantModal, title: string) => void;
}
export const EditWellMenu: FC<Props> = ({
  isOpen,
  anchorEl,
  onClose,
  handleOpenModal,
}) => {
  return (
    <Menu open={isOpen} id="editWellMenu" anchorEl={anchorEl} onClose={onClose}>
      <MenuItem
        onClick={() =>
          handleOpenModal(eVariantModal.editWell, "Редактировать скважину")
        }
      >
        <ListItemIcon>
          <ModeEditRoundedIcon fontSize="small" />
        </ListItemIcon>
        Редактировать
      </MenuItem>
    </Menu>
  );
};
