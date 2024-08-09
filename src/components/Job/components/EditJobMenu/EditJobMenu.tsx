import { FC } from "react";
import { Menu, MenuItem, ListItemIcon } from "@mui/material";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import { eVariantModal } from "@src/types/EvariantModal";

interface Props {
  isOpen: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  handleOpenModal: (variant: eVariantModal, title: string) => void;
}
export const EditJobMenu: FC<Props> = ({
  isOpen,
  anchorEl,
  onClose,
  handleOpenModal,
}) => {
  return (
    <Menu open={isOpen} id="editJobMenu" anchorEl={anchorEl} onClose={onClose}>
      <MenuItem
        onClick={() =>
          handleOpenModal(eVariantModal.editJob, "Редактировать должность")
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
