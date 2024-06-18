import {
  useState,
  useCallback,
  ChangeEvent,
  ReactNode,
  SyntheticEvent,
  useEffect,
} from "react";
import { SelectChangeEvent } from "@mui/material";
import { set } from "react-hook-form";
import { phoneRegex } from "@src/utils/regexp";
export interface FormValues {
  [key: string]: string;
}
export interface FormErrors {
  [key: string]: string;
}
export const useFormValidation = () => {
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isValid, setIsValid] = useState(false);
  const [isInValidInput, setIsInValidInput] = useState({});
  const [isValidForm, setIsValidForm] = useState(false);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    const form = target.closest("form");

    setValues({ ...values, [name]: value });
    setErrors({
      ...errors,
      [name]: target.validationMessage,
    });
    setIsValid(form ? form.checkValidity() : false);

    target.validationMessage
      ? setIsInValidInput({ ...isInValidInput, [name]: true })
      : setIsInValidInput({ ...isInValidInput, [name]: false });
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleChangeTelInput = (event: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    if (!phoneRegex.test(value)) {
      setErrors({ ...errors, [name]: "Введите данные в указанном формате" });
    } else setErrors({ ...errors, [name]: "" });
  };

  const handleBlur = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = event.target;
    const form = target.closest("form");
    setIsValid(form ? form.checkValidity() : false);
  };
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setValues({ ...values, [name]: checked.toString() });
  };
  const handleCloseSelect = (
    event: React.SyntheticEvent<Element, Event>,
    name: string
  ) => {
    const target = event.target as HTMLElement;
    const textContent = target.textContent;
    if (!textContent && !values[name]) {
      setErrors({ ...errors, [name]: "Заполните это поле" });
      setIsInValidInput({ ...isInValidInput, [name]: true });
    } else {
      setErrors({ ...errors, [name]: "" });
      setIsInValidInput({ ...isInValidInput, [name]: false });
    }
  };

  const resetForm = useCallback(
    (
      newValues = {},
      newErrors = {},
      newIsInvalidInput = {},
      newIsValid = false
    ) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsInValidInput(newIsInvalidInput);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    setValues,
    setErrors,
    handleChange,
    handleSelectChange,
    handleChangeTelInput,
    handleCheckboxChange,
    handleCloseSelect,
    handleBlur,
    errors,
    isValid,
    isValidForm,
    isInValidInput,
    resetForm,
  };
};
