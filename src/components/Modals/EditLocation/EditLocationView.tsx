import { FC, ChangeEvent, SyntheticEvent } from "react";
import { SelectChangeEvent, MenuItem, Alert } from "@mui/material";

import { latRegex, longRegex } from "@src/utils/regexp";
import { SAVE_ERROR, SAVE_SUCCESS } from "@src/utils/messages";
import { InputText } from "@components/_shared/Inputs/InputText";
import { LatInput } from "@components/_shared/Inputs/LatInput";
import { LongInput } from "@components/_shared/Inputs/LongInput";
import { Select } from "@components/_shared/Inputs/Select";
import { Button } from "@components/_shared/Button";
import { Switch } from "@components/_shared/Switch";
import { FormErrors, FormValues } from "@hooks/useFormWithValidation";
import { IOrg } from "@src/types/IOrg";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";
import { ILocation } from "@src/types/ILocation";
interface Props {
  location: ILocation | null;
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
  handleChecked: (event: ChangeEvent<HTMLInputElement>) => void;
  orgs: (IOrg | undefined)[];
  values: FormValues;
  errors: FormErrors;
  message: string;
  isSuccessSave: boolean;
  isErrorSave: boolean;
  isLoading: boolean;
}
export const EditLocationView: FC<Props> = (props) => {
  const cx = useStyles(styles);
  const {
    location,
    handleChange,
    handleCloseSelect,
    handleSelectChange,
    handleChecked,
    orgs,
    values,
    errors,
    message,
    isSuccessSave,
    isErrorSave,
    isLoading,

    ...other
  } = props;
  return (
    <>
      <div className={cx("container")} {...other}>
        <fieldset className={cx("fields")}>
          <InputText
            name="g_name"
            label="Место расположения"
            defaultValue={location?.g_name || ""}
            onChange={handleChange}
            error={Boolean(errors.g_name)}
            helperText={errors.g_name}
          />
          <Select
            inputProps={{
              name: "org_id",
            }}
            label="Организация"
            defaultValue={location?.org?.id || ""}
            onChange={handleSelectChange}
            onClose={(e) => handleCloseSelect(e, "org_id")}
            //value={values.id_org || ""}
            error={Boolean(errors.org_id)}
            helperText={errors.org_id}
          >
            {orgs?.map((org) => (
              <MenuItem key={org?.id} value={org?.id}>
                {org?.full_name}
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
            defaultValue={location?.g_info || ""}
            multiline={true}
            onChange={handleChange}
            rows={4}
            required={false}
          />
          <Switch
            name="deleted"
            label="Заблокировать"
            defaultChecked={location?.deleted}
            handleChange={handleChecked}
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
