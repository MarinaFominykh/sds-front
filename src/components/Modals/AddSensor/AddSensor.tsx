import { FC, FormEvent } from "react";
import { AddSensorView } from "./AddSensorView";
import { useFormValidation } from "@hooks/useFormWithValidation";

import { ISensor } from "@src/types/IDev";

interface Props {
  open: boolean;
  handleClose: () => void;
  sensors: ISensor[];
  setSensors: (depth: number) => void;
}
export const AddSensor: FC<Props> = (props) => {
  const { sensors, setSensors, ...other } = props;
  const { values, errors, handleChange, isValid, resetForm } =
    useFormValidation();

  const addNewSensor = (event: FormEvent) => {
    event.preventDefault();
    resetForm();
    if (!sensors.some(({ depth }) => Number(depth) === Number(values.depth))) {
      setSensors(Number(values.depth));
      // dispatch(
      //   setNewSensors([...sensors, { depth: Number(values.depth), value: 1 }])
      // );
    }
  };
  // const addNewSensor = (event: FormEvent) => {
  //   event.preventDefault();
  //   resetForm();
  //   if (!newSensors.some(({ depth }) => depth === Number(values.depth))) {
  //     dispatch(
  //       setNewSensors([
  //         ...newSensors,
  //         { depth: Number(values.depth), value: 1 },
  //       ])
  //     );
  //   }
  // };

  return (
    <AddSensorView
      {...other}
      values={values}
      errors={errors}
      handleChange={handleChange}
      handleSubmit={addNewSensor}
      isValid={isValid}
    />
  );
};
