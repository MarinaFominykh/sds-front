import { useState, useEffect } from "react";

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
import { useAuth } from "@hooks/useAuth";
import { useStyles } from "@hooks/useStyles";
import { useModal } from "@hooks/useModal";
import { Modal } from "@components/_shared/Modal";
import styles from "./styles.module.scss";

export const Header = () => {
  const auth = useAuth();
  const cx = useStyles(styles);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [open, openModal, closeModal] = useModal();
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleSideBar = (newOpen: boolean) => {
    setOpenSideBar(newOpen);
  };

  useEffect(() => {
    // Если у пользователя есть права редактирования:
    if (auth && "user" in auth && auth?.user?.roles_ids.roles[1] === 2)
      setIsAdmin(true);
  }, [auth?.user]);

  return (
    <>
      <AppBar position="static" className={cx("header")}>
        <Toolbar className={cx("toobar")}>
          {isAdmin && (
            <IconButton
              className={cx("burger")}
              onClick={() => toggleSideBar(true)}
            >
              <MenuIcon className={cx("icon_burger")} />
            </IconButton>
          )}

          <Box className={cx("user_info")}>
            <Avatar className={cx("avatar")}></Avatar>

            <Typography className={cx("name")}>
              {`${auth?.user?.family} ${auth?.user?.name} ${auth?.user?.father}`}
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
