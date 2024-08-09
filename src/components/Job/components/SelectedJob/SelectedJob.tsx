import { useState, MouseEvent } from "react";
import { BigButton } from "@components/_shared/BigButton";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { useModal } from "@hooks/useModal";
import { Modal } from "@components/_shared/Modal";
import { setVariant } from "@src/redux/reducers/ModalSlice";
import { eVariantModal } from "@src/types/EvariantModal";
import { SelectedJobView } from "./SelectedJobView";

export const SelectedJob = () => {
  const dispatch = useAppDispatch();
  const { selectedJob, isSelectedJob } = useAppSelector(
    (state) => state.jobSlice
  );
  const [open, openModal, closeModal] = useModal();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpenMenu = Boolean(anchorEl);
  const handleClickMenuButton = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };
  const handleOpenModalEditJob = (variant: eVariantModal, title: string) => {
    closeMenu();
    dispatch(
      setVariant({
        title,
        variant,
      })
    );
    openModal();
  };

  const handleOpenModalNewJob = () => {
    dispatch(
      setVariant({
        title: "Добавить должность",
        variant: eVariantModal.newJob,
      })
    );
    openModal();
  };

  return (
    <>
      {selectedJob && isSelectedJob && (
        <SelectedJobView
          job={selectedJob}
          anchorEl={anchorEl}
          handleOpenModal={handleOpenModalEditJob}
          handleClickMenuButton={handleClickMenuButton}
          closeMenu={closeMenu}
          isOpenMenu={isOpenMenu}
        />
      )}
      <BigButton handleClick={handleOpenModalNewJob}>
        Добавить скважину
      </BigButton>
      <Modal open={open} handleClose={closeModal} />
    </>
  );
};
