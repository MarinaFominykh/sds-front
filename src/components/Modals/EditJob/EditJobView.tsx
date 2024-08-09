import { FC, ChangeEvent } from "react";
import { Alert, MenuItem, SelectChangeEvent } from "@mui/material";
import { FormErrors } from "@hooks/useFormWithValidation";
import { InputText } from "@components/_shared/Inputs/InputText";
import { Select } from "@components/_shared/Inputs/Select";
import { Button } from "@components/_shared/Button";
import { SAVE_ERROR, SAVE_SUCCESS } from "@src/utils/messages";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";
import { ISelectedJob } from "@src/types/IJob";
import { IOrg } from "@src/types/IOrg";

interface Props {
  job: ISelectedJob | null;
  orgs: IOrg[];
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleSelectChange: (event: SelectChangeEvent) => void;
  errors: FormErrors;
  message: string;
  isSuccessSave: boolean;
  isErrorSave: boolean;
  isLoading: boolean;
  // isValid: boolean;
}

export const EditJobView: FC<Props> = (props) => {
  const {
    job,
    orgs,
    handleChange,
    handleSelectChange,
    errors,
    message,
    isErrorSave,
    isSuccessSave,
    isLoading,
    // isValid,
  } = props;
  const cx = useStyles(styles);

  return (
    <>
      <div className={cx("container")}>
        <fieldset className={cx("fields")}>
          <InputText
            name="name"
            label="Наименование должности"
            defaultValue={job?.name}
            onChange={handleChange}
            error={Boolean(errors.full_name)}
            helperText={errors.full_name}
          />
          <Select
            onChange={handleSelectChange}
            label="Организация"
            inputProps={{
              name: "id_org",
            }}
            defaultValue={job?.org_id || ""}
          >
            {orgs?.map((org) => (
              <MenuItem key={org.id} value={org.id}>
                {org.full_name}
              </MenuItem>
            ))}
          </Select>
          <InputText
            name="info"
            label="Информация"
            required={false}
            defaultValue={job?.info}
            onChange={handleChange}
            multiline
            rows={4}
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
        <Button
          isLoading={isLoading}
          // disabled={!isValid}
        >
          Сохранить
        </Button>
      </div>
    </>
  );
};
