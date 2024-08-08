import { useState, MouseEvent } from "react";
import { BigButton } from "@components/_shared/BigButton";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { useModal } from "@hooks/useModal";
import { Modal } from "@components/_shared/Modal";
import { setVariant } from "@src/redux/reducers/ModalSlice";
import { eVariantModal } from "@src/types/EvariantModal";
import { SelectedOrgView } from "./SelectedOrgView";
export const SelectedOrg = () => {
  const dispatch = useAppDispatch();
  const { selectedOrg, isSelectedOrg } = useAppSelector(
    (state) => state.orgSlise
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
        title: "Добавить организацию",
        variant: eVariantModal.newOrg,
      })
    );
    openModal();
  };
  // console.log("selectedWell in Select", selectedWell);
  return (
    <>
      {selectedOrg && isSelectedOrg && (
        <SelectedOrgView
          org={selectedOrg}
          anchorEl={anchorEl}
          handleOpenModal={handleOpenModalEditWell}
          handleClickMenuButton={handleClickMenuButton}
          closeMenu={closeMenu}
          isOpenMenu={isOpenMenu}
        />
      )}
      <BigButton handleClick={handleOpenModalNewWell}>
        Добавить организацию
      </BigButton>
      <Modal open={open} handleClose={closeModal} />
    </>
  );
};
