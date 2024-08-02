import { useState, FormEvent, FC, useEffect } from "react";
import { NewSchemeView } from "./NewSchemeView";

import { useAppSelector, useAppDispatch } from "@hooks/redux";
import { useCreateSchemeMutation } from "@src/redux/services/schemeApi";
import { setSelectedLocation } from "@src/redux/reducers/locationSlice";
import { ILocation } from "@src/types/ILocation";

interface Props {
  handleClose: () => void;
}
export const NewScheme: FC<Props> = ({ handleClose }) => {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("");
  const { newScheme, selectedLocation } = useAppSelector(
    (state) => state.locationSlice
  );
  const [createScheme, { isError, isSuccess }] = useCreateSchemeMutation();
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (newScheme && selectedLocation?.id) {
      const args = {
        group_svg: newScheme,
        id_devs_groups: selectedLocation?.id,
      };
      createScheme(args).then((res) => {
        if ("data" in res && "error" in res?.data) {
          const {
            data: { error },
          } = res;
          if (error) {
            setMessage(error);
          }
        }
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setSelectedLocation({
          ...(selectedLocation as ILocation),
          svg: newScheme,
        })
      );

      setTimeout(() => {
        handleClose();
      }, 2000);
    }
  }, [isSuccess]);
  return (
    <form onSubmit={handleSubmit} noValidate>
      <NewSchemeView
        message={message}
        isErrorSave={isError}
        isSuccessSave={isSuccess}
      />
    </form>
  );
};
