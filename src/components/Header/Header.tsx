import { useState } from "react";

import { useAuth } from "@hooks/useAuth";
import {
  AppBar,
  Avatar,
  Box,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { SideBar } from "@components/SideBar";
import { useStyles } from "@hooks/useStyles";
import { useModal } from "@hooks/useModal";
import { Modal } from "@components/_shared/Modal";
import styles from "./styles.module.scss";

export const Header = () => {
  const user = useAuth()?.user;
  const cx = useStyles(styles);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [open, openModal, closeModal] = useModal();

  const toggleSideBar = (newOpen: boolean) => {
    setOpenSideBar(newOpen);
  };

  return (
    <>
      <AppBar position="static" className={cx("header")}>
        <Toolbar className={cx("toobar")}>
          {/* ToDo: скрыть кнопку, если у пользователя только права на чтение: */}
          <IconButton
            className={cx("burger")}
            onClick={() => toggleSideBar(true)}
          >
            <MenuIcon className={cx("icon_burger")} />
          </IconButton>

          <Box className={cx("user_info")}>
            <Avatar className={cx("avatar")}></Avatar>

            <Typography className={cx("name")}>
              {`${user?.family} ${user?.name} ${user?.father}`}
            </Typography>
            <ArrowDropDownIcon sx={{ color: "#fff" }} />
          </Box>
        </Toolbar>
      </AppBar>
      <SideBar
        open={openSideBar}
        onClose={() => toggleSideBar(false)}
        onOpenModal={openModal}
      />

      <Modal open={open} handleClose={closeModal} />
    </>
  );
};
