import { FC, FormEvent, useState, useEffect, ChangeEvent } from "react";
import { EditDevView } from "./EditDevView";
import { AddSensor } from "../AddSensor/AddSensor";
import { useModal } from "@hooks/useModal";
import { useEditDevMutation } from "@src/redux/services/devsApi";
import { setSelectedDev } from "@src/redux/reducers/devSlice";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { useFormValidation } from "@hooks/useFormWithValidation";
import { IDev, ISensor } from "@src/types/IDev";
import { FormErrors } from "@hooks/useFormWithValidation";
import { SelectChangeEvent } from "@mui/material";
import { latRegex, longRegex } from "@src/utils/regexp";
import { DOUBLE_NUMBER_ERROR } from "@src/utils/messages";
interface Props {
  handleClose: () => void;
}
export const EditDev: FC<Props> = ({ handleClose }) => {
  const dispatch = useAppDispatch();
  const {
    handleCloseSelect,
    //handleCheckboxChange,
    resetForm,
  } = useFormValidation();
  const { selectedDev, devs } = useAppSelector((state) => state.devSlice);
  const [editDev, { data: response, isError, isLoading, isSuccess }] =
    useEditDevMutation();
  const [open, openModal, closeModal] = useModal();
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [validForm, setValidForm] = useState(true);

  const handleOpenModalAddSensor = () => {
    // dispatch(
    //   setVariant({
    //     title: "Введите глубину датчика",
    //     variant: eVariantModal.addSensors,
    //   })
    // );
    openModal();
  };
  // Обработчик изменений в поле ввода
  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    regexp?: RegExp
  ) => {
    const { name, value } = event.target;
    const form = event.target.closest("form");
    dispatch(setSelectedDev({ ...(selectedDev as IDev), [name]: value }));
    setErrors({
      ...errors,
      [name]: event.target.validationMessage,
    });

    if (regexp) {
      if (!regexp.test(value)) {
        setErrors({
          ...errors,
          [name]: "Введите данные в указанном формате",
        });
      } else setErrors({ ...errors, [name]: "" });
    }
    setValidForm(form ? form.checkValidity() : false);
  };

  // Обработчик изменений в поле выбора
  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    dispatch(setSelectedDev({ ...(selectedDev as IDev), [name]: value }));
  };

  // Обработчик чекбокса:
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    dispatch(setSelectedDev({ ...(selectedDev as IDev), [name]: checked }));
  };

  // Обработчик для удаления сенсоров устройства
  const handleDeleteSensors = (depth: number) => {
    const filteredSensors = selectedDev?.sensors?.s.filter(
      (sensor: ISensor) => sensor.depth !== depth
    );
    if (filteredSensors)
      dispatch(
        setSelectedDev({
          ...(selectedDev as IDev),
          sensors: { s: filteredSensors },
        })
      );
  };

  //Добавление сенсоров устройству
  const setSensors = (depth: number) => {
    if (Array.isArray(selectedDev?.sensors?.s)) {
      dispatch(
        setSelectedDev({
          ...(selectedDev as IDev),
          sensors: {
            s: [...selectedDev?.sensors?.s, { depth, value: 1 }],
          },
        })
      );
    }
  };
  const generateArgs = () => {
    const args = {
      id: selectedDev?.id ?? "",
      group_dev_id: selectedDev?.group_dev_id ?? "",
      number: selectedDev?.number ?? "",
      name: selectedDev?.name ?? "",
      latitude: selectedDev?.latitude ?? "",
      longitude: selectedDev?.longitude ?? "",
      period_sess: selectedDev?.period_sess ?? "",
      info: selectedDev?.info ?? "",
      deleted: selectedDev?.deleted ?? false,
      sensors: `{"s": ${JSON.stringify(selectedDev?.sensors?.s)}}`,
    };
    return args;
  };

  // Проверка формы на валидность перед отправкой
  const validationForm = (event: FormEvent) => {
    event.preventDefault();

    if (!latRegex.test(String(selectedDev?.latitude))) {
      setMessage("Введите корректную географическую широту");
      return;
    } else if (!longRegex.test(String(selectedDev?.longitude))) {
      setMessage("Введите корректную географическую долготу");
      return;
    } else if (
      devs?.some(
        (dev) =>
          dev.number === selectedDev?.number && dev.id !== selectedDev?.id
      )
    ) {
      setMessage(DOUBLE_NUMBER_ERROR);
    } else {
      setMessage("");
      changeDev();
    }
  };

  const changeDev = () => {
    const args = generateArgs();
    if (args) editDev(args);
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
    <form onSubmit={validationForm} noValidate>
      <EditDevView
        device={selectedDev}
        handleChange={handleChange}
        handleSelectChange={handleSelectChange}
        handleCloseSelect={handleCloseSelect}
        handleChecked={handleCheckboxChange}
        handleAddSensors={handleOpenModalAddSensor}
        handleDelete={handleDeleteSensors}
        errors={errors}
        message={message}
        sensors={selectedDev?.sensors?.s}
        isSuccessSave={isSuccessSave()}
        isErrorSave={isError}
        isLoading={isLoading}
        isValid={validForm}
      />
      <AddSensor
        open={open}
        handleClose={closeModal}
        sensors={selectedDev?.sensors?.s || []}
        setSensors={setSensors}
      />
    </form>
  );
};
