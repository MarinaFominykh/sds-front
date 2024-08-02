import { useState, FormEvent, useEffect, FC } from "react";
import { NewSubLocationView } from "./NewSubLocationView";
import { useFormValidation } from "@hooks/useFormWithValidation";
import { useCreateLocationMutation } from "@src/redux/services/locacationApi";
import { useAppSelector } from "@hooks/redux";

interface Props {
  handleClose: () => void;
}
export const NewSubLocation: FC<Props> = ({ handleClose }) => {
  const {
    values,
    errors,
    handleChange,
    handleSelectChange,
    handleCloseSelect,

    isValid,
    resetForm,
  } = useFormValidation();

  const [createLocation, { isError, isLoading, isSuccess }] =
    useCreateLocationMutation();
  const { selectedLocation } = useAppSelector((state) => state.locationSlice);
  const [message, _] = useState("");
  // const isValidForm = () => {
  //   return (
  //     isValid &&
  //     Boolean(values.id_org) &&
  //     !Boolean(errors.latitude) &&
  //     !Boolean(errors.longitude)
  //   );
  // };
  const generateArgs = () => {
    const args = {
      ...values,
      parent_id: selectedLocation?.id ?? "",
      id_org: selectedLocation?.org_id ?? "",
      deleted: false,
      latitude: values.latitude ?? selectedLocation?.latitude,
      longitude: values.longitude ?? selectedLocation?.longitude,
      g_info: values.g_info ?? "",
    };
    return args;
  };
  const createNewLocation = (event: FormEvent) => {
    event.preventDefault();
    const args = generateArgs();
    createLocation(args);
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        handleClose();
        resetForm();
      }, 2000);
    }
  }, [isSuccess]);

  return (
    <form onSubmit={createNewLocation} noValidate>
      <NewSubLocationView
        location={selectedLocation}
        values={values}
        errors={errors}
        message={message}
        handleChange={handleChange}
        handleCloseSelect={handleCloseSelect}
        handleSelectChange={handleSelectChange}
        isValid={isValid}
        isSuccessSave={isSuccess}
        isErrorSave={isError}
        isLoading={isLoading}
      />
    </form>
  );
};
