import { FC, ChangeEvent, SyntheticEvent, MouseEvent } from "react";
import {
  Alert,
  MenuItem,
  SelectChangeEvent,
  Button as ButtonMui,
  Chip,
} from "@mui/material";

import { LocationTree } from "./components/LocationTree";
import { InputText } from "@components/_shared/Inputs/InputText";
import { Select } from "@components/_shared/Inputs/Select";
import { Button } from "@components/_shared/Button";
import { Typography } from "@components/_shared/Typography";
import { SelectWithSearch } from "@components/_shared/Inputs/SelectWithSearch";
import { SAVE_ERROR, SAVE_SUCCESS } from "@src/utils/messages";
import { FormErrors, FormValues } from "@hooks/useFormWithValidation";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";
import { IDev } from "@src/types/IDev";

interface Props {
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    regexp?: RegExp
  ) => void;
  handleSelectChange: (event: SelectChangeEvent) => void;
  handleCloseSelect: (
    event: SyntheticEvent<Element, Event>,
    name: string
  ) => void;
  handleSelectLocation: (event: string | null) => void;
  values: FormValues;
  errors: FormErrors;
  devOptions: IDev[];
  isDisabledDev: boolean;
  message: string;
  isSuccessSave: boolean;
  isErrorSave: boolean;
  isLoading: boolean;
  isValid: boolean;
}
export const NewWellView: FC<Props> = (props) => {
  const cx = useStyles(styles);
  const {
    handleChange,

    handleSelectChange,
    handleSelectLocation,
    values,
    errors,
    devOptions,
    message,
    isSuccessSave,
    isErrorSave,
    isLoading,
    isValid,
    isDisabledDev,
  } = props;
  return (
    <>
      <div className={cx("container")}>
        <fieldset className={cx("fields")}>
          <InputText
            name="number"
            label="Номер скважины"
            onChange={handleChange}
            error={Boolean(errors.number)}
            helperText={errors.number}
          />

          {/* <SelectWithSearch
            name="location"
            label="Расположение"
            options={locOptions}
            onChange={handleSelectChange}
            onClose={() => {}}
          /> */}
          <Typography className={cx("title")} variant="subtitle1">
            Выберите расположение скважины:
          </Typography>
          <fieldset className={cx("tree")}>
            <LocationTree handleSelectLocation={handleSelectLocation} />
          </fieldset>
          <SelectWithSearch
            name="dev_id"
            label="Устройство"
            options={devOptions}
            value={(values.dev_id as string) || ""}
            onChange={handleSelectChange}
            onClose={() => {}}
            isDisabled={!isDisabledDev}
          />
        </fieldset>
      </div>
      {message && (
        <Alert className={cx("alert")} severity="error">
          {message}
        </Alert>
      )}
      {isSuccessSave && (
        <Alert className={cx("alert")} severity="success">
          {SAVE_SUCCESS}
        </Alert>
      )}
      {isErrorSave && (
        <Alert className={cx("alert")} severity="error">
          {SAVE_ERROR}
        </Alert>
      )}

      <div className={cx("button")}>
        <Button disabled={!isValid} isLoading={isLoading}>
          Сохранить
        </Button>
      </div>
    </>
  );
};
