import { useState, MouseEvent } from "react";
import { SelectedUserView } from "./SelectedUserView";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { useModal } from "@hooks/useModal";
import { Modal } from "@components/_shared/Modal";
import { BigButton } from "@components/_shared/BigButton";
import { setVariant } from "@src/redux/reducers/ModalSlice";
import { eVariantModal } from "@src/types/EvariantModal";

export const SelectedUser = () => {
  const { selectedUser } = useAppSelector((state) => state.userSlice);
  const [open, openModal, closeModal] = useModal();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpenMenu = Boolean(anchorEl);
  const handleClickMenuButton = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };
  const handleOpenModalEditUser = () => {
    closeMenu();
    dispatch(
      setVariant({
        title: "Редактировать пользователя",
        variant: eVariantModal.editUser,
      })
    );
    openModal();
  };

  const handleOpenModalNewUser = () => {
    dispatch(
      setVariant({
        title: "Добавить пользователя",
        variant: eVariantModal.newUser,
      })
    );
    openModal();
  };

  return (
    <>
      {selectedUser ? (
        <SelectedUserView
          user={selectedUser}
          anchorEl={anchorEl}
          handleOpenModal={handleOpenModalEditUser}
          handleClickMenuButton={handleClickMenuButton}
          closeMenu={closeMenu}
          isOpenMenu={isOpenMenu}
        />
      ) : null}

      <BigButton handleClick={handleOpenModalNewUser}>
        Добавить пользователя
      </BigButton>
      <Modal open={open} handleClose={closeModal} />
    </>
  );
};
