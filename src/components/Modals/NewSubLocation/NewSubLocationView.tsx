import { FC, ChangeEvent, SyntheticEvent } from "react";
import { SelectChangeEvent, Alert } from "@mui/material";
import { latRegex, longRegex } from "@src/utils/regexp";
import { SAVE_ERROR, SAVE_SUCCESS } from "@src/utils/messages";
import { InputText } from "@components/_shared/Inputs/InputText";
import { LatInput } from "@components/_shared/Inputs/LatInput";
import { LongInput } from "@components/_shared/Inputs/LongInput";
import { Button } from "@components/_shared/Button";
import { FormErrors, FormValues } from "@hooks/useFormWithValidation";

import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";
import { ILocation } from "@src/types/ILocation";

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

  // orgs: IOrg[];
  location: ILocation | null;
  values: FormValues;
  errors: FormErrors;
  message: string;
  isSuccessSave: boolean;
  isErrorSave: boolean;
  isLoading: boolean;
  isValid: boolean;
}
export const NewSubLocationView: FC<Props> = (props) => {
  const {
    handleChange,
    handleCloseSelect,
    handleSelectChange,
    // orgs,
    location,
    values,
    errors,
    message,
    isSuccessSave,
    isErrorSave,
    isLoading,
    isValid,
    ...other
  } = props;
  const cx = useStyles(styles);
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
          {/* <Select
            inputProps={{
              name: "id_org",
            }}
            label="Организация"
            onChange={handleSelectChange}
            onClose={(e) => handleCloseSelect(e, "id_org")}
            value={values.id_org || ""}
            error={Boolean(errors.id_org)}
            helperText={errors.id_org}
          >
            {orgs?.map((org) => (
              <MenuItem key={org.id} value={org.id}>
                {org.full_name}
              </MenuItem>
            ))}
          </Select> */}
          <InputText
            InputProps={{
              inputComponent: LatInput,
              style: { fontSize: 12 },
            }}
            name="latitude"
            label="Широта"
            defaultValue={location?.latitude || ""}
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
            defaultValue={location?.longitude || ""}
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
