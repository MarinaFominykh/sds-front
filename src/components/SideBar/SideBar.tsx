import React, { FC } from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import { Link } from "react-router-dom";
import { useAppDispatch } from "@hooks/redux";
import { useStyles } from "@hooks/useStyles";
import { setVariant } from "@src/redux/reducers/ModalSlice";
import styles from "./styles.module.scss";
import { sideBarModalsData, sideBarLinksData } from "@src/data/data";
import { eVariantModal } from "@src/types/EvariantModal";

type itemModal = {
  id: string;
  title: string;
  icon: React.ElementType;
  modal: eVariantModal;
};
interface Props {
  open: boolean;
  onClose: () => void;
  onOpenModal: () => void;
}

export const SideBar: FC<Props> = ({ open, onClose, onOpenModal }) => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();

  const handleOpenModal = (item: itemModal) => {
    dispatch(setVariant({ title: item.title, variant: item.modal }));
    onOpenModal();
  };
  const DrawerList = (
    <Box sx={{ width: 300 }} onClick={onClose}>
      <List>
        {sideBarLinksData.map((link) => (
          <ListItem key={link.id} disablePadding>
            <ListItemButton>
              <Link to={link.link} className={cx("link")}>
                <ListItemIcon>
                  {link.icon && <link.icon className={cx("icon")} />}
                </ListItemIcon>

                <ListItemText primary={link.title} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {sideBarModalsData.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton onClick={() => handleOpenModal(item)}>
              <ListItemIcon>
                {item.icon && <item.icon className={cx("icon")} />}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <>
      <Drawer open={open} onClose={onClose}>
        {DrawerList}
      </Drawer>
    </>
  );
};
