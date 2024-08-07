import { useState, FC, useEffect, FormEvent } from "react";
import { useFormValidation } from "@hooks/useFormWithValidation";
import { EditWellView } from "./EditWellView";
import { useGetAllDevsQuery } from "@src/redux/services/devsApi";
import { useEditWellMutation } from "@src/redux/services/wellApi";

import { useAppSelector } from "@hooks/redux";

import { IDev } from "@src/types/IDev";
import { INVALID_FORM } from "@src/utils/messages";

import { ILocation } from "@src/types/ILocation";

interface Props {
  handleClose: () => void;
}
export const EditWell: FC<Props> = ({ handleClose }) => {
  const {
    values,
    errors,
    handleChange,
    handleCloseSelect,
    handleSelectChange,
    resetForm,
    setValues,
  } = useFormValidation();

  const [currentDevs, setCurrentDevs] = useState([]);
  const [message, setMessage] = useState("");
  const [locationName, setLocationName] = useState<string | undefined>("");
  const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(
    null
  );
  const { data: devices } = useGetAllDevsQuery({});
  const [editWell, { isError, isLoading, isSuccess, data: response }] =
    useEditWellMutation({});
  const { selectedWell } = useAppSelector((state) => state.wellSlice);
  const { locations } = useAppSelector((state) => state.locationSlice);

  const handleSelectLocation = (id: string | null) => {
    if (id) {
      const currentSelectedLocation = locations.find((loc) => loc.id === id);
      if (currentSelectedLocation) {
        setSelectedLocation(currentSelectedLocation);
        setLocationName(currentSelectedLocation.g_name);
      }
    }
  };

  const isSuccessSave = () => {
    return Boolean(isSuccess && response && !response.error);
  };

  const valdidationFormValues = (event: FormEvent) => {
    event.preventDefault();
    if (!values.number || !values.dev_id) {
      setMessage(INVALID_FORM);
    } else {
      setMessage("");
      changeWell();
    }
  };

  const generateArgs = () => {
    let org_id;
    if (selectedLocation) {
      org_id = selectedLocation?.org_id;
    } else org_id = selectedWell?.org.id;

    const args = {
      id: selectedWell?.id ?? "",
      number: values.number ?? selectedWell?.number ?? "",
      group_dev_id: selectedLocation?.id ?? selectedWell?.location.id ?? "",
      dev_id: values.dev_id ?? selectedWell?.device.id,
      org_id: org_id ?? "",
    };
    return args;
  };

  const changeWell = () => {
    const args = generateArgs();
    editWell(args);
  };

  //Получаем Options для списка с устройствами в зависимости от выбранного расположения
  useEffect(() => {
    // Очищаем поле с устройством при выборе нового расположения
    setValues({
      ...values,
      dev_id: "",
    });
    const filteredDevices = devices?.data.filter(
      (dev: IDev) => dev.group_dev_id === selectedLocation?.id
    );
    setCurrentDevs(filteredDevices);
  }, [selectedLocation]);

  //Данные выбранной скважины, options для списка с устройствами при открытии модального окна
  useEffect(() => {
    if (selectedWell) {
      setValues({
        number: selectedWell?.number ?? "",
        dev_id: selectedWell?.device.id ?? "",
      });
      setLocationName(selectedWell?.location.g_name ?? "");
      const filteredDevices = devices?.data.filter(
        (dev: IDev) => dev.group_dev_id === selectedWell?.location.id
      );
      setCurrentDevs(filteredDevices);
    }
  }, [selectedWell, devices]);

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
      <EditWellView
        locationName={locationName}
        handleChange={handleChange}
        handleCloseSelect={handleCloseSelect}
        handleSelectChange={handleSelectChange}
        handleSelectLocation={handleSelectLocation}
        values={values}
        errors={errors}
        devOptions={currentDevs}
        message={message}
        isSuccessSave={isSuccessSave()}
        isErrorSave={isError}
        isLoading={isLoading}
        isDisabledDev={Boolean(selectedLocation?.id)}
      />
    </form>
  );
};
