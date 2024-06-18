import React, { FC, ReactNode } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { useAppSelector, useAppDispatch } from "@hooks/redux";
import { useStyles } from "@hooks/useStyles";
import { eVariantModal } from "@src/types/EvariantModal";
import { NewUser } from "@components/Modals/NewUser";
import { NewOrg } from "@components/Modals/NewOrg";
import { NewJob } from "@components/Modals/NewJob";
import { EditUser } from "@components/Modals/EditUser";
import { CloseButton } from "../CloseButton";
import { Typography } from "../Typography";
import styles from "./styles.module.scss";
interface Props {
  open: boolean;
  handleClose: () => void;
}
export const Modal: FC<Props> = ({ open, handleClose }) => {
  const cx = useStyles(styles);
  const { variant, title } = useAppSelector((state) => state.modalSlice);
  const variantModalRender = () => {
    if (variant === eVariantModal.newUser) {
      return <NewUser handleClose={handleClose} />;
    } else if (variant === eVariantModal.newOrg) {
      return <NewOrg handleClose={handleClose} />;
    } else if (variant === eVariantModal.newJob) {
      return <NewJob handleClose={handleClose} />;
    } else if (variant === eVariantModal.editUser) {
      return <EditUser handleClose={handleClose} />;
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} className={cx("modal")}>
      <DialogTitle className={cx("head")}>
        <Typography> {title}</Typography>

        <CloseButton onClose={handleClose} />
      </DialogTitle>
      <DialogContent className={cx("content")}>
        {variantModalRender()}
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions> */}
    </Dialog>
  );
};
