import { useState, useEffect, MouseEvent } from "react";
import { AboutDevPanelView } from "./AboutDevPanelView";
import { Modal } from "@components/_shared/Modal";
import { useAppSelector, useAppDispatch } from "@hooks/redux";
import { useAuth } from "@hooks/useAuth";
import { useModal } from "@hooks/useModal";
import { eVariantModal } from "@src/types/EvariantModal";
import { setVariant } from "@src/redux/reducers/ModalSlice";

export const AboutDevPanel = () => {
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const { selectedDev } = useAppSelector((state) => state.devSlice);
  const { locations } = useAppSelector((state) => state.locationSlice);
  const [isAdmin, setIsAdmin] = useState(false);
  const [open, openModal, closeModal] = useModal();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpenMenu = Boolean(anchorEl);
  const location = locations.find(
    (location) => location.id === selectedDev?.group_dev_id
  )?.g_name;

  const closeMenu = () => {
    setAnchorEl(null);
  };
  const handleOpenModalEditDevice = (variant: eVariantModal, title: string) => {
    closeMenu();
    dispatch(
      setVariant({
        title,
        variant,
      })
    );
    openModal();
  };
  const handleClickMenuButton = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    // Если у пользователя есть права редактирования:
    if (auth && "user" in auth && auth?.user?.roles_ids.roles[1] === 2)
      setIsAdmin(true);
  }, [auth?.user]);
  return (
    <>
      <AboutDevPanelView
        device={selectedDev}
        location={location ?? ""}
        anchorEl={anchorEl}
        handleOpenModal={handleOpenModalEditDevice}
        onCloseMenu={closeMenu}
        isOpenMenu={isOpenMenu}
        handleClickMenuButton={handleClickMenuButton}
        isAdmin={isAdmin}
      />
      <Modal open={open} handleClose={closeModal} />
    </>
  );
};
