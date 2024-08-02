import { FC, ChangeEvent } from "react";
import { TextareaAutosize, Alert } from "@mui/material";
import { InputText } from "@components/_shared/Inputs/InputText";

import { Button } from "@components/_shared/Button";
import { FormErrors } from "@hooks/useFormWithValidation";
import { SAVE_ERROR, SAVE_SUCCESS } from "@src/utils/messages";

import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";
interface Props {
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleBlur: (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  //values: FormValues;
  errors: FormErrors;
  isValidForm: boolean;
  isLoading: boolean;
  isSuccessSave: boolean;
  isErrorSave: boolean;
  message: string;
}
export const NewOrgView: FC<Props> = ({
  handleChange,
  errors,
  isLoading,
  isValidForm,
  isSuccessSave,
  isErrorSave,
  message,
}) => {
  const cx = useStyles(styles);
  return (
    <div className={cx("container")}>
      <fieldset className={cx("fields")}>
        <InputText
          label="Полное наименование"
          name="full_name"
          onChange={handleChange}
          error={Boolean(errors.full_name)}
          helperText={errors.full_name}
        />
        <InputText
          label="Наименование"
          name="name"
          onChange={handleChange}
          error={Boolean(errors.name)}
          helperText={errors.name}
        />

        <InputText
          label="ИНН"
          name="inn"
          onChange={handleChange}
          error={Boolean(errors.inn)}
          helperText={errors.inn}
          placeholder="10- или 12-значный цифровой код"
          inputNativeProps={{
            pattern: "[0-9]{10,12}",
          }}
        />
        <InputText
          label="Адрес"
          name="address"
          onChange={handleChange}
          error={Boolean(errors.address)}
          helperText={errors.address}
        />
        <TextareaAutosize
          name="info"
          minRows={4}
          className="info"
          onChange={handleChange}
        />
      </fieldset>
      {message && <Alert severity="error">{message}</Alert>}
      {isSuccessSave && <Alert severity="success">{SAVE_SUCCESS}</Alert>}
      {isErrorSave && <Alert severity="error">{SAVE_ERROR}</Alert>}
      <div className={cx("button")}>
        <Button disabled={!isValidForm} isLoading={isLoading}>
          Сохранить
        </Button>
      </div>
    </div>
  );
};
