import { FC, ChangeEvent, SyntheticEvent } from "react";
import { SelectChangeEvent, MenuItem, Alert } from "@mui/material";
import { latRegex, longRegex } from "@src/utils/regexp";
import { SAVE_ERROR, SAVE_SUCCESS } from "@src/utils/messages";
import { InputText } from "@components/_shared/Inputs/InputText";
import { LatInput } from "@components/_shared/Inputs/LatInput";
import { LongInput } from "@components/_shared/Inputs/LongInput";
import { Select } from "@components/_shared/Inputs/Select";
import { Button } from "@components/_shared/Button";

import { FormErrors, FormValues } from "@hooks/useFormWithValidation";
import { IOrg } from "@src/types/IOrg";

import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";

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

  orgs: IOrg[];
  values: FormValues;
  errors: FormErrors;
  message: string;
  isSuccessSave: boolean;
  isErrorSave: boolean;
  isLoading: boolean;
  isValid: boolean;
}
export const NewLocationView: FC<Props> = (props) => {
  const cx = useStyles(styles);
  const {
    handleChange,
    handleCloseSelect,
    handleSelectChange,
    orgs,
    values,
    errors,
    message,
    isSuccessSave,
    isErrorSave,
    isLoading,
    isValid,
    ...other
  } = props;

  return (
    <>
      <div className={cx("container")} {...other}>
        <fieldset className={cx("fields")}>
          <InputText
            name="g_name"
            label="Место расположения"
            onChange={handleChange}
            error={Boolean(errors.g_name)}
            helperText={errors.g_name}
          />
          <Select
            inputProps={{
              name: "id_org",
            }}
            label="Организация"
            onChange={handleSelectChange}
            onClose={(e) => handleCloseSelect(e, "id_org")}
            value={String(values.id_org) || ""}
            error={Boolean(errors.id_org)}
            helperText={errors.id_org}
          >
            {orgs?.map((org) => (
              <MenuItem key={org.id} value={org.id}>
                {org.full_name}
              </MenuItem>
            ))}
          </Select>
          <InputText
            InputProps={{
              inputComponent: LatInput,
              style: { fontSize: 12 },
            }}
            name="latitude"
            label="Широта"
            onChange={(e) => handleChange(e, latRegex)}
            error={Boolean(errors.latitude)}
            helperText={errors.latitude}
          />
          <InputText
            InputProps={{
              inputComponent: LongInput,
              style: { fontSize: 12 },
            }}
            name="longitude"
            label="Долгота"
            onChange={(e) => handleChange(e, longRegex)}
            error={Boolean(errors.longitude)}
            helperText={errors.longitude}
          />
          <InputText
            name="g_info"
            label="Информация"
            multiline={true}
            onChange={handleChange}
            rows={4}
            required={false}
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
