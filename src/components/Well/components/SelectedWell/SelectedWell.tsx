import { useState, MouseEvent } from "react";
import { BigButton } from "@components/_shared/BigButton";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { useModal } from "@hooks/useModal";
import { Modal } from "@components/_shared/Modal";
import { setVariant } from "@src/redux/reducers/ModalSlice";
import { eVariantModal } from "@src/types/EvariantModal";
import { SelectedWellView } from "./SelectedWellView";
export const SelectedWell = () => {
  const dispatch = useAppDispatch();
  const { selectedWell, isSelectedWell } = useAppSelector(
    (state) => state.wellSlice
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
  const handleOpenModalEditWell = (variant: eVariantModal, title: string) => {
    closeMenu();
    dispatch(
      setVariant({
        title,
        variant,
      })
    );
    openModal();
  };
  const handleOpenModalNewWell = () => {
    dispatch(
      setVariant({
        title: "Добавить скважину",
        variant: eVariantModal.newWell,
      })
    );
    openModal();
  };
  // console.log("selectedWell in Select", selectedWell);
  return (
    <>
      {selectedWell && isSelectedWell && (
        <SelectedWellView
          well={selectedWell}
          anchorEl={anchorEl}
          handleOpenModal={handleOpenModalEditWell}
          handleClickMenuButton={handleClickMenuButton}
          closeMenu={closeMenu}
          isOpenMenu={isOpenMenu}
        />
      )}
      <BigButton handleClick={handleOpenModalNewWell}>
        Добавить скважину
      </BigButton>
      <Modal open={open} handleClose={closeModal} />
    </>
  );
};
