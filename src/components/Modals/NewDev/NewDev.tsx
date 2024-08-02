import { FormEvent, useState, useEffect, FC } from "react";
import { NewDevView } from "./NewDevView";
import { useCreateDevMutation } from "@src/redux/services/devsApi";
import { useFormValidation } from "@hooks/useFormWithValidation";
import { useModal } from "@hooks/useModal";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { setNewSensors } from "@src/redux/reducers/devSlice";
import { DOUBLE_NUMBER_ERROR } from "@src/utils/messages";
import { AddSensor } from "../AddSensor/AddSensor";

interface Props {
  handleClose: () => void;
}
export const NewDev: FC<Props> = ({ handleClose }) => {
  const [createDev, { data: response, isError, isLoading, isSuccess }] =
    useCreateDevMutation();
  const {
    values,
    errors,
    isValid,
    handleChange,
    handleCloseSelect,
    handleSelectChange,
    resetForm,
  } = useFormValidation();
  const [open, openModal, closeModal] = useModal();
  const { selectedLocation } = useAppSelector((state) => state.locationSlice);
  const { newSensors } = useAppSelector((state) => state.devSlice);
  const { devs } = useAppSelector((state) => state.devSlice);
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();

  const handleOpenModalAddSensor = () => {
    openModal();
  };
  const handleDeleteSensor = (depth: number) => {
    const filteredSensors = newSensors.filter(
      (sensor) => sensor.depth !== depth
    );
    dispatch(setNewSensors(filteredSensors));
  };
  const setSensors = (depth: number) => {
    dispatch(setNewSensors([...newSensors, { depth, value: 1 }]));
  };
  const generateArgs = () => {
    if (
      selectedLocation &&
      "id" in selectedLocation &&
      typeof selectedLocation.id === "string"
    ) {
      const args = {
        group_dev_id: selectedLocation.id,
        number: values.number,
        name: values.name,
        latitude: values.latitude,
        longitude: values.longitude,
        period_sess: values.period_sess ?? "1",
        info: values.info ?? "",
        deleted: false,
        sensors: `{"s": ${JSON.stringify(newSensors)}}`,
      };

      return args;
    }
  };
  const valdidationFormValues = (event: FormEvent) => {
    event.preventDefault();
    if (devs?.some((dev) => dev.number === values.number)) {
      setMessage(DOUBLE_NUMBER_ERROR);
    } else {
      setMessage("");
      createNewDev();
    }
  };

  const createNewDev = () => {
    const args = generateArgs();

    if (args) {
      createDev(args);
    }
  };
  const isSuccessSave = () => {
    return Boolean(isSuccess && response && !response.error);
  };

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
    <>
      <form onSubmit={valdidationFormValues} noValidate>
        <NewDevView
          values={values}
          errors={errors}
          sensors={newSensors}
          message={message}
          handleChange={handleChange}
          handleCloseSelect={handleCloseSelect}
          handleSelectChange={handleSelectChange}
          handleAddSensors={handleOpenModalAddSensor}
          handleDelete={handleDeleteSensor}
          isValid={isValid}
          isSuccessSave={isSuccessSave()}
          isErrorSave={isError}
          isLoading={isLoading}
        />
      </form>
      <AddSensor
        open={open}
        handleClose={closeModal}
        sensors={newSensors}
        setSensors={setSensors}
      />
    </>
  );
};
