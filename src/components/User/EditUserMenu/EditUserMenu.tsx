import { FC } from "react";
import { Menu, MenuItem, ListItemIcon } from "@mui/material";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";

interface Props {
  isOpen: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  handleOpenModal: () => void;
}
export const EditUserMenu: FC<Props> = ({
  isOpen,
  anchorEl,
  onClose,
  handleOpenModal,
}) => {
  return (
    <Menu open={isOpen} id="editUserMenu" anchorEl={anchorEl} onClose={onClose}>
      <MenuItem onClick={handleOpenModal}>
        <ListItemIcon>
          <ModeEditRoundedIcon fontSize="small" />
        </ListItemIcon>
        Редактировать
      </MenuItem>
    </Menu>
  );
};
