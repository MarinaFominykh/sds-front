import { FC, ChangeEvent, SyntheticEvent } from "react";
import { Alert, SelectChangeEvent } from "@mui/material";
import { FormErrors, FormValues } from "@hooks/useFormWithValidation";
import { IDev } from "@src/types/IDev";
import { Typography } from "@components/_shared/Typography";
import { InputText } from "@components/_shared/Inputs/InputText";
import { Button } from "@components/_shared/Button";
import { LocationTree } from "./components/LocationTree";
import { SelectWithSearch } from "@components/_shared/Inputs/SelectWithSearch";
import { SAVE_ERROR, SAVE_SUCCESS } from "@src/utils/messages";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";

interface Props {
  locationName: string | undefined;
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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
}

export const EditWellView: FC<Props> = (props) => {
  const cx = useStyles(styles);
  const {
    locationName,
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

    isDisabledDev,
  } = props;
  return (
    <>
      <div className={cx("container")}>
        <fieldset className={cx("fields")}>
          <InputText
            name="number"
            label="Номер скважины"
            value={(values?.number as string) || ""}
            onChange={handleChange}
            error={Boolean(errors.number)}
            helperText={errors.number}
          />
          <InputText
            name="location"
            label="Текущее расположение"
            value={locationName || ""}
            InputProps={{
              readOnly: true,
              style: { fontSize: 12 },
            }}
          />
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
        <Button isLoading={isLoading}>Сохранить</Button>
      </div>
    </>
  );
};
