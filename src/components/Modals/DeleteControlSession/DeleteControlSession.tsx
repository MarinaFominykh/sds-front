import { useState, useEffect, FC, FormEvent } from "react";
import { DeleteControlSessionView } from "./DeleteControlSessionView";
import { useRemoveControlSessMutation } from "@src/redux/services/devsApi";
import { useAppSelector } from "@hooks/redux";
import { setSelectedDev } from "@src/redux/reducers/devSlice";
import { IDev } from "@src/types/IDev";

interface Props {
  handleClose: () => void;
}
export const DeleteControlSession: FC<Props> = ({ handleClose }) => {
  const [message, setMessage] = useState("");
  const { selectedDev } = useAppSelector((state) => state.devSlice);
  const [
    removeControlSession,
    { data: response, isError, isSuccess, isLoading },
  ] = useRemoveControlSessMutation();
  const isSuccessSave = () => {
    return Boolean(isSuccess && response && !response.error);
  };
  const generateArgs = () => {
    const args = {
      id: selectedDev?.control_sess?.id ?? "",
    };
    return args;
  };
  const deleleteControlSession = (event: FormEvent) => {
    event.preventDefault();
    const args = generateArgs();
    removeControlSession(args);
  };
  useEffect(() => {
    if (isSuccess && !response.error) {
      setSelectedDev({ ...(selectedDev as IDev), control_sess: undefined });
      setTimeout(() => {
        handleClose();
      }, 2000);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (response && response.error) setMessage(response.error);
  }, [response]);

  return (
    <form onSubmit={deleleteControlSession}>
      <DeleteControlSessionView
        message={message}
        isErrorSave={isError}
        isLoading={isLoading}
        isSuccessSave={isSuccessSave()}
      />
    </form>
  );
};
