import { useState, useEffect, FC, FormEvent } from "react";
import { NewWellView } from "./NewWellView";
import { useFormValidation } from "@hooks/useFormWithValidation";
import { useGetAllDevsQuery } from "@src/redux/services/devsApi";
import { useCreateWellMutation } from "@src/redux/services/wellApi";
import { IDev } from "@src/types/IDev";
import { INVALID_FORM } from "@src/utils/messages";
import { useAppSelector } from "@hooks/redux";

//import { setSelectedLocation } from "@src/redux/reducers/locationSlice";

interface Props {
  handleClose: () => void;
}

export const NewWell: FC<Props> = ({ handleClose }) => {
  const [currentDevs, setCurrentDevs] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const { data } = useGetAllDevsQuery({});
  const [createWell, { isError, isLoading, isSuccess, data: response }] =
    useCreateWellMutation({});
  const { locations } = useAppSelector((state) => state.locationSlice);
  const {
    values,
    errors,
    handleChange,
    handleCloseSelect,
    handleSelectChange,
    resetForm,
    setValues,
    // isValid,
  } = useFormValidation();
  const handleSelectLocation = (id: string | null) => {
    if (id) setSelectedLocation(id);
    //dispatch(setSelectedLocation({ ...selectedLocation, parent_id: id }));
  };

  const isValid = () => {
    return (
      Boolean(values.number) &&
      Boolean(values.dev_id) &&
      Boolean(selectedLocation)
    );
  };
  const valdidationFormValues = (event: FormEvent) => {
    event.preventDefault();
    if (!values.number || !values.dev_id || !selectedLocation) {
      setMessage(INVALID_FORM);
    } else {
      setMessage("");
      createNewWell();
    }
  };
  const generateArgs = () => {
    const org_id = locations.find((loc) => loc.id === selectedLocation)?.org_id;
    const args = {
      ...values,
      group_id: selectedLocation,
      org_id: org_id ?? "",
    };
    return args;
  };

  const createNewWell = () => {
    const args = generateArgs();
    createWell(args);
  };

  const isSuccessSave = () => {
    return Boolean(isSuccess && response && !response.error);
  };
  useEffect(() => {
    //Очищаем значение полей Устройства, если выбрано другое расположение
    setValues({ ...values, dev_id: "" });
    const devices = data?.data.filter(
      (dev: IDev) => dev.group_dev_id === selectedLocation
    );
    setCurrentDevs(devices);
  }, [selectedLocation]);

  useEffect(() => {
    if (isSuccess && !response.error) {
      setTimeout(() => {
        handleClose();
        resetForm();
      }, 2000);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (response && response.error) setMessage(response.error);
  }, [response]);

  return (
    <form onSubmit={valdidationFormValues} noValidate>
      <NewWellView
        handleChange={handleChange}
        handleCloseSelect={handleCloseSelect}
        handleSelectChange={handleSelectChange}
        handleSelectLocation={handleSelectLocation}
        values={values}
        errors={errors}
        devOptions={currentDevs}
        message={message}
        isValid={isValid()}
        isSuccessSave={isSuccessSave()}
        isErrorSave={isError}
        isLoading={isLoading}
        isDisabledDev={Boolean(selectedLocation)}
      />
    </form>
  );
};
