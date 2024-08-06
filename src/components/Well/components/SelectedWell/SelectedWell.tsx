import { BigButton } from "@components/_shared/BigButton";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { useModal } from "@hooks/useModal";
import { Modal } from "@components/_shared/Modal";
import { setVariant } from "@src/redux/reducers/ModalSlice";
import { eVariantModal } from "@src/types/EvariantModal";
export const SelectedWell = () => {
  const dispatch = useAppDispatch();
  const [open, openModal, closeModal] = useModal();
  const handleOpenModalNewWell = () => {
    dispatch(
      setVariant({
        title: "Добавить скважину",
        variant: eVariantModal.newWell,
      })
    );
    openModal();
  };
  return (
    <>
      <BigButton handleClick={handleOpenModalNewWell}>
        Добавить скважину
      </BigButton>
      <Modal open={open} handleClose={closeModal} />
    </>
  );
};
