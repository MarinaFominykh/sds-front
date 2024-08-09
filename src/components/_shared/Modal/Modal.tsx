import { FC } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useAppSelector } from "@hooks/redux";
import { useStyles } from "@hooks/useStyles";
import { eVariantModal } from "@src/types/EvariantModal";
import { NewUser } from "@components/Modals/NewUser";
import { NewOrg } from "@components/Modals/NewOrg";
import { NewJob } from "@components/Modals/NewJob";
import { EditUser } from "@components/Modals/EditUser";
import { NewLocation } from "@components/Modals/NewLocation";
import { NewSubLocation } from "@components/Modals/NewSubLocation";
import { EditLocation } from "@components/Modals/EditLocation";
import { MoveLocatiton } from "@components/Modals/MoveLocation";
import { NewScheme } from "@components/Modals/NewScheme";
import { NewDev } from "@components/Modals/NewDev";
import { NewDevs } from "@components/Modals/NewDevs";
import { EditDev } from "@components/Modals/EditDev";
import { MoveDevice } from "@components/Modals/MoveDevice";
import { NewVerifRange } from "@components/Modals/NewVerifRange/NewVerifRange";
import { DeleteControlSession } from "@components/Modals/DeleteControlSession";
import { NewWell } from "@components/Modals/NewWell";
import { EditWell } from "@components/Modals/EditWell";
import { EditOrg } from "@components/Modals/EditOrg";
import { EditJob } from "@components/Modals/EditJob";
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
    } else if (variant === eVariantModal.newLocation) {
      return <NewLocation handleClose={handleClose} />;
    } else if (variant === eVariantModal.editLocation) {
      return <EditLocation handleClose={handleClose} />;
    } else if (variant === eVariantModal.moveLocation) {
      return <MoveLocatiton handleClose={handleClose} />;
    } else if (variant === eVariantModal.addSubLocation) {
      return <NewSubLocation handleClose={handleClose} />;
    } else if (variant === eVariantModal.newScheme) {
      return <NewScheme handleClose={handleClose} />;
    } else if (variant === eVariantModal.newDev) {
      return <NewDev handleClose={handleClose} />;
    } else if (variant === eVariantModal.newDevs) {
      return <NewDevs handleClose={handleClose} />;
    } else if (variant === eVariantModal.editDev) {
      return <EditDev handleClose={handleClose} />;
    } else if (variant === eVariantModal.moveDev) {
      return <MoveDevice handleClose={handleClose} />;
    } else if (variant === eVariantModal.newVerivRange) {
      return <NewVerifRange handleClose={handleClose} />;
    } else if (variant === eVariantModal.deleteControlSession) {
      return <DeleteControlSession handleClose={handleClose} />;
    } else if (variant === eVariantModal.newWell) {
      return <NewWell handleClose={handleClose} />;
    } else if (variant === eVariantModal.editWell) {
      return <EditWell handleClose={handleClose} />;
    } else if (variant === eVariantModal.editOrg) {
      return <EditOrg handleClose={handleClose} />;
    } else if (variant === eVariantModal.editJob) {
      return <EditJob handleClose={handleClose} />;
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
